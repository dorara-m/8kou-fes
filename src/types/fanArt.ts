export type FanArtItem = {
  id: string;
  image?: { url: string; height?: number; width?: number };
  url?: string;
  title?: string;
};

export type FanArtListResponse = {
  contents: FanArtItem[];
  totalCount: number;
  offset: number;
  limit: number;
};
