import { fetchMicroCmsList } from "../../../lib/microcms";
import type { GalleryItem } from "../../../types/gallery";
import { NextResponse } from "next/server";

/** microCMSのエンドポイント名（管理画面で作成したAPIのエンドポイントに合わせて変更） */
const GALLERY_ENDPOINT = "gallery";

export async function GET() {
  try {
    const { contents } = await fetchMicroCmsList<GalleryItem>(GALLERY_ENDPOINT);
    return NextResponse.json(contents);
  } catch (e) {
    console.error("Gallery API error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}
