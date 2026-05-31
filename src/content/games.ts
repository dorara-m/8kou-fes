import type { GameItem } from "@/types/game";

export const CONFIRMED_GAMES: GameItem[] = [
  // { title: "確定競技名", description: "補足テキスト", image: "/example.png" },
  {
    title: "スプラトゥーン3",
    description:
      "ルールはナワバリ+ガチルールどれか1つの計2つを予定しています",
    image: "/game/splatoon3.jpg",
  },
  { title: "テトリス99", image: "/game/tetris99.jpeg" },
  { title: "クイズ大会", description:"zoomラウンジを使用します", image: "/game/quiz.png" },
];

export const CANDIDATE_GAMES: GameItem[] = [
  // { title: "候補競技名", description: "補足テキスト" },
  { title: "マリオカート（Switch）", description: "※ワールドか8DXか参加者さんの所持率で決めようと思っています" },
  { title: "Pokémon Champions" },
  { title: "PICOPARK" },
  { title: "Faaast Penguin （ファーストペンギン）" },
  { title: "PEAK" },
  { title: "Super Battle Golf" },
  { title: "パドルパドルパドる（Paddle Paddle Paddle）" },
];
