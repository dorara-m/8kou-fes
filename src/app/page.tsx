"use client";

import type { CreditItem } from "@/types/credits";
import type { GalleryItem } from "@/types/gallery";
import { useCallback, useEffect, useState } from "react";

export default function HomePage() {
  const [showLogo, setShowLogo] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [credits, setCredits] = useState<CreditItem[]>([]);
  const [creditsError, setCreditsError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.statusText))))
      .then(setGalleryItems)
      .catch((e) => setGalleryError(e instanceof Error ? e.message : "読み込みに失敗しました"));
  }, []);

  useEffect(() => {
    fetch("/api/credit")
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(res.statusText)),
      )
      .then(setCredits)
      .catch((e) =>
        setCreditsError(
          e instanceof Error ? e.message : "読み込みに失敗しました",
        ),
      );
  }, []);

  const handleTitleAnimationEnd = useCallback(() => {
    import("canvas-confetti").then(({ default: confetti }) => {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
        disableForReducedMotion: true,
        colors: ["#ab4997", "#55b047", "#d71f26", "#3f51b5", "#f7cf6c","#d87bae","#e7e8ed","#231815"],
      };
      function fire(
        particleRatio: number,
        opts: Parameters<typeof confetti>[0]
      ) {
        return confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }
      fire(0.5, { spread: 130, startVelocity: 55 });
      setTimeout(() => {
        setShowLogo(true);
      }, 1500);
    });
  }, []);

  return (
    <div>
      <section id="top" className="h-screen">
        <div className="max-w-4xl mx-auto px-4 h-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <img
              src="/logo.png"
              alt="八煌フェス"
              className={`max-h-[min(40vh,280px)] w-auto object-contain mb-8 ${
                showLogo ? "animate-blur-in" : "opacity-0"
              }`}
              onAnimationEnd={() => setShowSubtitle(true)}
            />
            <h1
              className="text-3xl md:text-5xl font-bold mb-2 animate-slide-in-left text-center"
              onAnimationEnd={handleTitleAnimationEnd}
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
        </div>
      </section>
      <section id="schedule" className="bg-slate-100 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">SCHEDULE</h2>
          <ul className="space-y-8">
            <li>
              <h3 className="text-xl font-bold mb-1">10:00 - 12:00</h3>
              <p className="text-slate-600">スプラトゥーン3</p>
            </li>
            <li>
              <h3 className="text-xl font-bold mb-1">13:00 - 14:00</h3>
              <p className="text-slate-600">マリオカート ワールド</p>
            </li>
          </ul>
        </div>
      </section>
      <section id="gallery" className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-6">GALLERY</h2>
          {galleryError && (
            <p className="text-red-600 text-sm mb-4">{galleryError}</p>
          )}
          <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {galleryItems.map((item) => {
              const Wrapper = item.url ? "a" : "div";
              const wrapperProps = item.url
                ? {
                    href: item.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {};
              return (
                <li key={item.id}>
                  <Wrapper
                    {...wrapperProps}
                    className="block rounded-lg overflow-hidden border border-slate-200 bg-white hover:border-slate-400 transition-colors"
                  >
                    {item.image?.url ? (
                      <img
                        src={item.image.url}
                        alt={item.title || "ギャラリー"}
                        className="w-full aspect-video object-cover"
                        width={item.image.width}
                        height={item.image.height}
                      />
                    ) : (
                      <div className="w-full aspect-video bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                        画像なし
                      </div>
                    )}
                    {item.title && (
                      <p className="p-2 text-sm font-medium text-slate-700 truncate">
                        {item.title}
                      </p>
                    )}
                  </Wrapper>
                </li>
              );
            })}
          </ul>
          {!galleryError && galleryItems.length === 0 && (
            <p className="text-slate-500 text-sm">まだアイテムがありません</p>
          )}
        </div>
      </section>
      <section id="credits" className="bg-slate-100 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16 pb-32">
          <h2 className="text-3xl font-bold mb-2">CREDITS</h2>
          {creditsError && (
            <p className="text-red-600 text-sm mb-4">{creditsError}</p>
          )}
          <ul className="space-y-6 mt-6 text-center text-xl">
            {[...credits]
              .sort(
                (a, b) =>
                  new Date(a.createdAt ?? 0).getTime() -
                  new Date(b.createdAt ?? 0).getTime()
              )
              .map((item) => (
                <li key={item.id}>
                  <dl>
                    <dt className="font-bold">{item.title}</dt>
                    <dd className="text-slate-600">
                      {item.items?.map((inner, i) => (
                        <p key={i}>{inner.name}</p>
                      ))}
                    </dd>
                  </dl>
                </li>
              ))}
          </ul>
          {!creditsError && credits.length === 0 && (
            <p className="text-slate-500 text-sm mt-6">まだ登録がありません</p>
          )}
        </div>
      </section>
    </div>
  );
}
