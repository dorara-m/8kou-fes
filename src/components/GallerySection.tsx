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
        <h2 className="text-3xl font-bold mb-6">GALLERY</h2>
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
            return (
              <li key={item.id}>
                <Wrapper
                  {...wrapperProps}
                  className="block rounded-lg overflow-hidden border border-slate-200 bg-white hover:border-slate-400 transition-colors"
                >
                  {item.image?.url ? (
                    <img
                      src={item.image.url}
                      alt={item.title || "ギャラリー"}
                      className="w-full aspect-video object-cover"
                      width={item.image.width}
                      height={item.image.height}
                    />
                  ) : (
                    <div className="w-full aspect-video bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                      画像なし
                    </div>
                  )}
                  {item.title && (
                    <p className="p-2 text-sm font-medium text-slate-700 truncate">
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
