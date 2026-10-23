import type { TeamItem } from "./team";

export type CaptainItem = {
  id: string;
  image?: { url: string; height?: number; width?: number };
  name?: string;
  team?: TeamItem;
  comment?: string;
  /** 大会前日に団長から団員へ送ったメッセージ画像 */
  message_image?: { url: string; height?: number; width?: number };
  x_url?: string;
  youtube_url?: string;
  /** YouTube動画のURL。団長紹介のボイス再生に使用します。 */
  voice_url?: string;
};
