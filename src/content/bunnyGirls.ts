import type { BunnyGirlItem, BunnyImage } from "@/types/bunnyGirl";
import { CAPTAINS } from "./captains";
import { CREATORS } from "./creators";
import { PLAYERS } from "./players";
import { STAFF } from "./staff";

function getPlainText(value: string) {
  return value.replace(/<[^>]*>/g, "").trim();
}

/** 選手一覧(players.ts)から名前で引き、アイコンを本サイトのものに揃える */
function fromPlayer(name: string, ...bunnyImages: BunnyImage[]): BunnyGirlItem {
  const player = PLAYERS.find((item) => getPlainText(item.name ?? "") === name);
  if (!player) throw new Error(`選手「${name}」が players.ts に見つかりません`);
  return {
    id: `player-${player.id}`,
    name,
    role: "選手",
    icon: player.icon?.url,
    bunnyImages,
  };
}

/** 団長一覧(captains.ts)から名前で引き、アイコンを本サイトのものに揃える */
function fromCaptain(name: string, ...bunnyImages: BunnyImage[]): BunnyGirlItem {
  const captain = CAPTAINS.find((item) => getPlainText(item.name ?? "") === name);
  if (!captain) throw new Error(`団長「${name}」が captains.ts に見つかりません`);
  return {
    id: `captain-${captain.id}`,
    name,
    role: "団長",
    icon: captain.image?.url,
    bunnyImages,
  };
}

/** 実行委員一覧(staff.ts)から名前で引き、アイコンを本サイトのものに揃える */
function fromStaff(name: string, ...bunnyImages: BunnyImage[]): BunnyGirlItem {
  const staff = STAFF.find((item) => getPlainText(item.name ?? "") === name);
  if (!staff) throw new Error(`実行委員「${name}」が staff.ts に見つかりません`);
  return {
    id: `staff-${staff.id}`,
    name,
    role: "実行委員",
    // 実行委員紹介で切り替わって出る「もう1枚」の方を使う
    icon: (staff.image2 ?? staff.image)?.url,
    bunnyImages,
  };
}

/** クリエイター一覧(creators.ts)から名前で引き、アイコンを本サイトのものに揃える */
function fromCreator(name: string, ...bunnyImages: BunnyImage[]): BunnyGirlItem {
  const creator = CREATORS.find((item) => item.name.trim() === name);
  if (!creator) throw new Error(`クリエイター「${name}」が creators.ts に見つかりません`);
  return {
    id: `creator-${name}`,
    name,
    role: "クリエイター",
    icon: creator.image,
    bunnyImages,
  };
}

// 1人に複数枚ある場合は fromPlayer("名前", { ...1枚目 }, { ...2枚目 }) のように続けて書く
// イラストの作者は author に { name: "作者名", xUrl: "https://x.com/..." } の形で指定する
// TODO: 作者を追記する
export const BUNNY_GIRLS: BunnyGirlItem[] = [
  fromPlayer("星綺 ゆな", { url: "/images/bunny/yuna.png", author:{name: "椎乃。",xUrl:"https://x.com/Shiino419_/status/2114599441068089795?s=20"}}),
  fromPlayer("蒼白獅 れお", { url: "/images/bunny/reo.jpeg", author:{name: "椎乃。",xUrl:"https://x.com/Shiino419_/status/2114599441068089795?s=20"}}),
  fromPlayer("波切 潮", { url: "/images/bunny/ushio.jpeg", author:{name: "椎乃。",xUrl:"https://x.com/Shiino419_/status/2114599441068089795?s=20"}}),
  fromPlayer("海栗 つばさ", { url: "/images/bunny/tsubasa.jpeg", author:{name: "椎乃。",xUrl:"https://x.com/Shiino419_/status/2114668505777971583?s=20"}}),
  fromPlayer(
    "椎乃。",
    { url: "/images/bunny/shiino.jpeg", author:{name: "おこっち",xUrl:"https://x.com/ococchi_cocchi/status/2114677220522541092?s=20"}},
    // TODO: 2枚目のイラストを public/images/bunny/shiino2.jpeg に置き、作者を入れる
    { url: "/images/bunny/shiino2.jpeg",author:{name: "卯月 春兎",xUrl:"https://x.com/Haruto_u0410/status/2114737482919186591?s=20"} },
  ),
  fromPlayer("卯月 春兎", { url: "/images/bunny/haruto.jpeg", author:{name: "椎乃。",xUrl:"https://x.com/Shiino419_/status/2114684630955864552?s=20"}}),
  fromStaff("ラルル・アルナイル", { url: "/images/bunny/ralulu.jpeg",author:{name: "アスタリスク",xUrl:"https://x.com/asterisk_vtuber/status/2114686450344374668?s=20"}}),
  fromPlayer("海汐 しゃち", { url: "/images/bunny/syachi.jpeg", author:{name: "椎乃。",xUrl:"https://x.com/Shiino419_/status/2114699774679281713?s=20"}}),
  fromPlayer("ジョカ・ジョカ", { url: "/images/bunny/joka.jpeg", author:{name: "宵未鳥",xUrl:"https://x.com/yomidori_37/status/2114724359554334978?s=20"}}),
  fromCreator("アスタリスク", { url: "/images/bunny/asterisk.jpeg", author:{name: "アスタリスク",xUrl:"https://x.com/asterisk_vtuber/status/2114737996515905779?s=20"}}),
  fromCreator("音來山マオ", { url: "/images/bunny/mao.jpeg", author:{name: "音來山マオ",xUrl:"https://x.com/negiyama_mao/status/2114745673694539894?s=20"}}),
  fromCreator("N番囚人のえぬた", { url: "/images/bunny/enuta.jpeg", author:{name: "N番囚人のえぬた",xUrl:"https://x.com/pano_N_pticon/status/2114747170633216080?s=20"}}),
];
