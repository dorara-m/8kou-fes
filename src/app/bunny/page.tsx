import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BunnyGirlsPage } from "@/components/BunnyGirlsPage";
import { BUNNY_PAGE_ENABLED } from "@/lib/bunnyPage";

export const metadata: Metadata = {
  title: "#八煌フェスバニーガール部 | 八煌フェス〜V体育祭〜",
};

export default function Page() {
  if (!BUNNY_PAGE_ENABLED) notFound();
  return <BunnyGirlsPage />;
}
