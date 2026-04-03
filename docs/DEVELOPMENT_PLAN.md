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

## 次フェーズ候補（BACKLOGより）
- Instagramテンプレート対応
- Xテンプレート対応
- OCR精度改善

## MVP完了条件
- 1枚スクショ → 分析結果表示
- 修正 → 再解析
- 履歴確認可能