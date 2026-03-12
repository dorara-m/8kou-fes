"use client";

import type { CreditItem } from "@/types/credits";

type CreditsSectionProps = {
  items: CreditItem[];
  error: string | null;
};

export function CreditsSection({ items, error }: CreditsSectionProps) {
  const sortedItems = [...items].sort(
    (a, b) =>
      new Date(a.createdAt ?? 0).getTime() -
      new Date(b.createdAt ?? 0).getTime()
  );

  return (
    <section id="credits" className="border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-16 pb-32">
        <h2 className="text-3xl font-bold mb-2">CREDITS</h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <ul className="space-y-6 mt-6 text-center text-xl">
          {sortedItems.map((item) => (
            <li key={item.id}>
              <dl>
                <dt className="font-bold">{item.title}</dt>
                <dd className="text-slate-600">
                  {item.items?.map((inner, i) => (
                    <p key={i}>{inner.name}</p>
                  ))}
                </dd>
              </dl>
            </li>
          ))}
        </ul>
        {!error && items.length === 0 && (
          <p className="text-slate-500 text-sm mt-6">まだ登録がありません</p>
        )}
      </div>
    </section>
  );
}
