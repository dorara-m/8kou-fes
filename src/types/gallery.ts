export type GalleryItem = {
  id: string;
  image?: { url: string; height?: number; width?: number };
  url?: string;
  title?: string;
};

export type GalleryListResponse = {
  contents: GalleryItem[];
  totalCount: number;
  offset: number;
  limit: number;
};
