/**
 * microCMS 運営メンバー1件の型
 * - image: 画像（microCMS 画像フィールド）
 * - name: テキスト（名前）
 * - comment: テキストエリア（コメント）
 * - x_url: テキスト（X (Twitter) URL）
 * - youtube_url: テキスト（YouTube URL）
 */
export type StaffItem = {
  id: string;
  image?: { url: string; height?: number; width?: number };
  name?: string;
  comment?: string;
  x_url?: string;
  youtube_url?: string;
  createdAt?: string;
};
