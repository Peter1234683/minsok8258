import { create } from "zustand";
import { persist } from "zustand/middleware";
import { playAlertSound } from "@/lib/quake/alert-sound";
import { buildingById } from "@/lib/quake/buildings";
import {
  floorToHpa,
  mergeLearnedHz,
  resolveBuilding,
} from "@/lib/quake/building-filter";
import { classifyWindow } from "@/lib/quake/classifier";
import { CLASS_LABEL, CLASS_REASON } from "@/lib/quake/copy";
import { DEMO_QUAKES } from "@/lib/quake/demo-quakes";
import { DUTY, estimateBatteryHrs, type DutyMode } from "@/lib/quake/duty-cycle";
import { DEFAULT_FAMILY } from "@/lib/quake/family";
import { ZERO_FEATURES } from "@/lib/quake/features";
import { seedFelt, type DamageId, type FeltLevel, type FeltReport } from "@/lib/quake/felt";
import { bearingTo, psDistanceKm, psDelaySec } from "@/lib/quake/geo";
import { fireHaptic, type HapticKind } from "@/lib/quake/haptics";
import { IDLE_MESH, seedMesh, type MeshState } from "@/lib/quake/mesh";
import { packShelters, type ShelterCache } from "@/lib/quake/offline-cache";
import { SCENARIOS } from "@/lib/quake/scenarios";
import { haversineKm, regionCenter } from "@/lib/quake/shelters";
import { synthKindForScenario, synthWindow } from "@/lib/quake/synth";
import { TRAVEL } from "@/lib/quake/travel";
import { fitPlaneWave, seedFrom, syntheticCrowd } from "@/lib/quake/wavefront";
import type {
  BuildingId,
  BuildingLearn,
  ClassResult,
  EventStrength,
  FamilyMember,
  FamilyStatus,
  LiveQuake,
  LogEntry,
  OfficialBulletin,
  Phase,
  Scenario,
  TravelRegionId,
  Wavefront,
} from "@/lib/quake/types";

const AFTERSHOCK_MS = 72 * 60 * 60 * 1000;

interface QuakeState {
  phase: Phase;
  result: ClassResult | null;
  strength: EventStrength;
  wavefront: Wavefront | null;
  official: OfficialBulletin | null;
  regionId: TravelRegionId;
  buildingId: BuildingId;
  family: FamilyMember[];
  aftershockUntil: number | null;
  lastEventAt: number | null;
  lastEventId: string | null;
  lastScenarioId: string | null;
  liveQuakes: LiveQuake[];
  localEvents: LiveQuake[];
  liveError: string | null;
  waveformKind: string;
  sensorOn: boolean;
  homebaseId: TravelRegionId;
  notifyGlobalMag: number;
  notifyHomeMag: number;
  notifyHomeKm: number;
  citizenScience: boolean;
  batterySave: boolean;
  criticalAlerts: boolean;
  locationShare: boolean;
  contributions: number;
  log: LogEntry[];
  notifiedIds: string[];
  feltByEvent: Record<string, FeltReport[]>;
  feltSubmittedFor: string | null;
  drillOpen: boolean;
  haptic: HapticKind;
  dutyMode: DutyMode;
  wakeCount: number;
  lastWakeAt: number | null;
  shelterCache: ShelterCache;
  mesh: MeshState;
  learnedByBuilding: Record<BuildingId, BuildingLearn>;
  baroHpa: number;
  headingDeg: number | null;
  playScenario: (id: string) => void;
  reset: () => void;
  setRegion: (id: TravelRegionId) => void;
  setBuilding: (id: BuildingId) => void;
  setFamilyStatus: (id: string, status: FamilyStatus) => void;
  pingFamily: () => void;
  setLive: (rows: LiveQuake[], error?: string | null) => void;
  setSensorOn: (on: boolean) => void;
  ingestMotion: (samples: number[], dt: number, gyro?: number[]) => void;
  setHomebase: (id: TravelRegionId) => void;
  setNotify: (p: { global?: number; home?: number; km?: number }) => void;
  setCitizenScience: (on: boolean) => void;
  setBatterySave: (on: boolean) => void;
  setCriticalAlerts: (on: boolean) => void;
  setLocationShare: (on: boolean) => void;
  submitFelt: (eventId: string, intensity: FeltLevel, damage: DamageId) => void;
  ensureFelt: (eventId: string, mag: number) => void;
  openDrill: () => void;
  closeDrill: () => void;
  setHeading: (deg: number | null) => void;
  learnBuilding: () => void;
  refreshCache: () => void;
  setBaroHpa: (hPa: number) => void;
  batteryHrs: () => number;
}

