export const TEAM_QUERY_KEY = "team";

export const TEAM_COLOR_ORDER = [
  "紅蓮",
  "青波",
  "桃華",
  "翠迅",
  "黄昏",
  "紫電",
  "白雪",
  "黒夜",
];

const TEAM_SLUGS: Record<string, string> = {
  紅蓮: "guren",
  青波: "aonami",
  桃華: "touka",
  翠迅: "suijin",
  黄昏: "tasogare",
  紫電: "shiden",
  白雪: "shirayuki",
  黒夜: "kokuya",
};

export function getTeamSlug(name: string): string | undefined {
  const teamName = TEAM_COLOR_ORDER.find((teamName) => name.includes(teamName));
  return teamName ? TEAM_SLUGS[teamName] : undefined;
}
