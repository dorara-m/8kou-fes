# 8ko FES サイト

VTuberイベント用のウェブサイトです。スケジュール・応援イラストギャラリー・クレジットを掲載し、microCMSでコンテンツを更新できます。

## 骨子（概要）

### コンテンツ構成

| コンテンツ | 説明 | CMSで管理する項目 |
|-----------|------|-------------------|
| **Q&A** | よくある質問 | 質問（question）、回答（answer） |
| **スケジュール** | 未定 |
| **ギャラリー** | 応援イラスト一覧 | 画像、リンク、クリエイター名 |
| **運営紹介** | 運営メンバー紹介 | 画像、名前、コメント、X URL、YouTube URL |
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
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # 共通レイアウト
│   │   ├── page.tsx          # トップ（スケジュール・ギャラリー・クレジットはセクション）
│   │   ├── globals.css       # グローバルスタイル
│   │   └── api/
│   │       ├── gallery/      # ギャラリーAPI（microCMS取得）
│   │       │   └── route.ts
│   │       ├── qa/           # Q&A API（microCMS取得）
│   │       │   └── route.ts
│   │       ├── staff/        # 運営紹介API（microCMS取得）
│   │       │   └── route.ts
│   │       └── credit/       # クレジットAPI（microCMS取得）
│   │           └── route.ts
│   ├── components/           # UIコンポーネント
│   │   └── Header.tsx
│   ├── lib/                  # ユーティリティ・CMS取得
│   │   └── microcms.ts       # microCMS リストAPI取得
│   └── types/                # コンテンツ型
│       ├── gallery.ts        # ギャラリー項目の型
│       ├── qa.ts             # Q&A項目の型
│       ├── staff.ts         # 運営メンバー項目の型
│       └── credits.ts        # クレジット項目の型
└── .env.example              # microCMS用環境変数例
```

### CMS連携の考え方

- **microCMS** を利用。`src/lib/microcms.ts` でリストAPIを取得
- 環境変数 `NEXT_PUBLIC_CMS_API_URL`・`NEXT_PUBLIC_CMS_API_KEY` で接続先を指定
- ギャラリーは `GET /api/gallery` 経由で取得。microCMSのエンドポイント名は `gallery`（`src/app/api/gallery/route.ts` で変更可能）
- Q&Aは `GET /api/qa` 経由で取得。microCMSでAPI `qa` を作成し、フィールド `question`（テキスト）と `answer`（テキストエリア）を設定
- 運営紹介は `GET /api/staff` 経由で取得。microCMSでAPI `staff` を作成し、フィールド `image`（画像）、`name`（テキスト）、`comment`（テキストエリア）、`x_url`（テキスト）、`youtube_url`（テキスト）を設定
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
