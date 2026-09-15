import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BUILDINGS } from "./buildings.ts";
import {
  baroToFloor,
  floorToHpa,
  naturalBand,
  naturalPeriodSec,
} from "./building-filter.ts";
import { classifyWindow } from "./classifier.ts";
import { estimateBatteryHrs } from "./duty-cycle.ts";
import { extractFeatures, fftPeakHz } from "./features.ts";
import { packShelters } from "./offline-cache.ts";
import { synthWindow } from "./synth.ts";
import { fitPlaneWave, seedFrom, syntheticCrowd } from "./wavefront.ts";

const home = BUILDINGS[0]!;
const opts = { aftershock: false, building: home, hour: 14, weekday: true };

describe("MyShake-style 2s features", () => {
  it("extracts mean/std/IQR/ZCR and FFT peak near 1.8 Hz on walk", () => {
    const w = synthWindow("walk", { seed: 7 });
    const f = extractFeatures(w.accel, w.dt, w.gyro);
    assert.ok(f.mean > 0.04);
    assert.ok(f.std > 0.02);
    assert.ok(f.iqr > 0.04);
    assert.ok(f.zcr > 2 && f.zcr < 8);
    assert.ok(Math.abs(fftPeakHz(w.accel, w.dt) - 1.8) < 0.4);
    assert.ok(f.gyroRegularity > 0.45);
    assert.equal(w.accel.length, 200);
    const peakBin = f.spectrum.reduce((a, b) => (b.mag > a.mag ? b : a), f.spectrum[0]!);
    assert.ok(Math.abs(peakBin.hz - 1.8) < 0.8);
  });

  it("classifies walk as body via gyro regularity", () => {
    const w = synthWindow("walk", { seed: 3 });
    const r = classifyWindow({ samples: w.accel, dt: w.dt, gyro: w.gyro }, opts);
    assert.equal(r.cls, "body");
    assert.equal(r.gyroBodyHint, true);
    assert.equal(r.gate, "gyro-body");
  });

  it("classifies pile driving as construction", () => {
    const w = synthWindow("construction", { seed: 9 });
    const r = classifyWindow({ samples: w.accel, dt: w.dt, gyro: w.gyro }, opts);
    assert.equal(r.cls, "construction");
    assert.ok(r.gate === "zcr-construction" || r.gate === "hours-construction");
  });

  it("classifies P then S as quake candidate, not body", () => {
    const w = synthWindow("quake", { seed: 11, peakG: 0.08 });
    const r = classifyWindow({ samples: w.accel, dt: w.dt, gyro: w.gyro }, opts);
    assert.equal(r.cls, "quake-candidate");
    assert.equal(r.pThenS, true);
    assert.equal(r.gyroBodyHint, false);
    assert.equal(r.gate, "p-s-quake");
  });

  it("filters high-rise wind in the natural-period band", () => {
    assert.equal(naturalPeriodSec(15), 1.5);
    const [lo, hi] = naturalBand(15);
    assert.ok(lo < 0.67 && hi > 0.67);
    const w = synthWindow("wind", { seed: 2, floors: 15 });
    const r = classifyWindow({ samples: w.accel, dt: w.dt, gyro: w.gyro }, opts);
    assert.notEqual(r.cls, "quake-candidate");
    assert.equal(r.filteredByBuilding, true);
    assert.equal(r.gate, "building-filter");
  });

  it("baro floor matches storey count near 15", () => {
    const hPa = floorToHpa(15);
    assert.equal(baroToFloor(hPa), 15);
  });
});

describe("duty / cache / array", () => {
  it("duty cycling lasts far longer than continuous 100 Hz", () => {
    assert.ok(estimateBatteryHrs({ aftershock: true, batterySave: false }) > 20);
    assert.ok(
      estimateBatteryHrs({ aftershock: false, batterySave: false, continuous: true }) < 12,
    );
  });

  it("packs city shelters into a small GeoJSON cache", () => {
    const c = packShelters("np", 0);
    assert.equal(c.city, "카트만두");
    assert.ok(c.count >= 2);
    assert.ok(c.bytes < 4000);
  });

  it("plane-wave fit still recovers back-azimuth", () => {
    const picks = syntheticCrowd({
      bearingDeg: 162,
      n: 18,
      seed: seedFrom("strong-kr"),
    });
    const fit = fitPlaneWave(picks);
    assert.ok(fit);
    const err = Math.min(
      Math.abs(fit.bearingDeg - 162),
      360 - Math.abs(fit.bearingDeg - 162),
    );
    assert.ok(err < 3);
  });
});
