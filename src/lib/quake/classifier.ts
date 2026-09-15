import { CLASS_LABEL, CLASS_REASON } from "./copy.ts";
import { extractFeatures, type WindowFeatures } from "./features.ts";
import { boostedPeakLimit, inNaturalBand } from "./building-filter.ts";
import type { BuildingProfile, ClassGate, ClassResult, ShakeClass } from "./types.ts";

export interface MotionWindow {
  samples: number[];
  dt: number;
  gyro?: number[];
}

export function classifyWindow(
  win: MotionWindow,
  opts: {
    aftershock: boolean;
    building: BuildingProfile;
    hour: number;
    weekday: boolean;
  },
): ClassResult {
  const feat = extractFeatures(win.samples, win.dt, win.gyro);
  return decide(feat, opts);
}

export function decide(
  feat: WindowFeatures,
  opts: {
    aftershock: boolean;
    building: BuildingProfile;
    hour: number;
    weekday: boolean;
  },
): ClassResult {
  const hz = feat.fftHz > 0.15 ? feat.fftHz : feat.dominantHz;
  const constructionHours =
    (!opts.building.weekdayOnly || opts.weekday) &&
    opts.hour >= opts.building.constructionHours[0] &&
    opts.hour < opts.building.constructionHours[1];

  const band = inNaturalBand(hz, opts.building.floors);
  const peakLimit = boostedPeakLimit(opts.building.noiseFloorG, band, opts.aftershock);
  const gyroBody = feat.gyroRegularity > 0.42 && feat.gyroRms > 0.35;
  const rawIdle =
    feat.peakG < Math.max(0.008, opts.building.noiseFloorG * 1.8) && !feat.pThenS;

  let cls: ShakeClass = "idle";
  let gate: ClassGate = "idle";
  let filteredByBuilding = false;

  if (rawIdle && !band) {
    cls = "idle";
    gate = "idle";
  } else if (gyroBody && hz >= 0.7 && hz <= 2.8 && !feat.pThenS) {
    cls = "body";
    gate = "gyro-body";
  } else if (hz >= 10 || feat.zcr >= 16 || (feat.burstiness > 0.22 && hz >= 8)) {
    cls = "construction";
    gate = "zcr-construction";
  } else if (
    band &&
    feat.peakG < peakLimit &&
    !feat.pThenS &&
    !opts.aftershock &&
    feat.gyroRms < 0.2
  ) {
    cls = feat.peakG < opts.building.noiseFloorG * 1.5 ? "idle" : "unknown";
    filteredByBuilding = feat.peakG >= opts.building.noiseFloorG * 1.5;
    gate = filteredByBuilding ? "building-filter" : "idle";
  } else if (
    hz >= 0.4 &&
    hz <= 9 &&
    feat.durationMs > 900 &&
    feat.gyroRegularity < 0.4 &&
    (feat.pThenS || feat.peakG > 0.016)
  ) {
    cls = "quake-candidate";
    gate = "p-s-quake";
  } else if (gyroBody) {
    cls = "body";
    gate = "gyro-body";
  } else {
    cls = "unknown";
    gate = "unknown";
  }

  if (cls === "unknown" && constructionHours && hz >= 6) {
    cls = "construction";
    gate = "hours-construction";
  }
  if (
    cls === "construction" &&
    opts.aftershock &&
    feat.pThenS &&
    hz < 8 &&
    feat.durationMs > 1200
  ) {
    cls = "quake-candidate";
    gate = "p-s-quake";
  }
  if (
    cls === "quake-candidate" &&
    hz >= opts.building.learnedHz[0] &&
    hz <= opts.building.learnedHz[1] &&
    feat.peakG < 0.03 &&
    !feat.pThenS &&
    !opts.aftershock
  ) {
    cls = "unknown";
    filteredByBuilding = true;
    gate = "building-filter";
  }

  const confidence =
    cls === "idle"
      ? 0.9
      : cls === "body"
        ? gyroBody
          ? 0.9
          : 0.78
        : cls === "construction"
          ? 0.82
          : cls === "quake-candidate"
            ? feat.pThenS
              ? 0.76
              : 0.62
            : filteredByBuilding
              ? 0.7
              : 0.4;

  const reason = filteredByBuilding
    ? `${opts.building.floors}층 고유주기 약 ${(0.1 * opts.building.floors).toFixed(1)}초 대역입니다. 강풍·상층 흔들림으로 올립니다.`
    : CLASS_REASON[cls];

  return {
    cls,
    gate,
    confidence,
    peakG: feat.peakG,
    dominantHz: hz,
    durationMs: feat.durationMs,
    pThenS: feat.pThenS,
    label: CLASS_LABEL[cls],
    reason,
    features: feat,
    filteredByBuilding,
    gyroBodyHint: gyroBody,
  };
}
