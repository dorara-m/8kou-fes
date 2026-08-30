export type StaffItem = {
  id: string;
  image?: { url: string; height?: number; width?: number };
  image2?: { url: string; height?: number; width?: number };
  name?: string;
  comment?: string;
  x_url?: string;
  youtube_url?: string;
  /** YouTube動画のURL。実行委員紹介のボイス再生に使用します。 */
  voice_url?: string;
};
