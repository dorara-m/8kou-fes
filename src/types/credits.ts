/**
 * microCMS クレジット1件の型
 * - term: テキスト（dtの項目名）
 * - items: リピーター（繰り返し）
 *   - name: テキスト（ddに表示する各項目）
 */
export type CreditItem = {
  id: string;
  title: string;
  items: Array<{ name: string }>;
  createdAt?: string;
};
