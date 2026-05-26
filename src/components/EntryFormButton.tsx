"use client";

import { ENTRY_FORM_URL } from "@/content/entryForm";

const baseClassName =
  "inline-flex items-center justify-center rounded-full bg-[#4052a7] px-8 py-3 text-sm md:text-base font-bold text-white shadow-lg transition hover:bg-[#28346c]";

type EntryFormButtonProps = {
  variant?: "inline" | "fixed";
  className?: string;
};

export function EntryFormButton({
  variant = "inline",
  className = "",
}: EntryFormButtonProps) {
  if (!ENTRY_FORM_URL) return null;

  const fixedClassName =
    variant === "fixed"
      ? "fixed bottom-10 right-10 z-40"
      : "";

  return (
    <a
      href={ENTRY_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClassName} ${fixedClassName} ${className}`.trim()}
    >
      応募フォームはこちら！
    </a>
  );
}
