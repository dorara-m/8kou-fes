import { fetchMicroCmsList } from "../../../lib/microcms";
import type { QAItem } from "../../../types/qa";
import { NextResponse } from "next/server";

/** microCMSのエンドポイント名（管理画面で作成したAPIのエンドポイントに合わせて変更） */
const QA_ENDPOINT = "faq";

export async function GET() {
  try {
    const { contents } = await fetchMicroCmsList<QAItem>(QA_ENDPOINT);
    return NextResponse.json(contents);
  } catch (e) {
    console.error("Q&A API error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to fetch Q&A" },
      { status: 500 }
    );
  }
}
