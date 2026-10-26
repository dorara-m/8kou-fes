"use client";

import { useEffect, useState } from "react";
import { AFTER_MEETING, AFTER_MEETING_END } from "@/content/afterMeeting";

function isBeforeAfterMeetingEnd() {
  return Date.now() < AFTER_MEETING_END.getTime();
}

/**
 * 画面左下に固定表示する、実行委員会アフターミーティングの告知カード（〜AFTER_MEETING_END）。
 * 右下の兎ボタン・固定ボタンと重ならないよう左下に置き、SP では横長のコンパクト表示にする。
 * カード全体が感想・思い出募集フォームへのリンク。
 */
export function AfterMeetingBanner({ show }: { show: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const tick = () => setVisible(isBeforeAfterMeetingEnd());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <aside
      className={`fixed bottom-24 left-4 right-24 z-40 max-w-[300px] md:bottom-8 md:left-8 md:right-auto md:w-72 md:max-w-none ${
        show ? "animate-slide-in-left" : "opacity-0"
      }`}
      aria-label={`${AFTER_MEETING.title}のお知らせ`}
    >
      <a
        href={AFTER_MEETING.formUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex -rotate-1 items-stretch overflow-hidden rounded-xl border-2 border-white bg-white text-slate-900 shadow-[0_8px_24px_rgba(64,82,167,0.35)] transition duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_12px_32px_rgba(64,82,167,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4052a7] focus-visible:ring-offset-2 md:flex-col"
      >
        <img
          src={AFTER_MEETING.image.src}
          alt={AFTER_MEETING.image.alt}
          width={AFTER_MEETING.image.width}
          height={AFTER_MEETING.image.height}
          className="w-28 shrink-0 object-cover md:h-auto md:w-full"
        />
        <div className="flex min-w-0 flex-col justify-center gap-1 px-3 py-2 md:px-4 md:py-3">
          <span className="w-fit rounded-full bg-[#4052a7] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white md:text-xs">
            開催決定
          </span>
          <p className="text-xs font-bold leading-snug md:text-sm">
            {AFTER_MEETING.title}
          </p>
          <p className="font-heading text-base font-bold leading-none text-[#d71f26] md:text-xl">
            {AFTER_MEETING.dateLabel}
            <span className="ml-1 text-xs text-slate-900 md:text-sm">開催</span>
          </p>
          <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-[#d71f26] to-[#ab4997] px-3 py-1 text-[11px] font-bold text-white shadow-sm transition group-hover:brightness-110 md:text-xs">
            {AFTER_MEETING.linkLabel}
            <svg
              className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </a>
    </aside>
  );
}
