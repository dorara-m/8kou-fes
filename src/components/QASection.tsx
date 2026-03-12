"use client";

import { useState } from "react";
import type { QAItem } from "@/types/qa";

type QASectionProps = {
  items: QAItem[];
  error: string | null;
};

export function QASection({ items, error }: QASectionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="qa" className="bg-slate-100 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Q&A</h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <ul className="space-y-0">
          {items.map((item) => {
            const isOpen = openIds.has(item.id);
            return (
              <li key={item.id} className="border-b border-slate-200">
                <dl>
                  <dt>
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      className="w-full flex items-center justify-between gap-3 py-4 md:py-6 text-left text-lg md:text-xl font-bold text-slate-900 hover:bg-slate-200/50 transition-colors"
                    >
                      <span>Q. {item.question}</span>
                      <span
                        className={`shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          className="w-5 h-5 text-slate-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </button>
                  </dt>
                  <dd
                    className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="text-md py-4 px-6 whitespace-pre-wrap [&_p]:mb-2 [&_p:last-child]:mb-0 [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-slate-800 [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_li]:my-0.5">
                      {item.answer ? (
                        <span dangerouslySetInnerHTML={{ __html: item.answer }} />
                      ) : (
                        <span className="text-slate-400">（未入力）</span>
                      )}
                      </div>
                    </div>
                  </dd>
                </dl>
              </li>
            );
          })}
        </ul>
        {!error && items.length === 0 && (
          <p className="text-slate-500 text-sm mt-6">まだ登録がありません</p>
        )}
      </div>
    </section>
  );
}
