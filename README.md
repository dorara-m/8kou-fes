# 8ko FES サイト

VTuberイベント用のウェブサイトです。

## 骨子（概要）

### コンテンツ構成

すべてのコンテンツは `src/content/` 配下のTypeScriptファイルで管理します（CMSは使用しません）。

| コンテンツ | 説明 | 管理場所 |
|-----------|------|-------------------|
| **団長紹介** | チームを率いる団長一覧 | `src/content/captains.ts` の `CAPTAINS` |
| **選手紹介** | 参加選手一覧 | `src/content/players.ts` の `PLAYERS` |
| **チーム** | 8チームの名称・カラー | `src/content/teams.ts` の `TEAMS` |
| **FAN ART** | 応援イラスト一覧 | `src/content/fanArt.ts` の `FAN_ART` |
| **運営紹介** | 運営メンバー紹介 | `src/content/staff.ts` の `STAFF` |
| **競技紹介** | 確定競技・候補競技の一覧 | `src/content/games.ts` |
| **クリエイター紹介** | 制作関係者の紹介 | `src/content/creators.ts` の `CREATORS` |
| **クレジット** | 主催・出演者等のクレジット一覧 | `src/content/credits.ts` の `CREDITS` |

画像はすべて `public/images/<カテゴリ>/` 配下に配置し、各コンテンツから `/images/...` のパスで参照します。

### 技術スタック

- **フロント**: Next.js (App Router) + TypeScript
- **スタイル**: Tailwind CSS
- コンテンツはビルド時に静的にバンドルされるTypeScriptファイルとして管理（外部CMS・API通信なし）

### ディレクトリ構成

```
code/
├── README.md                 # 本ドキュメント
├── package.json
├── public/
│   └── images/
│       ├── captain/           # 団長の画像
│       ├── player/            # 選手のアイコン画像
│       ├── staff/             # 運営メンバーの画像
│       └── fan-art/           # ファンアート画像
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # 共通レイアウト
│   │   ├── page.tsx          # トップページ
│   │   └── globals.css       # グローバルスタイル
│   ├── components/           # UIコンポーネント
│   ├── content/               # コンテンツ本体（データの実体）
│   │   ├── teams.ts           # チーム一覧
│   │   ├── captains.ts        # 団長一覧
│   │   ├── players.ts         # 選手一覧
│   │   ├── staff.ts           # 運営メンバー一覧
│   │   ├── fanArt.ts          # ファンアート一覧
│   │   ├── games.ts           # 競技紹介
│   │   ├── creators.ts        # クリエイター紹介
│   │   └── credits.ts         # クレジット
│   └── types/                 # コンテンツ型
└── (env変数は不要)
```

### コンテンツ管理の考え方

- 団長・選手・運営メンバー・ファンアートは、以前はmicroCMSからビルド時に取得していましたが、通信量制限の問題を避けるため `src/content/*.ts` に静的データとして直接記述する方式に移行しました
- 新しいメンバーを追加する場合は、該当する `src/content/*.ts` の配列に項目を追記し、画像は `public/images/<カテゴリ>/` に配置してパスを指定してください
- チーム情報は `src/content/teams.ts` の `TEAMS` に一元管理し、団長・選手データからは `getTeam(teamId)` で参照します（チーム情報を各人ごとに重複して持たせない）
- 選手紹介の「更新順」ソートは各選手データの `updatedAt` を参照します。選手情報を更新した際は、その値も更新してください
- 選手カードやボタンから動画プレイヤーをモーダルで開く「ボイス再生」機能を使う場合は、対象データの `voice_url` にYouTubeの動画URLを設定してください
- 競技紹介・クリエイター紹介・クレジットは元々CMSを使わず `src/content/games.ts`・`src/content/creators.ts`・`src/content/credits.ts` で管理していたもので、変更はありません

### 開発の進め方

1. このリポジトリをクローン後、`npm install`
2. `npm run dev` で開発サーバー起動（環境変数の設定は不要です）

---

## セットアップ

```bash
npm install
npm run dev
```

## スクリプト

- `npm run dev` - 開発サーバー
- `npm run build` - 本番ビルド
- `npm run start` - 本番サーバー起動
- `npm run lint` - ESLint
