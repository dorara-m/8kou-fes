/**
 * microCMS Q&A 1件の型
 * - question: テキスト（質問）
 * - answer: リッチエディタ（HTML）
 */
export type QAItem = {
  id: string;
  question: string;
  answer: string;
  createdAt?: string;
  updatedAt?: string;
};
