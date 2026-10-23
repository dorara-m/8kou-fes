"use client";

import {
  getYouTubeEmbedUrl,
  getYouTubePlaylistUrl,
  getYouTubeThumbnailUrls,
  getYouTubeVideoId,
} from "@/lib/youtube";
import type { StreamItem } from "@/types/stream";
import { useState } from "react";

type StreamsSectionProps = {
  items: StreamItem[];
  /** 前夜祭の配信 */
  prePartyItems?: StreamItem[];
  /** 後夜祭歌枠リレーのプレイリスト */
  afterPartyItems?: StreamItem[];
};

/** YouTube が「画像なし」の代わりに返すプレースホルダー画像の幅 */
const YOUTUBE_PLACEHOLDER_WIDTH = 120;

export function StreamsSection({
  items,
  prePartyItems = [],
  afterPartyItems = [],
}: StreamsSectionProps) {
  return (
    <section id="streams" className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16 md:pt-40">
        <h2 className="text-3xl font-bold mb-8">本配信アーカイブ</h2>
        {/* lg 以上で 4 列。flex-wrap + justify-center で 7 枠が 4・3 の中央揃えになる */}
        <ul className="flex flex-wrap justify-center gap-6">
          {items.map((item) => (
            <li
              key={item.id}
              className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
            >
              <StreamPlayer item={item} />
              {item.title && (
                <p className="mt-2 text-sm font-bold text-slate-900 text-center">
                  {item.title}
                </p>
              )}
            </li>
          ))}
        </ul>
        {prePartyItems.length > 0 && (
          <div className="mt-12">
            <SubHeading>前夜祭</SubHeading>
            <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-6">
              {prePartyItems.map((item) => (
                <li
                  key={item.id}
                  className="w-full sm:w-[calc((100%-1.5rem)/2)]"
                >
                  <StreamPlayer item={item} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {afterPartyItems.length > 0 && (
          <div className="mt-12">
            <SubHeading>後夜祭 歌枠リレー</SubHeading>
            <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
              {afterPartyItems.map((item) => (
                <li key={item.id} className="flex flex-col items-center">
                  <div className="w-full">
                    <StreamPlayer item={item} />
                  </div>
                  {item.title && (
                    <p className="mt-2 text-sm font-bold text-slate-900 text-center">
                      {item.title}
                    </p>
                  )}
                  <PlaylistLink url={item.url} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 flex items-center justify-center gap-3 text-lg font-bold">
      <span className="h-px w-8 bg-slate-300" aria-hidden />
      {children}
      <span className="h-px w-8 bg-slate-300" aria-hidden />
    </h3>
  );
}

function PlaylistLink({ url }: { url?: string }) {
  const playlistUrl = getYouTubePlaylistUrl(url);
  if (!playlistUrl) return null;

  return (
    <a
      href={playlistUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-1.5 text-xs font-bold text-slate-700 transition hover:border-red-600 hover:text-red-600"
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M3 6h13M3 12h13M3 18h8" />
        <path d="m16 15 5 3-5 3z" />
      </svg>
      YouTubeで一覧を見る
    </a>
  );
}

/**
 * 小さい iframe だと YouTube が低解像度のサムネイルを出すため、
 * 最初は高画質サムネイルを自前で表示し、クリックされたら iframe に差し替える。
 */
function StreamPlayer({ item }: { item: StreamItem }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const videoId = getYouTubeVideoId(item.url);
  const embedUrl = getYouTubeEmbedUrl(item.url);

  if (!videoId || !embedUrl) {
    return (
      <div className="grid aspect-video place-items-center rounded-lg border border-slate-200 bg-slate-900 text-sm font-bold text-slate-400">
        配信準備中
      </div>
    );
  }

  const thumbnailUrls = getYouTubeThumbnailUrls(videoId);
  const tryNextThumbnail = () =>
    setThumbnailIndex((index) => Math.min(index + 1, thumbnailUrls.length - 1));

  return (
    <div className="aspect-video overflow-hidden rounded-lg border border-slate-200 bg-slate-900">
      {isPlaying ? (
        <iframe
          src={embedUrl}
          title={item.title || "本配信"}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group relative block h-full w-full"
          aria-label={`${item.title || "本配信"}を再生`}
        >
          <img
            src={thumbnailUrls[thumbnailIndex]}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            onError={tryNextThumbnail}
            onLoad={(event) => {
              if (
                event.currentTarget.naturalWidth <= YOUTUBE_PLACEHOLDER_WIDTH
              ) {
                tryNextThumbnail();
              }
            }}
          />
          <span className="absolute inset-0 grid place-items-center">
            <svg
              className="h-12 w-16 drop-shadow transition-transform group-hover:scale-110"
              viewBox="0 0 68 48"
              aria-hidden
            >
              <path
                d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                fill="#f00"
              />
              <path d="M45 24 27 14v20" fill="#fff" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
