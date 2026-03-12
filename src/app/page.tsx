"use client";

import { CreditsSection } from "@/components/CreditsSection";
import { GallerySection } from "@/components/GallerySection";
import { QASection } from "@/components/QASection";
import { TimeTableSection } from "@/components/TimeTableSection";
import { TopSection } from "@/components/TopSection";
import type { CreditItem } from "@/types/credits";
import type { GalleryItem } from "@/types/gallery";
import type { QAItem } from "@/types/qa";
import { useCallback, useEffect, useState } from "react";

export default function HomePage() {
  const [showLogo, setShowLogo] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [credits, setCredits] = useState<CreditItem[]>([]);
  const [creditsError, setCreditsError] = useState<string | null>(null);
  const [qaItems, setQaItems] = useState<QAItem[]>([]);
  const [qaError, setQaError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(res.statusText)),
      )
      .then(setGalleryItems)
      .catch((e) =>
        setGalleryError(
          e instanceof Error ? e.message : "読み込みに失敗しました",
        ),
      );
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

  useEffect(() => {
    fetch("/api/qa")
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(res.statusText)),
      )
      .then(setQaItems)
      .catch((e) =>
        setQaError(e instanceof Error ? e.message : "読み込みに失敗しました"),
      );
  }, []);

  const handleTitleAnimationEnd = useCallback(() => {
    import("canvas-confetti").then(({ default: confetti }) => {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
        disableForReducedMotion: true,
        colors: [
          "#ab4997",
          "#55b047",
          "#d71f26",
          "#3f51b5",
          "#f7cf6c",
          "#d87bae",
          "#e7e8ed",
          "#231815",
        ],
      };
      function fire(
        particleRatio: number,
        opts: Parameters<typeof confetti>[0],
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
      <TopSection
        showLogo={showLogo}
        showSubtitle={showSubtitle}
        onTitleAnimationEnd={handleTitleAnimationEnd}
        onLogoAnimationEnd={() => setShowSubtitle(true)}
      />
      <QASection items={qaItems} error={qaError} />
      <TimeTableSection />
      <GallerySection items={galleryItems} error={galleryError} />
      <CreditsSection items={credits} error={creditsError} />
    </div>
  );
}
