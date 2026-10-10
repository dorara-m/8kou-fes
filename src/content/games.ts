import type { GameDetail } from "@/types/game";

/** タイムテーブル内に、ゲームタイトルごとに表示する */
export const GAME_DETAILS: GameDetail[] = [
  {
    title: "スプラトゥーン3",
    rules: [
      {
        title: "ナワバリバトル",
        images: [
          {
            title: "トーナメント表",
            src: "/images/game/nawabari1.jpeg",
            alt: "スプラトゥーン3 ナワバリバトル トーナメント表",
            width: 1200,
            height: 675,
          },
          {
            title: "出場選手",
            src: "/images/game/nawabari2.jpeg",
            alt: "スプラトゥーン3 ナワバリバトル 出場選手",
            width: 1200,
            height: 675,
          },
        ],
      },
      {
        title: "ガチエリア",
        images: [
          {
            title: "トーナメント表",
            src: "/images/game/area1.jpeg",
            alt: "スプラトゥーン3 ガチエリア トーナメント表",
            width: 1200,
            height: 675,
          },
          {
            title: "出場選手",
            src: "/images/game/area2.jpeg",
            alt: "スプラトゥーン3 ガチエリア 出場選手",
            width: 1200,
            height: 675,
          },
        ],
      },
    ],
  },
  {
    title: "マリオカート8DX",
    rules: [
      {
        title: "①グループ",
        images: [
          {
            title: "対戦表",
            src: "/images/game/mariokart1-1.jpeg",
            alt: "マリオカート8DX ①グループ 対戦表",
            width: 1200,
            height: 675,
          },
          {
            title: "出場選手",
            src: "/images/game/mariokart1-2.jpeg",
            alt: "マリオカート8DX ①グループ 出場選手",
            width: 1200,
            height: 675,
          },
        ],
      },
      {
        title: "②グループ",
        images: [
          {
            title: "対戦表",
            src: "/images/game/mariokart2-1.jpeg",
            alt: "マリオカート8DX ②グループ 対戦表",
            width: 1280,
            height: 720,
          },
          {
            title: "出場選手",
            src: "/images/game/mariokart2-2.jpeg",
            alt: "マリオカート8DX ②グループ 出場選手",
            width: 1280,
            height: 720,
          },
        ],
      },
    ],
  },
  {
    title: "ファーストペンギン",
    rules: [
      {
        images: [
          {
            title: "1回戦",
            src: "/images/game/penguin1.jpeg",
            alt: "ファーストペンギン 1回戦 出場選手",
            width: 1280,
            height: 720,
          },
          {
            title: "2回戦",
            src: "/images/game/penguin2.jpeg",
            alt: "ファーストペンギン 2回戦 出場選手",
            width: 1280,
            height: 720,
          },
        ],
      },
    ],
  },
  {
    title: "テトリス99",
    rules: [
      {
        images: [
          {
            title: "出場選手①",
            src: "/images/game/tetris1.jpeg",
            alt: "テトリス99 出場選手（紅蓮・青波・桃華・翠迅）",
            width: 1200,
            height: 675,
          },
          {
            title: "出場選手②",
            src: "/images/game/tetris2.jpeg",
            alt: "テトリス99 出場選手（黄昏・紫電・白雪・黒夜）",
            width: 1200,
            height: 675,
          },
        ],
      },
    ],
  },
];
