# DECISIONS

## D-001: プロダクト方針
- 日付: 2026-03-31
- 決定: API連携ではなくスクショ解析型を主軸にする
- 理由: 導入ハードルを下げるため

## D-002: 初期対応SNS
- 日付: 2026-03-31
- 決定: Threads / Instagram / X
- 理由: 初期精度とユーザー層の一致

## D-003: 技術構成
- 日付: 2026-03-31
- 決定: Web + Capacitor
- 理由: 開発速度と保守性
## D-004: Threads OCRテンプレート改善
- 日付: 2026-04-03
- 決定: parseCompactNumber に小数点付き万単位対応を追加、parseThreads に「開覧」「インタラクション」「フォロワー」キーワードを追加
- 理由: 実際のThreadsインサイト画面スクショから、OCR誤読パターン（開覧）と万単位表記（144.9万）を確認
- スコア: 92/100

## D-005: OCR→数値マッピング改善（インタラクション合計フォールバック）
- 日付: 2026-04-03
- 決定: 概要画面スクショで個別値が取れない場合、interactions合計をERの分子にフォールバック
- 理由: Threadsの概要画面はいいね等の個別値が取れずインタラクション合計のみ表示される
- スコア: 93/100

## D-007: Instagramテンプレート対応
- 日付: 2026-04-03
- 決定: parseInstagram をリーチ/インプレッション/保存数等の実画面キーワードに刷新。buildAnalysis にリーチ優先フォールバック追加
- 理由: 実際の投稿インサイト・アカウント概要画面スクショからレイアウトとキーワードを確認
- スコア: 94/100

## D-008: Xテンプレート対応
- 日付: 2026-04-03
- 決定: parseX をインプレッション/エンゲージメント等の日英両対応キーワードに刷新。FIELD_DEFSにinteractions/profileVisits/follows追加
- 理由: 英語UIユーザーも多いため日英両対応必須。エンゲージメント合計をフォールバックとして活用
- スコア: 90/100
- 備考: 実機スクショでの検証が未実施。キーワード調整が必要になる可能性あり

## D-009: ブランド名変更
- 日付: 2026-04-03
- 決定: InsightMasterforAndroid → InsightMasterSnap
- 理由: WebアプリになったためAndroid限定を示す名称が不適切。スクショ解析の特徴を名前に反映

## D-010: Gemini API + Vercel構成採用
- 日付: 2026-04-03
- 決定: OCR・数値抽出・分析をGemini Vision APIに一本化。APIキーはVercel環境変数で管理
- 理由: 4画面→2画面にUXを簡略化。OCR精度の大幅向上。APIキーの安全な管理
- スコア: 89/100

## D-011: Geminiプロンプト改善・主要数値優先順位修正
- 日付: 2026-04-03
- 決定: プロンプトにステップ指示・分析ルールを追加。主要数値をMETRIC_PRIORITY順に表示
- 理由: 誤読の分析文混入・閲覧数が主要数値に出ない問題を修正
- スコア: 95/100

## D-012: Tesseract OCRテキストのGemini補正API導入
- 日付: 2026-04-04
- 決定: Tesseractの生テキストをGemini APIで補正する新規エンドポイント（api/ocr-correct.js）を追加する
- 理由: APIコストゼロ・補正はユーザーに見えない裏処理・フォールバック付きで既存動作を保証
- スコア: 87/100
- 変更ファイル: api/ocr-correct.js（新規）、web/ocr-extract.html（補正呼び出し追加）

## D-013: 旧OCRフロー廃止・Gemini Vision一本化
- 日付: 2026-04-04
- 決定: Tesseract+Gemini補正フロー（sns-select/ocr-extract/analysis-result/ocr-correct.js）を廃止し、Gemini Vision完結フローに一本化
- 理由: 導線の簡略化・OCR精度の根本解決・保守ファイル数削減
- スコア: 92/100
- 削除ファイル: web/sns-select.html, web/ocr-extract.html, web/analysis-result.html, api/ocr-correct.js

## D-014: 複数枚対応・スクショガイド・SNS別プロンプト改善
- 日付: 2026-04-04
- 決定: 複数枚画像対応（最大3枚）・SNS別スクショガイド表示・Threads/Instagram/X固有の分析ルールをプロンプトに追加
- 理由: 初心者がどの画面を撮るか迷わない・複数画面で分析精度向上・ハッシュタグ等のハルシネーション防止
- スコア: 83/100
- 変更ファイル: api/gemini.js, web/index.html, web/result.html
