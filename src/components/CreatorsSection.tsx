"use client";

import { CREATORS } from "@/content/creators";
import { CREATOR_RECRUITMENT_CAPTION } from "@/content/creatorRecruitment";
import { CreatorRecruitmentButton } from "@/components/CreatorRecruitmentButton";
import type { CreatorItem } from "@/types/creator";

function XIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function CreatorCard({ item }: { item: CreatorItem }) {
  return (
    <li className="flex items-center overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-0">
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="h-24 w-24 shrink-0 rounded-lg bg-slate-100 object-cover sm:h-auto sm:w-40 sm:rounded-none md:w-48"
        />
      ) : (
        <div
          className="h-24 w-24 shrink-0 rounded-lg border border-dashed border-slate-300 bg-slate-100 sm:h-auto sm:aspect-square sm:w-40 sm:rounded-none sm:border-y-0 sm:border-l-0 sm:border-r md:w-48"
          aria-hidden
        />
      )}
      <div className="flex min-w-0 flex-1 items-center gap-4 p-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-red-700">{item.role}</p>
          <h3 className="mt-1 truncate text-xl font-bold text-slate-900">
            {item.name}
          </h3>
        </div>
        {item.xUrl && (
          <a
            href={item.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label={`${item.name}のX`}
          >
            <XIcon />
          </a>
        )}
      </div>
    </li>
  );
}

export function CreatorsSection() {
  return (
    <section id="creators" className="border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">クリエイター紹介</h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {CREATORS.map((item, index) => (
            <CreatorCard
              key={`${item.role}-${item.name}-${item.xUrl ?? index}`}
              item={item}
            />
          ))}
        </ul>
        {CREATORS.length === 0 && (
          <p className="mt-6 text-sm text-slate-500">まだ登録がありません</p>
        )}
        <div className="mt-12 text-center">
          <p className="mb-6 text-sm md:text-base text-slate-600 leading-relaxed">
            {CREATOR_RECRUITMENT_CAPTION}
          </p>
          <CreatorRecruitmentButton />
        </div>
      </div>
    </section>
  );
}
