/** ネップリ（ブロマイド）配布情報（ここで編集） */
export const NET_PRINT = {
  image: {
    src: "/images/neppuri.jpeg",
    alt: "ブロマイド配布決定！全9種",
    width: 2048,
    height: 1152,
  },
  periodLabel: "2026/11/9 18時頃まで",
  /** セブンイレブン（ネットプリント）はチームごとに予約番号が異なる */
  sevenEleven: {
    numberLabel: "プリント予約番号",
    items: [
      { name: "🔥紅蓮チーム", number: "87542516" },
      { name: "🌊青波チーム", number: "82487061" },
      { name: "🌿翠迅チーム", number: "92192606" },
      { name: "🌸桃華チーム", number: "71131855" },
      { name: "🌇黄昏チーム", number: "63311604" },
      { name: "⚡紫電チーム", number: "31395065" },
      { name: "❄️白雪チーム", number: "40432122" },
      { name: "🌙黒夜チーム", number: "31203284" },
      { name: "🚩実行委員会", number: "42939299" },
    ],
  },
  /** セブンイレブン以外は共通のユーザー番号 */
  others: {
    numberLabel: "ユーザー番号",
    number: "WWXWAA2PZL",
    stores: ["ファミリーマート", "ローソン", "ミニストップ", "ポプラグループ"],
  },
};

/** この日時を過ぎたらボタンを非表示にする（日本時間） */
export const NET_PRINT_END = new Date("2026-11-09T18:00:00+09:00");
