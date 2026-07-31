"use client";

import { CREDITS } from "@/content/credits";

export function CreditsSection() {
  return (
    <section id="credits" className="border-t border-slate-200 bg-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-16 pb-32">
        <h2 className="text-3xl font-bold mb-2">クレジット</h2>
        <ul className="space-y-6 mt-6 text-xl">
          {CREDITS.map((item) => (
            <li key={item.title}>
              <dl>
                <dt className="font-bold font-heading">{item.title}</dt>
                <dd className="text-slate-600 mt-2">
                  {item.items.map((inner, i) => (
                    <p key={i}>{inner.name}</p>
                  ))}
                </dd>
              </dl>
            </li>
          ))}
        </ul>
        {CREDITS.length === 0 && (
          <p className="text-slate-500 text-sm mt-6">まだ登録がありません</p>
        )}
      </div>
    </section>
  );
}
