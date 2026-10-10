export type GameDetailImage = {
  /** 画像の上に表示するタイトル（例: 「トーナメント表」「出場選手」） */
  title: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** ルールごとの画像（例: ナワバリバトル） */
export type GameRule = {
  /** h4 として表示する。分ける必要がないゲームは省略する */
  title?: string;
  images: GameDetailImage[];
};

/** 競技ごとのトーナメント表・出場選手などの画像 */
export type GameDetail = {
  title: string;
  rules: GameRule[];
};
