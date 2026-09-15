import type { WindowFeatures } from "./features.ts";
import type { CrowdPick } from "./wavefront.ts";

export type ShakeClass =
  | "idle"
  | "body"
  | "construction"
  | "quake-candidate"
  | "unknown";

export type ClassGate =
  | "idle"
  | "gyro-body"
  | "zcr-construction"
  | "building-filter"
  | "p-s-quake"
  | "hours-construction"
  | "unknown";

export type EventStrength = "none" | "weak" | "strong";

export type Phase =
  | "idle"
  | "sensing"
  | "local-result"
  | "crowding"
  | "confirmed"
  | "action";

export type OfficialSource = "kma" | "jma" | "usgs" | "cwa" | "embassy" | "none";

export type TravelRegionId =
  | "kr"
  | "jp"
  | "tw"
  | "np"
  | "tr"
  | "us-west"
  | "mx";

export type FamilyStatus = "safe" | "same-shake" | "help" | "silent";

export type BuildingId = "home" | "work" | "hotel";

export type WaveMethod = "hidden" | "crowd-plane" | "official-epicenter";

export type LogKind = "eew" | "notify" | "local" | "felt" | "drill" | "official" | "citizen";

export interface Wavefront {
  bearingDeg: number;
  remainingSWaveSec: number;
  approxKm: number;
  confirmedBy: number;
  radiusKm: number;
  method: WaveMethod;
  crowdBearingDeg: number | null;
  officialBearingDeg: number | null;
  psKm: number | null;
  apparentC: number | null;
  residualMs: number | null;
  crowd: CrowdPick[];
  sWaveEndsAt: number | null;
}

export interface OfficialBulletin {
  source: OfficialSource;
  sourceLabel: string;
  magnitude: number;
  region: string;
  depthKm: number;
  originTime: number;
  delaySec: number;
  intensityLocal: string;
  lat?: number;
  lng?: number;
}

export interface Shelter {
  id: string;
  name: string;
  kind: "outdoor" | "tsunami" | "open";
  lat: number;
  lng: number;
  walkMin: number;
  note: string;
  city: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  city: string;
  status: FamilyStatus;
  lastSeenMin: number;
  traveling?: boolean;
}

export interface BuildingProfile {
  id: BuildingId;
  label: string;
  floors: number;
  learnedHz: [number, number];
  constructionHours: [number, number];
  weekdayOnly: boolean;
  noiseFloorG: number;
  note: string;
}

export interface BuildingLearn {
  id: BuildingId;
  windows: number;
  learnedHz: [number, number];
  noiseFloorG: number;
  lastAt: number | null;
}

export interface TravelProfile {
  id: TravelRegionId;
  city: string;
  country: string;
  officialEew: "strong" | "moderate" | "weak" | "none";
  officialLabel: string;
  embassyQuality: "detail" | "caution-only" | "slow" | "none";
  crowdWeight: number;
  actionLang: "ko" | "ja" | "en";
  hint: string;
}

export interface ClassResult {
  cls: ShakeClass;
  gate: ClassGate;
  confidence: number;
  peakG: number;
  dominantHz: number;
  durationMs: number;
  pThenS: boolean;
  label: string;
  reason: string;
  features: WindowFeatures;
  filteredByBuilding: boolean;
  gyroBodyHint: boolean;
}

export interface LiveQuake {
  id: string;
  mag: number;
  place: string;
  time: number;
  lat: number;
  lng: number;
  depthKm: number | null;
  source: string;
}

export interface LogEntry {
  id: string;
  at: number;
  kind: LogKind;
  title: string;
  body: string;
}

export interface Scenario {
  id: string;
  label: string;
  blurb: string;
  cls: ShakeClass;
  strength: EventStrength;
  crowd: number;
  bearingDeg: number;
  remainingSec: number;
  km: number;
  regionId: TravelRegionId;
  official?: OfficialBulletin;
  peakG: number;
  dominantHz: number;
  pThenS: boolean;
}
