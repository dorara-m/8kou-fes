import type { TeamItem } from "./team";

export type PlayerItem = {
  id: string;
  icon?: { url: string; height?: number; width?: number };
  name?: string;
  kana?: string;
  youtube_url?: string;
  /** YouTube動画のURL。選手紹介のボイス再生に使用します。 */
  voice_url?: string;
  x_url?: string;
  team?: TeamItem;
  createdAt?: string;
  updatedAt?: string;
  /** true の場合、脱退済みメンバーとして扱う(並び替え対象外・一覧の末尾に固定表示)。 */
  withdrawn?: boolean;
};
