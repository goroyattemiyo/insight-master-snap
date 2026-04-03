export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, sns } = req.body;
  if (!text || !sns) {
    return res.status(400).json({ error: 'text and sns are required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const prompt = `以下はSNSインサイト画面をOCRで読み取った生テキストです。
対象SNS: ${sns}

【補正ルール】
- 数字として読まれるべき箇所の誤読を修正する（例: O→0、l→1、B→8）
- ラベルの誤読を修正する（例: 開覧→閲覧、聞覧→閲覧、インタ一クション→インタラクション）
- 数値の単位表記を統一する（例: 万・K・M はそのまま残す）
- ラベルと数値の順序はそのまま保つ
- SNS固有のラベル（${sns}のインサイト画面に出るもの）以外の文字列は削除してよい
- 補正後のテキストのみ返す。説明・前置き・記号は一切含めない

【生テキスト】
${text}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 1024
          }
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error('Gemini OCR correct error:', err);
      // フォールバック: 生テキストをそのまま返す
      return res.status(200).json({ corrected: text, fallback: true });
    }

    const data = await response.json();
    const corrected = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!corrected) {
      return res.status(200).json({ corrected: text, fallback: true });
    }

    return res.status(200).json({ corrected, fallback: false });

  } catch (e) {
    console.error('OCR correct fetch error:', e);
    // フォールバック: 生テキストをそのまま返す
    return res.status(200).json({ corrected: text, fallback: true });
  }
}
