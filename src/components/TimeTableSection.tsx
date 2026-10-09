"use client";

import { useEffect, useState } from "react";

type TimeTableImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const TIME_TABLE_IMAGES: TimeTableImage[] = [
  {
    src: "/timetable1.jpeg",
    alt: "タイムテーブル 1",
    width: 1200,
    height: 1350,
  },
  {
    src: "/timetable2.jpeg",
    alt: "タイムテーブル 2",
    width: 1200,
    height: 1350,
  },
];

/** tailwind の md ブレークポイント */
const MD_MEDIA_QUERY = "(min-width: 768px)";

export function TimeTableSection() {
  const [selectedImage, setSelectedImage] = useState<TimeTableImage | null>(
    null,
  );

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    const originalOverflow = document.body.style.overflow;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedImage]);

  return (
    <section id="time-table" className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">タイムテーブル</h2>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TIME_TABLE_IMAGES.map((image) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => {
                  // SP では拡大しない（md 未満は画像が画面幅いっぱいに表示されるため）
                  if (window.matchMedia(MD_MEDIA_QUERY).matches) {
                    setSelectedImage(image);
                  }
                }}
                className="group relative block w-full cursor-default overflow-hidden rounded-lg border border-slate-200 md:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                aria-label={`${image.alt}を拡大表示`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-auto w-full transition-[filter] duration-200 md:group-hover:brightness-95"
                  width={image.width}
                  height={image.height}
                />
                <span
                  className="absolute bottom-3 right-3 hidden h-10 w-10 place-items-center rounded-full bg-slate-900/75 text-white shadow-lg transition group-hover:bg-slate-900 md:grid"
                  aria-hidden
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                    <path d="M11 8v6" />
                    <path d="M8 11h6" />
                  </svg>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedImage && (
        // 縦長の画像なので、画面高さに収めず原寸幅まで広げて縦スクロールで見せる
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedImage.alt}の拡大表示`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedImage(null);
          }}
        >
          <div className="relative mx-auto max-w-[1200px]">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="h-auto w-full rounded-sm shadow-2xl"
              width={selectedImage.width}
              height={selectedImage.height}
            />
            <button
              type="button"
              autoFocus
              onClick={() => setSelectedImage(null)}
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
