import type { LiveQuake } from "./types";

export const DEMO_QUAKES: LiveQuake[] = [
  {
    id: "kma-demo-1",
    mag: 2.3,
    place: "충남 태안 서남서쪽 28km 해역",
    time: Date.parse("2026-09-08T09:14:00Z"),
    lat: 36.6,
    lng: 126.1,
    depthKm: 18,
    source: "기상청 정보",
  },
  {
    id: "kma-demo-2",
    mag: 2.1,
    place: "경북 경주 동쪽 11km",
    time: Date.parse("2026-09-08T07:52:00Z"),
    lat: 35.84,
    lng: 129.32,
    depthKm: 12,
    source: "기상청 정보",
  },
];
