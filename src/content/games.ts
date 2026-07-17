import type { GameItem } from "@/types/game";

export const CONFIRMED_GAMES: GameItem[] = [
  // { title: "確定競技名", description: "補足テキスト", image: "/example.png" },
  {
    title: "スプラトゥーン3",
    description:
      "ルールはナワバリとガチエリア。それぞれトーナメント形式で行います",
    image: "/game/splatoon3.jpg",
  },
  { title: "マリオカート8DX", description: "バトルモードを混合グループ(2チームずつ共闘)で行います", image:"/game/mariokart.png" },
  { title: "ファーストペンギン", description: "各チーム4人ずつの計32人でレースを行います", image:"/game/penguin.jpg" },
  { title: "テトリス99", image: "/game/tetris99.jpeg", description:"最終順位がつくまで行います" },
  { title: "クイズ大会", description:"zoomラウンジを使用したオリジナルクイズを行います", image: "/game/quiz.png" },
];

