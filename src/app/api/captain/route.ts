import { fetchMicroCmsList } from "../../../lib/microcms";
import type { CaptainItem } from "../../../types/captain";
import { NextResponse } from "next/server";

/** microCMSのエンドポイント名（管理画面で作成したAPIのエンドポイントに合わせて変更） */
const CAPTAIN_ENDPOINT = "captain";

export async function GET() {
  try {
    const { contents } = await fetchMicroCmsList<CaptainItem>(CAPTAIN_ENDPOINT);
    return NextResponse.json(contents);
  } catch (e) {
    console.error("Captain API error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to fetch captains" },
      { status: 500 },
    );
  }
}
