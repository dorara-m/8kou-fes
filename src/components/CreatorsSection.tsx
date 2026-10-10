"use client";

import { CREATORS } from "@/content/creators";
import { CREATOR_RECRUITMENT_CAPTION } from "@/content/creatorRecruitment";
import { CreatorRecruitmentButton } from "@/components/CreatorRecruitmentButton";
import type { CreatorDepartment, CreatorItem } from "@/types/creator";

type DepartmentStyle = {
  name: CreatorDepartment;
  /** カード上部の帯の色（文字色込み） */
  bandClassName: string;
  /** 見出し横のバーの色 */
  accentClassName: string;
};

/** 表示順。色はサイトのテーマカラー（page.tsx の紙吹雪と同じ） */
const DEPARTMENTS: DepartmentStyle[] = [
  {
    name: "制作室",
    bandClassName: "bg-[#3f51b5] text-white",
    accentClassName: "bg-[#3f51b5]",
  },
  {
    name: "美術部",
    bandClassName: "bg-[#d71f26] text-white",
    accentClassName: "bg-[#d71f26]",
  },
  {
    name: "放送部",
    bandClassName: "bg-[#ab4997] text-white",
    accentClassName: "bg-[#ab4997]",
  },
  {
    // 黄色は白文字だと読みにくいので濃い文字にする
    name: "写真部",
    bandClassName: "bg-[#f7cf6c] text-slate-900",
    accentClassName: "bg-[#f7cf6c]",
  },
  {
    name: "軽音部",
    bandClassName: "bg-[#55b047] text-white",
    accentClassName: "bg-[#55b047]",
  },
];

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

/** 部員証風のカード。上部の帯に部名、丸アイコンが帯にかかる */
function CreatorCard({
  item,
  department,
}: {
  item: CreatorItem;
  department: DepartmentStyle;
}) {
  return (
    <li className="flex flex-col items-center overflow-hidden rounded-xl border border-slate-200 bg-white pb-4 text-center shadow-sm">
      <div
        className={`h-14 w-full pt-2 text-xs font-bold tracking-[0.3em] md:h-16 md:text-sm ${department.bandClassName}`}
      >
        {department.name}
      </div>
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="-mt-7 h-20 w-20 rounded-full border-4 border-white bg-slate-100 object-cover shadow md:-mt-8 md:h-28 md:w-28"
        />
      ) : (
        <div
          className="-mt-7 h-20 w-20 rounded-full border-4 border-white bg-slate-200 shadow md:-mt-8 md:h-28 md:w-28"
          aria-hidden
        />
      )}
      <h4 className="mt-3 w-full truncate px-3 text-base font-bold text-slate-900 md:text-xl">
        {item.name}
      </h4>
      <p className="mt-1 line-clamp-2 px-3 text-xs leading-tight text-slate-600 md:text-sm">
        {item.role}
      </p>
      {item.xUrl && (
        <a
          href={item.xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 grid h-10 w-10 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
          aria-label={`${item.name}のX`}
        >
          <XIcon />
        </a>
      )}
    </li>
  );
}

export function CreatorsSection() {
  return (
    <section id="creators" className="border-t border-slate-200 bg-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">クリエイター紹介</h2>
        <div className="mt-8 space-y-12">
          {DEPARTMENTS.map((department) => {
            const items = CREATORS.filter(
              (item) => item.department === department.name,
            );

            return (
              <div key={department.name}>
                <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900">
                  <span
                    className={`h-6 w-1.5 rounded-full ${department.accentClassName}`}
                    aria-hidden
                  />
                  {department.name}
                </h3>
                {items.length > 0 ? (
                  <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                    {items.map((item, index) => (
                      <CreatorCard
                        key={`${item.role}-${item.name}-${item.xUrl ?? index}`}
                        item={item}
                        department={department}
                      />
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-slate-500">
                    まだ登録がありません
                  </p>
                )}
              </div>
            );
          })}
        </div>
        {/* <div className="mt-12 text-center">
          <p className="mb-6 text-sm md:text-base text-slate-600 leading-relaxed">
            {CREATOR_RECRUITMENT_CAPTION}
          </p>
          <CreatorRecruitmentButton />
        </div> */}
      </div>
    </section>
  );
}
