"use client";

import type { FanArtItem } from "@/types/fanArt";
import { useEffect, useState } from "react";

type FanArtSectionProps = {
  items: FanArtItem[];
};

function formatArtistName(title?: string) {
  const artistName = title?.trim();
  return artistName ? `${artistName} さん` : "ファンアート";
}

export function FanArtSection({ items }: FanArtSectionProps) {
  const [selectedItem, setSelectedItem] = useState<FanArtItem | null>(null);

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedItem(null);
    };

    const originalOverflow = document.body.style.overflow;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedItem]);

  return (
    <section id="fan-art" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            ファンアート
            <span className="text-lg text-slate-600">
              #八煌掲示板
            </span>
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            みなさんから届いた素敵な作品
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-1 overflow-hidden rounded-sm sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => {
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => item.image && setSelectedItem(item)}
                  disabled={!item.image}
                  className="group relative block aspect-square w-full overflow-hidden bg-slate-100 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-inset disabled:cursor-default"
                  aria-label={
                    `${formatArtistName(item.title)}を拡大表示`
                  }
                >
                  {item.image && (
                    <img
                      src={item.image.url}
                      alt={formatArtistName(item.title)}
                      className="h-full w-full object-contain transition-[filter] duration-200 group-hover:brightness-95 group-focus:brightness-95"
                      width={item.image.width}
                      height={item.image.height}
                    />
                  )}
                  {!item.image && (
                    <span className="grid h-full place-items-center px-4 text-center text-sm text-slate-500">
                      {formatArtistName(item.title)}
                    </span>
                  )}
                  {item.title && (
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-3 pb-3 pt-10 text-sm font-medium text-white opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus:opacity-100">
                      <span className="block truncate">
                        {formatArtistName(item.title)}
                      </span>
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        {items.length === 0 && (
          <p className="mt-6 text-sm text-slate-500">まだアイテムがありません</p>
        )}
      </div>
      {selectedItem?.image && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${formatArtistName(selectedItem.title)}の拡大表示`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedItem(null);
          }}
        >
          <div className="relative flex max-h-full max-w-full flex-col items-center">
            <img
              src={selectedItem.image.url}
              alt={formatArtistName(selectedItem.title)}
              className="max-h-[calc(100vh-8rem)] max-w-full rounded-sm object-contain shadow-2xl"
              width={selectedItem.image.width}
              height={selectedItem.image.height}
            />
            <div className="mt-3 flex w-full items-center justify-between gap-4 text-sm text-white">
              <p className="min-w-0 truncate font-medium">
                {formatArtistName(selectedItem.title)}
              </p>
              {selectedItem.url && (
                <a
                  href={selectedItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  投稿を見る
                </a>
              )}
            </div>
            <button
              type="button"
              autoFocus
              onClick={() => setSelectedItem(null)}
              className="absolute -right-2 -top-2 grid h-10 w-10 place-items-center rounded-full bg-white text-2xl leading-none text-slate-900 shadow-lg transition hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="モーダルを閉じる"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
