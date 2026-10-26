/** 実行委員会アフターミーティングの告知（ここで編集） */
export const AFTER_MEETING = {
  image: {
    src: "/images/after-meet.jpeg",
    alt: "八煌フェス 感想・思い出募集",
    width: 968,
    height: 543,
  },
  title: "実行委員会アフターミーティング",
  dateLabel: "11月6日(金)",
  /** 感想・思い出募集フォーム */
  formUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfCkZc_x0jCoJCQwFfEaNkHIjR1r6NMtoC7wIQ7Rio8u4XFbQ/viewform",
  linkLabel: "感想・思い出を送る",
};

/** この日時を過ぎたら MV の告知を消す（開催日の翌0時・日本時間） */
export const AFTER_MEETING_END = new Date("2026-11-07T00:00:00+09:00");
