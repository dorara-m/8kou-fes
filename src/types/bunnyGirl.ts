export type BunnyImage = {
  url: string;
  width?: number;
  height?: number;
  /** イラストの作者（「photo by 〇〇」として表示） */
  author?: { name: string; xUrl?: string };
};

export type BunnyGirlItem = {
  id: string;
  name: string;
  role: "選手" | "団長" | "実行委員" | "クリエイター";
  /** 本サイトで使用しているアイコン画像 */
  icon?: string;
  /** バニーガールのイラスト（1人に複数枚可。枚数分の兎ボタンが並ぶ） */
  bunnyImages: BunnyImage[];
};
