"use client";

import { resolveLabelTextColor } from "@/lib/teamColor";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import type { PlayerItem } from "@/types/player";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { VoicePlayerModal } from "./VoicePlayerModal";

const TEAM_QUERY_KEY = "team";

type PlayersSectionProps = {
  items: PlayerItem[];
  error: string | null;
};

type SortMode = "random" | "name" | "updated";

const TEAM_COLOR_ORDER = [
  "紅蓮",
  "青波",
  "桃華",
  "翠迅",
  "黄昏",
  "紫電",
  "白雪",
  "黒夜",
];

function getTeamColorOrderIndex(name: string) {
  const index = TEAM_COLOR_ORDER.findIndex((teamName) =>
    name.includes(teamName),
  );
  return index === -1 ? TEAM_COLOR_ORDER.length : index;
}

function shuffleItems<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function stripHtml(text: string) {
  return text.replace(/<[^>]*>/g, "");
}

function getDisplayName(name?: string) {
  if (!name) return "";
  return stripHtml(name).trim();
}

function PlayerCard({
  item,
  onPlayVoice,
}: {
  item: PlayerItem;
  onPlayVoice: (item: PlayerItem) => void;
}) {
  const labelTextColor = resolveLabelTextColor(item.team?.color);
  const hasSocialLinks = Boolean(item.x_url || item.youtube_url);
  const hasVoice = Boolean(getYouTubeEmbedUrl(item.voice_url));

  return (
    <li className="group flex flex-col items-center">
      <div className="relative mb-3">
        {item.icon ? (
          <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full transition">
            <img
              src={item.icon.url}
              alt={getDisplayName(item.name)}
              className="h-full w-full object-cover"
              width={item.icon.width}
              height={item.icon.height}
            />
          </div>
        ) : (
          <div
            className="h-32 w-32 shrink-0 rounded-full bg-slate-100"
            aria-hidden
          />
        )}
        {hasVoice && (
          <button
            type="button"
            onClick={() => onPlayVoice(item)}
            className="absolute -left-1 -top-1 grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-[#4052a7] hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
            aria-label={`${getDisplayName(item.name)}のボイスを再生`}
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
        {hasSocialLinks && (
          <div className="absolute -right-1 -top-1 flex flex-col gap-1">
            {item.x_url && (
              <a
                href={item.x_url}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-7 w-7 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-900 hover:text-white"
                aria-label={`${getDisplayName(item.name)}のX`}
              >
                <svg
                  className="h-3.5 w-3.5"
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
                className="grid h-7 w-7 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-red-600 hover:text-white"
                aria-label={`${getDisplayName(item.name)}のYouTube`}
              >
                <svg
                  className="h-3.5 w-3.5"
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
      </div>
      {item.team?.name && (
        <span
          className="mb-2 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide"
          style={{
            backgroundColor: item.team.color,
            color: labelTextColor,
          }}
        >
          {item.team.name}
        </span>
      )}
      {item.kana ? (
        <h3 className="grid text-center text-base font-bold leading-tight text-slate-900">
          <span
            className="col-start-1 row-start-1 line-clamp-2 transition-opacity duration-300 group-hover:opacity-0"
            dangerouslySetInnerHTML={{ __html: item.name ?? "（名前未登録）" }}
          />
          <span className="col-start-1 row-start-1 line-clamp-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {item.kana}
          </span>
        </h3>
      ) : (
        <h3
          className="line-clamp-2 text-center text-base font-bold leading-tight text-slate-900"
          dangerouslySetInnerHTML={{ __html: item.name ?? "（名前未登録）" }}
        />
      )}
    </li>
  );
}

function PlayersSectionInner({ items, error }: PlayersSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const teamParam = searchParams.get(TEAM_QUERY_KEY);

  const [sortMode, setSortMode] = useState<SortMode>("random");
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [initialShuffledIds, setInitialShuffledIds] = useState<string[]>([]);
  const [voicePlayerItem, setVoicePlayerItem] = useState<PlayerItem | null>(
    null,
  );
  const voiceEmbedUrl = getYouTubeEmbedUrl(voicePlayerItem?.voice_url);
  const sectionRef = useRef<HTMLElement | null>(null);

  const teams = useMemo(() => {
    const teamMap = new Map<string, NonNullable<PlayerItem["team"]>>();
    for (const item of items) {
      if (item.team && !teamMap.has(item.team.id)) {
        teamMap.set(item.team.id, item.team);
      }
    }
    return [...teamMap.values()].sort(
      (a, b) => getTeamColorOrderIndex(a.name) - getTeamColorOrderIndex(b.name),
    );
  }, [items]);

  useEffect(() => {
    setInitialShuffledIds(shuffleItems(items.map((item) => item.id)));
    const matchedTeam = teamParam
      ? items.find(
          (item) =>
            item.team?.id === teamParam || item.team?.name === teamParam,
        )?.team?.id
      : undefined;
    setSelectedTeam(matchedTeam ?? "all");
    setSortMode("random");
    if (teamParam && items.length > 0) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // teamParam is read only once per items load (from the URL on entry);
    // it must not re-trigger this reset every time the user picks a team.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const selectTeam = (team: { id: string; name: string } | null) => {
    setSelectedTeam(team?.id ?? "all");
    const params = new URLSearchParams(searchParams.toString());
    if (team) {
      params.set(TEAM_QUERY_KEY, team.name);
    } else {
      params.delete(TEAM_QUERY_KEY);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const filteredItems = useMemo(() => {
    if (selectedTeam === "all") return items;
    return items.filter((item) => item.team?.id === selectedTeam);
  }, [items, selectedTeam]);

  const displayedItems = useMemo(() => {
    if (sortMode === "name") {
      return [...filteredItems].sort((a, b) =>
        (a.kana ?? getDisplayName(a.name)).localeCompare(
          b.kana ?? getDisplayName(b.name),
          "ja",
        ),
      );
    }

    if (sortMode === "updated") {
      return [...filteredItems].sort((a, b) => {
        const aUpdatedAt = Date.parse(a.updatedAt ?? a.createdAt ?? "");
        const bUpdatedAt = Date.parse(b.updatedAt ?? b.createdAt ?? "");
        return (Number.isNaN(bUpdatedAt) ? 0 : bUpdatedAt) -
          (Number.isNaN(aUpdatedAt) ? 0 : aUpdatedAt);
      });
    }

    const orderMap = new Map(
      initialShuffledIds.map((id, index) => [id, index]),
    );
    return [...filteredItems].sort(
      (a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0),
    );
  }, [filteredItems, sortMode, initialShuffledIds]);

  const handleRandomSort = () => {
    setSortMode("random");
    setInitialShuffledIds(shuffleItems(items.map((item) => item.id)));
  };

  return (
    <section
      id="players"
      ref={sectionRef}
      className="border-t border-slate-200 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold tracking-tight">選手紹介</h2>
            <p className="text-slate-600">
              8色のチームに所属する個性豊かな選手たち！
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              並び替え
            </span>
            <button
              type="button"
              onClick={handleRandomSort}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${
                sortMode === "random"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              aria-pressed={sortMode === "random"}
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
                <path d="M16 3h5v5" />
                <path d="M4 20 21 3" />
                <path d="M21 16v5h-5" />
                <path d="M15 15l6 6" />
                <path d="M4 4l5 5" />
              </svg>
              ランダム
            </button>
            <button
              type="button"
              onClick={() => setSortMode("name")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                sortMode === "name"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              aria-pressed={sortMode === "name"}
            >
              名前順
            </button>
            <button
              type="button"
              onClick={() => setSortMode("updated")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                sortMode === "updated"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              aria-pressed={sortMode === "updated"}
            >
              更新順
            </button>
          </div>
        </div>

        {teams.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
              チーム
            </span>
            <button
              type="button"
              onClick={() => selectTeam(null)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                selectedTeam === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              aria-pressed={selectedTeam === "all"}
            >
              すべて
            </button>
            {teams.map((team) => {
              const labelTextColor = resolveLabelTextColor(team.color);
              const isSelected = selectedTeam === team.id;

              return (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => selectTeam(team)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    isSelected
                      ? "ring-2 ring-offset-2 ring-slate-900"
                      : "hover:opacity-90"
                  }`}
                  style={{
                    backgroundColor: team.color ?? "#e2e8f0",
                    color: labelTextColor,
                  }}
                  aria-pressed={isSelected}
                >
                  {team.name}
                </button>
              );
            })}
          </div>
        )}

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {displayedItems.map((item) => (
            <PlayerCard
              key={item.id}
              item={item}
              onPlayVoice={setVoicePlayerItem}
            />
          ))}
        </ul>

        {!error && items.length === 0 && (
          <p className="mt-6 text-sm text-slate-500">まだ登録がありません</p>
        )}
        {!error && items.length > 0 && displayedItems.length === 0 && (
          <p className="mt-6 text-sm text-slate-500">
            選択したチームの選手はいません
          </p>
        )}
      </div>

      {voicePlayerItem && voiceEmbedUrl && (
        <VoicePlayerModal
          embedUrl={voiceEmbedUrl}
          name={getDisplayName(voicePlayerItem.name)}
          onClose={() => setVoicePlayerItem(null)}
        />
      )}
    </section>
  );
}

export function PlayersSection(props: PlayersSectionProps) {
  return (
    <Suspense fallback={null}>
      <PlayersSectionInner {...props} />
    </Suspense>
  );
}
