import type { TeamItem } from "./team";

export type PlayerItem = {
  id: string;
  icon?: { url: string; height?: number; width?: number };
  name?: string;
  youtube_url?: string;
  x_url?: string;
  team?: TeamItem;
  createdAt?: string;
};
