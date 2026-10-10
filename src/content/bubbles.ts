import type { BubbleItem } from "@/types/bubble";
import { getTeamSlug } from "@/lib/teamSlug";
import { CAPTAINS } from "./captains";
import { CREATORS } from "./creators";
import { PLAYERS } from "./players";

/** TOP の泡の候補。選手・団長・クリエイターからアイコンがある人を集める */
const ALL_BUBBLE_ITEMS: BubbleItem[] = [
  ...PLAYERS.flatMap((item): BubbleItem[] =>
    item.icon?.url && !item.withdrawn
      ? [
          {
            id: `player-${item.id}`,
            iconUrl: item.icon.url,
            name: item.name ?? "",
            sectionId: "players",
            teamSlug: item.team?.name ? getTeamSlug(item.team.name) : undefined,
          },
        ]
      : [],
  ),
  ...CAPTAINS.flatMap((item): BubbleItem[] =>
    item.image?.url
      ? [
          {
            id: `captain-${item.id}`,
            iconUrl: item.image.url,
            name: item.name ?? "",
            sectionId: "captains",
          },
        ]
      : [],
  ),
  ...CREATORS.flatMap((item, index): BubbleItem[] =>
    item.image
      ? [
          {
            id: `creator-${index}`,
            iconUrl: item.image,
            name: item.name,
            sectionId: "creators",
          },
        ]
      : [],
  ),
];

/** 選手とクリエイターを兼ねる人がいるため、同じアイコンは先に登録された方（選手）だけ残す */
export const BUBBLE_ITEMS: BubbleItem[] = ALL_BUBBLE_ITEMS.filter(
  (item, index, items) =>
    items.findIndex((other) => other.iconUrl === item.iconUrl) === index,
);
