import type { ShakeClass, FamilyStatus, EventStrength } from "./types.ts";

export const APP_NAME = "그건지진";
export const APP_TAGLINE = "방금 그거, 지진이야";

export const CLASS_LABEL: Record<ShakeClass, string> = {
  idle: "감시 중",
  body: "내 움직임",
  construction: "공사·교통",
  "quake-candidate": "지진 후보",
  unknown: "불명",
};

export const CLASS_REASON: Record<ShakeClass, string> = {
  idle: "워치가 가만히 있을 때만 땅을 봅니다. 지금은 배경 소음만 있습니다.",
  body: "1–2Hz 주기이고 자이로가 같이 돕니다. 걸음·자세로 봅니다.",
  construction: "10Hz 넘는 짧은 충격이 반복됩니다. 주변 기기는 조용합니다.",
  "quake-candidate": "0.5–8Hz, P 다음 S. 자이로는 조용합니다. 아직 확정이 아닙니다.",
  unknown: "패턴이 애매합니다. 군중 확인을 기다리거나 건물 장주기로 올립니다.",
};

export const STATUS_LABEL: Record<FamilyStatus, string> = {
  safe: "안전",
  "same-shake": "같은 흔들림",
  help: "도움 필요",
  silent: "미응답",
};

export const METHOD_LABEL = {
  hidden: "한 대 · 숨김",
  "crowd-plane": "군중 파면",
  "official-epicenter": "공식 진앙",
} as const;

export function actionTitle(strength: EventStrength, confirmed: boolean) {
  if (!confirmed) return "지진일 수 있음";
  if (strength === "strong") return "강한 흔들림";
  if (strength === "weak") return "지진 맞음";
  return "상황 종료";
}

export const INDOOR_STEPS = [
  "낮추고, 머리와 목을 가리세요.",
  "단단한 가구 아래나 안쪽 벽으로.",
  "창가·선반·유리에서 떨어지세요.",
  "흔들림이 잦아지기 전엔 뛰쳐나가지 마세요.",
];

export const OUTDOOR_STEPS = [
  "차량은 쓰지 마세요.",
  "낙하물이 없는 넓은 공터로 걸어서.",
  "전봇대·간판·담장에서 떨어지세요.",
  "여진이 올 수 있으니 건물 안으로 바로 돌아가지 마세요.",
];
