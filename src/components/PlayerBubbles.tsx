"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { BubbleItem } from "@/types/bubble";
import { scrollToSection } from "@/lib/contentReady";
import { TEAM_QUERY_KEY } from "@/lib/teamSlug";

type PlayerBubblesProps = {
  items: BubbleItem[];
  count?: number;
  /** PC表示時、この値が true になるまで泡を表示しない（スマホでは常に表示） */
  ready?: boolean;
  /** 泡を重ねたくない要素（カウントダウンなど）。配置時にこの要素の範囲を避ける */
  avoidRef?: RefObject<HTMLElement | null>;
  /** false の間は配置を待つ（ロゴ読み込みで avoidRef の位置がずれるため） */
  layoutReady?: boolean;
};

type Bubble = {
  id: string;
  url: string;
  alt: string;
  size: number;
  topPx: number;
  leftPx: number;
  duration: number;
  delay: number;
  drift: number;
  rise: number;
  sectionId: string;
  teamSlug?: string;
};

/** 泡同士の最低間隔(px) */
const BUBBLE_GAP_PX = 10;

/** 浮遊アニメーションで左右に揺れる最大幅(px)。画面外へはみ出さないよう配置時の余白にも使う */
const BUBBLE_DRIFT_MAX_PX = 20;

/** 浮遊アニメーションで上に浮く最大幅(px) */
const BUBBLE_RISE_MAX_PX = 28;

type Rect = { left: number; top: number; right: number; bottom: number };

/** 円が矩形と重なるか（矩形は pad だけ広げて判定） */
function overlapsRect(x: number, y: number, radius: number, rect: Rect, pad: number) {
  const nearestX = Math.min(Math.max(x, rect.left - pad), rect.right + pad);
  const nearestY = Math.min(Math.max(y, rect.top - pad), rect.bottom + pad);
  return Math.hypot(x - nearestX, y - nearestY) < radius;
}

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/**
 * コンテナ内での位置(px)を決める。
 * コンテナ上部（画面中央寄り＝中央テキストに近い）ほど左右の端に寄せ、
 * 下部（画面下端寄り）ほど全幅に広げてテキストとの衝突を避ける。
 * centerAvoidThreshold はコンテナ内で「中央寄せを避ける」境界(0-1)。
 * 既に配置済みの泡とは重ならないよう、円同士の距離をチェックしながら抽選する。
 * avoidRect（カウントダウンなど）とは必ず重ならない位置を優先する。
 */
function pickPosition(
  width: number,
  height: number,
  radius: number,
  existing: { x: number; y: number; radius: number }[],
  centerAvoidThreshold: number,
  avoidRect: Rect | null,
) {
  const maxAttempts = 200;
  let best: { x: number; y: number } | null = null;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const yFrac = random(0.06, 0.94);
    const y = yFrac * height;
    const x =
      yFrac < centerAvoidThreshold
        ? Math.random() < 0.5
          ? random(0, width * 0.16)
          : random(width * 0.84, width)
        : random(width * 0.02, width * 0.98);
    const margin = radius + BUBBLE_DRIFT_MAX_PX;
    const clampedX = Math.min(Math.max(x, margin), Math.max(width - margin, margin));

    // 浮遊アニメーションで動いても重ならないよう、揺れ幅分の余白を取る
    if (
      avoidRect &&
      overlapsRect(
        clampedX,
        y,
        radius,
        avoidRect,
        BUBBLE_GAP_PX + Math.max(BUBBLE_DRIFT_MAX_PX, BUBBLE_RISE_MAX_PX),
      )
    ) {
      continue;
    }

    const overlaps = existing.some((b) => {
      const dx = b.x - clampedX;
      const dy = b.y - y;
      return Math.hypot(dx, dy) < b.radius + radius + BUBBLE_GAP_PX;
    });

    if (!overlaps) return { x: clampedX, y };
    best = { x: clampedX, y };
  }

  // 妥協案: avoidRect を避けられた最後の位置を使う（泡同士は多少重なる可能性あり）
  return best ?? { x: radius, y: radius };
}

