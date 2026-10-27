import type { CaptainItem } from "@/types/captain";
import { getTeam } from "./teams";
import { withIds } from "./withIds";

export const CAPTAINS: CaptainItem[] = withIds<Omit<CaptainItem, "id">>([
  {
    image: {
      url: "/images/captain/j25qrptugbc.png",
      height: 850,
      width: 850,
    },
    name: "かんら",
    team: getTeam("e3li73yojqyq"),
    message_image: {
      url: "/images/captain-message/guren.png",
      height: 1080,
      width: 1920,
    },
    comment: "やるからには大いに楽しみながら優勝目指してがんがりまーす！",
    x_url: "https://x.com/kanra_kaiminch",
    youtube_url: "https://t.co/QiiFspavKT",
    voice_url: "https://youtube.com/shorts/cD71QQToqXw?feature=share",
  },
  {
    image: {
      url: "/images/captain/z-nylbuhomt9.png",
      height: 850,
      width: 850,
    },
    name: "星野 夜空",
    team: getTeam("4l9vzx4a9gz"),
    message_image: {
      url: "/images/captain-message/aonami.png",
      height: 1080,
      width: 1920,
    },
    comment: "メンバーの皆様をたくさん盛り上げてみんなで楽しく一つのチームにしていきたいです！\nよろしくお願いします！！",
    x_url: "https://x.com/yozora_pierrot",
    youtube_url: "https://t.co/SfSh7DoFw8",
    voice_url: "https://youtube.com/shorts/1M3HWTU0VGg",
  },
  {
    image: {
      url: "/images/captain/32__382savcp.png",
      height: 850,
      width: 850,
    },
    name: "山田 恋羽",
    team: getTeam("92q7vscgxo"),
    message_image: {
      url: "/images/captain-message/touka.png",
      height: 1080,
      width: 1920,
    },
    comment: "どんな状況でも楽しんだ者勝ち❕\nピンクチームの可愛い所沢山皆に見てもらっちゃうもんね💞💞",
    x_url: "https://x.com/yamadakohane",
    youtube_url: "https://www.youtube.com/@yamadakohane1004",
    voice_url: "https://youtube.com/shorts/HF2_Nv8OA84?feature=share",
  },
  {
    image: {
      url: "/images/captain/grqchzvv5zf.png",
      height: 850,
      width: 850,
    },
    name: "レオン=<br>オルカイーグル",
    team: getTeam("3ehcky1etdw"),
    message_image: {
      url: "/images/captain-message/suijin.png",
      height: 1080,
      width: 1920,
    },
    comment: "＼ﾊﾟｯｶｰﾝ／\n翠迅チーム団長のレオン=オルカイーグルです！緑VTuberの底力、ここに証明しましょう！チーム全員一致団結！優勝するぞー！おー！",
    x_url: "https://x.com/reon_orcaeagle",
    youtube_url: "https://t.co/SW1Ls9AtoH",
    voice_url: "https://youtube.com/shorts/pkxdimvypDs?feature=share",
  },
  {
    image: {
      url: "/images/captain/crk_iqvgr.png",
      height: 706,
      width: 706,
    },
    name: "MyMe",
    team: getTeam("n5qmogp5h_z"),
    message_image: {
      url: "/images/captain-message/tasogare.png",
      height: 1080,
      width: 1920,
    },
    comment: "「声でかいで賞」と「一番元気で賞」では金賞受賞確定なので、この調子で黄昏チーム団長として優勝＆金メダル獲得していくぞーっ‼️👊 💥",
    x_url: "https://x.com/myme_gaua",
    youtube_url: "https://www.youtube.com/@myme_gaua",
    voice_url: "https://youtube.com/shorts/IMNqLAh3Igs",
  },
  {
    image: {
      url: "/images/captain/z5ghlpzoequf.png",
      height: 850,
      width: 850,
    },
    name: "紫虎 ユラ",
    team: getTeam("sfypgr-1p35"),
    message_image: {
      url: "/images/captain-message/purple.png",
      height: 1080,
      width: 1920,
    },
    comment: "終わりたくなくなるぐらい楽しんでいきたいと思います!!",
    x_url: "https://x.com/shikou_yura",
    voice_url: "https://youtube.com/shorts/esT3-gfjLHg",
    youtube_url: "https://www.youtube.com/channel/UCJuY8wAxkABbzPGkn-JsdHA",
  },
  {
    image: {
      url: "/images/captain/24zvaidaq5.png",
      height: 850,
      width: 850,
    },
    name: "奏俱 らくり",
    team: getTeam("qz8mg90j4"),
    message_image: {
      url: "/images/captain-message/shirayuki.png",
      height: 1080,
      width: 1920,
    },
    comment: "全部を白一色に染めてやるのは僕たち白雪チーム！！\nそして団長は僕！いっぱい走る気満々の怪物だっ\nさあ行こっ！僕たちのわくわくと優勝はすぐそこだ！！！",
    x_url: "https://x.com/karakurinagu_V",
    voice_url: "https://youtube.com/shorts/5-nNsNqWfDI",
    youtube_url: "https://www.youtube.com/@KAnaguRAKURI",
  },
  {
    image: {
      url: "/images/captain/2ecbk7tl_n.png",
      height: 850,
      width: 850,
    },
    name: "異吹 ムレ",
    team: getTeam("ilrg1xnh0"),
    message_image: {
      url: "/images/captain-message/kokuya.png",
      height: 1080,
      width: 1920,
    },
    comment: "「黒夜組」団長の異世界人です。本大会の為、組の為、勝利の為、エンタメの為、楽しむ為に色々我慢できなくなるように組を導く所存でございます。行くわよアナタ達。よろしくお願いします。",
    x_url: "https://x.com/mure_kotobuki",
    youtube_url: "https://www.youtube.com/@murekotobuki",
    voice_url: "https://youtube.com/shorts/3Hw9UujITp8?feature=share",
  },
]);
