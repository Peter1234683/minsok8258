export type HapticKind = "none" | "nudge" | "warn";

export const HAPTIC_STEPS = [
  { id: "trajectory", label: "궤적", hint: "2초 창을 읽습니다." },
  { id: "impact", label: "충격", hint: "톡 톡 · 주의만." },
  { id: "verify", label: "교차검증", hint: "군중이 같으면 드르륵." },
] as const;

export function hapticPattern(kind: Exclude<HapticKind, "none">) {
  return kind === "nudge" ? [40, 110, 40] : [180, 40, 180, 40, 280];
}

export function fireHaptic(kind: Exclude<HapticKind, "none">) {
  if (typeof navigator === "undefined") return;
  const vibe = navigator.vibrate?.bind(navigator);
  if (!vibe) return;
  try {
    vibe(hapticPattern(kind));
  } catch {
    /* ignore: some browsers throw if the tab is not focused */
  }
}
