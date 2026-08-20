"use client";

import { useEffect } from "react";

type VoicePlayerModalProps = {
  embedUrl: string;
  name: string;
  onClose: () => void;
};

function getPlainText(value: string) {
  return value.replace(/<[^>]*>/g, "").trim();
}

export function VoicePlayerModal({
  embedUrl,
  name,
  onClose,
}: VoicePlayerModalProps) {
  const displayName = getPlainText(name);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-player-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <h3 id="voice-player-title" className="font-bold text-slate-900">
            {displayName} のボイス
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            aria-label="ボイスプレイヤーを閉じる"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="aspect-video bg-black">
          <iframe
            className="h-full w-full"
            src={embedUrl}
            title={`${displayName}のボイス動画`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
