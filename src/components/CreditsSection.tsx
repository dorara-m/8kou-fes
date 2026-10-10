"use client";

import { CREDITS } from "@/content/credits";
import type { CreditPerson } from "@/types/credits";

function CreditPeople({
  items,
  className = "",
}: {
  items: CreditPerson[];
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((person, i) => (
        <div key={i} className="[overflow-wrap:anywhere]">
          <p>
            {person.highlight ? (
              <span className="bg-[linear-gradient(transparent_60%,#fde047_60%)] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                {person.name}
              </span>
            ) : (
              person.name
            )}
          </p>
          {person.note && (
            <p className="text-sm text-slate-500">{person.note}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export function CreditsSection() {
  return (
    <section id="credits" className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16 pb-32">
        <h2 className="text-3xl font-bold mb-2">クレジット</h2>
        <ul className="space-y-6 mt-6 text-xl">
          {CREDITS.map((item) => (
            <li key={item.title}>
              <dl>
                <dt className="font-bold font-heading">{item.title}</dt>
                <dd className="text-slate-600 mt-2">
                  {item.items && <CreditPeople items={item.items} />}
                  {item.groups && (
                    <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
                      {item.groups.map((group) => (
                        <div key={group.title}>
                          <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
                            <span
                              className="h-5 w-1.5 shrink-0 rounded-full ring-1 ring-slate-300"
                              style={{ backgroundColor: group.color }}
                              aria-hidden
                            />
                            {group.title}
                          </h3>
                          <CreditPeople
                            items={group.items}
                            className="mt-3 text-base"
                          />
                        </div>
                      ))}
                    </div>
                  )}
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
