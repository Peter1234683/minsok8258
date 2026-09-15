export interface CrowdPick {
  x: number;
  y: number;
  t: number;
}

export interface PlaneFit {
  bearingDeg: number;
  cKms: number;
  t0: number;
  residualMs: number;
}

function det3(M: number[][]) {
  const a = M[0]!;
  const b = M[1]!;
  const c = M[2]!;
  return (
    a[0]! * (b[1]! * c[2]! - b[2]! * c[1]!) -
    a[1]! * (b[0]! * c[2]! - b[2]! * c[0]!) +
    a[2]! * (b[0]! * c[1]! - b[1]! * c[0]!)
  );
}

function solve3(A: number[][], rhs: number[]): [number, number, number] | null {
  const D = det3(A);
  if (Math.abs(D) < 1e-12) return null;
  const col = (k: number) =>
    A.map((row, i) => row.map((v, j) => (j === k ? rhs[i]! : v)));
  return [det3(col(0)) / D, det3(col(1)) / D, det3(col(2)) / D];
}

export function fitPlaneWave(picks: CrowdPick[]): PlaneFit | null {
  if (picks.length < 3) return null;
  let S1 = 0;
  let Sx = 0;
  let Sy = 0;
  let St = 0;
  let Sxx = 0;
  let Syy = 0;
  let Sxy = 0;
  let Sxt = 0;
  let Syt = 0;
  for (const p of picks) {
    S1 += 1;
    Sx += p.x;
    Sy += p.y;
    St += p.t;
    Sxx += p.x * p.x;
    Syy += p.y * p.y;
    Sxy += p.x * p.y;
    Sxt += p.x * p.t;
    Syt += p.y * p.t;
  }
  const sol = solve3(
    [
      [S1, Sx, Sy],
      [Sx, Sxx, Sxy],
      [Sy, Sxy, Syy],
    ],
    [St, Sxt, Syt],
  );
  if (!sol) return null;
  const [t0, sx, sy] = sol;
  const slowness = Math.hypot(sx, sy);
  if (slowness < 1e-6) return null;
  let bearingDeg = (Math.atan2(-sx, -sy) * 180) / Math.PI;
  if (bearingDeg < 0) bearingDeg += 360;
  let sse = 0;
  for (const p of picks) {
    const pred = t0 + sx * p.x + sy * p.y;
    sse += (p.t - pred) ** 2;
  }
  return {
    bearingDeg,
    cKms: 1 / slowness,
    t0,
    residualMs: Math.sqrt(sse / picks.length) * 1000,
  };
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) >>> 0;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seedFrom(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function syntheticCrowd(opts: {
  bearingDeg: number;
  n: number;
  seed: number;
  apertureKm?: number;
  cKms?: number;
}): CrowdPick[] {
  const n = Math.max(3, opts.n);
  const aperture = opts.apertureKm ?? 2.4;
  const c = opts.cKms ?? 3.5;
  const θ = (opts.bearingDeg * Math.PI) / 180;
  const rand = mulberry32(opts.seed);
  const picks: CrowdPick[] = [];
  for (let i = 0; i < n; i++) {
    const x = (rand() - 0.5) * aperture;
    const y = (rand() - 0.5) * aperture;
    const t = -(x * Math.sin(θ) + y * Math.cos(θ)) / c + (rand() - 0.5) * 0.03;
    picks.push({ x, y, t });
  }
  return picks;
}
