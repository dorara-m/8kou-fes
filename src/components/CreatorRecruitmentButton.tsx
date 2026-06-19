"use client";

import { CREATOR_RECRUITMENT_FORM_URL } from "@/content/creatorRecruitment";

const baseClassName =
  "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm md:text-base font-bold shadow-lg transition";

const activeClassName = `${baseClassName} bg-[#4052a7] text-white hover:bg-[#28346c]`;

type CreatorRecruitmentButtonProps = {
  variant?: "inline" | "fixed";
  className?: string;
};

export function CreatorRecruitmentButton({
  variant = "inline",
  className = "",
}: CreatorRecruitmentButtonProps) {
  if (!CREATOR_RECRUITMENT_FORM_URL) return null;

  const fixedClassName =
    variant === "fixed"
      ? "fixed bottom-5 right-3 z-40 md:bottom-8 md:right-8"
      : "";

  const fixedActiveClassName =
    variant === "fixed" ? "bg-red-600 hover:bg-red-800" : "";

  return (
    <a
      href={CREATOR_RECRUITMENT_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${activeClassName} ${fixedActiveClassName} ${fixedClassName} ${className}`.trim()}
    >
      クリエイターさん募集中！
    </a>
  );
}
