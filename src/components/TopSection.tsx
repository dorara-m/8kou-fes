"use client";

import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2026-10-10T00:00:00+09:00");

function useCountdown() {
  const [diff, setDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ms = EVENT_DATE.getTime() - now.getTime();

      if (ms <= 0) {
        setDiff({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setDiff({
        days: Math.floor(ms / (1000 * 60 * 60 * 24)),
        hours: Math.floor((ms / (1000 * 60 * 60)) % 24),
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
  showSubtitle: boolean;
  onTitleAnimationEnd: () => void;
  onLogoAnimationEnd: () => void;
};

export function TopSection({
  showLogo,
  showSubtitle,
  onTitleAnimationEnd,
  onLogoAnimationEnd,
}: TopSectionProps) {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <section id="top" className="h-screen">
      <div className="max-w-4xl mx-auto px-4 h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="八煌フェス"
            className={`max-h-[min(40vh,280px)] w-auto object-contain mb-8 ${
              showLogo ? "animate-blur-in" : "opacity-0"
            }`}
            onAnimationEnd={onLogoAnimationEnd}
          />
          <h1
            className="text-3xl md:text-5xl font-bold mb-2 animate-slide-in-left text-center"
            onAnimationEnd={onTitleAnimationEnd}
          >
            八煌フェス
            <br className="md:hidden" />
            〜V体育祭〜
          </h1>
        </div>
        <p
          className={`text-sm md:text-lg text-slate-600 mt-4 font-bold ${showSubtitle ? "animate-fade-in-up" : "opacity-0"}`}
        >
          VTuberとリスナーでつくる体育祭の思い出
        </p>
        <p className="block mt-16 font-bold text-center text-xl md:text-2xl">
          2026年10月10日(土) 10:00〜開催
        </p>
        <p className="mt-2 tabular-nums text-xl">
          あと
          <span className="font-bold text-2xl text-red-600">{days}</span>日
        </p>
      </div>
    </section>
  );
}
