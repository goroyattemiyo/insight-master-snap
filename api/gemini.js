export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageBase64, mimeType, sns } = req.body;
  if (!imageBase64 || !sns) {
    return res.status(400).json({ error: 'imageBase64 and sns are required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const prompt = `あなたはSNSインサイト画像の数値を読み取る専門家です。
この${sns}のインサイト画面スクリーンショットから数値を読み取り、分析してください。

以下のJSON形式のみで返答してください。他のテキストは一切含めないでください。

{
  "metrics": {
    "views": null,
    "reach": null,
    "impressions": null,
    "likes": null,
    "replies": null,
    "reposts": null,
    "quotes": null,
    "shares": null,
    "bookmarks": null,
    "interactions": null,
    "follows": null,
    "profileVisits": null,
    "linkClicks": null
  },
  "analysis": {
    "summary": "結論を1〜2文で",
    "strengths": ["良い点1", "良い点2"],
    "weaknesses": ["弱い点1", "弱い点2"],
    "actions": ["次の一手1", "次の一手2"]
  },
  "screenType": "post" または "account"
}

ルール:
- 数値は万・K・M単位を整数に変換する（例: 144.9万 → 1449000、1.2K → 1200）
- 取得できない項目はnullにする
- "--"はnullとして扱う
- screenTypeは投稿単体なら"post"、アカウント概要なら"account"
- 分析は日本語で、初心者にわかりやすく書く
- SNSは${sns}なのでその文脈で分析する`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: mimeType || 'image/jpeg', data: imageBase64 } }
            ]
          }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 2048 }
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return res.status(502).json({ error: 'Gemini API error', detail: err });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    return res.status(200).json(parsed);
  } catch (e) {
    return res.status(500).json({ error: 'Parse error', detail: e.message });
  }
}
