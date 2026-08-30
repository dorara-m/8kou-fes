"use client";

import { CaptainsSection } from "@/components/CaptainsSection";
import { PlayersSection } from "@/components/PlayersSection";
import { CatchCopySection } from "@/components/CatchCopySection";
import { CreatorsSection } from "@/components/CreatorsSection";
// import { EntrySection } from "@/components/EntrySection";
import { GameSection } from "@/components/GameSection";
import { StaffSection } from "@/components/StaffSection";
import { FanArtSection } from "@/components/FanArtSection";
// import { TimeTableSection } from "@/components/TimeTableSection";
import { CreditsSection } from "@/components/CreditsSection";
import { TopSection } from "@/components/TopSection";
import { CAPTAINS } from "@/content/captains";
import { PLAYERS } from "@/content/players";
import { STAFF } from "@/content/staff";
import { FAN_ART } from "@/content/fanArt";
import { CreatorRecruitmentButton } from "@/components/CreatorRecruitmentButton";
import { markContentReady } from "@/lib/contentReady";
import { useCallback, useEffect, useState } from "react";

export default function HomePage() {
  const [showLogo, setShowLogo] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    markContentReady();
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
      fire(0.5, {
        angle: 55,
        origin: { x: 0, y: 0.85 },
        spread: 55,
        startVelocity: 60,
      });
      fire(0.5, {
        angle: 125,
        origin: { x: 1, y: 0.85 },
        spread: 55,
        startVelocity: 60,
      });
      setTimeout(() => {
        setShowLogo(true);
      }, 1000);
    });
  }, []);

  return (
    <div className="relative">
      <img
        src="/okumono_sora2.png"
        alt=""
        className="absolute inset-0 z-0 h-[100vh] md:h-[110vh] w-full object-cover"
        aria-hidden
        draggable={false}
      />
      <TopSection
        showLogo={showLogo}
        showCharacters={showSubtitle}
        onTitleAnimationEnd={handleTitleAnimationEnd}
        onLogoAnimationEnd={() => setShowSubtitle(true)}
        players={PLAYERS}
      />
      <CatchCopySection />
      <CaptainsSection items={CAPTAINS} />
      <PlayersSection items={PLAYERS} />
      <GameSection />
      <FanArtSection items={FAN_ART} />
      <StaffSection items={STAFF} />
      <CreatorsSection />
      <CreditsSection />
      <CreatorRecruitmentButton variant="fixed" />
      {/* <TimeTableSection /> */}
    </div>
  );
}
