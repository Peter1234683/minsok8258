import type { Scenario } from "./types.ts";

export const SCENARIOS: Scenario[] = [
  {
    id: "walk",
    label: "걷기",
    blurb: "자이로 주기 · 내 움직임.",
    cls: "body",
    strength: "none",
    crowd: 0,
    bearingDeg: 0,
    remainingSec: 0,
    km: 0,
    regionId: "kr",
    peakG: 0.12,
    dominantHz: 1.8,
    pThenS: false,
  },
  {
    id: "construction",
    label: "공사",
    blurb: "파일 항타 · 한 건물만.",
    cls: "construction",
    strength: "none",
    crowd: 1,
    bearingDeg: 0,
    remainingSec: 0,
    km: 0,
    regionId: "kr",
    peakG: 0.045,
    dominantHz: 22,
    pThenS: false,
  },
  {
    id: "wind",
    label: "고층 바람",
    blurb: "장주기 · 건물 필터가 걸러냄.",
    cls: "unknown",
    strength: "none",
    crowd: 0,
    bearingDeg: 0,
    remainingSec: 0,
    km: 0,
    regionId: "kr",
    peakG: 0.011,
    dominantHz: 0.67,
    pThenS: false,
  },
  {
    id: "weak",
    label: "약진",
    blurb: "M3.4 수도권. 사이렌 없음.",
    cls: "quake-candidate",
    strength: "weak",
    crowd: 18,
    bearingDeg: 128,
    remainingSec: 0,
    km: 22,
    regionId: "kr",
    official: {
      source: "kma",
      sourceLabel: "기상청 지진정보",
      magnitude: 3.4,
      region: "경기 이천 남남동쪽 8km",
      depthKm: 11,
      originTime: 0,
      delaySec: 11,
      intensityLocal: "진도 III",
      lat: 37.212,
      lng: 127.434,
    },
    peakG: 0.018,
    dominantHz: 3.2,
    pThenS: true,
  },
  {
    id: "strong-kr",
    label: "강진 · 한국",
    blurb: "M5.8 내륙. 대피 화면.",
    cls: "quake-candidate",
    strength: "strong",
    crowd: 86,
    bearingDeg: 162,
    remainingSec: 8,
    km: 34,
    regionId: "kr",
    official: {
      source: "kma",
      sourceLabel: "기상청 현장경보",
      magnitude: 5.8,
      region: "경북 포항 북구 북쪽 9km",
      depthKm: 7,
      originTime: 0,
      delaySec: 4,
      intensityLocal: "진도 VI",
      lat: 36.107,
      lng: 129.366,
    },
    peakG: 0.16,
    dominantHz: 2.1,
    pThenS: true,
  },
  {
    id: "travel-jp",
    label: "해외 · 일본",
    blurb: "대사관은 주의 문자. JMA는 일본어.",
    cls: "quake-candidate",
    strength: "strong",
    crowd: 64,
    bearingDeg: 214,
    remainingSec: 12,
    km: 48,
    regionId: "jp",
    official: {
      source: "jma",
      sourceLabel: "JMA 긴급지진속보",
      magnitude: 6.1,
      region: "나라현 북부",
      depthKm: 14,
      originTime: 0,
      delaySec: 6,
      intensityLocal: "진도 5약",
      lat: 34.685,
      lng: 135.805,
    },
    peakG: 0.22,
    dominantHz: 1.6,
    pThenS: true,
  },
  {
    id: "travel-np",
    label: "해외 · 네팔",
    blurb: "국가 경보 없음. 군중이 확정.",
    cls: "quake-candidate",
    strength: "strong",
    crowd: 41,
    bearingDeg: 76,
    remainingSec: 6,
    km: 18,
    regionId: "np",
    official: {
      source: "none",
      sourceLabel: "공식 경보 없음",
      magnitude: 6.4,
      region: "카트만두 분지 동측",
      depthKm: 10,
      originTime: 0,
      delaySec: 90,
      intensityLocal: "Strong",
      lat: 27.71,
      lng: 85.52,
    },
    peakG: 0.28,
    dominantHz: 1.4,
    pThenS: true,
  },
];

export function waveformAt(kind: string, t: number, extra = 1) {
  if (kind === "walk") {
    return 0.08 * extra * Math.sin(2 * Math.PI * 1.8 * t);
  }
  if (kind === "construction") {
    const beat = t % 0.82;
    const pulse =
      beat < 0.07 ? Math.sin(2 * Math.PI * 26 * t) * Math.exp(-beat * 38) : 0;
    return extra * (0.9 * pulse + 0.015 * Math.sin(40 * t));
  }
  if (kind === "wind") {
    return 0.011 * extra * Math.sin(2 * Math.PI * 0.67 * t);
  }
  if (kind === "idle") {
    return 0.008 * Math.sin(2 * Math.PI * 0.4 * t);
  }
  const p = Math.exp(-t * 6) * Math.sin(2 * Math.PI * 7.5 * t) * 0.35;
  const sDelay = 1.55;
  const s =
    t > sDelay
      ? Math.exp(-(t - sDelay) * 0.85) *
        Math.sin(2 * Math.PI * 2.2 * (t - sDelay))
      : 0;
  const surf =
    t > sDelay + 2.2
      ? 0.22 * Math.exp(-(t - sDelay - 2.2) * 0.35) * Math.sin(2 * Math.PI * 0.7 * t)
      : 0;
  const mag = kind === "weak" ? 0.45 : 1.15;
  return extra * mag * (p + s + surf);
}