const idleResult = (): ClassResult => ({
  cls: "idle",
  gate: "idle",
  confidence: 0.95,
  peakG: 0.003,
  dominantHz: 0.4,
  durationMs: 0,
  pThenS: false,
  label: CLASS_LABEL.idle,
  reason: CLASS_REASON.idle,
  features: ZERO_FEATURES,
  filteredByBuilding: false,
  gyroBodyHint: false,
});

function defaultLearn(): Record<BuildingId, BuildingLearn> {
  return {
    home: { id: "home", windows: 40, learnedHz: [0.35, 0.9], noiseFloorG: 0.004, lastAt: null },
    work: { id: "work", windows: 18, learnedHz: [1.1, 2.4], noiseFloorG: 0.006, lastAt: null },
    hotel: { id: "hotel", windows: 4, learnedHz: [0.4, 1.2], noiseFloorG: 0.005, lastAt: null },
  };
}

let runToken = 0;
const timers: number[] = [];

function later(ms: number, fn: () => void) {
  const id = window.setTimeout(fn, ms);
  timers.push(id);
  return id;
}

function clearTimers() {
  while (timers.length) {
    const id = timers.pop();
    if (id) window.clearTimeout(id);
  }
}

function pushLog(set: (p: Partial<QuakeState>) => void, get: () => QuakeState, entry: LogEntry) {
  set({ log: [entry, ...get().log].slice(0, 40) });
}

function aftershockOn(until: number | null, now = Date.now()) {
  return until != null && until > now;
}

function pulseHaptic(
  set: (p: Partial<QuakeState>) => void,
  kind: Exclude<HapticKind, "none">,
) {
  fireHaptic(kind);
  set({ haptic: kind });
  later(kind === "nudge" ? 700 : 1400, () => set({ haptic: "none" }));
}


