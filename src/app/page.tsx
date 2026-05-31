"use client";

import { CaptainsSection } from "@/components/CaptainsSection";
import { CatchCopySection } from "@/components/CatchCopySection";
import { CreatorsSection } from "@/components/CreatorsSection";
import { EntrySection } from "@/components/EntrySection";
import { GameSection } from "@/components/GameSection";
import { StaffSection } from "@/components/StaffSection";
// import { TimeTableSection } from "@/components/TimeTableSection";
import { CreditsSection } from "@/components/CreditsSection";
import { TopSection } from "@/components/TopSection";
import type { CaptainItem } from "@/types/captain";
import type { QAItem } from "@/types/qa";
import type { StaffItem } from "@/types/staff";
import type { CreditItem } from "@/types/credits";
import { EntryFormButton } from "@/components/EntryFormButton";
import { useCallback, useEffect, useState } from "react";

export default function HomePage() {
  const [showLogo, setShowLogo] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [captainItems, setCaptainItems] = useState<CaptainItem[]>([]);
  const [captainError, setCaptainError] = useState<string | null>(null);
  const [qaItems, setQaItems] = useState<QAItem[]>([]);
  const [qaError, setQaError] = useState<string | null>(null);
  const [staffItems, setStaffItems] = useState<StaffItem[]>([]);
  const [staffError, setStaffError] = useState<string | null>(null);
  const [credits, setCredits] = useState<CreditItem[]>([]);
  const [creditsError, setCreditsError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/captain")
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(res.statusText)),
      )
      .then(setCaptainItems)
      .catch((e) =>
        setCaptainError(
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

  useEffect(() => {
    fetch("/api/staff")
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(res.statusText)),
      )
      .then(setStaffItems)
      .catch((e) =>
        setStaffError(
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
      }, 1000);
    });
  }, []);

  return (
    <div>
      <TopSection
        showLogo={showLogo}
        showCharacters={showSubtitle}
        onTitleAnimationEnd={handleTitleAnimationEnd}
        onLogoAnimationEnd={() => setShowSubtitle(true)}
      />
      <CatchCopySection />
      <CaptainsSection items={captainItems} error={captainError} />
      <GameSection />
      <EntrySection faqItems={qaItems} faqError={qaError} />
      <StaffSection items={staffItems} error={staffError} />
      <CreatorsSection />
      <CreditsSection items={credits} error={creditsError} />
      <EntryFormButton variant="fixed" />
      {/* <TimeTableSection /> */}
      {/* <GallerySection items={galleryItems} error={galleryError} /> */}
    </div>
  );
}
