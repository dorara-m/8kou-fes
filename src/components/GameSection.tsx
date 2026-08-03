"use client";

import { CONFIRMED_GAMES } from "@/content/games";
import type { GameItem } from "@/types/game";

const CANDIDATE_NOTICE =
  "以下候補から応募フォームのアンケートによって決まります！確定したら告知しますのでお待ちください！";

function GameCard({
  item,
  showImage = true,
}: {
  item: GameItem;
  showImage?: boolean;
}) {
  return (
    <li className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
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
      <div className="p-3">
        <h4 className="text-base font-bold text-slate-900">
          {item.title ?? "（タイトル未登録）"}
        </h4>
        {item.description && (
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
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
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-5">
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

export function GameSection() {
  return (
    <section id="games" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">競技紹介</h2>

        {CONFIRMED_GAMES.length > 0 && (
          <div className="mt-8">
            <GameList items={CONFIRMED_GAMES} />
          </div>
        )}

        <div className="mt-12 text-center text-sm leading-relaxed text-slate-600">
          <p>この大会は、任天堂の協賛・提携を受けたものではありません。</p>
          <p>この大会は、任天堂の<a href="https://www.nintendo.co.jp/tournament_guideline/rules.html" target="_blank" rel="noopener noreferrer" className="text-blue-600">コミュニティ大会への出場および観戦に関する規約</a>に従って開催いたします。</p>
        </div>
      </div>
    </section>
  );
}
