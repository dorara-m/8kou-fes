const BASE_URL = process.env.NEXT_PUBLIC_CMS_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_CMS_API_KEY;

/**
 * microCMS リストAPIを取得
 * @param endpoint 例: "gallery"
 */
export async function fetchMicroCmsList<T>(endpoint: string): Promise<{ contents: T[]; totalCount: number }> {
  if (!BASE_URL || !API_KEY) {
    throw new Error("NEXT_PUBLIC_CMS_API_URL または NEXT_PUBLIC_CMS_API_KEY が設定されていません");
  }
  const url = `${BASE_URL.replace(/\/$/, "")}/${endpoint}`;
  const res = await fetch(url, {
    headers: { "X-MICROCMS-API-KEY": API_KEY },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`microCMS API error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return { contents: json.contents ?? [], totalCount: json.totalCount ?? 0 };
}
