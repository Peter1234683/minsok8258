export const SAFETY = {
  prepare: {
    title: "대비",
    items: [
      "가구·가전을 벽에 고정하고 머리 위 선반을 비우세요.",
      "문 옆에 신발, 손전등, 약, 물을 모아 두세요.",
      "가족 집합 장소와 옥외 공터를 미리 캐시해 두세요.",
      "가스 잠그는 법과 엘리베이터 정지를 한 번 연습하세요.",
    ],
  },
  survive: {
    title: "흔들릴 때",
    items: [
      "낮추고, 머리와 목을 가리세요. (Drop / Cover / Hold On)",
      "창가·유리·선반에서 떨어지세요. 엘리베이터는 타지 마세요.",
      "흔들림이 잦아지기 전엔 뛰쳐나가지 마세요.",
      "차량을 쓰지 마세요. 도로가 막히고 낙하물이 있습니다.",
    ],
  },
  recover: {
    title: "잦아진 뒤",
    items: [
      "가스·전기를 확인하고 낙하물이 없는 공터로 걸어서 이동하세요.",
      "여진 72시간. 건물 안으로 바로 돌아가지 마세요.",
      "공식 속보와 이 앱의 손목 판별을 같이 보세요. SNS만 보지 마세요.",
      "가족 밴드에 안전 또는 SOS를 남기세요.",
    ],
  },
} as const;

export const SAFETY_LINKS = [
  { href: "https://www.weather.go.kr/w/eqk-vol/safety/eqk-action.do", label: "기상청 지진 행동요령" },
  { href: "https://www.safekorea.go.kr/", label: "국민재난안전포털" },
] as const;
