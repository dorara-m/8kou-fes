"use client";

import { useEffect, useState } from "react";
import { NET_PRINT, NET_PRINT_END } from "@/content/netPrint";

type StoreTab = "sevenEleven" | "others";

function isDuringNetPrint() {
  return Date.now() < NET_PRINT_END.getTime();
}

/** ネップリ配布期間中（〜NET_PRINT_END）右下に固定表示するボタン。押すと配布情報のモーダルを開く */
export function NetPrintButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const tick = () => setVisible(isDuringNetPrint());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-3 z-40 inline-flex items-center gap-2 rounded-full border-2 border-white bg-gradient-to-r from-[#d71f26] to-[#ab4997] px-7 py-3 text-sm font-bold text-white shadow-[0_6px_20px_rgba(215,31,38,0.5)] transition hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d71f26] focus-visible:ring-offset-2 md:bottom-8 md:right-8 md:text-base"
      >
        <span className="relative flex h-3 w-3" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f7cf6c] opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-[#f7cf6c]" />
        </span>
        ブロマイド配布中！
      </button>
      {open && <NetPrintModal onClose={() => setOpen(false)} />}
    </>
  );
}

/** ネップリ配布情報のモーダル（Esc・背景クリックで閉じる） */
function NetPrintModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<StoreTab>("sevenEleven");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const tabs: { key: StoreTab; label: string }[] = [
    { key: "sevenEleven", label: "セブンイレブン" },
    { key: "others", label: "その他のコンビニ" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="ブロマイド配布のお知らせ"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="flex min-h-full items-center justify-center"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div className="relative w-full max-w-[960px] overflow-hidden rounded-lg bg-white text-slate-900 shadow-2xl lg:grid lg:max-w-[1280px] lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <img
            src={NET_PRINT.image.src}
            alt={NET_PRINT.image.alt}
            className="h-auto w-full lg:self-center"
            width={NET_PRINT.image.width}
            height={NET_PRINT.image.height}
          />
          {/* PC では右列の高さを画像に合わせ、はみ出す分は番号エリア内でスクロールさせる */}
          <div className="lg:relative">
            <div className="p-5 sm:p-8 lg:absolute lg:inset-0 lg:flex lg:flex-col lg:p-6 lg:pt-14">
              <p className="mb-6 lg:mb-4 lg:shrink-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-lg bg-[#fff4d6] px-4 py-3 text-center ring-2 ring-[#f7cf6c]">
                <span className="rounded bg-[#d71f26] px-2 py-0.5 text-sm font-bold text-white">
                  プリント期間
                </span>
                <span className="text-lg font-bold text-[#d71f26] sm:text-2xl lg:text-xl">
                  {NET_PRINT.periodLabel}
                </span>
              </p>

              <div
                className="mb-5 lg:mb-3 lg:shrink-0 grid grid-cols-2 rounded-full bg-slate-100 p-1"
                role="tablist"
                aria-label="コンビニを選択"
              >
                {tabs.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={tab === key}
                    onClick={() => setTab(key)}
                    className={`rounded-full px-3 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 sm:text-base ${
                      tab === key
                        ? "bg-[#4052a7] text-white shadow"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="lg:-mr-3 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-3">
                {tab === "sevenEleven" ? (
                  <div role="tabpanel">
                    <p className="mb-3 lg:mb-2 text-sm text-slate-600">
                      {NET_PRINT.sevenEleven.numberLabel}
                      はチームごとに異なります
                    </p>
                    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 lg:gap-1">
                      {NET_PRINT.sevenEleven.items.map(({ name, number }) => (
                        <li
                          key={number}
                          className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-4 py-2 lg:py-1"
                        >
                          <span className="font-bold">{name}</span>
                          <span className="font-mono text-lg font-bold tracking-wider">
                            {number}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <dl
                    role="tabpanel"
                    className="grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-x-6"
                  >
                    <dt className="font-bold">
                      {NET_PRINT.others.numberLabel}
                    </dt>
                    <dd className="-mt-3 flex flex-wrap items-center gap-3 sm:mt-0">
                      <span className="font-mono text-xl font-bold tracking-wider">
                        {NET_PRINT.others.number}
                      </span>
                    </dd>
                    <dt className="font-bold">対象コンビニ</dt>
                    <dd className="-mt-3 sm:mt-0">
                      {NET_PRINT.others.stores.join("・")}
                    </dd>
                  </dl>
                )}
              </div>
            </div>
          </div>
          <button
            type="button"
            autoFocus
            onClick={() => onClose()}
            className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full bg-white text-2xl leading-none text-slate-900 shadow-lg transition hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            aria-label="モーダルを閉じる"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
