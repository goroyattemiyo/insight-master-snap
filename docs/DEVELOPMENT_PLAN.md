# DEVELOPMENT PLAN

## 現在フェーズ
MVP設計完了 → 実装準備

## 直近タスク
- [x] プロジェクト構成作成（web / android）
- [x] スクショ選択機能
- [x] SNS選択UI
- [x] OCR基盤選定（Tesseract.js / jpnモード / PSM6）
- [x] 数値抽出ロジック（Threads優先・次行対応）
- [x] 結果画面UI（結論/良い点/弱い点/次の一手）
- [x] 数値修正UI
- [x] 履歴保存（localStorage・履歴画面追加）
- [x] HTMLページ遷移をつなぐ
      index.html → sns-select.html → ocr-extract.html → analysis-result.html

## Next Steps
1. ~~Threads用テンプレート作成~~ ✅ 2026-04-03
2. ~~OCR→数値マッピング~~ ✅ 2026-04-03
3. ~~分析ロジック（ルールベース）~~ ✅ 2026-04-03

## 完了 2026-04-03（第2セッション）
- ブランド名 InsightMasterSnap に変更
- Gemini Vision API + Vercel構成に移行
- 4画面→2画面にUX簡略化
- index.html にSNS選択を統合
- result.html 新規作成（Gemini結果表示）

## 次フェーズ候補（BACKLOGより）
- ~~Instagramテンプレート対応~~ ✅ 2026-04-03
- ~~Xテンプレート対応~~ ✅ 2026-04-03
- OCR精度改善（Gemini Vision検討、MVP完了後）

## MVP完了条件
- 1枚スクショ → 分析結果表示
- 修正 → 再解析
- 履歴確認可能
## 完了 2026-04-04
- 旧OCRフロー（Tesseract+Gemini補正）廃止
- Gemini Vision一本化（index.html → result.html の2画面構成に統一）
- 不要ファイル4件削除

## 完了 2026-04-08
- SNS別数値表示優先順位修正
- 分析中ナビ無効化
- 次の一手カード表示・例文フォーマット（【アクション】【例文】形式）
- 読み取り数値を全件表示・分析使用バッジ
- サムネイル拡大表示（ライトボックス）
- スクショガイドをSVGモック+ステップテキスト+必要数値チップに刷新
- 画面種別自動判定・unsupported時のフィードバック
- 履歴保存データ拡張（metrics・screenType・strengths・weaknesses・actions）
- 万単位変換バグ修正（1万=10,000の明示）

## 次フェーズ（優先順位順）
1. 傾向分析レポート（履歴5件以上で解放・history.htmlにインライン表示）
2. 週間レポート（7日分で解放）
3. プログレス表示（あと○件カウントダウン）
4. SNS自動判定フェーズ2（SNS選択UI削除）