export const useQuakeStore = create<QuakeState>()(
  persist(
    (set, get) => ({
      phase: "idle",
      result: idleResult(),
      strength: "none",
      wavefront: null,
      official: null,
      regionId: "kr",
      buildingId: "home",
      family: DEFAULT_FAMILY,
      aftershockUntil: null,
      lastEventAt: null,
      lastEventId: null,
      lastScenarioId: null,
      liveQuakes: DEMO_QUAKES,
      localEvents: [],
      liveError: null,
      waveformKind: "idle",
      sensorOn: false,
      homebaseId: "kr",
      notifyGlobalMag: 6.5,
      notifyHomeMag: 3,
      notifyHomeKm: 80,
      citizenScience: true,
      batterySave: false,
      criticalAlerts: true,
      locationShare: false,
      contributions: 0,
      log: [],
      notifiedIds: [],
      feltByEvent: {},
      feltSubmittedFor: null,
      drillOpen: false,
      haptic: "none",
      dutyMode: "sleep",
      wakeCount: 0,
      lastWakeAt: null,
      shelterCache: packShelters("kr", 0),
      mesh: IDLE_MESH,
      learnedByBuilding: defaultLearn(),
      baroHpa: floorToHpa(15),
      headingDeg: null,

      batteryHrs: () =>
        estimateBatteryHrs({
          aftershock: aftershockOn(get().aftershockUntil),
          batterySave: get().batterySave,
        }),

      setHeading: (deg) => set({ headingDeg: deg }),
      setBaroHpa: (hPa) => set({ baroHpa: hPa }),
      setSensorOn: (on) => set({ sensorOn: on }),
      setHomebase: (id) => {
        const cache = packShelters(id);
        set({ homebaseId: id, regionId: id, shelterCache: cache });
        pushLog(set, get, {
          id: `cache-${id}-${Date.now()}`,
          at: Date.now(),
          kind: "notify",
          title: `대피소 캐시 · ${cache.city}`,
          body: `${cache.count}곳 · ${Math.round(cache.bytes / 1024)}KB · 로밍 없이도 GPS만`,
        });
      },
      setNotify: (p) =>
        set({
          notifyGlobalMag: p.global ?? get().notifyGlobalMag,
          notifyHomeMag: p.home ?? get().notifyHomeMag,
          notifyHomeKm: p.km ?? get().notifyHomeKm,
        }),
      setCitizenScience: (on) => set({ citizenScience: on }),
      setBatterySave: (on) => set({ batterySave: on, citizenScience: on ? false : get().citizenScience }),
      setCriticalAlerts: (on) => set({ criticalAlerts: on }),
      setLocationShare: (on) => set({ locationShare: on }),

      refreshCache: () => {
        const cache = packShelters(get().regionId);
        set({ shelterCache: cache });
        pushLog(set, get, {
          id: `cache-r-${Date.now()}`,
          at: Date.now(),
          kind: "notify",
          title: `오프라인 캐시 갱신 · ${cache.city}`,
          body: `${cache.count}곳 · ${cache.bytes}B GeoJSON`,
        });
      },

      learnBuilding: () => {
        const id = get().buildingId;
        const base = buildingById(id);
        const hz: number[] = [];
        let noise = 0;
        for (let i = 0; i < 12; i++) {
          const idle = synthWindow("idle", { seed: 20 + i, floors: base.floors });
          const wind = synthWindow("wind", { seed: 80 + i, floors: base.floors });
          const fi = classifyWindow(
            { samples: idle.accel, dt: idle.dt, gyro: idle.gyro },
            { aftershock: false, building: base, hour: 3, weekday: true },
          );
          const fw = classifyWindow(
            { samples: wind.accel, dt: wind.dt, gyro: wind.gyro },
            { aftershock: false, building: base, hour: 3, weekday: true },
          );
          hz.push(fi.dominantHz, fw.dominantHz);
          noise += fi.peakG;
        }
        const prev = get().learnedByBuilding[id] ?? {
          id,
          windows: 0,
          learnedHz: base.learnedHz,
          noiseFloorG: base.noiseFloorG,
          lastAt: null,
        };
        const learnedHz = mergeLearnedHz(prev.learnedHz, hz.filter((x) => x > 0.05));
        const noiseFloorG = Math.max(0.002, (prev.noiseFloorG * 0.4 + (noise / 12) * 0.6));
        const next: BuildingLearn = {
          id,
          windows: prev.windows + 24,
          learnedHz,
          noiseFloorG,
          lastAt: Date.now(),
        };
        set({ learnedByBuilding: { ...get().learnedByBuilding, [id]: next } });
        pushLog(set, get, {
          id: `learn-${id}-${Date.now()}`,
          at: Date.now(),
          kind: "local",
          title: `건물 프로필 학습 · ${base.label}`,
          body: `${learnedHz[0].toFixed(2)}–${learnedHz[1].toFixed(2)} Hz · 바닥 ${(noiseFloorG * 1000).toFixed(0)} mg`,
        });
      },

      setLive: (rows, error = null) => {
        const origin = regionCenter(get().homebaseId);
        const seen = new Set(get().notifiedIds);
        const extra: LogEntry[] = [];
        for (const q of rows) {
          if (seen.has(q.id)) continue;
          const km = haversineKm(origin, q);
          const homeHit = q.mag >= get().notifyHomeMag && km <= get().notifyHomeKm;
          const globalHit = q.mag >= get().notifyGlobalMag;
          if (!homeHit && !globalHit) continue;
          seen.add(q.id);
          extra.push({
            id: `n-${q.id}`,
            at: Date.now(),
            kind: "notify",
            title: `M${q.mag.toFixed(1)} ${homeHit ? "홈베이스 인근" : "글로벌"}`,
            body: `${q.place} · 속보 아님, 발표 후 알림`,
          });
        }
        set({
          liveQuakes: rows,
          liveError: error,
          notifiedIds: [...seen].slice(-80),
          log: extra.length ? [...extra, ...get().log].slice(0, 40) : get().log,
        });
      },

      setRegion: (id) => {
        const cache = packShelters(id);
        set({ regionId: id, shelterCache: cache, buildingId: id === "kr" ? get().buildingId : "hotel" });
        pushLog(set, get, {
          id: `cache-${id}-${Date.now()}`,
          at: Date.now(),
          kind: "notify",
          title: `여행 모드 · ${cache.city} 착륙`,
          body: `옥외 장소 ${cache.count}곳 캐시 · 통신 없이 화살표`,
        });
      },
      setBuilding: (id) => {
        const b = buildingById(id);
        set({ buildingId: id, baroHpa: floorToHpa(b.floors) });
      },

      setFamilyStatus: (id, status) => {
        set({
          family: get().family.map((m) =>
            m.id === id ? { ...m, status, lastSeenMin: 0 } : m,
          ),
        });
        if (id === "me" && status === "help") {
          const city = regionCenter(get().regionId).city;
          set({ mesh: seedMesh(city, "sos") });
          later(420, () => set({ mesh: { ...get().mesh, hopsDone: 1 } }));
          later(1100, () => set({ mesh: { ...get().mesh, hopsDone: 2 } }));
          later(1700, () => set({ mesh: { ...get().mesh, hopsDone: 2, delivered: true, broadcasting: false } }));
        }
      },

      pingFamily: () => {
        const strong = get().strength === "strong";
        set({
          family: get().family.map((m) => {
            if (m.id === "me") return { ...m, status: "same-shake", lastSeenMin: 0 };
            if (m.traveling && get().regionId !== "jp") return m;
            if (strong && m.id === "friend")
              return { ...m, status: "same-shake", lastSeenMin: 0 };
            if (strong && m.id === "mom")
              return { ...m, status: "silent", lastSeenMin: m.lastSeenMin };
            return m;
          }),
        });
      },

      submitFelt: (eventId, intensity, damage) => {
        const mine: FeltReport = {
          id: `mine-${Date.now()}`,
          eventId,
          intensity,
          damage,
          at: Date.now(),
          mine: true,
        };
        const cur = get().feltByEvent[eventId] ?? [];
        set({
          feltByEvent: { ...get().feltByEvent, [eventId]: [mine, ...cur] },
          feltSubmittedFor: eventId,
        });
        pushLog(set, get, {
          id: `felt-${eventId}`,
          at: Date.now(),
          kind: "felt",
          title: "체감 제보",
          body: `강도 ${intensity} · ${damage}`,
        });
      },

      ensureFelt: (eventId, mag) => {
        if (get().feltByEvent[eventId]) return;
        set({
          feltByEvent: {
            ...get().feltByEvent,
            [eventId]: seedFelt(eventId, mag, 8),
          },
        });
      },

      openDrill: () => {
        void playAlertSound();
        set({ drillOpen: true });
        pushLog(set, get, {
          id: `drill-${Date.now()}`,
          at: Date.now(),
          kind: "drill",
          title: "훈련 · 낮추고 머리 보호",
          body: "실제 지진이 아닙니다. Drop / Cover / Hold On.",
        });
      },
      closeDrill: () => set({ drillOpen: false }),

      reset: () => {
        runToken += 1;
        clearTimers();
        set({
          phase: "idle",
          result: idleResult(),
          strength: "none",
          wavefront: null,
          official: null,
          lastScenarioId: null,
          waveformKind: "idle",
          drillOpen: false,
          haptic: "none",
          dutyMode: "sleep",
          mesh: IDLE_MESH,
        });
      },

      ingestMotion: (samples, dt, gyro) => {
        if (get().phase !== "idle") return;
        const peak = samples.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
        const thresh = get().batterySave ? 0.07 : 0.04;
        if (peak < thresh) return;
        const aftershock = aftershockOn(get().aftershockUntil);
        const building = resolveBuilding(
          buildingById(get().buildingId),
          get().learnedByBuilding[get().buildingId],
          get().baroHpa,
        );
        const now = new Date();
        const result = classifyWindow(
          { samples, dt, gyro },
          {
            aftershock,
            building,
            hour: now.getHours(),
            weekday: now.getDay() !== 0 && now.getDay() !== 6,
          },
        );
        if (result.cls === "idle") return;
        if (result.cls === "body") get().playScenario("walk");
        else if (result.cls === "construction") get().playScenario("construction");
        else if (result.filteredByBuilding) get().playScenario("wind");
        else get().playScenario("weak");
      },

      playScenario: (id) => {
        const scenario = SCENARIOS.find((s) => s.id === id);
        if (!scenario) return;
        runToken += 1;
        const token = runToken;
        clearTimers();

        const travel = TRAVEL[scenario.regionId];
        if (scenario.strength === "strong") void playAlertSound();

        const wakeAt = Date.now();
        set({
          phase: "sensing",
          result: idleResult(),
          strength: "none",
          wavefront: null,
          official: null,
          lastScenarioId: id,
          waveformKind: id,
          regionId: scenario.regionId,
          buildingId: scenario.regionId === "kr" ? get().buildingId : "hotel",
          dutyMode: "burst",
          wakeCount: get().wakeCount + 1,
          lastWakeAt: wakeAt,
          mesh: IDLE_MESH,
        });

        later(DUTY.burstMs, () => {
          if (token !== runToken) return;
          set({ dutyMode: "sleep" });
        });

        later(420, () => {
          if (token !== runToken) return;
          const aftershock = aftershockOn(get().aftershockUntil);
          const building = resolveBuilding(
            buildingById(get().buildingId),
            get().learnedByBuilding[get().buildingId],
            get().baroHpa,
          );
          const now = new Date();
          const win = synthWindow(synthKindForScenario(scenario.id), {
            seed: seedFrom(scenario.id),
            peakG: scenario.peakG,
            floors: building.floors,
          });
          const classified = classifyWindow(
            { samples: win.accel, dt: win.dt, gyro: win.gyro },
            {
              aftershock,
              building,
              hour: now.getHours(),
              weekday: now.getDay() !== 0 && now.getDay() !== 6,
            },
          );
          const result: ClassResult = classified;
          set({ phase: "local-result", result });
          pulseHaptic(set, "nudge");
          if (result.cls === "quake-candidate") {
            pushLog(set, get, {
              id: `local-${id}-${Date.now()}`,
              at: Date.now(),
              kind: "local",
              title: "손목 판별 · 지진 후보",
              body: `${result.dominantHz.toFixed(1)} Hz · 군중 확인 전 · 자이로 ${result.gyroBodyHint ? "걸음" : "정지"}`,
            });
          }
          if (result.filteredByBuilding) {
            pushLog(set, get, {
              id: `bldg-${id}-${Date.now()}`,
              at: Date.now(),
              kind: "local",
              title: "건물 필터",
              body: result.reason,
            });
          }
          if (result.cls !== "quake-candidate") {
            later(2600, () => {
              if (token !== runToken) return;
              set({
                phase: "idle",
                result: idleResult(),
                waveformKind: "idle",
                dutyMode: "sleep",
                haptic: "none",
              });
            });
            return;
          }

          later(850, () => {
            if (token !== runToken) return;
            set({ phase: "crowding" });
            const crowdDelay = 420 + (1 - travel.crowdWeight) * 900;
            later(crowdDelay, () => {
              if (token !== runToken) return;
              confirmEvent(scenario, set, get);
            });
          });
        });
      },
    }),
    {
      name: "geotjin-v3",
      skipHydration: true,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<QuakeState>;
        return {
          ...current,
          ...p,
          learnedByBuilding: {
            ...current.learnedByBuilding,
            ...p.learnedByBuilding,
          },
          shelterCache: p.shelterCache ?? current.shelterCache,
          family: current.family,
          mesh: current.mesh,
          phase: current.phase,
          result: current.result,
        };
      },
      partialize: (s) => ({
        regionId: s.regionId,
        buildingId: s.buildingId,
        aftershockUntil: s.aftershockUntil,
        homebaseId: s.homebaseId,
        notifyGlobalMag: s.notifyGlobalMag,
        notifyHomeMag: s.notifyHomeMag,
        notifyHomeKm: s.notifyHomeKm,
        citizenScience: s.citizenScience,
        batterySave: s.batterySave,
        criticalAlerts: s.criticalAlerts,
        locationShare: s.locationShare,
        contributions: s.contributions,
        notifiedIds: s.notifiedIds,
        log: s.log.slice(0, 20),
        learnedByBuilding: s.learnedByBuilding,
        baroHpa: s.baroHpa,
        shelterCache: s.shelterCache,
        wakeCount: s.wakeCount,
      }),
    },
  ),
);

