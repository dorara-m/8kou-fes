/**
 * microCMS 運営メンバー1件の型
 * - image: 画像（microCMS 画像フィールド）
 * - image2: 画像（microCMS 画像フィールド）
 * - name: テキスト（名前）
 * - comment: テキストエリア（コメント）
 * - x_url: テキスト（X (Twitter) URL）
 * - youtube_url: テキスト（YouTube URL）
 * - voice_url: テキスト（ボイス再生用YouTube URL）
 */
export type StaffItem = {
  id: string;
  image?: { url: string; height?: number; width?: number };
  image2?: { url: string; height?: number; width?: number };
  name?: string;
  comment?: string;
  x_url?: string;
  youtube_url?: string;
  voice_url?: string;
  createdAt?: string;
};