export function PlayerBubbles({
  items,
  count = 10,
  ready = true,
  avoidRef,
  layoutReady = true,
}: PlayerBubblesProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (items.length === 0) {
      setBubbles([]);
      return;
    }
    if (!layoutReady) return;

    // lg ブレークポイント(1024px)未満はスマホ扱い: 全画面・やや小さめサイズで配置
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    const containerRect = containerRef.current?.getBoundingClientRect();
    const width = containerRect?.width ?? window.innerWidth;
    const height =
      containerRect?.height ??
      (mobile ? window.innerHeight : window.innerHeight / 2);

    // 避ける要素の範囲を、泡のコンテナ基準の座標に変換する
    const avoidElRect = avoidRef?.current?.getBoundingClientRect();
    const avoidRect: Rect | null =
      avoidElRect && containerRect
        ? {
            left: avoidElRect.left - containerRect.left,
            top: avoidElRect.top - containerRect.top,
            right: avoidElRect.right - containerRect.left,
            bottom: avoidElRect.bottom - containerRect.top,
          }
        : null;
    const centerAvoidThreshold = mobile ? 0.78 : 0.45;
    const [minSize, maxSize] = mobile ? [56, 84] : [80, 120];

    const picked = shuffle(items).slice(0, count);
    const placed: { x: number; y: number; radius: number }[] = [];
    const next: Bubble[] = picked.map((item) => {
      const size = Math.round(random(minSize, maxSize));
      const radius = size / 2;
      const { x, y } = pickPosition(
        width,
        height,
        radius,
        placed,
        centerAvoidThreshold,
        avoidRect,
      );
      placed.push({ x, y, radius });

      return {
        id: item.id,
        url: item.iconUrl,
        alt: item.name,
        size,
        topPx: y - radius,
        leftPx: x - radius,
        duration: random(7, 13),
        delay: random(0, 5),
        drift: random(-BUBBLE_DRIFT_MAX_PX, BUBBLE_DRIFT_MAX_PX),
        rise: random(-BUBBLE_RISE_MAX_PX, -14),
        sectionId: item.sectionId,
        teamSlug: item.teamSlug,
      };
    });
    setBubbles(next);
  }, [items, count, avoidRef, layoutReady]);

  const handleBubbleClick = (bubble: Bubble) => {
    if (bubble.teamSlug) {
      const params = new URLSearchParams(window.location.search);
      params.set(TEAM_QUERY_KEY, bubble.teamSlug);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    scrollToSection(bubble.sectionId);
  };

  // PC ではキャラクターのフェードインが終わるまで表示しない。スマホは即表示。
  const shouldShow = isMobile || ready;

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-[20] h-full overflow-x-clip lg:z-[2] lg:h-1/2 ${
        shouldShow ? "animate-fade-in" : "opacity-0"
      }`}
    >
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          onClick={() => handleBubbleClick(bubble)}
          className={`absolute cursor-pointer hover:animate-bubble-wiggle ${
            shouldShow ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{
            top: `${bubble.topPx}px`,
            left: `${bubble.leftPx}px`,
            width: bubble.size,
            height: bubble.size,
          }}
        >
          <div
            className="h-full w-full animate-bubble-float rounded-full opacity-80 shadow-[0_8px_24px_rgba(0,0,0,0.15)] ring-2 ring-white/70"
            style={
              {
                animationDuration: `${bubble.duration}s`,
                animationDelay: `${bubble.delay}s`,
                "--bubble-drift": `${bubble.drift}px`,
                "--bubble-rise": `${bubble.rise}px`,
              } as React.CSSProperties
            }
          >
            <img
              src={bubble.url}
              alt={bubble.alt}
              className="h-full w-full rounded-full object-cover"
              draggable={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
