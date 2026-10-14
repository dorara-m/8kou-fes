"use client";

import { useEffect } from "react";

export type ZoomableImageData = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** tailwind の md ブレークポイント */
const MD_MEDIA_QUERY = "(min-width: 768px)";

/** クリックでモーダル拡大できる画像（SP では拡大しない） */
export function ZoomableImage({
  image,
  onSelect,
}: {
  image: ZoomableImageData;
  onSelect: (image: ZoomableImageData) => void;
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

/** ZoomableImage で選ばれた画像を拡大表示するモーダル（Esc・背景クリックで閉じる） */
export function ImageModal({
  image,
  onClose,
}: {
  image: ZoomableImageData;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return (
    // 縦長の画像もあるので、画面高さに収めず原寸幅まで広げて縦スクロールで見せる。
    // 画面に収まる画像は min-h-full + items-center で上下中央に置く
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${image.alt}の拡大表示`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="flex min-h-full items-center justify-center"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div className="relative w-full max-w-[1200px]">
          <img
            src={image.src}
            alt={image.alt}
            className="h-auto w-full rounded-sm shadow-2xl"
            width={image.width}
            height={image.height}
          />
          <button
            type="button"
            autoFocus
            onClick={() => onClose()}
            className="absolute -right-2 -top-2 grid h-10 w-10 place-items-center rounded-full bg-white text-2xl leading-none text-slate-900 shadow-lg transition hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="モーダルを閉じる"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
