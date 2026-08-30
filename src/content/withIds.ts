/** 配列の並び順から連番の id を自動採番する。id を手書きする必要をなくすためのヘルパー。 */
export function withIds<T>(items: T[]): (T & { id: string })[] {
  return items.map((item, index) => ({ id: String(index), ...item }));
}
