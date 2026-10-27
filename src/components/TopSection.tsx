"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AfterMeetingBanner } from "./AfterMeetingBanner";
import { PlayerBubbles } from "./PlayerBubbles";
import type { BubbleItem } from "@/types/bubble";
import { BUNNY_PAGE_ENABLED } from "@/lib/bunnyPage";
import { EVENT_CLOSED, EVENT_START } from "@/lib/event";

/** キャラクター間のフェードイン間隔（秒） */
const CHARACTER_FADE_IN_STAGGER_S = 0.5;

type CharacterBg = {
  src: string;
  alt: string;
  className: string;
  zIndex: number;
  /** フェードイン順: 0=のあ → 1=ゔぁん。 → 2=みぺん → 3=ぬめちゃ → 4=ラルル */
  fadeInOrder: number;
};

const CHARACTERS: CharacterBg[] = [
  {
    src: "/images/ralulu.png",
    alt: "ラルル",
    className: "bottom-[-130px] left-[7%] w-[360px]",
    zIndex: 7,
    fadeInOrder: 4,
  },
  {
    src: "/images/mipen.png",
    alt: "みぺん",
    className: "bottom-[-20px] left-[1%] w-[370px]",
    zIndex: 6,
    fadeInOrder: 3,
  },
  {
    src: "/images/numecha.png",
    alt: "ぬめちゃ",
    className: "bottom-[-100px] right-[12%] w-[370px]",
    zIndex: 6,
    fadeInOrder: 1,
  },
  {
    src: "/images/van.png",
    alt: "ゔぁん。",
    className: "bottom-[40px] right-[2%] w-[290px]",
    zIndex: 5,
    fadeInOrder: 0,
  },
  {
    src: "/images/noa.png",
    alt: "のあ",
    className: "bottom-[90px] left-[15%] w-[320px]",
    zIndex: 5,
    fadeInOrder: 2,
  },
];

function useCountdown() {
  const [diff, setDiff] = useState({
    isOver: false,
    isClosed: false,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ms = EVENT_START.getTime() - now.getTime();

      if (ms <= 0) {
        setDiff({
          isOver: true,
          isClosed: now.getTime() >= EVENT_CLOSED.getTime(),
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setDiff({
        isOver: false,
        isClosed: false,
        hours: Math.floor(ms / (1000 * 60 * 60)),
        minutes: Math.floor((ms / (1000 * 60)) % 60),
        seconds: Math.floor((ms / 1000) % 60),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return diff;
}

type TopSectionProps = {
  showLogo: boolean;
  /** true になったらキャラクターのフェードインを開始 */
  showCharacters: boolean;
  onTitleAnimationEnd: () => void;
  onLogoAnimationEnd: () => void;
  bubbles?: BubbleItem[];
};

export function TopSection({
  showLogo,
  showCharacters,
  onTitleAnimationEnd,
  onLogoAnimationEnd,
  bubbles = [],
}: TopSectionProps) {
  const { isOver, isClosed, hours, minutes, seconds } = useCountdown();
  const countdownRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  // ロゴの高さが決まるまでカウントダウンの位置が定まらないので、泡の配置を待つ
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    if (logoRef.current?.complete) setLogoLoaded(true);
  }, []);

  return (
    <section id="top" className="relative h-screen">
      <PlayerBubbles
        items={bubbles}
        count={10}
        ready={showCharacters}
        avoidRef={countdownRef}
        layoutReady={logoLoaded}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
      >
        <div className="relative mx-auto h-full w-full max-w-[1400px]">
          {CHARACTERS.map(({ src, alt, className, zIndex, fadeInOrder }) => (
            <div
              key={src}
              className={`absolute ${className} ${
                showCharacters ? "animate-fade-in" : "opacity-0"
              }`}
              style={{
                zIndex,
                animationDelay: showCharacters
                  ? `${fadeInOrder * CHARACTER_FADE_IN_STAGGER_S}s`
                  : undefined,
              }}
            >
              <img
                src={src}
                alt={alt}
                className="h-full w-full object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none relative z-10 max-w-4xl mx-auto px-4 h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <img
            ref={logoRef}
            src="/images/logo.png"
            alt="八煌フェス"
            className={`max-h-[min(40vh,300px)] w-auto object-contain mb-8 ${
              showLogo ? "animate-blur-in" : "opacity-0"
            }`}
            onAnimationEnd={onLogoAnimationEnd}
            onLoad={() => setLogoLoaded(true)}
            onError={() => setLogoLoaded(true)}
          />
          <h1
            className="text-3xl md:text-5xl font-bold mb-2 animate-fade-in-up text-center"
            onAnimationEnd={onTitleAnimationEnd}
          >
            八煌フェス
            <br className="md:hidden" />
            〜V体育祭〜
          </h1>
        </div>
        {!isClosed && (
          <p className="block mt-8 font-bold text-center text-xl md:text-2xl font-heading">
            2026年10月11日(日)
            <br />
            <span className="text-lg">10:00〜24:00</span>
          </p>
        )}
        {!isOver && (
          <p ref={countdownRef} className="mt-4 tabular-nums text-xl">
            あと
            <span className="font-bold text-3xl text-red-600">{hours}</span>時間
            <span className="font-bold text-3xl text-red-600">
              {String(minutes).padStart(2, "0")}
            </span>
            分
            <span className="font-bold text-3xl text-red-600">
              {String(seconds).padStart(2, "0")}
            </span>
            秒
          </p>
        )}
        {isClosed && (
          <p className="mt-8 text-center font-bold leading-relaxed text-base md:text-xl">
            <span className="text-red-600">本イベントは終了しました。</span>
            <br />
            関係者の皆様、本当におつかれさまでした！！
            <br />
            視聴者の皆様、本当にありがとう！！！
            <br />
            みんなでつくれたかな？！
            <br />
            <span className="text-red-600 text-xl md:text-2xl">最高の体育祭！</span>
          </p>
        )}
      </div>

      <AfterMeetingBanner show={showCharacters} />

      {/* おまけページ「#八煌フェスバニーガール部」への導線（右下の固定ボタンの上に着地させる） */}
      {BUNNY_PAGE_ENABLED && (
        <Link
          href="/bunny"
          className="absolute bottom-24 right-4 z-20 grid h-14 w-14 place-items-center rounded-full border-2 border-white bg-black text-3xl shadow-[0_0_20px_rgba(216,123,174,0.8)] transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d87bae] focus-visible:ring-offset-2 md:bottom-32 md:right-10 md:h-16 md:w-16 md:text-4xl animate-bunny-drop-roll motion-reduce:animate-none"
          aria-label="おまけ：#八煌フェスバニーガール部"
          title="#八煌フェスバニーガール部"
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-[#d87bae] opacity-0 animate-bunny-ring motion-reduce:hidden"
          />
          <span aria-hidden>🐰</span>
        </Link>
      )}
    </section>
  );
}
