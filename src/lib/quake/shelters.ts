import type { Shelter, TravelRegionId } from "./types.ts";

export const USER_DEFAULT = { lat: 37.5665, lng: 126.978 };

export const SHELTERS: Shelter[] = [
  {
    id: "s-gwanghwamun",
    name: "광화문광장",
    kind: "outdoor",
    lat: 37.572,
    lng: 126.9768,
    walkMin: 8,
    note: "개활지 · 낙하물 적음",
    city: "서울",
  },
  {
    id: "s-seoulplaza",
    name: "서울광장",
    kind: "outdoor",
    lat: 37.5657,
    lng: 126.978,
    walkMin: 3,
    note: "시청 앞 개활지",
    city: "서울",
  },
  {
    id: "s-deoksugung",
    name: "덕수궁 돌담길 녹지",
    kind: "open",
    lat: 37.5659,
    lng: 126.975,
    walkMin: 5,
    note: "담장에서 떨어진 쪽",
    city: "서울",
  },
  {
    id: "s-namsan",
    name: "남산골한옥마을 광장",
    kind: "outdoor",
    lat: 37.5592,
    lng: 126.9946,
    walkMin: 18,
    note: "언덕길 · 도보만",
    city: "서울",
  },
  {
    id: "s-hangang-yeouido",
    name: "여의도한강공원",
    kind: "outdoor",
    lat: 37.5284,
    lng: 126.9336,
    walkMin: 22,
    note: "넓은 하천변",
    city: "서울",
  },
  {
    id: "s-olympic",
    name: "올림픽공원 평화의광장",
    kind: "outdoor",
    lat: 37.5207,
    lng: 127.1226,
    walkMin: 28,
    note: "동측 개활지",
    city: "서울",
  },
  {
    id: "s-seoulforest",
    name: "서울숲 가족마당",
    kind: "outdoor",
    lat: 37.5443,
    lng: 127.0379,
    walkMin: 24,
    note: "수목 사이 넓은 잔디",
    city: "서울",
  },
  {
    id: "s-boramae",
    name: "보라매공원",
    kind: "outdoor",
    lat: 37.4923,
    lng: 126.9197,
    walkMin: 26,
    note: "운동장·잔디",
    city: "서울",
  },
  {
    id: "s-worldcup",
    name: "월드컵공원 평화의광장",
    kind: "outdoor",
    lat: 37.5683,
    lng: 126.8972,
    walkMin: 30,
    note: "서측 개활지",
    city: "서울",
  },
  {
    id: "s-jamsil",
    name: "잠실종합운동장 보조경기장",
    kind: "outdoor",
    lat: 37.5146,
    lng: 127.073,
    walkMin: 32,
    note: "트랙 개활지",
    city: "서울",
  },
  {
    id: "s-busan-gwangalli",
    name: "광안리해변 광장",
    kind: "tsunami",
    lat: 35.1532,
    lng: 129.1185,
    walkMin: 12,
    note: "해안 · 해일 때는 고지대",
    city: "부산",
  },
  {
    id: "s-osaka-nakanoshima",
    name: "나카노시마 공원",
    kind: "outdoor",
    lat: 34.6926,
    lng: 135.506,
    walkMin: 7,
    note: "오사카 도심 개활지",
    city: "오사카",
  },
  {
    id: "s-osaka-castle",
    name: "오사카성 공원",
    kind: "outdoor",
    lat: 34.6873,
    lng: 135.5262,
    walkMin: 14,
    note: "넓은 성곽 공원",
    city: "오사카",
  },
  {
    id: "s-taipei-daan",
    name: "다안삼림공원",
    kind: "outdoor",
    lat: 25.031,
    lng: 121.5355,
    walkMin: 9,
    note: "타이베이 도심 녹지",
    city: "타이베이",
  },
  {
    id: "s-ktm-ratnapark",
    name: "라트나 공원",
    kind: "open",
    lat: 27.701,
    lng: 85.3157,
    walkMin: 6,
    note: "카트만두 개활지 · 벽돌 담 피할 것",
    city: "카트만두",
  },
  {
    id: "s-ktm-tundikhel",
    name: "툰디켈 광장",
    kind: "outdoor",
    lat: 27.7019,
    lng: 85.3188,
    walkMin: 8,
    note: "군 연병장 규모 공터",
    city: "카트만두",
  },
  {
    id: "s-la-panpacific",
    name: "퍼싱 스퀘어",
    kind: "outdoor",
    lat: 34.0484,
    lng: -118.2513,
    walkMin: 10,
    note: "LA 다운타운 광장",
    city: "로스앤젤레스",
  },
  {
    id: "s-ist-gezi",
    name: "탁심 게지 공원",
    kind: "outdoor",
    lat: 41.037,
    lng: 28.986,
    walkMin: 8,
    note: "이스탄불 개활지",
    city: "이스탄불",
  },
  {
    id: "s-mx-chapultepec",
    name: "차풀테펙 공원",
    kind: "outdoor",
    lat: 19.4225,
    lng: -99.1869,
    walkMin: 16,
    note: "멕시코시티 대형 녹지",
    city: "멕시코시티",
  },
];

export function regionCenter(id: TravelRegionId) {
  switch (id) {
    case "jp":
      return { lat: 34.6937, lng: 135.5023, city: "오사카" };
    case "tw":
      return { lat: 25.033, lng: 121.5654, city: "타이베이" };
    case "np":
      return { lat: 27.7172, lng: 85.324, city: "카트만두" };
    case "tr":
      return { lat: 41.0082, lng: 28.9784, city: "이스탄불" };
    case "us-west":
      return { lat: 34.0522, lng: -118.2437, city: "로스앤젤레스" };
    case "mx":
      return { lat: 19.4326, lng: -99.1332, city: "멕시코시티" };
    default:
      return { lat: USER_DEFAULT.lat, lng: USER_DEFAULT.lng, city: "서울" };
  }
}

export function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export function nearestShelters(
  origin: { lat: number; lng: number },
  city: string,
  n = 4,
) {
  const inCity = SHELTERS.filter((s) => s.city === city);
  const pool = inCity.length ? inCity : SHELTERS;
  return [...pool]
    .map((s) => {
      const km = haversineKm(origin, s);
      return { ...s, walkMin: Math.max(2, Math.round(km * 12)), km };
    })
    .sort((a, b) => a.km - b.km)
    .slice(0, n);
}

export function bearingTo(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
) {
  const φ1 = (from.lat * Math.PI) / 180;
  const φ2 = (to.lat * Math.PI) / 180;
  const Δ = ((to.lng - from.lng) * Math.PI) / 180;
  const y = Math.sin(Δ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δ);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}