function confirmEvent(
  scenario: Scenario,
  set: (p: Partial<QuakeState> | ((s: QuakeState) => Partial<QuakeState>)) => void,
  get: () => QuakeState,
) {
  const now = Date.now();
  const strong = scenario.strength === "strong";
  const official = scenario.official
    ? { ...scenario.official, originTime: now }
    : null;
  const eventId = `local-${scenario.id}`;
  const origin = regionCenter(scenario.regionId);

  const n = Math.min(36, Math.max(8, Math.round(scenario.crowd * 0.45)));
  const picks = syntheticCrowd({
    bearingDeg: scenario.bearingDeg,
    n,
    seed: seedFrom(scenario.id),
  });
  const fit = scenario.crowd >= 8 ? fitPlaneWave(picks) : null;

  const wavefront: Wavefront | null =
    fit && scenario.crowd >= 8
      ? {
          bearingDeg: fit.bearingDeg,
          remainingSWaveSec: scenario.remainingSec,
          approxKm: scenario.km,
          confirmedBy: scenario.crowd,
          radiusKm: 2,
          method: "crowd-plane",
          crowdBearingDeg: fit.bearingDeg,
          officialBearingDeg: null,
          psKm: scenario.pThenS ? psDistanceKm(psDelaySec(scenario.km)) : null,
          apparentC: fit.cKms,
          residualMs: fit.residualMs,
          crowd: picks,
          sWaveEndsAt: scenario.remainingSec > 0 ? now + scenario.remainingSec * 1000 : null,
        }
      : null;

  const localEvent: LiveQuake = {
    id: eventId,
    mag: official?.magnitude ?? 0,
    place: official?.region ?? scenario.label,
    time: now,
    lat: official?.lat ?? origin.lat,
    lng: official?.lng ?? origin.lng,
    depthKm: official?.depthKm ?? null,
    source: official?.sourceLabel ?? "손목 판별",
  };

  const citizen =
    get().citizenScience && !get().batterySave && scenario.cls === "quake-candidate";

  const city = origin.city;
  const mesh = seedMesh(city, strong ? "sos" : "shake");

  if (strong) pulseHaptic(set, "warn");

  set({
    phase: strong ? "action" : "confirmed",
    strength: scenario.strength,
    wavefront,
    official: null,
    lastEventAt: now,
    lastEventId: eventId,
    aftershockUntil: strong ? now + AFTERSHOCK_MS : get().aftershockUntil,
    family: get().family.map((m) =>
      m.id === "me" ? { ...m, status: "same-shake" as const, lastSeenMin: 0 } : m,
    ),
    localEvents: [localEvent, ...get().localEvents.filter((e) => e.id !== eventId)].slice(0, 8),
    feltByEvent: {
      ...get().feltByEvent,
      [eventId]: get().feltByEvent[eventId] ?? seedFelt(eventId, official?.magnitude ?? 4, 9),
    },
    contributions: citizen ? get().contributions + 1 : get().contributions,
    mesh,
    log: [
      {
        id: `c-${eventId}`,
        at: now,
        kind: strong ? ("eew" as const) : ("local" as const),
        title: strong ? "강한 흔들림 · 머리 보호" : "지진 맞음 · 사이렌 없음",
        body: fit
          ? `군중 파면 ${Math.round(fit.bearingDeg)}° · ${scenario.crowd}대`
          : "한 대라 방향을 숨김",
      },
      ...get().log,
    ].slice(0, 40),
  });

  later(420, () => set({ mesh: { ...get().mesh, hopsDone: 1 } }));
  later(1100, () => set({ mesh: { ...get().mesh, hopsDone: 2 } }));
  later(1700, () =>
    set({ mesh: { ...get().mesh, hopsDone: 2, delivered: true, broadcasting: false } }),
  );

  if (strong) {
    later(900, () => {
      set({
        family: get().family.map((m) => {
          if (m.id === "friend" && scenario.regionId === "kr")
            return { ...m, status: "same-shake", lastSeenMin: 0 };
          if (m.id === "sib" && scenario.regionId === "jp")
            return { ...m, status: "same-shake", lastSeenMin: 0 };
          return m;
        }),
      });
    });
  }

  if (official && official.source !== "none") {
    later(Math.max(1800, official.delaySec * 400), () => {
      const prev = get().wavefront;
      let next = prev;
      if (prev && official.lat != null && official.lng != null) {
        const epi = { lat: official.lat, lng: official.lng };
        const brg = bearingTo(origin, epi);
        const km = haversineKm(origin, epi);
        next = {
          ...prev,
          method: "official-epicenter",
          bearingDeg: brg,
          officialBearingDeg: brg,
          approxKm: km,
        };
      }
      set({ official, wavefront: next });
      pushLog(set, get, {
        id: `off-${eventId}`,
        at: Date.now(),
        kind: "official",
        title: `${official.sourceLabel} · M${official.magnitude.toFixed(1)}`,
        body:
          next?.method === "official-epicenter"
            ? `나침반을 공식 진앙 방위로 바꿈 · ${official.region}`
            : official.region,
      });
    });
  } else if (official?.source === "none") {
    later(2400, () => {
      set({ official });
      pushLog(set, get, {
        id: `off-${eventId}`,
        at: Date.now(),
        kind: "official",
        title: "공식 경보 없음",
        body: "군중 파면을 유지합니다.",
      });
    });
  }
}
