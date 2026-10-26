import type { StreamItem } from "@/types/stream";
import { withIds } from "./withIds";

/** 本配信のYouTube枠。url が未設定の枠は「配信準備中」と表示されます。 */
export const STREAMS: StreamItem[] = withIds<Omit<StreamItem, "id">>([
  { url: "https://www.youtube.com/live/glHdOfoQ3uM?si=vtgixCDX8fW2FUhB", title: "10:00〜 開会式" },
  { url: "https://www.youtube.com/live/05r-wP66a9s?si=f5IS4Sen9yWchq5O", title: "11:00〜 スプラトゥーン3" },
  { url: "https://www.youtube.com/live/-DN9moMMnuU?si=6zwizfpHRYeDlJhW", title: "15:00〜 マリオカート8DX" },
  { url: "https://www.youtube.com/live/99GtmKdNVeI?si=o_jMs5hn5MEgUjsn", title: "18:00〜 ファーストペンギン" },
  { url: "https://www.youtube.com/live/3u-ReiJaYD8?si=8CofmKV_b4EHoWF7", title: "20:00〜 テトリス99" },
  { url: "https://www.youtube.com/live/6MiiKFuKkYs?si=paye3Ard3cMXfJjH", title: "21:30〜 クイズ" },
  { url: "https://www.youtube.com/live/e3HKmk2saEE?si=gDfdhN8DZM0lFYz4", title: "23:00〜 閉会式" },
]);

/** 本配信の下に並べる前夜祭の配信。url が未設定の枠は「配信準備中」と表示されます。 */
export const PRE_PARTY_STREAMS: StreamItem[] = withIds<Omit<StreamItem, "id">>([
  { url: "https://www.youtube.com/live/6WYbqlzZfmI?si=OLXQK5cnIvVubT8x", title: "前夜祭" },
]);

/**
 * 前夜祭の下に並べる後夜祭歌枠リレーのプレイリスト。
 * url は「プレイリストの1本目の動画 + list」の形式（サムネイルに1本目の動画を使うため）。
 */
export const AFTER_PARTY_PLAYLISTS: StreamItem[] = withIds<Omit<StreamItem, "id">>([
  { url: "https://www.youtube.com/watch?v=uUCYxbCSmFA&list=PLHOMRMOzHElk", title: "DAY1" },
  { url: "https://www.youtube.com/watch?v=ztpgpBmPohE&list=PLc_tK9geJ8PA", title: "DAY2" },
]);

/** 実行委員会アフターミーティングの配信。空の間は「COMING SOON」を表示する */
export const AFTER_MEETING_STREAMS: StreamItem[] = withIds<Omit<StreamItem, "id">>([
  // { url: "https://www.youtube.com/watch?v=..." },
]);
