import type { CreditItem } from "@/types/credits";
import { TEAMS } from "./teams";

function getTeamColor(name: string) {
  return TEAMS.find((team) => team.name === name)?.color;
}

export const CREDITS: CreditItem[] = [
  {
    title: "参加・出演",
    groups: [
      {
        title: "紅蓮チーム",
        color: getTeamColor("紅蓮"),
        items: [
          { name: "かんら", note: "団長" },
          { name: "今際　サキ" },
          { name: "ガルゼル" },
          { name: "白銀　燐" },
          { name: "破紅　蒼磨" },
          { name: "柊　狐月" },
          { name: "緋繧　めいや" },
          { name: "雪風　スト" },
          { name: "りく猫" },
          { name: "ロゼッタ･アヴァール･アストロロギア･ソシエール･フェリス･ル･ディアブル･テッラ･アストラル･エスポワール･グランディエ･アビス･クストーデ" },
          { name: "犬牙　ユウ" },
        ],
      },
      {
        title: "青波チーム",
        color: getTeamColor("青波"),
        items: [
          { name: "星野　夜空", note: "団長" },
          { name: "青空　あのこ" },
          { name: "雨破　レイン" },
          { name: "カインヴェル" },
          { name: "風海　ルツネ" },
          { name: "志夏" },
          { name: "時ノ音　ゲンキ" },
          { name: "羽澄　ゆらん" },
          { name: "星綺　ゆな" },
          { name: "雅　はつる" },
        ],
      },
      {
        title: "翠迅チーム",
        color: getTeamColor("翠迅"),
        items: [
          { name: "レオン＝オルカイーグル", note: "団長" },
          { name: "琥星　楓碧" },
          { name: "シエリス・アルクリス" },
          { name: "ジョカ・ジョカ" },
          { name: "透間　七聖" },
          { name: "スバひび" },
          { name: "瀬戸内　神威" },
          { name: "発条　テクト" },
          { name: "はるのもり" },
          { name: "室　風太郎" },
        ],
      },
      {
        title: "黄昏チーム",
        color: getTeamColor("黄昏"),
        items: [
          { name: "MyMe", note: "団長" },
          { name: "イザナミアヌ" },
          { name: "卯月　春兎" },
          { name: "叶雨　つむぐ" },
          { name: "柑凪　しと" },
          { name: "小花　ぺち" },
          { name: "チャーはん" },
          { name: "宙星　ルカ" },
          { name: "まるみん" },
          { name: "リトリッパー" },
        ],
      },
      {
        title: "桃華チーム",
        color: getTeamColor("桃華"),
        items: [
          { name: "山田　恋羽", note: "団長" },
          { name: "赤　すずみ" },
          { name: "いおりょぎ" },
          { name: "九条　ゆら" },
          { name: "小守　にいと" },
          { name: "御便　にゃぎ" },
          { name: "しゃのらん" },
          { name: "紡木　熊" },
          { name: "夢兎　のん" },
          { name: "桃宮　弥生" },
        ],
      },
      {
        title: "紫電チーム",
        color: getTeamColor("紫電"),
        items: [
          { name: "紫虎　ユラ", note: "団長" },
          { name: "絵餓鬼　ザビ丸" },
          { name: "音頭・ルゥ" },
          { name: "検察側の証人" },
          { name: "ことあ" },
          { name: "しにー" },
          { name: "瀬々名　ルビー" },
          { name: "宙乃　音斗" },
          { name: "月影　ルイ" },
          { name: "波宮" },
        ],
      },
      {
        title: "白雪チーム",
        color: getTeamColor("白雪"),
        items: [
          { name: "奏倶　らくり", note: "団長" },
          { name: "小羽音　いこい" },
          { name: "蒼白獅　れお" },
          { name: "花里　透" },
          { name: "星月　りおな" },
          { name: "眞神　白狼" },
          { name: "三鍵　とびら" },
          { name: "餅乃　ふぉか" },
          { name: "夜見月　アルト" },
          { name: "白望　イヅネ" },
        ],
      },
      {
        title: "黒夜チーム",
        color: getTeamColor("黒夜"),
        items: [
          { name: "異吹　ムレ", note: "団長" },
          { name: "安楽　うしろ" },
          { name: "海汐　しゃち" },
          { name: "海栗　つばさ" },
          { name: "サクシ" },
          { name: "椎乃。" },
          { name: "シエル" },
          { name: "波切　潮" },
          { name: "幽羽　戒人" },
          { name: "夜月　なぎ" },
        ],
      },
    ],
  },
  {
    title: "制作室",
    items: [
      { name: "如月　あやめ", note: "担当：告知動画" },
    ],
  },
  {
    title: "美術部",
    items: [
      { name: "糸泉　線子", note: "担当：準優勝商品、live2Dアイテム" },
      { name: "絵餓鬼　ザビ丸", note: "担当：カウントダウン画像、ファンアート" },
      { name: "N番囚人のえぬた", note: "担当：ファンアート" },
      { name: "黒川　よみ", note: "担当：MVP賞" },
      { name: "栞　つづる", note: "担当：団長任命状制作" },
      { name: "不知火。", note: "担当：優勝賞品、カウントダウン画像" },
      { name: "波宮", note: "担当：チラシ風画像、カウントダウン画像、トーナメント表" },
      { name: "bon", note: "担当：タイムテーブル、大会当日サムネイル、結果発表、オーバーレイ" },
      { name: "夜縹　はか", note: "担当：大会当日サムネイル、推しチーム画像" },
      { name: "宵未鳥", note: "担当：閉幕ムービー" },
    ],
  },
  {
    title: "放送部",
    items: [
      { name: "アルカ・トーニッツ", note: "担当：マリオカート8DX　実況・解説" },
      { name: "音來山　マオ", note: "担当：スプラトゥーン3　司会" },
      { name: "冠城　夜曇", note: "担当：テトリス99　司会" },
      { name: "ぐりぐりぐり", note: "担当：ファーストペンギン　実況・解説" },
      { name: "涼乱　ユラ", note: "担当：マリオカート8DX　司会" },
      { name: "蘭符", note: "担当：クイズ　司会" },
      { name: "LUKA-SEN(るかせん)", note: "担当：テトリス99　実況・解説" },
    ],
  },
  {
    title: "写真部",
    items: [
      { name: "アスタリスク" },
    ],
  },
  {
    title: "軽音部",
    items: [
      { name: "のいまげ" },
    ],
  },
  {
    title: "八煌フェス公式サイト",
    items: [
      { name: "雨東風　ぬめちゃ" },
    ],
  },
  {
    title: "クイズ制作",
    items: [
      { name: "ゔぁんだる。" },
      { name: "リスナーの皆様" },
    ],
  },
  {
    title: "本配信BGM・閉幕ムービー",
    items: [
      { name: "煌めき" },
      { name: "作詞作曲：のいまげ" },
      { name: "動画：宵未鳥" },
    ],
  },
  {
    title: "実施ゲーム",
    items: [
      { name: "スプラトゥーン3" },
      { name: "マリオカート8DX" },
      { name: "ファーストペンギン" },
      { name: "テトリス99" },
    ],
  },
  {
    title: "主催",
    items: [
      { name: "ラルル・アルナイル" },
    ],
  },
  {
    title: "実行委員",
    items: [
      { name: "雨東風　ぬめちゃ" },
      { name: "ゔぁんだる。" },
      { name: "みぺん" },
      { name: "夢咲　乃彩" },
    ],
  },
  {
    title: "Special Thanks",
    items: [
      {
        name: "私たちの『やりたいこと』を応援してくれた『きみ』",
        highlight: true,
      },
    ],
  },
];
