"use client";

import type { StaffItem } from "@/types/staff";

type StaffSectionProps = {
  items: StaffItem[];
  error: string | null;
};

export function StaffSection({ items, error }: StaffSectionProps) {
  return (
    <section id="staff" className="border-t border-slate-200 bg-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Staff</h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col items-center text-center rounded-lg p-6 bg-slate-50 border border-slate-200"
            >
              {item.image && (
                <div className="w-40 h-40 rounded-full overflow-hidden shrink-0 mb-4 border-2 border-slate-200">
                  <img
                    src={item.image.url}
                    alt={item.name ?? ""}
                    className="w-full h-full object-cover"
                    width={item.image.width}
                    height={item.image.height}
                  />
                </div>
              )}
              <h3 className="text-xl font-bold mb-2 text-slate-900">
                {item.name ?? "（名前未登録）"}
              </h3>
              {item.comment && (
                <p className="text-slate-600 whitespace-pre-wrap text-sm mb-4">
                  {item.comment}
                </p>
              )}
              {(item.x_url || item.youtube_url) && (
                <div className="flex gap-3 justify-center">
                  {item.x_url && (
                    <a
                      href={item.x_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
                      aria-label="X"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                  {item.youtube_url && (
                    <a
                      href={item.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-600 hover:text-red-600 transition-colors"
                      aria-label="YouTube"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
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
