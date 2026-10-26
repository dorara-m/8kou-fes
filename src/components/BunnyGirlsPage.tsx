"use client";

import { BUNNY_GIRLS } from "@/content/bunnyGirls";
import type { BunnyGirlItem, BunnyImage } from "@/types/bunnyGirl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/** モーダルで1枚ずつ送るためのイラスト単位の一覧 */
type BunnySlide = { item: BunnyGirlItem; image: BunnyImage };

const SLIDES: BunnySlide[] = BUNNY_GIRLS.flatMap((item) =>
  item.bunnyImages.map((image) => ({ item, image })),
);

/** 各メンバーの1枚目が SLIDES の何番目か */
const SLIDE_START_INDEXES = BUNNY_GIRLS.map((_, index) =>
  BUNNY_GIRLS.slice(0, index).reduce(
    (sum, item) => sum + item.bunnyImages.length,
    0,
  ),
);

/** メンバーが順にふわっと出てくる間隔（秒） */
const CARD_FADE_IN_STAGGER_S = 0.12;

/** スワイプとみなす横移動量(px) */
const SWIPE_THRESHOLD = 50;

function BunnyGirlCard({
  item,
  order,
  onOpen,
}: {
  item: BunnyGirlItem;
  /** 表示アニメーションの順番 */
  order: number;
  /** imageIndex: そのメンバーの何枚目か */
  onOpen: (imageIndex: number) => void;
}) {
  const hasMultiple = item.bunnyImages.length > 1;

  return (
    <li
      className="flex flex-col items-center opacity-0 animate-bunny-float-up motion-reduce:animate-none motion-reduce:opacity-100"
      style={{ animationDelay: `${order * CARD_FADE_IN_STAGGER_S}s` }}
    >
      <div className="relative mb-3">
        {item.icon ? (
          <div className="h-32 w-32 overflow-hidden rounded-full bg-white ring-2 ring-white/20">
            <img
              src={item.icon}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-32 w-32 rounded-full bg-white/10" aria-hidden />
        )}
        <div className="absolute -bottom-1 -right-1 flex flex-col gap-1">
          {item.bunnyImages.map((image, imageIndex) => (
            <button
              key={image.url}
              type="button"
              onClick={() => onOpen(imageIndex)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black text-xl shadow-[0_0_12px_rgba(255,255,255,0.25)] transition hover:scale-110 hover:bg-[#d87bae] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d87bae] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label={`${item.name}のバニーガールイラストを見る${
                hasMultiple ? `（${imageIndex + 1}枚目）` : ""
              }`}
            >
              <span aria-hidden>🐰</span>
            </button>
          ))}
        </div>
      </div>
      <span className="mb-1 rounded-full border border-white/30 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-white/80">
        {item.role}
      </span>
      <h2 className="text-center text-base font-bold leading-tight">
        {item.name}
      </h2>
    </li>
  );
}

/** バニーガールイラストのモーダル（←→・スワイプで切り替え、Esc・背景クリックで閉じる） */
function BunnyGirlModal({
  items,
  index,
  onChangeIndex,
  onClose,
}: {
  items: BunnySlide[];
  index: number;
  onChangeIndex: (index: number) => void;
  onClose: () => void;
}) {
  const slide = items[index];
  const touchStartX = useRef<number | null>(null);
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  const showPrev = () => onChangeIndex((index - 1 + items.length) % items.length);
  const showNext = () => onChangeIndex((index + 1) % items.length);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft")
        onChangeIndex((index - 1 + items.length) % items.length);
      if (event.key === "ArrowRight") onChangeIndex((index + 1) % items.length);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [index, items.length, onChangeIndex, onClose]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!slide) return null;
  const { item, image } = slide;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/90 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name}のバニーガールイラスト`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {/* 画像が縦長でも閉じるボタン・作者・ページ送りと合わせて画面の高さに収まるよう、画像の高さを制限し、全体の幅は画像に合わせる */}
      <div className="relative w-fit max-w-[min(720px,100%)]">
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            autoFocus
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="イラストを閉じる"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div
          className="overflow-hidden rounded-xl bg-white/5"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const diff = event.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (diff > SWIPE_THRESHOLD) showPrev();
            if (diff < -SWIPE_THRESHOLD) showNext();
          }}
        >
          {failedUrl === image.url ? (
            <p className="grid aspect-[3/4] h-[calc(100dvh-13rem)] max-h-[960px] max-w-full place-items-center text-white/60">
              イラスト準備中…🐰
            </p>
          ) : (
            <img
              key={image.url}
              src={image.url}
              alt={`${item.name}のバニーガールイラスト`}
              className="block h-auto max-h-[calc(100dvh-13rem)] w-auto max-w-full"
              width={image.width}
              height={image.height}
              onError={() => setFailedUrl(image.url)}
            />
          )}
        </div>

        {image.author && (
          <p className="mt-2 text-right text-sm text-white/70">
            photo by{" "}
            {image.author.xUrl ? (
              <a
                href={image.author.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white underline-offset-2 hover:underline"
              >
                {image.author.name}
              </a>
            ) : (
              <span className="font-bold text-white">
                {image.author.name}
              </span>
            )}
          </p>
        )}

        {items.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={showPrev}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/30 transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="前のイラスト"
            >
              ←
            </button>
            <span className="tabular-nums text-sm text-white/70">
              {index + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={showNext}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/30 transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="次のイラスト"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** おまけページ「#八煌フェスバニーガール部」 */
export function BunnyGirlsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black px-4 py-16 text-white md:py-24">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-4 text-center text-3xl font-bold md:text-5xl">
          <a href="https://x.com/hashtag/%E5%85%AB%E7%85%8C%E3%83%95%E3%82%A7%E3%82%B9%E3%83%90%E3%83%8B%E3%83%BC%E3%82%AC%E3%83%BC%E3%83%AB%E9%83%A8?src=hashtag_click&f=live" target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-8 transition hover:opacity-70">#八煌フェス<br className="md:hidden" />バニーガール部</a>
        </h1>
        <p className="mb-12 text-center text-sm text-white/60 md:mb-16">
          部員募集中...🐰
        </p>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
          {BUNNY_GIRLS.map((item, index) => (
            <BunnyGirlCard
              key={item.id}
              item={item}
              order={index}
              onOpen={(imageIndex) =>
                setOpenIndex(SLIDE_START_INDEXES[index] + imageIndex)
              }
            />
          ))}
        </ul>

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-block rounded-full border border-white/40 px-6 py-2 text-sm font-bold transition hover:bg-white hover:text-black"
          >
            ← トップへ戻る
          </Link>
        </div>
      </div>

      {openIndex !== null && (
        <BunnyGirlModal
          items={SLIDES}
          index={openIndex}
          onChangeIndex={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  );
}
