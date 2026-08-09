"use client";

import { getYouTubeEmbedUrl } from "@/lib/youtube";
import type { StaffItem } from "@/types/staff";
import { useState } from "react";
import { VoicePlayerModal } from "./VoicePlayerModal";

type StaffSectionProps = {
  items: StaffItem[];
  error: string | null;
};

export function StaffSection({ items, error }: StaffSectionProps) {
  const [showAlternateImages, setShowAlternateImages] = useState<
    Record<string, boolean>
  >({});
  const [voicePlayerItem, setVoicePlayerItem] = useState<StaffItem | null>(
    null,
  );
  const voiceEmbedUrl = getYouTubeEmbedUrl(voicePlayerItem?.voice_url);

  return (
    <section id="staff" className="border-t border-slate-200 bg-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">実行委員紹介</h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <ul className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr]  gap-6">
          {items.map((item, index) => {
            const isOrganizer = index === 0;
            const isAlternateImage = showAlternateImages[item.id] ?? false;
            const hasAlternateImage = Boolean(item.image && item.image2);
            const hasVoice = Boolean(getYouTubeEmbedUrl(item.voice_url));

            return (
              <li
                key={item.id}
                className={`flex flex-col items-center rounded-lg p-6 bg-slate-50 border border-slate-200
                  ${
                    isOrganizer
                      ? "md:row-span-2 md:min-h-[520px]"
                      : "min-h-[240px]"
                  }
                  `}
              >
                {item.image && (
                  <div
                    className={`relative w-40 h-40 shrink-0 mb-4
                    ${isOrganizer ? "md:h-60 md:w-60" : ""}
                    `}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-slate-200">
                      <img
                        src={item.image.url}
                        alt={item.name ?? ""}
                        className={`h-full w-full object-cover transition-opacity duration-500 ease-out ${
                          isAlternateImage && hasAlternateImage
                            ? "opacity-0"
                            : "opacity-100"
                        }`}
                        width={item.image.width}
                        height={item.image.height}
                      />
                      {item.image2 && (
                        <img
                          src={item.image2.url}
                          alt=""
                          aria-hidden
                          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                            isAlternateImage ? "opacity-100" : "opacity-0"
                          }`}
                          width={item.image2.width}
                          height={item.image2.height}
                        />
                      )}
                    </div>
                    {hasVoice && (
                      <button
                        type="button"
                        onClick={() => setVoicePlayerItem(item)}
                        className="absolute left-1 top-1 grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-violet-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
                        aria-label={`${item.name ?? "実行委員"}のボイスを再生`}
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M11 5 6 9H2v6h4l5 4z" />
                          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                          <path d="M19 5a10 10 0 0 1 0 14" />
                        </svg>
                      </button>
                    )}
                    {hasAlternateImage && (
                      <button
                        type="button"
                        className="absolute -bottom-1 -right-1 grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-slate-900/75 text-white shadow-lg transition hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
                        aria-label={
                          isAlternateImage
                            ? "通常の画像に切り替える"
                            : "別の画像に切り替える"
                        }
                        aria-pressed={isAlternateImage}
                        onClick={() =>
                          setShowAlternateImages((current) => ({
                            ...current,
                            [item.id]: !isAlternateImage,
                          }))
                        }
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M21 12a9 9 0 0 1-15.5 6.2" />
                          <path d="M3 12A9 9 0 0 1 18.5 5.8" />
                          <path d="M7 18H3v4" />
                          <path d="M17 6h4V2" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
                <h3
                  className={`text-xl font-bold mb-2 text-slate-900 text-center
                  ${isOrganizer ? "md:text-2xl md:mt-5" : ""}
                  `}
                >
                  {item.name ?? "（名前未登録）"}
                </h3>
                {item.comment && (
                  <p
                    className={`text-sm text-slate-600 whitespace-pre-wrap mb-4
                    ${isOrganizer ? "md:mt-2 md:text-lg" : ""}
                    `}
                  >
                    {item.comment}
                  </p>
                )}
                {(item.x_url || item.youtube_url) && (
                  <div className="flex gap-2 justify-center">
                    {item.x_url && (
                      <a
                        href={item.x_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
                        aria-label="X"
                      >
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                    {item.youtube_url && (
                      <a
                        href={item.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-600 hover:text-red-600 transition-colors"
                        aria-label="YouTube"
                      >
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        {!error && items.length === 0 && (
          <p className="text-slate-500 text-sm mt-6">まだ登録がありません</p>
        )}
      </div>
      {voicePlayerItem && voiceEmbedUrl && (
        <VoicePlayerModal
          embedUrl={voiceEmbedUrl}
          name={voicePlayerItem.name ?? "実行委員"}
          onClose={() => setVoicePlayerItem(null)}
        />
      )}
    </section>
  );
}
