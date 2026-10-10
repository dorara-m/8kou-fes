"use client";

import { GAME_DETAILS } from "@/content/games";
import { useEffect, useState } from "react";
import { GameSection } from "./GameSection";

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

/** クリックでモーダル拡大できる画像（SP では拡大しない） */
function ZoomableImage({
  image,
  onSelect,
}: {
  image: TimeTableImage;
  onSelect: (image: TimeTableImage) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        // SP では拡大しない（md 未満は画像が画面幅いっぱいに表示されるため）
        if (window.matchMedia(MD_MEDIA_QUERY).matches) {
          onSelect(image);
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
  );
}

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
              <ZoomableImage image={image} onSelect={setSelectedImage} />
            </li>
          ))}
        </ul>
        <GameSection>
          {GAME_DETAILS.map((game) => (
            <div key={game.title}>
              <h3 className="rounded-lg bg-[#4052a7] px-4 py-2.5 text-xl font-bold text-white shadow-sm md:px-5 md:text-2xl">
                {game.title}
              </h3>
              {game.rules.map((rule, ruleIndex) => (
                <div key={rule.title ?? ruleIndex} className="mt-8">
                  {rule.title && (
                    <h4 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 md:text-2xl">
                      <span
                        className="h-6 w-1.5 shrink-0 rounded-full bg-[#4052a7] md:h-7"
                        aria-hidden
                      />
                      {rule.title}
                    </h4>
                  )}
                  <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {rule.images.map((image) => (
                      <li key={image.src}>
                        <p className="mb-2 text-center text-base font-bold text-slate-700 md:text-lg">
                          {image.title}
                        </p>
                        <ZoomableImage
                          image={image}
                          onSelect={setSelectedImage}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </GameSection>
      </div>
      {selectedImage && (
        // 縦長の画像もあるので、画面高さに収めず原寸幅まで広げて縦スクロールで見せる
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
