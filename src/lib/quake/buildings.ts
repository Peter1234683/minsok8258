import type { BuildingProfile } from "./types.ts";

export const BUILDINGS: BuildingProfile[] = [
  {
    id: "home",
    label: "집 · 아파트",
    floors: 15,
    learnedHz: [0.35, 0.9],
    constructionHours: [8, 18],
    weekdayOnly: true,
    noiseFloorG: 0.004,
    note: "T≈1.5s 장주기. 평일 낮 고주파는 공사로 기울입니다.",
  },
  {
    id: "work",
    label: "직장 · 사무실",
    floors: 8,
    learnedHz: [1.1, 2.4],
    constructionHours: [7, 19],
    weekdayOnly: true,
    noiseFloorG: 0.006,
    note: "T≈0.8s. 지하철 통과 2Hz는 교통으로 봅니다.",
  },
  {
    id: "hotel",
    label: "여행 · 호텔",
    floors: 12,
    learnedHz: [0.4, 1.2],
    constructionHours: [0, 0],
    weekdayOnly: false,
    noiseFloorG: 0.005,
    note: "프로필이 얇습니다. 여행 모드에서는 군중 확인 비중을 높입니다.",
  },
];

export function buildingById(id: BuildingProfile["id"]) {
  return BUILDINGS.find((b) => b.id === id) ?? BUILDINGS[0]!;
}
