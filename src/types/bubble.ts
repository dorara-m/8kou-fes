/** TOP の泡に表示する人物 */
export type BubbleItem = {
  id: string;
  iconUrl: string;
  name: string;
  /** クリック時にスクロールするセクションの id */
  sectionId: string;
  /** 指定時、選手一覧をこのチームで絞り込む */
  teamSlug?: string;
};
