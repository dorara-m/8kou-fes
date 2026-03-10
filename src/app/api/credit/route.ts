import { fetchMicroCmsList } from "../../../lib/microcms";
import type { CreditItem } from "../../../types/credits";
import { NextResponse } from "next/server";

/** microCMSのエンドポイント名（管理画面で作成したAPIのエンドポイントに合わせて変更） */
const CREDIT_ENDPOINT = "credit";

export async function GET() {
  try {
    const { contents } = await fetchMicroCmsList<CreditItem>(CREDIT_ENDPOINT);
    return NextResponse.json(contents);
  } catch (e) {
    console.error("Credit API error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to fetch credit" },
      { status: 500 }
    );
  }
}
