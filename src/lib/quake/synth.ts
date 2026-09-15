import { waveformAt } from "./scenarios.ts";

export type SynthKind = "idle" | "walk" | "construction" | "quake" | "wind";

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seedFrom(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface SynthWindow {
  accel: number[];
  gyro: number[];
  dt: number;
}

/** 2 s window at 100 Hz — MyShake used 2 s slides; duty-cycle burst is 100 Hz. */
export function synthWindow(
  kind: SynthKind,
  opts: { seed?: number; peakG?: number; floors?: number; seconds?: number } = {},
): SynthWindow {
  const dt = 0.01;
  const n = Math.round((opts.seconds ?? 2) / dt);
  const rand = mulberry32(opts.seed ?? 1);
  const accel: number[] = [];
  const gyro: number[] = [];
  const floors = opts.floors ?? 15;
  const fn = 1 / (0.1 * floors);
  const peak = opts.peakG;

  for (let i = 0; i < n; i++) {
    const t = i * dt;
    const noise = (rand() - 0.5) * 0.0016;
    let a = 0;
    let g = (rand() - 0.5) * 0.02;
    if (kind === "idle") {
      a = 0.0022 * Math.sin(2 * Math.PI * 0.35 * t) + noise;
    } else if (kind === "walk") {
      a = 0.11 * Math.sin(2 * Math.PI * 1.8 * t) + 0.03 * Math.sin(2 * Math.PI * 3.6 * t) + noise;
      g = 1.15 * Math.sin(2 * Math.PI * 1.8 * t + 0.4);
    } else if (kind === "construction") {
      const beat = t % 0.38;
      const pulse = beat < 0.045 ? Math.sin(2 * Math.PI * 22 * t) * Math.exp(-beat * 55) : 0;
      a = 0.05 * pulse + 0.004 * Math.sin(2 * Math.PI * 18 * t) + noise;
    } else if (kind === "wind") {
      a = 0.011 * Math.sin(2 * Math.PI * fn * t) + noise;
    } else {
      const mag = peak ?? 0.08;
      const p = Math.exp(-t * 7) * Math.sin(2 * Math.PI * 6.5 * t) * mag * 0.35;
      const sDelay = 0.72;
      const s =
        t > sDelay
          ? Math.exp(-(t - sDelay) * 1.1) * Math.sin(2 * Math.PI * 2.4 * (t - sDelay)) * mag
          : 0;
      a = p + s + noise;
      g = (rand() - 0.5) * 0.04;
    }
    accel.push(a);
    gyro.push(g);
  }
  return { accel, gyro, dt };
}

export function synthKindForScenario(id: string): SynthKind {
  if (id === "walk") return "walk";
  if (id === "construction") return "construction";
  if (id === "wind") return "wind";
  if (id === "idle") return "idle";
  return "quake";
}

export function synthFromWaveform(kind: string, seconds = 2): SynthWindow {
  const dt = 0.01;
  const n = Math.round(seconds / dt);
  const accel: number[] = [];
  const gyro: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = i * dt;
    accel.push(waveformAt(kind, t));
    gyro.push(kind === "walk" ? Math.sin(2 * Math.PI * 1.8 * t) : 0);
  }
  return { accel, gyro, dt };
}
