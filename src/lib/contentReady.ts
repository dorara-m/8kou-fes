"use client";

const CONTENT_READY_EVENT = "app:content-ready";

declare global {
  interface Window {
    __appContentReady?: boolean;
  }
}

/** ページ上部から順に読み込まれる非同期コンテンツが全て確定した(成功/失敗問わず)ことを通知する */
export function markContentReady() {
  if (typeof window === "undefined" || window.__appContentReady) return;
  window.__appContentReady = true;
  window.dispatchEvent(new Event(CONTENT_READY_EVENT));
}

function isContentReady() {
  return typeof window !== "undefined" && Boolean(window.__appContentReady);
}

/**
 * コンテンツが確定済みなら即座に、そうでなければ確定した時点で一度だけ callback を実行する。
 * クリーンアップ用の解除関数を返す。
 */
function onContentReady(callback: () => void) {
  if (isContentReady()) {
    callback();
    return () => {};
  }
  window.addEventListener(CONTENT_READY_EVENT, callback, { once: true });
  return () => window.removeEventListener(CONTENT_READY_EVENT, callback);
}

/**
 * 指定idの要素へスクロールする。まず現状のレイアウトで即座にスクロールし、
 * その時点でまだ上部コンテンツが読み込み中だった場合のみ、確定後にもう一度
 * (このときの1回だけ)スクロールし直して着地位置のズレを補正する。
 */
export function scrollToSection(id: string) {
  const scroll = () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  scroll();
  if (!isContentReady()) {
    onContentReady(scroll);
  }
}

export { onContentReady };
