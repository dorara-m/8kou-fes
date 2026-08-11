# 8ko FES サイト

VTuberイベント用のウェブサイトです。

## 骨子（概要）

### コンテンツ構成

| コンテンツ | 説明 | CMSで管理する項目 |
|-----------|------|-------------------|
| **Q&A** | よくある質問 | 質問（question）、回答（answer） |
| **スケジュール** | 未定 |
| **FAN ART** | 応援イラスト一覧 | 画像、リンク、クリエイター名 |
| **競技紹介** | 確定競技・候補競技の一覧 | CMSなし（`src/content/games.ts` で管理） |
| **運営紹介** | 運営メンバー紹介 | 画像、名前、コメント、X URL、YouTube URL |
| **クリエイター紹介** | 制作関係者の紹介 | CMSなし（`src/content/creators.ts` で管理） |
| **クレジット** | 主催・出演者等のクレジット一覧 | 項目名（dt）、各項目のリスト（dd） |

### 技術スタック

- **フロント**: Next.js (App Router) + TypeScript
- **スタイル**: Tailwind CSS
- **ヘッドレスCMS**: MicroCMS

### ディレクトリ構成

```
code/
├── README.md                 # 本ドキュメント
├── package.json
├── public/
│   └── data/
│       └── fan-art.json      # ビルド時に生成するFAN ARTデータ
├── scripts/
│   └── generate-static-data.mjs # 静的JSON生成
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # 共通レイアウト
│   │   ├── page.tsx          # トップ（スケジュール・ギャラリー・クレジットはセクション）
│   │   ├── globals.css       # グローバルスタイル
│   │   └── api/
│   │       ├── qa/           # Q&A API（microCMS取得）
│   │       │   └── route.ts
│   │       └── credit/       # クレジットAPI（microCMS取得）
│   │           └── route.ts
│   ├── components/           # UIコンポーネント
│   │   └── Header.tsx
│   ├── lib/                  # ユーティリティ・CMS取得
│   │   └── microcms.ts       # microCMS リストAPI取得
│   └── types/                # コンテンツ型
│       ├── fanArt.ts         # FAN ART項目の型
│       ├── qa.ts             # Q&A項目の型
│       ├── staff.ts         # 運営メンバー項目の型
│       └── credits.ts        # クレジット項目の型
└── .env.example              # microCMS用環境変数例
```

### CMS連携の考え方

- **microCMS** を利用。`src/lib/microcms.ts` でリストAPIを取得
- 環境変数 `NEXT_PUBLIC_CMS_API_URL`・`NEXT_PUBLIC_CMS_API_KEY` で接続先を指定
- FAN ART・団長・選手・実行委員はビルド時にmicroCMSから `public/data/*.json` を生成し、公開後は静的JSONを取得。`npm run generate:static-data` で手動更新できます。
- 静的JSONを自動更新するには、各APIのmicroCMS WebhookにホスティングサービスのDeploy Hookを設定してください。Webhookを受けたデプロイ時に `prebuild` がJSONを再生成します。
- Q&Aは `GET /api/qa` 経由で取得。microCMSでAPI `qa` を作成し、フィールド `question`（テキスト）と `answer`（テキストエリア）を設定
- 競技紹介はCMSを使わず、`src/content/games.ts` の `CONFIRMED_GAMES`（確定競技）と `CANDIDATE_GAMES`（候補競技）で管理
- 運営紹介は静的JSONから取得。microCMSでAPI `staff` を作成し、フィールド `image`（画像）、`image2`（画像）、`name`（テキスト）、`comment`（テキストエリア）、`x_url`（テキスト）、`youtube_url`（テキスト）を設定
- 選手紹介は静的JSONから取得。ボイスを表示する場合は、フィールド `voice_url`（テキスト）にYouTubeの動画URLを設定。選手カードのボタンから動画プレイヤーがモーダルで開きます
- 団長紹介も静的JSONから取得。`captain` APIの `voice_url`（テキスト）へYouTubeの動画URLを設定するとボイス再生ボタンを表示します
- 実行委員紹介も同様に、`staff` APIの `voice_url`（テキスト）へYouTubeの動画URLを設定するとボイス再生ボタンを表示します
- クリエイター紹介はCMSを使わず、`src/content/creators.ts` の `CREATORS` で管理
- クレジットは `GET /api/credit` 経由で取得。microCMSでAPI `credit` を作成し、フィールド `term`（テキスト）と `items`（リピーター、中に `name` テキスト）を設定

### 開発の進め方

1. このリポジトリをクローン後、`npm install`
2. `.env.local` に microCMS の API URL・キーを設定（`.env.example` を参考に）
3. `npm run dev` で開発サーバー起動

---

## セットアップ

```bash
npm install
cp .env.example .env.local
# .env.local を編集してCMSの設定を記入
npm run dev
```

## スクリプト

- `npm run dev` - 開発サーバー
- `npm run build` - 本番ビルド
- `npm run start` - 本番サーバー起動
- `npm run lint` - ESLint
