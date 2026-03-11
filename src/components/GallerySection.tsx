"use client";

import type { GalleryItem } from "@/types/gallery";

type GallerySectionProps = {
  items: GalleryItem[];
  error: string | null;
};

export function GallerySection({ items, error }: GallerySectionProps) {
  return (
    <section id="gallery" className="border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6">ART BOARD</h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {items.map((item) => {
            const Wrapper = item.url ? "a" : "div";
            const wrapperProps = item.url
              ? {
                  href: item.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};
            const wrapperClassName = item.url
              ? "block rounded-lg overflow-hidden border-2 border-slate-200 bg-white transition-all duration-200 hover:border-slate-400 hover:shadow-lg hover:shadow-slate-300 hover:scale-[1.02] group cursor-pointer"
              : "block rounded-lg overflow-hidden border border-slate-200 bg-white";
            return (
              <li key={item.id}>
                <Wrapper {...wrapperProps} className={wrapperClassName}>
                  {item.image && (
                    <img
                      src={item.image.url}
                      alt={item.title || ""}
                      className={`w-full aspect-video object-contain ${item.url ? "group-hover:brightness-110 transition-[filter] duration-200" : ""}`}
                      width={item.image.width}
                      height={item.image.height}
                    />
                  )}
                  {item.title && (
                    <p className="p-2 text-md font-medium text-slate-700 truncate">
                      {item.title}
                    </p>
                  )}
                </Wrapper>
              </li>
            );
          })}
        </ul>
        {!error && items.length === 0 && (
          <p className="text-slate-500 text-sm">まだアイテムがありません</p>
        )}
      </div>
    </section>
  );
}
