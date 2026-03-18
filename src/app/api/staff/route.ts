import { fetchMicroCmsList } from "../../../lib/microcms";
import type { StaffItem } from "../../../types/staff";
import { NextResponse } from "next/server";

/** microCMSのエンドポイント名（管理画面で作成したAPIのエンドポイントに合わせて変更） */
const STAFF_ENDPOINT = "staff";

export async function GET() {
  try {
    const { contents } = await fetchMicroCmsList<StaffItem>(STAFF_ENDPOINT);
    return NextResponse.json(contents);
  } catch (e) {
    console.error("Staff API error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to fetch staff" },
      { status: 500 }
    );
  }
}
