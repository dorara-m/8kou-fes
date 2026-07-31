import type { TeamItem } from "./team";

export type CaptainItem = {
  id: string;
  image?: { url: string; height?: number; width?: number };
  name?: string;
  team?: TeamItem;
  comment?: string;
  x_url?: string;
  youtube_url?: string;
  createdAt?: string;
};
