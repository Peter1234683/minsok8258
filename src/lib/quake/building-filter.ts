import type { BuildingId, BuildingLearn, BuildingProfile } from "./types.ts";

/** Approximate natural period of an N-storey building, seconds. T ≈ 0.1 N. */
export function naturalPeriodSec(floors: number) {
  return 0.1 * Math.max(1, floors);
}

export function naturalHz(floors: number) {
  return 1 / naturalPeriodSec(floors);
}

export function naturalBand(floors: number): [number, number] {
  const f = naturalHz(floors);
  return [+(f * 0.65).toFixed(3), +(f * 1.5).toFixed(3)];
}

/** ~8.3 m per hPa near sea level, ~3.5 m per residential floor. */
export function baroToFloor(hPa: number, seaLevel = 1013.25) {
  const altM = (seaLevel - hPa) * 8.3;
  return Math.max(1, Math.round(altM / 3.5));
}

export function floorToHpa(floors: number, seaLevel = 1013.25) {
  return +(seaLevel - (Math.max(1, floors) * 3.5) / 8.3).toFixed(1);
}

export function inNaturalBand(hz: number, floors: number) {
  const [lo, hi] = naturalBand(floors);
  return hz >= lo && hz <= hi;
}

export function boostedPeakLimit(
  noiseFloorG: number,
  inBand: boolean,
  aftershock: boolean,
) {
  if (aftershock) return Math.max(0.012, noiseFloorG * 2.4);
  if (inBand) return Math.max(0.028, noiseFloorG * 6);
  return Math.max(0.01, noiseFloorG * 1.8);
}

export function mergeLearnedHz(
  prev: [number, number],
  samplesHz: number[],
): [number, number] {
  if (samplesHz.length < 4) return prev;
  const sorted = [...samplesHz].sort((a, b) => a - b);
  const at = (p: number) =>
    sorted[Math.min(sorted.length - 1, Math.max(0, Math.floor((sorted.length - 1) * p)))]!;
  const lo = at(0.2);
  const hi = at(0.8);
  return [
    +(prev[0] * 0.35 + lo * 0.65).toFixed(3),
    +(prev[1] * 0.35 + hi * 0.65).toFixed(3),
  ];
}

export function resolveBuilding(
  base: BuildingProfile,
  learn?: BuildingLearn,
  baroHpa?: number | null,
): BuildingProfile {
  const baroFloor = baroHpa != null ? baroToFloor(baroHpa) : base.floors;
  const floors = Math.round((base.floors + baroFloor) / 2);
  return {
    ...base,
    floors,
    learnedHz: learn?.learnedHz ?? base.learnedHz,
    noiseFloorG: learn?.noiseFloorG ?? base.noiseFloorG,
  };
}

export function emptyLearn(
  id: BuildingId,
  learnedHz: [number, number],
  noiseFloorG: number,
): BuildingLearn {
  return { id, windows: 0, learnedHz, noiseFloorG, lastAt: null };
}
