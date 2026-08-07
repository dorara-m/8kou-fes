import { fetchMicroCmsList } from "../../../lib/microcms";
import type { FanArtItem } from "../../../types/fanArt";
import { NextResponse } from "next/server";

/** microCMSのエンドポイント名（管理画面で作成したAPIのエンドポイントに合わせて変更） */
const FAN_ART_ENDPOINT = "fan-art";

export async function GET() {
  try {
    const { contents } = await fetchMicroCmsList<FanArtItem>(FAN_ART_ENDPOINT);
    return NextResponse.json(contents);
  } catch (e) {
    console.error("Fan art API error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to fetch fan art" },
      { status: 500 }
    );
  }
}
