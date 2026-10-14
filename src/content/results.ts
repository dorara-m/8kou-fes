import type { ResultGroup } from "@/types/result";

/**
 * 結果発表セクションに表示する。
 * images が空の見出しは「準備中」と表示する。
 * 例: { src: "/images/result/mvp1.jpeg", alt: "MVP賞 1", width: 1280, height: 720 }
 */
export const RESULT_GROUPS: ResultGroup[] = [
  { title: "MVP賞", layout: "row", images: [
    { src: "/images/result/mvp1.png", alt: "MVP賞 1", width: 1280, height: 720 },
    { src: "/images/result/mvp2.png", alt: "MVP賞 2", width: 1280, height: 720 },
    { src: "/images/result/mvp3.png", alt: "MVP賞 3", width: 1280, height: 720 },
    { src: "/images/result/mvp4.png", alt: "MVP賞 4", width: 1280, height: 720 },
    { src: "/images/result/mvp5.png", alt: "MVP賞 5", width: 1280, height: 720 },
  ] },
  {
    title: "競技",
    subGroups: [
      { title: "スプラトゥーン3", images: [] },
      { title: "マリオカート8DX", images: [] },
      { title: "ファーストペンギン", images: [
        { src: "/images/result/faspen1-1.png", alt: "ファーストペンギン1-1", width: 1280, height: 720 },
        { src: "/images/result/faspen1-2.png", alt: "ファーストペンギン1-2", width: 1280, height: 720 },
        { src: "/images/result/faspen2-1.png", alt: "ファーストペンギン2-1", width: 1280, height: 720 },
        { src: "/images/result/faspen2-2.png", alt: "ファーストペンギン2-2", width: 1280, height: 720 },
      ] },
      { title: "テトリス99", images: [
        { src: "/images/result/tetris.png", alt: "テトリス", width: 1280, height: 720 },
      ] },
      { title: "クイズ大会", images: [
        { src: "/images/result/quiz.png", alt: "クイズ", width: 1280, height: 720 },
      ] },
      { title: "合計", images: [
        { src: "/images/result/all.png", alt: "競技のみ", width: 1280, height: 720 },
        { src: "/images/result/allplus.png", alt: "リスナー足し合わせ", width: 1280, height: 720 },
      ] },
    ],
  },
  { title: "総合結果", layout: "stack", images: [
    { src: "/images/result/chukan.jpeg", alt: "中間結果", width: 1280, height: 720 },
    { src: "/images/result/last.png", alt: "最終結果", width: 1280, height: 720 },
  ] },
];
