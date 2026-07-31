import { fetchMicroCmsList } from "../../../lib/microcms";
import type { PlayerItem } from "../../../types/player";
import { NextResponse } from "next/server";

/** microCMSのエンドポイント名（管理画面で作成したAPIのエンドポイントに合わせて変更） */
const PLAYER_ENDPOINT = "player";

export async function GET() {
  try {
    const { contents } = await fetchMicroCmsList<PlayerItem>(PLAYER_ENDPOINT);
    return NextResponse.json(contents);
  } catch (e) {
    console.error("Player API error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to fetch players" },
      { status: 500 },
    );
  }
}
