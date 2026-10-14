export type ResultImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** h4 で区切る小見出しごとの画像（例: 競技結果の各競技） */
export type ResultSubGroup = {
  title: string;
  images: ResultImage[];
};

/** 結果発表の見出し（h3）ごとの画像 */
export type ResultGroup = {
  title: string;
  /** "row" のとき PC で全画像を1列に並べる（MVP賞など） */
  layout?: "row";
  images?: ResultImage[];
  /** 指定するとh4で区切って表示する（images より優先） */
  subGroups?: ResultSubGroup[];
};
