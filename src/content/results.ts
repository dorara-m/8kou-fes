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
  { title: "スプラトゥーン3", images: [
    { src: "/images/result/nawabari-t.png", alt: "ナワバリトーナメント", width: 1280, height: 720 },
    { src: "/images/result/nawabari-r.png", alt: "ナワバリ点数", width: 1280, height: 720 },
    { src: "/images/result/area-t.png", alt: "ガチエリアトーナメント", width: 1280, height: 720 },
    { src: "/images/result/area-r.png", alt: "ガチエリア点数", width: 1280, height: 720 },
  ] },
  { title: "マリオカート8DX", images: [
    { src: "/images/result/marica1.png", alt: "マリカ①", width: 1280, height: 720 },
    { src: "/images/result/marica2.png", alt: "マリカ②", width: 1280, height: 720 },
    { src: "/images/result/marica-sum.png", alt: "マリカ総合", width: 1280, height: 720 },
  ] },
  { title: "中間発表", layout: "stack", images: [
    { src: "/images/result/chukan.jpeg", alt: "中間結果", width: 1280, height: 720 },
  ] },
  { title: "ファーストペンギン", images: [
    { src: "/images/result/faspen1-1.png", alt: "ファーストペンギン1-1", width: 1280, height: 720 },
    { src: "/images/result/faspen1-2.png", alt: "ファーストペンギン1-2", width: 1280, height: 720 },
    { src: "/images/result/faspen2-1.png", alt: "ファーストペンギン2-1", width: 1280, height: 720 },
    { src: "/images/result/faspen2-2.png", alt: "ファーストペンギン2-2", width: 1280, height: 720 },
  ] },
  { title: "テトリス99", images: [
    { src: "/images/result/tetris1.png", alt: "テトリス1", width: 1280, height: 720 },
    { src: "/images/result/tetris2.png", alt: "テトリス2", width: 1280, height: 720 },
    { src: "/images/result/tetris3.png", alt: "テトリス3", width: 1280, height: 720 },
    { src: "/images/result/tetris-team.png", alt: "テトリスチーム総合", width: 1280, height: 720 },
    { src: "/images/result/tetris-person.png", alt: "テトリス個人総合", width: 1280, height: 720 },
  ] },
  { title: "クイズ大会", images: [
    { src: "/images/result/quiz.png", alt: "クイズ", width: 1280, height: 720 },
  ] },
  { title: "合計", images: [
    { src: "/images/result/all.png", alt: "競技のみ", width: 1280, height: 720 },
    { src: "/images/result/all-plus.png", alt: "リスナー足し合わせ", width: 1280, height: 720 },
  ] },
  { title: "総合結果", layout: "stack", images: [
    { src: "/images/result/last.png", alt: "最終結果", width: 1280, height: 720 },
  ] },
];
