export interface CompareRow {
  feature: string;
  us: string;
  google: string;
  myshake: string;
  safety: string;
  trackers: string;
}

export const COMPARE_ROWS: CompareRow[] = [
  {
    feature: "방금 그 흔들림이 뭔지",
    us: "공사 / 몸 / 지진 후보를 즉시 말함",
    google: "안드로이드만, 정지된 폰",
    myshake: "일상 vs 지진만",
    safety: "없음",
    trackers: "없음 · 발표 후 피드",
  },
  {
    feature: "손목 로컬 판별",
    us: "워치가 센서",
    google: "Wear는 알림만",
    myshake: "폰만",
    safety: "없음",
    trackers: "워치는 피드 표시만",
  },
  {
    feature: "파면 나침반",
    us: "군중 확정 뒤에만",
    google: "진앙은 알림 후 지도",
    myshake: "서버 추정 후",
    safety: "없음",
    trackers: "진앙 핀만",
  },
  {
    feature: "한국 기상청 융합",
    us: "속보가 오면 덮어씀",
    google: "한국 특화 없음",
    myshake: "미국 ShakeAlert",
    safety: "재난문자 중계",
    trackers: "기상청 목록만",
  },
  {
    feature: "옥외대피 · 도보",
    us: "가장 가까운 공터 + 차량 금지",
    google: "Drop / Cover",
    myshake: "Drop / Cover",
    safety: "대피소 목록 있음",
    trackers: "거의 없음",
  },
  {
    feature: "해외 여행",
    us: "나라별 경보 공백을 군중으로 메움",
    google: "98개국 · 안드로이드",
    myshake: "글로벌 시민과학",
    safety: "국내 중심",
    trackers: "지도만",
  },
  {
    feature: "대사관 문자",
    us: "주의 문자로는 부족한 세부(방향·대피)를 채움",
    google: "해당 없음",
    myshake: "해당 없음",
    safety: "해당 없음",
    trackers: "해당 없음",
  },
  {
    feature: "약진 알림",
    us: "이름만 붙임 · 사이렌 없음",
    google: "대략 M4.5부터",
    myshake: "EEW는 M4.5+",
    safety: "문자 기준에 따름",
    trackers: "설정한 규모부터",
  },
  {
    feature: "가족",
    us: "같은 흔들림 · SOS · 사전 캐시 대피소",
    google: "없음",
    myshake: "체감 제보",
    safety: "없음",
    trackers: "일부 SOS만",
  },
  {
    feature: "건물 학습",
    us: "집/회사 소음 프로필",
    google: "네트워크로 오탐 제거",
    myshake: "정지 폰만 사용",
    safety: "없음",
    trackers: "없음",
  },
  {
    feature: "여진 72시간",
    us: "민감도만 올림 · 듀티 사이클 유지",
    google: "없음",
    myshake: "없음",
    safety: "없음",
    trackers: "피드 연속",
  },
  {
    feature: "2초 창 특징",
    us: "mean/std/IQR/ZCR + 자이로 + FFT",
    google: "비공개 온디바이스",
    myshake: "ANN 같은 특징, 정지 폰만",
    safety: "없음",
    trackers: "없음",
  },
  {
    feature: "건물 장주기",
    us: "T≈0.1N, 기압 층, 학습 임계값",
    google: "네트워크 오탐 제거",
    myshake: "정지 폰만",
    safety: "없음",
    trackers: "없음",
  },
  {
    feature: "오프라인·BLE",
    us: "GeoJSON 캐시 + hop SOS (시연)",
    google: "네트워크 의존",
    myshake: "Wi-Fi 때 파형 업로드",
    safety: "온라인 목록",
    trackers: "온라인 피드",
  },
  {
    feature: "아이폰 감지망",
    us: "워치+폰 시민 망 (프로토타입)",
    google: "없음",
    myshake: "iOS 앱은 있음",
    safety: "수신만",
    trackers: "수신만",
  },
];

export const HONEST_CANT = [
  "지진 전조를 예측하지 않습니다. 이미 시작된 흔들림만 봅니다.",
  "워치 한 대로 진앙 좌표를 찍지 않습니다. 방향은 군중이 모인 뒤에만 켭니다.",
  "약진마다 전면 사이렌을 울리지 않습니다. 끄게 되기 때문입니다.",
  "차량 대피를 안내하지 않습니다.",
  "기상청·JMA보다 항상 빠르다고 주장하지 않습니다. 문자가 비거나 늦을 때를 메웁니다.",
  "BLE 메쉬는 미리보기에서 hop을 보여 줍니다. 실제 Multipeer는 네이티브가 필요합니다.",
];

export const HONEST_CAN = [
  "서 있는 동안 손목 진동을 공사·몸·지진 후보로 가릅니다.",
  "근처 기기가 동시에 흔들리면 지진으로 확정하고 파면 방향을 그립니다.",
  "공식 속보가 오면 규모·진앙으로 교체합니다.",
  "가장 가까운 옥외 대피 장소까지 걸어서 가는 방향을 보여 줍니다.",
  "한국·일본·대만·네팔처럼 나라마다 공식 망의 빈 칸을 다르게 채웁니다.",
  "2초 창에서 MyShake식 특징과 자이로로 걸음을 걸러 냅니다.",
  "고층 고유주기를 학습해 강풍 오탐을 줄입니다.",
];
