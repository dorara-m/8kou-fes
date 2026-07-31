const LIGHT_TEAM_COLOR = "#e7e8ed";

export function resolveLabelTextColor(teamColor?: string) {
  return teamColor === LIGHT_TEAM_COLOR ? "#231815" : "#fff";
}
