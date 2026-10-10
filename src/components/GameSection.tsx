"use client";

import type { ReactNode } from "react";

/** タイムテーブルセクション内の競技ブロック（#games のアンカー） */
export function GameSection({ children }: { children?: ReactNode }) {
  return (
    <div id="games" className="mt-16 scroll-mt-20 space-y-12">
      {children}
    </div>
  );
}
