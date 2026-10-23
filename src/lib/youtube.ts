export function getYouTubeVideoId(url?: string) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, "").toLowerCase();
    let videoId: string | null = null;

    if (hostname === "youtu.be") {
      videoId = parsedUrl.pathname.split("/").filter(Boolean)[0] ?? null;
    } else if (hostname === "youtube.com" || hostname.endsWith(".youtube.com")) {
      if (parsedUrl.pathname === "/watch") {
        videoId = parsedUrl.searchParams.get("v");
      } else {
        const [pathType, pathVideoId] = parsedUrl.pathname
          .split("/")
          .filter(Boolean);
        if (["embed", "shorts", "live"].includes(pathType)) {
          videoId = pathVideoId ?? null;
        }
      }
    }

    return videoId && /^[A-Za-z0-9_-]{11}$/.test(videoId) ? videoId : null;
  } catch {
    return null;
  }
}

/** URL の list パラメータ（プレイリストID）。なければ null */
export function getYouTubePlaylistId(url?: string) {
  if (!url) return null;

  try {
    const playlistId = new URL(url).searchParams.get("list");
    return playlistId && /^[A-Za-z0-9_-]+$/.test(playlistId)
      ? playlistId
      : null;
  } catch {
    return null;
  }
}

export function getYouTubePlaylistUrl(url?: string) {
  const playlistId = getYouTubePlaylistId(url);
  return playlistId
    ? `https://www.youtube.com/playlist?list=${playlistId}`
    : null;
}

/** list パラメータ付きの URL はその動画から始まるプレイリストとして埋め込む */
export function getYouTubeEmbedUrl(url?: string) {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;

  const playlistId = getYouTubePlaylistId(url);
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0${
    playlistId ? `&list=${playlistId}` : ""
  }`;
}

/** 高画質順のサムネイル候補。存在しない解像度があるため上から順に試す。 */
export function getYouTubeThumbnailUrls(videoId: string) {
  return ["maxresdefault", "sddefault", "hqdefault"].map(
    (name) => `https://i.ytimg.com/vi/${videoId}/${name}.jpg`,
  );
}
