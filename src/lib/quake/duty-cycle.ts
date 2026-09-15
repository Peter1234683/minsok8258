export type DutyMode = "sleep" | "burst";

export const DUTY = {
  sampleHz: 100,
  burstMs: 5000,
  wakeLatencyMs: 500,
  continuousHrs: 9,
  dutyHrs: 38,
  aftershockHrs: 30,
  saveHrs: 46,
} as const;

export function estimateBatteryHrs(opts: {
  aftershock: boolean;
  batterySave: boolean;
  continuous?: boolean;
}) {
  if (opts.continuous) return DUTY.continuousHrs;
  if (opts.batterySave) return DUTY.saveHrs;
  if (opts.aftershock) return DUTY.aftershockHrs;
  return DUTY.dutyHrs;
}

export function dutyHint(mode: DutyMode, aftershock: boolean) {
  if (mode === "burst") return "100Hz 5초 샘플링";
  if (aftershock) return "여진 72h · 인터럽트만 깨움";
  return "딥슬립 · 흔들릴 때만 CPU";
}
