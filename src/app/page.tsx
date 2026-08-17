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
import type { CaptainItem } from "@/types/captain";
import type { PlayerItem } from "@/types/player";
import type { StaffItem } from "@/types/staff";
import type { FanArtItem } from "@/types/fanArt";
import { CreatorRecruitmentButton } from "@/components/CreatorRecruitmentButton";
import { useCallback, useEffect, useState } from "react";

export default function HomePage() {
  const [showLogo, setShowLogo] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [captainItems, setCaptainItems] = useState<CaptainItem[]>([]);
  const [captainError, setCaptainError] = useState<string | null>(null);
  const [playerItems, setPlayerItems] = useState<PlayerItem[]>([]);
  const [playerError, setPlayerError] = useState<string | null>(null);
  const [staffItems, setStaffItems] = useState<StaffItem[]>([]);
  const [staffError, setStaffError] = useState<string | null>(null);
  const [fanArtItems, setFanArtItems] = useState<FanArtItem[]>([]);
  const [fanArtError, setFanArtError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/captain.json")
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
    fetch("/data/player.json")
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(res.statusText)),
      )
      .then(setPlayerItems)
      .catch((e) =>
        setPlayerError(
          e instanceof Error ? e.message : "読み込みに失敗しました",
        ),
      );
  }, []);

  useEffect(() => {
    fetch("/data/staff.json")
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
    fetch("/data/fan-art.json")
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(res.statusText)),
      )
      .then(setFanArtItems)
      .catch((e) =>
        setFanArtError(
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
        players={playerItems}
      />
      <CatchCopySection />
      <CaptainsSection items={captainItems} error={captainError} />
      <PlayersSection items={playerItems} error={playerError} />
      <GameSection />
      <FanArtSection items={fanArtItems} error={fanArtError} />
      <StaffSection items={staffItems} error={staffError} />
      <CreatorsSection />
      <CreditsSection />
      <CreatorRecruitmentButton variant="fixed" />
      {/* <TimeTableSection /> */}
    </div>
  );
}
