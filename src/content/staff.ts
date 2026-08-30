import type { StaffItem } from "@/types/staff";
import { withIds } from "./withIds";

export const STAFF: StaffItem[] = withIds<Omit<StaffItem, "id">>([
  {
    image: {
      url: "/images/staff/vylinrw-nu.png",
      height: 800,
      width: 800,
    },
    image2: {
      url: "/images/staff/vylinrw-nu-2.jpg",
      height: 563,
      width: 564,
    },
    name: "ラルル・アルナイル",
    comment: "雑談とお酒を愛するスターラグーン魔術学校の見習い魔術師。本大会は「現実的な範囲で無茶をする！」を目標に掲げ、参加VTuber様のみならず、【リスナーさんの思い出にもなる大会】を目指します！！",
    x_url: "https://x.com/Lalulu_Alnair",
    youtube_url: "https://www.youtube.com/@Lalulu_Alnair",
    voice_url: "https://youtube.com/shorts/BHg06EFqA18",
  },
  {
    image: {
      url: "/images/staff/g4ojrh9v81.png",
      height: 800,
      width: 800,
    },
    image2: {
      url: "/images/staff/g4ojrh9v81-2.jpg",
      height: 639,
      width: 639,
    },
    name: "雨東風ぬめちゃ",
    comment: "雨の降りしきる町からやってきた、狼人間。ゲーム実況と歌ってみた、雑談。某〇〇さんじが大好きなただのファンボ。技術と熱意で精一杯盛り上げたい！！",
    x_url: "https://x.com/numechaaa",
    youtube_url: "https://www.youtube.com/c/numechaaa",
  },
  {
    image: {
      url: "/images/staff/lfoaxyt2mf.png",
      height: 800,
      width: 800,
    },
    image2: {
      url: "/images/staff/lfoaxyt2mf-2.png",
      height: 800,
      width: 800,
    },
    name: "みぺん",
    comment: "かいみんちゃんねる！にて夫婦でゲームや雑談メインに配信中の帝王ぺんぎん🐧一期一会の気持ちで、最高の大会にしていきます！💚✨",
    x_url: "https://x.com/mipen_kaiminch",
    youtube_url: "https://www.youtube.com/@kaiminChannel",
    voice_url: "https://youtube.com/shorts/ndI_xQC1KRs?feature=share",
  },
  {
    image: {
      url: "/images/staff/7m2mnm2oj.png",
      height: 800,
      width: 800,
    },
    image2: {
      url: "/images/staff/7m2mnm2oj-2.png",
      height: 850,
      width: 850,
    },
    name: "ゔぁんだる。",
    comment: "ゲームに音楽に色んなことをしている一般成人男性。何事も\"ノリと勢い\"でどうにかしてきた影響か、その他のすべてを忘却してしまった。",
    x_url: "https://x.com/Vandal_2213",
    youtube_url: "https://www.youtube.com/@gaming_Vandal",
  },
  {
    image: {
      url: "/images/staff/b3x25gz5z.png",
      height: 800,
      width: 800,
    },
    image2: {
      url: "/images/staff/b3x25gz5z-2.png",
      height: 850,
      width: 850,
    },
    name: "夢咲乃彩",
    comment: "みんなを褒める、応援する。超ポジティブギャルだよ。たまにクリエイティブもしているらしい。大会を盛り上げるために、明るく元気にがんばります",
    x_url: "https://x.com/n_yumesakivt?s=21",
    youtube_url: "https://www.youtube.com/@noah.yumesaki_vt",
  },
]);
