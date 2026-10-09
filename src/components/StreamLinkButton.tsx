"use client";

import { useEffect, useState } from "react";
import { EVENT_END, EVENT_START } from "@/lib/event";
import { scrollToSection } from "@/lib/contentReady";

function isDuringEvent() {
  const now = Date.now();
  return EVENT_START.getTime() <= now && now < EVENT_END.getTime();
}

/** 本配信の開催中（当日 10:00〜24:00）だけ画面右下に固定表示するボタン */
export function StreamLinkButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const tick = () => setVisible(isDuringEvent());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#streams"
      onClick={(event) => {
        event.preventDefault();
        scrollToSection("streams");
      }}
      className="fixed bottom-5 right-3 z-40 inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 md:bottom-8 md:right-8 md:text-base"
    >
      <span className="relative flex h-3 w-3" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
      </span>
      本配信を見る
    </a>
  );
}
