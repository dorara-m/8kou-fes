import type { TeamItem } from "@/types/team";

export const TEAMS: TeamItem[] = [
  {
    id: "e3li73yojqyq",
    name: "紅蓮",
    kana: "ぐれん",
    color: "#d71f26",
  },
  {
    id: "4l9vzx4a9gz",
    name: "青波",
    kana: "あおなみ",
    color: "#3f51b5",
  },
  {
    id: "92q7vscgxo",
    name: "桃華",
    kana: "とうか",
    color: "#d87bae",
  },
  {
    id: "3ehcky1etdw",
    name: "翠迅",
    kana: "すいじん",
    color: "#55b047",
  },
  {
    id: "n5qmogp5h_z",
    name: "黄昏",
    kana: "たそがれ",
    color: "#f7cf6c",
  },
  {
    id: "sfypgr-1p35",
    name: "紫電",
    kana: "しでん",
    color: "#ab4997",
  },
  {
    id: "qz8mg90j4",
    name: "白雪",
    kana: "しらゆき",
    color: "#e7e8ed",
  },
  {
    id: "ilrg1xnh0",
    name: "黒夜",
    kana: "こくや",
    color: "#231815",
  },
];

const teamsById = new Map(TEAMS.map((team) => [team.id, team]));

export function getTeam(id?: string): TeamItem | undefined {
  return id ? teamsById.get(id) : undefined;
}
