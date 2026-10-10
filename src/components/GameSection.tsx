"use client";

import { CONFIRMED_GAMES } from "@/content/games";
import type { GameItem } from "@/types/game";

function GameCard({
  item,
  showImage = true,
}: {
  item: GameItem;
  showImage?: boolean;
}) {
  return (
    <li className="w-[calc((100%-1.5rem)/3)] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:w-40">
      {showImage && item.image ? (
        <img
          src={item.image}
          alt={item.title ?? ""}
          className="aspect-square w-full bg-slate-100 object-cover"
        />
      ) : showImage ? (
        <div
          className="aspect-square w-full border-b border-dashed border-slate-200 bg-slate-100"
          aria-hidden
        />
      ) : null}
      <div className="p-2">
        <h4 className="text-sm font-bold text-slate-900">
          {item.title ?? "（タイトル未登録）"}
        </h4>
        {item.description && (
          <p className="mt-1 text-xs leading-relaxed text-slate-600">
            {item.description}
          </p>
        )}
      </div>
    </li>
  );
}

function GameList({
  items,
  showImages = true,
}: {
  items: GameItem[];
  showImages?: boolean;
}) {
  return (
    <ul className="flex flex-wrap justify-center gap-3">
      {items.map((item, index) => (
        <GameCard
          key={`${item.title ?? "game"}-${item.image ?? index}`}
          item={item}
          showImage={showImages}
        />
      ))}
    </ul>
  );
}

/** タイムテーブルセクション内の h3 ブロックとして表示する */
export function GameSection() {
  return (
    <div id="games" className="mt-16 scroll-mt-20">
      <h3 className="text-xl font-bold text-slate-900">競技</h3>

      {CONFIRMED_GAMES.length > 0 && (
        <div className="mt-6">
          <GameList items={CONFIRMED_GAMES} />
        </div>
      )}

      <div className="mt-8 text-center text-sm leading-relaxed text-slate-600">
        <p>この大会は、任天堂の協賛・提携を受けたものではありません。</p>
        <p>
          この大会は、任天堂の
          <a
            href="https://www.nintendo.co.jp/tournament_guideline/rules.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            コミュニティ大会への出場および観戦に関する規約
          </a>
          に従って開催いたします。
        </p>
      </div>
    </div>
  );
}
