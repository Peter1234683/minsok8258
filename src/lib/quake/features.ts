export interface SpectrumBin {
  hz: number;
  mag: number;
}

export interface WindowFeatures {
  mean: number;
  std: number;
  iqr: number;
  zcr: number;
  peakG: number;
  dominantHz: number;
  fftHz: number;
  gyroRms: number;
  gyroRegularity: number;
  burstiness: number;
  pThenS: boolean;
  durationMs: number;
  spectrum: SpectrumBin[];
}

export const ZERO_FEATURES: WindowFeatures = {
  mean: 0,
  std: 0,
  iqr: 0,
  zcr: 0,
  peakG: 0,
  dominantHz: 0,
  fftHz: 0,
  gyroRms: 0,
  gyroRegularity: 0,
  burstiness: 0,
  pThenS: false,
  durationMs: 0,
  spectrum: [],
};

export function peakAbs(samples: number[]) {
  let m = 0;
  for (const v of samples) m = Math.max(m, Math.abs(v));
  return m;
}

export function meanAbs(samples: number[]) {
  if (!samples.length) return 0;
  let s = 0;
  for (const v of samples) s += Math.abs(v);
  return s / samples.length;
}

export function stdAbs(samples: number[]) {
  if (samples.length < 2) return 0;
  const m = meanAbs(samples);
  let v = 0;
  for (const x of samples) {
    const d = Math.abs(x) - m;
    v += d * d;
  }
  return Math.sqrt(v / samples.length);
}

export function iqrAbs(samples: number[]) {
  if (samples.length < 4) return 0;
  const sorted = samples.map(Math.abs).sort((a, b) => a - b);
  const q = (p: number) => {
    const i = (sorted.length - 1) * p;
    const lo = Math.floor(i);
    const hi = Math.ceil(i);
    const a = sorted[lo]!;
    const b = sorted[hi]!;
    return a + (b - a) * (i - lo);
  };
  return q(0.75) - q(0.25);
}

/** Zero-crossings per second (both directions). */
export function zeroCrossingRate(samples: number[], dt: number) {
  if (samples.length < 2) return 0;
  let c = 0;
  for (let i = 1; i < samples.length; i++) {
    const a = samples[i - 1]!;
    const b = samples[i]!;
    if ((a <= 0 && b > 0) || (a >= 0 && b < 0)) c++;
  }
  const duration = samples.length * dt;
  return duration > 0 ? c / duration : 0;
}

export function dominantHz(samples: number[], dt: number) {
  if (samples.length < 8) return 0;
  let crossings = 0;
  for (let i = 1; i < samples.length; i++) {
    if (samples[i - 1]! <= 0 && samples[i]! > 0) crossings++;
  }
  const duration = samples.length * dt;
  return duration > 0 ? crossings / duration : 0;
}

export function fftPeakHz(samples: number[], dt: number) {
  const n = samples.length;
  if (n < 16 || dt <= 0) return 0;
  let mean = 0;
  for (const v of samples) mean += v;
  mean /= n;
  let bestMag = 0;
  let bestK = 1;
  const maxK = Math.floor(n / 2);
  for (let k = 1; k < maxK; k++) {
    let re = 0;
    let im = 0;
    const w = (2 * Math.PI * k) / n;
    for (let t = 0; t < n; t++) {
      const x = samples[t]! - mean;
      re += x * Math.cos(w * t);
      im -= x * Math.sin(w * t);
    }
    const mag = re * re + im * im;
    if (mag > bestMag) {
      bestMag = mag;
      bestK = k;
    }
  }
  return bestK / (n * dt);
}

/** Coarse DFT bars for the 2s window — on-device, no Python. */
export function fftSpectrum(
  samples: number[],
  dt: number,
  binCount = 16,
  maxHz = 16,
): SpectrumBin[] {
  const n = samples.length;
  if (n < 16 || dt <= 0) return [];
  let mean = 0;
  for (const v of samples) mean += v;
  mean /= n;
  const nyquist = 0.5 / dt;
  const hi = Math.min(maxHz, nyquist);
  const out: SpectrumBin[] = [];
  for (let b = 0; b < binCount; b++) {
    const hz = ((b + 0.5) / binCount) * hi;
    const k = hz * n * dt;
    let re = 0;
    let im = 0;
    const w = (2 * Math.PI * k) / n;
    for (let t = 0; t < n; t++) {
      const x = samples[t]! - mean;
      re += x * Math.cos(w * t);
      im -= x * Math.sin(w * t);
    }
    out.push({ hz, mag: Math.sqrt(re * re + im * im) / n });
  }
  return out;
}

export function burstiness(samples: number[]) {
  const p = peakAbs(samples) || 1;
  let short = 0;
  for (const v of samples) {
    if (Math.abs(v) > 0.45 * p) short += 1;
  }
  return short / Math.max(1, samples.length);
}

export function pThenSHint(samples: number[]) {
  const mid = Math.floor(samples.length * 0.35);
  if (mid < 4) return false;
  return peakAbs(samples.slice(mid)) > peakAbs(samples.slice(0, mid)) * 1.55;
}

export function rms(samples: number[]) {
  if (!samples.length) return 0;
  let s = 0;
  for (const v of samples) s += v * v;
  return Math.sqrt(s / samples.length);
}

/** Autocorr at walking cadence (1.0–2.5 Hz). High + periodic gyro = 걸음. */
export function gyroRegularity(gyro: number[], dt: number) {
  if (gyro.length < 24 || dt <= 0) return 0;
  let mean = 0;
  for (const v of gyro) mean += v;
  mean /= gyro.length;
  let den = 0;
  const centered = gyro.map((v) => {
    const x = v - mean;
    den += x * x;
    return x;
  });
  if (den < 1e-12) return 0;
  const lagLo = Math.max(2, Math.round(1 / (2.6 * dt)));
  const lagHi = Math.min(
    Math.floor(gyro.length / 3),
    Math.round(1 / (0.9 * dt)),
  );
  let best = 0;
  for (let lag = lagLo; lag <= lagHi; lag++) {
    let num = 0;
    for (let i = 0; i < centered.length - lag; i++) {
      num += centered[i]! * centered[i + lag]!;
    }
    const n = centered.length - lag;
    const acf = num / (den * (n / centered.length));
    if (acf > best) best = acf;
  }
  return Math.max(0, Math.min(1, best));
}

export function extractFeatures(
  accel: number[],
  dt: number,
  gyro?: number[],
): WindowFeatures {
  const g = gyro && gyro.length === accel.length ? gyro : [];
  return {
    mean: meanAbs(accel),
    std: stdAbs(accel),
    iqr: iqrAbs(accel),
    zcr: zeroCrossingRate(accel, dt),
    peakG: peakAbs(accel),
    dominantHz: dominantHz(accel, dt),
    fftHz: fftPeakHz(accel, dt),
    gyroRms: g.length ? rms(g) : 0,
    gyroRegularity: g.length ? gyroRegularity(g, dt) : 0,
    burstiness: burstiness(accel),
    pThenS: pThenSHint(accel),
    durationMs: accel.length * dt * 1000,
    spectrum: fftSpectrum(accel, dt),
  };
}
