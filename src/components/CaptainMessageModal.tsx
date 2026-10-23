"use client";

import { resolveLabelTextColor } from "@/lib/teamColor";
import type { CaptainItem } from "@/types/captain";
import { useEffect, useRef } from "react";

type CaptainMessageModalProps = {
  /** message_image を持つ団長のみ */
  items: CaptainItem[];
  index: number;
  onChangeIndex: (index: number) => void;
  onClose: () => void;
};

/** スワイプとみなす横移動量(px) */
const SWIPE_THRESHOLD = 50;

function getPlainText(value: string) {
  return value.replace(/<[^>]*>/g, "").trim();
}

/** 団長から団員への大会前日メッセージ画像を表示するモーダル（←→・スワイプでチーム切り替え、Esc・背景クリックで閉じる） */
export function CaptainMessageModal({
  items,
  index,
  onChangeIndex,
  onClose,
}: CaptainMessageModalProps) {
  const item = items[index];
  const touchStartX = useRef<number | null>(null);

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

  if (!item?.message_image) return null;

  const teamColor = item.team?.color ?? "#4052a7";
  const headerTextColor = resolveLabelTextColor(item.team?.color);
  const name = getPlainText(item.name ?? "団長");
  const teamLabel = item.team?.name ? `${item.team.name}チーム` : "";

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/85 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="captain-message-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {/* PC では画像（16:9）がヘッダー・フッター込みで画面の高さに収まるよう幅を絞る */}
      <div className="w-full max-w-[min(1000px,calc((100vh-16rem)*16/9))] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div
          className="flex items-center justify-between gap-4 px-4 py-3"
          style={{ backgroundColor: teamColor, color: headerTextColor }}
        >
          <h3 id="captain-message-title" className="font-bold">
            <span className="mr-2 text-sm opacity-90">大会前日メッセージ</span>
            <span className="inline-block">
              {teamLabel} 団長 {name} より
            </span>
          </h3>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
            aria-label="メッセージを閉じる"
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
          className="relative bg-slate-900"
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
          <img
            key={item.message_image.url}
            src={item.message_image.url}
            alt={`${teamLabel} 団長 ${name} から団員へのメッセージ`}
            className="h-auto w-full"
            width={item.message_image.width}
            height={item.message_image.height}
          />
        </div>

        <div className="flex items-center justify-center gap-2 px-4 py-3">
          {items.map((dotItem, dotIndex) => (
            <button
              key={dotItem.id}
              type="button"
              onClick={() => onChangeIndex(dotIndex)}
              className={`h-3 rounded-full ring-1 ring-slate-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                dotIndex === index ? "w-8" : "w-3 opacity-40 hover:opacity-80"
              }`}
              style={{ backgroundColor: dotItem.team?.color ?? "#4052a7" }}
              aria-label={`${dotItem.team?.name ?? ""}チームのメッセージを表示`}
              aria-current={dotIndex === index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
