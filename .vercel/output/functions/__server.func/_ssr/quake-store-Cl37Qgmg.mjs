import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quake-store-Cl37Qgmg.js
function cardinal(deg) {
	return [
		"북",
		"북동",
		"동",
		"남동",
		"남",
		"남서",
		"서",
		"북서"
	][Math.round((deg % 360 + 360) % 360 / 45) % 8];
}
function bearingTo(from, to) {
	const φ1 = from.lat * Math.PI / 180;
	const φ2 = to.lat * Math.PI / 180;
	const Δλ = (to.lng - from.lng) * Math.PI / 180;
	const y = Math.sin(Δλ) * Math.cos(φ2);
	const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
	return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}
function psDistanceKm(dtSec) {
	return Math.max(0, dtSec) * 8;
}
function psDelaySec(km) {
	return km / 8;
}
var USER_DEFAULT = {
	lat: 37.5665,
	lng: 126.978
};
var SHELTERS = [
	{
		id: "s-gwanghwamun",
		name: "광화문광장",
		kind: "outdoor",
		lat: 37.572,
		lng: 126.9768,
		walkMin: 8,
		note: "개활지 · 낙하물 적음",
		city: "서울"
	},
	{
		id: "s-seoulplaza",
		name: "서울광장",
		kind: "outdoor",
		lat: 37.5657,
		lng: 126.978,
		walkMin: 3,
		note: "시청 앞 개활지",
		city: "서울"
	},
	{
		id: "s-deoksugung",
		name: "덕수궁 돌담길 녹지",
		kind: "open",
		lat: 37.5659,
		lng: 126.975,
		walkMin: 5,
		note: "담장에서 떨어진 쪽",
		city: "서울"
	},
	{
		id: "s-namsan",
		name: "남산골한옥마을 광장",
		kind: "outdoor",
		lat: 37.5592,
		lng: 126.9946,
		walkMin: 18,
		note: "언덕길 · 도보만",
		city: "서울"
	},
	{
		id: "s-hangang-yeouido",
		name: "여의도한강공원",
		kind: "outdoor",
		lat: 37.5284,
		lng: 126.9336,
		walkMin: 22,
		note: "넓은 하천변",
		city: "서울"
	},
	{
		id: "s-olympic",
		name: "올림픽공원 평화의광장",
		kind: "outdoor",
		lat: 37.5207,
		lng: 127.1226,
		walkMin: 28,
		note: "동측 개활지",
		city: "서울"
	},
	{
		id: "s-seoulforest",
		name: "서울숲 가족마당",
		kind: "outdoor",
		lat: 37.5443,
		lng: 127.0379,
		walkMin: 24,
		note: "수목 사이 넓은 잔디",
		city: "서울"
	},
	{
		id: "s-boramae",
		name: "보라매공원",
		kind: "outdoor",
		lat: 37.4923,
		lng: 126.9197,
		walkMin: 26,
		note: "운동장·잔디",
		city: "서울"
	},
	{
		id: "s-worldcup",
		name: "월드컵공원 평화의광장",
		kind: "outdoor",
		lat: 37.5683,
		lng: 126.8972,
		walkMin: 30,
		note: "서측 개활지",
		city: "서울"
	},
	{
		id: "s-jamsil",
		name: "잠실종합운동장 보조경기장",
		kind: "outdoor",
		lat: 37.5146,
		lng: 127.073,
		walkMin: 32,
		note: "트랙 개활지",
		city: "서울"
	},
	{
		id: "s-busan-gwangalli",
		name: "광안리해변 광장",
		kind: "tsunami",
		lat: 35.1532,
		lng: 129.1185,
		walkMin: 12,
		note: "해안 · 해일 때는 고지대",
		city: "부산"
	},
	{
		id: "s-osaka-nakanoshima",
		name: "나카노시마 공원",
		kind: "outdoor",
		lat: 34.6926,
		lng: 135.506,
		walkMin: 7,
		note: "오사카 도심 개활지",
		city: "오사카"
	},
	{
		id: "s-osaka-castle",
		name: "오사카성 공원",
		kind: "outdoor",
		lat: 34.6873,
		lng: 135.5262,
		walkMin: 14,
		note: "넓은 성곽 공원",
		city: "오사카"
	},
	{
		id: "s-taipei-daan",
		name: "다안삼림공원",
		kind: "outdoor",
		lat: 25.031,
		lng: 121.5355,
		walkMin: 9,
		note: "타이베이 도심 녹지",
		city: "타이베이"
	},
	{
		id: "s-ktm-ratnapark",
		name: "라트나 공원",
		kind: "open",
		lat: 27.701,
		lng: 85.3157,
		walkMin: 6,
		note: "카트만두 개활지 · 벽돌 담 피할 것",
		city: "카트만두"
	},
	{
		id: "s-ktm-tundikhel",
		name: "툰디켈 광장",
		kind: "outdoor",
		lat: 27.7019,
		lng: 85.3188,
		walkMin: 8,
		note: "군 연병장 규모 공터",
		city: "카트만두"
	},
	{
		id: "s-la-panpacific",
		name: "퍼싱 스퀘어",
		kind: "outdoor",
		lat: 34.0484,
		lng: -118.2513,
		walkMin: 10,
		note: "LA 다운타운 광장",
		city: "로스앤젤레스"
	},
	{
		id: "s-ist-gezi",
		name: "탁심 게지 공원",
		kind: "outdoor",
		lat: 41.037,
		lng: 28.986,
		walkMin: 8,
		note: "이스탄불 개활지",
		city: "이스탄불"
	},
	{
		id: "s-mx-chapultepec",
		name: "차풀테펙 공원",
		kind: "outdoor",
		lat: 19.4225,
		lng: -99.1869,
		walkMin: 16,
		note: "멕시코시티 대형 녹지",
		city: "멕시코시티"
	}
];
function regionCenter(id) {
	switch (id) {
		case "jp": return {
			lat: 34.6937,
			lng: 135.5023,
			city: "오사카"
		};
		case "tw": return {
			lat: 25.033,
			lng: 121.5654,
			city: "타이베이"
		};
		case "np": return {
			lat: 27.7172,
			lng: 85.324,
			city: "카트만두"
		};
		case "tr": return {
			lat: 41.0082,
			lng: 28.9784,
			city: "이스탄불"
		};
		case "us-west": return {
			lat: 34.0522,
			lng: -118.2437,
			city: "로스앤젤레스"
		};
		case "mx": return {
			lat: 19.4326,
			lng: -99.1332,
			city: "멕시코시티"
		};
		default: return {
			lat: USER_DEFAULT.lat,
			lng: USER_DEFAULT.lng,
			city: "서울"
		};
	}
}
function haversineKm(a, b) {
	const R = 6371;
	const dLat = (b.lat - a.lat) * Math.PI / 180;
	const dLng = (b.lng - a.lng) * Math.PI / 180;
	const s = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
	return 2 * R * Math.asin(Math.sqrt(s));
}
function nearestShelters(origin, city, n = 4) {
	const inCity = SHELTERS.filter((s) => s.city === city);
	return [...inCity.length ? inCity : SHELTERS].map((s) => {
		const km = haversineKm(origin, s);
		return {
			...s,
			walkMin: Math.max(2, Math.round(km * 12)),
			km
		};
	}).sort((a, b) => a.km - b.km).slice(0, n);
}
async function playAlertSound() {
	const ctx = new (window.AudioContext || window.webkitAudioContext)();
	const now = ctx.currentTime;
	for (const t of [
		0,
		.28,
		.56
	]) {
		const o = ctx.createOscillator();
		const g = ctx.createGain();
		o.type = "square";
		o.frequency.value = t === .56 ? 660 : 880;
		g.gain.setValueAtTime(1e-4, now + t);
		g.gain.exponentialRampToValueAtTime(.12, now + t + .02);
		g.gain.exponentialRampToValueAtTime(1e-4, now + t + .2);
		o.connect(g);
		g.connect(ctx.destination);
		o.start(now + t);
		o.stop(now + t + .22);
	}
	window.setTimeout(() => void ctx.close(), 1200);
}
var APP_NAME = "그건지진";
var APP_TAGLINE = "방금 그거, 지진이야";
var CLASS_LABEL = {
	idle: "감시 중",
	body: "내 움직임",
	construction: "공사·교통",
	"quake-candidate": "지진 후보",
	unknown: "불명"
};
var CLASS_REASON = {
	idle: "워치가 가만히 있을 때만 땅을 봅니다. 지금은 배경 소음만 있습니다.",
	body: "1–2Hz 주기, 한 사람만 흔들립니다. 걸음·자세 흔들림으로 봅니다.",
	construction: "10Hz 넘는 짧은 충격이 반복됩니다. 주변 기기는 조용합니다.",
	"quake-candidate": "0.5–8Hz, P 다음 S 형태. 아직 확정이 아닙니다.",
	unknown: "패턴이 애매합니다. 군중 확인을 기다리거나 무시합니다."
};
var STATUS_LABEL = {
	safe: "안전",
	"same-shake": "같은 흔들림",
	help: "도움 필요",
	silent: "미응답"
};
var METHOD_LABEL = {
	hidden: "한 대 · 숨김",
	"crowd-plane": "군중 파면",
	"official-epicenter": "공식 진앙"
};
var INDOOR_STEPS = [
	"낮추고, 머리와 목을 가리세요.",
	"단단한 가구 아래나 안쪽 벽으로.",
	"창가·선반·유리에서 떨어지세요.",
	"흔들림이 잦아지기 전엔 뛰쳐나가지 마세요."
];
var OUTDOOR_STEPS = [
	"차량은 쓰지 마세요.",
	"낙하물이 없는 넓은 공터로 걸어서.",
	"전봇대·간판·담장에서 떨어지세요.",
	"여진이 올 수 있으니 건물 안으로 바로 돌아가지 마세요."
];
var DEMO_QUAKES = [{
	id: "kma-demo-1",
	mag: 2.3,
	place: "충남 태안 서남서쪽 28km 해역",
	time: Date.parse("2026-09-08T09:14:00Z"),
	lat: 36.6,
	lng: 126.1,
	depthKm: 18,
	source: "기상청 정보"
}, {
	id: "kma-demo-2",
	mag: 2.1,
	place: "경북 경주 동쪽 11km",
	time: Date.parse("2026-09-08T07:52:00Z"),
	lat: 35.84,
	lng: 129.32,
	depthKm: 12,
	source: "기상청 정보"
}];
var DEFAULT_FAMILY = [
	{
		id: "me",
		name: "나",
		relation: "본인",
		city: "서울",
		status: "safe",
		lastSeenMin: 0
	},
	{
		id: "mom",
		name: "엄마",
		relation: "가족",
		city: "서울 마포",
		status: "silent",
		lastSeenMin: 42
	},
	{
		id: "sib",
		name: "동생",
		relation: "가족",
		city: "오사카",
		status: "safe",
		lastSeenMin: 8,
		traveling: true
	},
	{
		id: "friend",
		name: "지민",
		relation: "같은 건물",
		city: "서울 중구",
		status: "silent",
		lastSeenMin: 16
	}
];
var FELT_LEVELS = [
	{
		id: 1,
		label: "안 느낌",
		hint: "움직임만 의심"
	},
	{
		id: 2,
		label: "약함",
		hint: "선반이 살짝"
	},
	{
		id: 3,
		label: "가벼움",
		hint: "걸어 둔 물건이 흔들림"
	},
	{
		id: 4,
		label: "중간",
		hint: "서 있기 불안"
	},
	{
		id: 5,
		label: "강함",
		hint: "서기 어렵고 물건이 떨어짐"
	}
];
var DAMAGE_LEVELS = [
	{
		id: "none",
		label: "피해 없음"
	},
	{
		id: "objects",
		label: "물건이 떨어짐"
	},
	{
		id: "cracks",
		label: "벽에 금"
	},
	{
		id: "infra",
		label: "도로·교량"
	},
	{
		id: "collapse",
		label: "붕괴 위험"
	}
];
function seedFelt(eventId, mag, count) {
	const n = Math.max(4, count);
	const rows = [];
	const base = mag >= 6 ? 4 : mag >= 5 ? 3 : mag >= 4 ? 2 : 1;
	for (let i = 0; i < n; i++) {
		const jitter = i * 37 % 5 - 2;
		const intensity = Math.min(5, Math.max(1, base + jitter));
		const damage = intensity >= 5 ? i % 3 === 0 ? "cracks" : "objects" : intensity >= 4 ? "objects" : "none";
		rows.push({
			id: `${eventId}-f${i}`,
			eventId,
			intensity,
			damage,
			at: Date.now() - i * 42e3
		});
	}
	return rows;
}
function feltHistogram(rows) {
	const bins = [
		0,
		0,
		0,
		0,
		0
	];
	for (const r of rows) bins[r.intensity - 1] += 1;
	return bins;
}
var SCENARIOS = [
	{
		id: "walk",
		label: "걷기",
		blurb: "내 움직임만. 알림 없음.",
		cls: "body",
		strength: "none",
		crowd: 0,
		bearingDeg: 0,
		remainingSec: 0,
		km: 0,
		regionId: "kr",
		peakG: .12,
		dominantHz: 1.8,
		pThenS: false
	},
	{
		id: "construction",
		label: "공사",
		blurb: "파일 항타 · 한 건물만.",
		cls: "construction",
		strength: "none",
		crowd: 1,
		bearingDeg: 0,
		remainingSec: 0,
		km: 0,
		regionId: "kr",
		peakG: .045,
		dominantHz: 22,
		pThenS: false
	},
	{
		id: "weak",
		label: "약진",
		blurb: "M3.4 수도권. 사이렌 없음.",
		cls: "quake-candidate",
		strength: "weak",
		crowd: 18,
		bearingDeg: 128,
		remainingSec: 0,
		km: 22,
		regionId: "kr",
		official: {
			source: "kma",
			sourceLabel: "기상청 지진정보",
			magnitude: 3.4,
			region: "경기 이천 남남동쪽 8km",
			depthKm: 11,
			originTime: 0,
			delaySec: 11,
			intensityLocal: "진도 III",
			lat: 37.212,
			lng: 127.434
		},
		peakG: .018,
		dominantHz: 3.2,
		pThenS: true
	},
	{
		id: "strong-kr",
		label: "강진 · 한국",
		blurb: "M5.8 내륙. 대피 화면.",
		cls: "quake-candidate",
		strength: "strong",
		crowd: 86,
		bearingDeg: 162,
		remainingSec: 8,
		km: 34,
		regionId: "kr",
		official: {
			source: "kma",
			sourceLabel: "기상청 현장경보",
			magnitude: 5.8,
			region: "경북 포항 북구 북쪽 9km",
			depthKm: 7,
			originTime: 0,
			delaySec: 4,
			intensityLocal: "진도 VI",
			lat: 36.107,
			lng: 129.366
		},
		peakG: .16,
		dominantHz: 2.1,
		pThenS: true
	},
	{
		id: "travel-jp",
		label: "해외 · 일본",
		blurb: "대사관은 주의 문자. JMA는 일본어.",
		cls: "quake-candidate",
		strength: "strong",
		crowd: 64,
		bearingDeg: 214,
		remainingSec: 12,
		km: 48,
		regionId: "jp",
		official: {
			source: "jma",
			sourceLabel: "JMA 긴급지진속보",
			magnitude: 6.1,
			region: "나라현 북부",
			depthKm: 14,
			originTime: 0,
			delaySec: 6,
			intensityLocal: "진도 5약",
			lat: 34.685,
			lng: 135.805
		},
		peakG: .22,
		dominantHz: 1.6,
		pThenS: true
	},
	{
		id: "travel-np",
		label: "해외 · 네팔",
		blurb: "국가 경보 없음. 군중이 확정.",
		cls: "quake-candidate",
		strength: "strong",
		crowd: 41,
		bearingDeg: 76,
		remainingSec: 6,
		km: 18,
		regionId: "np",
		official: {
			source: "none",
			sourceLabel: "공식 경보 없음",
			magnitude: 6.4,
			region: "카트만두 분지 동측",
			depthKm: 10,
			originTime: 0,
			delaySec: 90,
			intensityLocal: "Strong",
			lat: 27.71,
			lng: 85.52
		},
		peakG: .28,
		dominantHz: 1.4,
		pThenS: true
	}
];
function waveformAt(kind, t, extra = 1) {
	if (kind === "walk") return .08 * extra * Math.sin(2 * Math.PI * 1.8 * t);
	if (kind === "construction") {
		const beat = t % .82;
		return extra * (.9 * (beat < .07 ? Math.sin(2 * Math.PI * 26 * t) * Math.exp(-beat * 38) : 0) + .015 * Math.sin(40 * t));
	}
	if (kind === "idle") return .008 * Math.sin(2 * Math.PI * .4 * t);
	const p = Math.exp(-t * 6) * Math.sin(2 * Math.PI * 7.5 * t) * .35;
	const sDelay = 1.55;
	const s = t > sDelay ? Math.exp(-(t - sDelay) * .85) * Math.sin(2 * Math.PI * 2.2 * (t - sDelay)) : 0;
	const surf = t > 3.75 ? .22 * Math.exp(-(t - sDelay - 2.2) * .35) * Math.sin(2 * Math.PI * .7 * t) : 0;
	return extra * (kind === "weak" ? .45 : 1.15) * (p + s + surf);
}
var TRAVEL = {
	kr: {
		id: "kr",
		city: "서울",
		country: "대한민국",
		officialEew: "strong",
		officialLabel: "기상청 현장경보·조기경보",
		embassyQuality: "detail",
		crowdWeight: .35,
		actionLang: "ko",
		hint: "국가 망이 조밀합니다. 워치는 문자가 오기 전 ‘방금 그거’를 먼저 가릅니다."
	},
	jp: {
		id: "jp",
		city: "오사카",
		country: "일본",
		officialEew: "strong",
		officialLabel: "기상청 긴급지진속보 (JMA)",
		embassyQuality: "caution-only",
		crowdWeight: .4,
		actionLang: "ja",
		hint: "속보는 빠르지만 한국어 세부가 없습니다. 대사관은 주의 문자 수준입니다."
	},
	tw: {
		id: "tw",
		city: "타이베이",
		country: "대만",
		officialEew: "moderate",
		officialLabel: "중앙기상서 (CWA)",
		embassyQuality: "caution-only",
		crowdWeight: .55,
		actionLang: "en",
		hint: "공식 경보는 있으나 여행자 언어가 빈약합니다. 파면·대피는 워치가 담당합니다."
	},
	np: {
		id: "np",
		city: "카트만두",
		country: "네팔",
		officialEew: "none",
		officialLabel: "국가 조기경보 없음",
		embassyQuality: "slow",
		crowdWeight: .9,
		actionLang: "en",
		hint: "공식 알림을 기다리면 늦습니다. 군중 감지 비중을 최대로 올립니다."
	},
	tr: {
		id: "tr",
		city: "이스탄불",
		country: "튀르키예",
		officialEew: "weak",
		officialLabel: "AFAD (지역 편차 큼)",
		embassyQuality: "slow",
		crowdWeight: .75,
		actionLang: "en",
		hint: "강진 이력이 큽니다. 로컬 망이 비면 손목 판별과 가족 밴드가 먼저입니다."
	},
	"us-west": {
		id: "us-west",
		city: "로스앤젤레스",
		country: "미국",
		officialEew: "strong",
		officialLabel: "USGS ShakeAlert",
		embassyQuality: "detail",
		crowdWeight: .4,
		actionLang: "en",
		hint: "안드로이드는 Google이 커버합니다. 아이폰·워치 공백을 이 앱이 메웁니다."
	},
	mx: {
		id: "mx",
		city: "멕시코시티",
		country: "멕시코",
		officialEew: "moderate",
		officialLabel: "SASMEX",
		embassyQuality: "caution-only",
		crowdWeight: .6,
		actionLang: "en",
		hint: "분지 지반이 흔들림을 키웁니다. 건물 필터가 고층 장주기를 학습합니다."
	}
};
var TRAVEL_LIST = Object.values(TRAVEL);
function det3(M) {
	const a = M[0];
	const b = M[1];
	const c = M[2];
	return a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
}
function solve3(A, rhs) {
	const D = det3(A);
	if (Math.abs(D) < 1e-12) return null;
	const col = (k) => A.map((row, i) => row.map((v, j) => j === k ? rhs[i] : v));
	return [
		det3(col(0)) / D,
		det3(col(1)) / D,
		det3(col(2)) / D
	];
}
function fitPlaneWave(picks) {
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
	const sol = solve3([
		[
			S1,
			Sx,
			Sy
		],
		[
			Sx,
			Sxx,
			Sxy
		],
		[
			Sy,
			Sxy,
			Syy
		]
	], [
		St,
		Sxt,
		Syt
	]);
	if (!sol) return null;
	const [t0, sx, sy] = sol;
	const slowness = Math.hypot(sx, sy);
	if (slowness < 1e-6) return null;
	let bearingDeg = Math.atan2(-sx, -sy) * 180 / Math.PI;
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
		residualMs: Math.sqrt(sse / picks.length) * 1e3
	};
}
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a = a + 1831565813 >>> 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) >>> 0;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function seedFrom(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
	return h >>> 0;
}
function syntheticCrowd(opts) {
	const n = Math.max(3, opts.n);
	const aperture = opts.apertureKm ?? 2.4;
	const c = opts.cKms ?? 3.5;
	const θ = opts.bearingDeg * Math.PI / 180;
	const rand = mulberry32(opts.seed);
	const picks = [];
	for (let i = 0; i < n; i++) {
		const x = (rand() - .5) * aperture;
		const y = (rand() - .5) * aperture;
		const t = -(x * Math.sin(θ) + y * Math.cos(θ)) / c + (rand() - .5) * .03;
		picks.push({
			x,
			y,
			t
		});
	}
	return picks;
}
var AFTERSHOCK_MS = 2592e5;
var idleResult = () => ({
	cls: "idle",
	confidence: .95,
	peakG: .003,
	dominantHz: .4,
	durationMs: 0,
	pThenS: false,
	label: CLASS_LABEL.idle,
	reason: CLASS_REASON.idle
});
var runToken = 0;
var timers = [];
function later(ms, fn) {
	const id = window.setTimeout(fn, ms);
	timers.push(id);
	return id;
}
function clearTimers() {
	while (timers.length) {
		const id = timers.pop();
		if (id) window.clearTimeout(id);
	}
}
function pushLog(set, get, entry) {
	set({ log: [entry, ...get().log].slice(0, 40) });
}
var useQuakeStore = create()(persist((set, get) => ({
	phase: "idle",
	result: idleResult(),
	strength: "none",
	wavefront: null,
	official: null,
	regionId: "kr",
	buildingId: "home",
	family: DEFAULT_FAMILY,
	aftershockUntil: null,
	lastEventAt: null,
	lastEventId: null,
	lastScenarioId: null,
	liveQuakes: DEMO_QUAKES,
	localEvents: [],
	liveError: null,
	waveformKind: "idle",
	sensorOn: false,
	homebaseId: "kr",
	notifyGlobalMag: 6.5,
	notifyHomeMag: 3,
	notifyHomeKm: 80,
	citizenScience: true,
	batterySave: false,
	criticalAlerts: true,
	locationShare: false,
	contributions: 0,
	log: [],
	notifiedIds: [],
	feltByEvent: {},
	feltSubmittedFor: null,
	drillOpen: false,
	setSensorOn: (on) => set({ sensorOn: on }),
	setHomebase: (id) => set({
		homebaseId: id,
		regionId: id
	}),
	setNotify: (p) => set({
		notifyGlobalMag: p.global ?? get().notifyGlobalMag,
		notifyHomeMag: p.home ?? get().notifyHomeMag,
		notifyHomeKm: p.km ?? get().notifyHomeKm
	}),
	setCitizenScience: (on) => set({ citizenScience: on }),
	setBatterySave: (on) => set({
		batterySave: on,
		citizenScience: on ? false : get().citizenScience
	}),
	setCriticalAlerts: (on) => set({ criticalAlerts: on }),
	setLocationShare: (on) => set({ locationShare: on }),
	setLive: (rows, error = null) => {
		const origin = regionCenter(get().homebaseId);
		const seen = new Set(get().notifiedIds);
		const extra = [];
		for (const q of rows) {
			if (seen.has(q.id)) continue;
			const km = haversineKm(origin, q);
			const homeHit = q.mag >= get().notifyHomeMag && km <= get().notifyHomeKm;
			const globalHit = q.mag >= get().notifyGlobalMag;
			if (!homeHit && !globalHit) continue;
			seen.add(q.id);
			extra.push({
				id: `n-${q.id}`,
				at: Date.now(),
				kind: "notify",
				title: `M${q.mag.toFixed(1)} ${homeHit ? "홈베이스 인근" : "글로벌"}`,
				body: `${q.place} · 속보 아님, 발표 후 알림`
			});
		}
		set({
			liveQuakes: rows,
			liveError: error,
			notifiedIds: [...seen].slice(-80),
			log: extra.length ? [...extra, ...get().log].slice(0, 40) : get().log
		});
	},
	setRegion: (id) => set({ regionId: id }),
	setBuilding: (id) => set({ buildingId: id }),
	setFamilyStatus: (id, status) => set({ family: get().family.map((m) => m.id === id ? {
		...m,
		status,
		lastSeenMin: 0
	} : m) }),
	pingFamily: () => {
		const strong = get().strength === "strong";
		set({ family: get().family.map((m) => {
			if (m.id === "me") return {
				...m,
				status: "same-shake",
				lastSeenMin: 0
			};
			if (m.traveling && get().regionId !== "jp") return m;
			if (strong && m.id === "friend") return {
				...m,
				status: "same-shake",
				lastSeenMin: 0
			};
			if (strong && m.id === "mom") return {
				...m,
				status: "silent",
				lastSeenMin: m.lastSeenMin
			};
			return m;
		}) });
	},
	submitFelt: (eventId, intensity, damage) => {
		const mine = {
			id: `mine-${Date.now()}`,
			eventId,
			intensity,
			damage,
			at: Date.now(),
			mine: true
		};
		const cur = get().feltByEvent[eventId] ?? [];
		set({
			feltByEvent: {
				...get().feltByEvent,
				[eventId]: [mine, ...cur]
			},
			feltSubmittedFor: eventId
		});
		pushLog(set, get, {
			id: `felt-${eventId}`,
			at: Date.now(),
			kind: "felt",
			title: "체감 제보",
			body: `강도 ${intensity} · ${damage}`
		});
	},
	ensureFelt: (eventId, mag) => {
		if (get().feltByEvent[eventId]) return;
		set({ feltByEvent: {
			...get().feltByEvent,
			[eventId]: seedFelt(eventId, mag, 8)
		} });
	},
	openDrill: () => {
		playAlertSound();
		set({ drillOpen: true });
		pushLog(set, get, {
			id: `drill-${Date.now()}`,
			at: Date.now(),
			kind: "drill",
			title: "훈련 · 낮추고 머리 보호",
			body: "실제 지진이 아닙니다. Drop / Cover / Hold On."
		});
	},
	closeDrill: () => set({ drillOpen: false }),
	reset: () => {
		runToken += 1;
		clearTimers();
		set({
			phase: "idle",
			result: idleResult(),
			strength: "none",
			wavefront: null,
			official: null,
			lastScenarioId: null,
			waveformKind: "idle",
			drillOpen: false
		});
	},
	ingestMotion: (samples, dt) => {
		if (get().phase === "action" || get().phase === "crowding") return;
		const peak = samples.reduce((m, v) => Math.max(m, Math.abs(v)), 0);
		if (peak < .04) return;
		const hz = (() => {
			let c = 0;
			for (let i = 1; i < samples.length; i++) if (samples[i - 1] <= 0 && samples[i] > 0) c++;
			return c / Math.max(.001, samples.length * dt);
		})();
		if (hz > 8) get().playScenario("construction");
		else if (hz > .7 && hz < 2.8 && peak < .25) get().playScenario("walk");
		else get().playScenario("weak");
	},
	playScenario: (id) => {
		const scenario = SCENARIOS.find((s) => s.id === id);
		if (!scenario) return;
		runToken += 1;
		const token = runToken;
		clearTimers();
		const travel = TRAVEL[scenario.regionId];
		if (scenario.strength === "strong") playAlertSound();
		set({
			phase: "sensing",
			result: idleResult(),
			strength: "none",
			wavefront: null,
			official: null,
			lastScenarioId: id,
			waveformKind: id,
			regionId: scenario.regionId,
			buildingId: scenario.regionId === "kr" ? get().buildingId : "hotel"
		});
		later(420, () => {
			if (token !== runToken) return;
			const result = {
				cls: scenario.cls,
				confidence: scenario.cls === "quake-candidate" ? scenario.pThenS ? .73 : .6 : .84,
				peakG: scenario.peakG,
				dominantHz: scenario.dominantHz,
				durationMs: scenario.cls === "body" ? 2400 : 1800,
				pThenS: scenario.pThenS,
				label: CLASS_LABEL[scenario.cls],
				reason: CLASS_REASON[scenario.cls]
			};
			set({
				phase: "local-result",
				result
			});
			if (scenario.cls === "quake-candidate") pushLog(set, get, {
				id: `local-${id}-${Date.now()}`,
				at: Date.now(),
				kind: "local",
				title: "손목 판별 · 지진 후보",
				body: `${result.dominantHz.toFixed(1)} Hz · 군중 확인 전`
			});
			if (scenario.cls !== "quake-candidate") return;
			later(850, () => {
				if (token !== runToken) return;
				set({ phase: "crowding" });
				later(420 + (1 - travel.crowdWeight) * 900, () => {
					if (token !== runToken) return;
					confirmEvent(scenario, set, get);
				});
			});
		});
	}
}), {
	name: "geotjin-v2",
	skipHydration: true,
	partialize: (s) => ({
		regionId: s.regionId,
		buildingId: s.buildingId,
		aftershockUntil: s.aftershockUntil,
		homebaseId: s.homebaseId,
		notifyGlobalMag: s.notifyGlobalMag,
		notifyHomeMag: s.notifyHomeMag,
		notifyHomeKm: s.notifyHomeKm,
		citizenScience: s.citizenScience,
		batterySave: s.batterySave,
		criticalAlerts: s.criticalAlerts,
		locationShare: s.locationShare,
		contributions: s.contributions,
		notifiedIds: s.notifiedIds,
		log: s.log.slice(0, 20)
	})
}));
function confirmEvent(scenario, set, get) {
	const now = Date.now();
	const strong = scenario.strength === "strong";
	const official = scenario.official ? {
		...scenario.official,
		originTime: now
	} : null;
	const eventId = `local-${scenario.id}`;
	const origin = regionCenter(scenario.regionId);
	const n = Math.min(36, Math.max(8, Math.round(scenario.crowd * .45)));
	const picks = syntheticCrowd({
		bearingDeg: scenario.bearingDeg,
		n,
		seed: seedFrom(scenario.id)
	});
	const fit = scenario.crowd >= 8 ? fitPlaneWave(picks) : null;
	const wavefront = fit && scenario.crowd >= 8 ? {
		bearingDeg: fit.bearingDeg,
		remainingSWaveSec: scenario.remainingSec,
		approxKm: scenario.km,
		confirmedBy: scenario.crowd,
		radiusKm: 2,
		method: "crowd-plane",
		crowdBearingDeg: fit.bearingDeg,
		officialBearingDeg: null,
		psKm: scenario.pThenS ? psDistanceKm(psDelaySec(scenario.km)) : null,
		apparentC: fit.cKms,
		residualMs: fit.residualMs,
		crowd: picks,
		sWaveEndsAt: scenario.remainingSec > 0 ? now + scenario.remainingSec * 1e3 : null
	} : null;
	const localEvent = {
		id: eventId,
		mag: official?.magnitude ?? 0,
		place: official?.region ?? scenario.label,
		time: now,
		lat: official?.lat ?? origin.lat,
		lng: official?.lng ?? origin.lng,
		depthKm: official?.depthKm ?? null,
		source: official?.sourceLabel ?? "손목 판별"
	};
	const citizen = get().citizenScience && !get().batterySave && scenario.cls === "quake-candidate";
	set({
		phase: strong ? "action" : "confirmed",
		strength: scenario.strength,
		wavefront,
		official: null,
		lastEventAt: now,
		lastEventId: eventId,
		aftershockUntil: strong ? now + AFTERSHOCK_MS : get().aftershockUntil,
		family: get().family.map((m) => m.id === "me" ? {
			...m,
			status: "same-shake",
			lastSeenMin: 0
		} : m),
		localEvents: [localEvent, ...get().localEvents.filter((e) => e.id !== eventId)].slice(0, 8),
		feltByEvent: {
			...get().feltByEvent,
			[eventId]: get().feltByEvent[eventId] ?? seedFelt(eventId, official?.magnitude ?? 4, 9)
		},
		contributions: citizen ? get().contributions + 1 : get().contributions,
		log: [{
			id: `c-${eventId}`,
			at: now,
			kind: strong ? "eew" : "local",
			title: strong ? "강한 흔들림 · 머리 보호" : "지진 맞음 · 사이렌 없음",
			body: fit ? `군중 파면 ${Math.round(fit.bearingDeg)}° · ${scenario.crowd}대` : "한 대라 방향을 숨김"
		}, ...get().log].slice(0, 40)
	});
	if (strong) later(900, () => {
		set({ family: get().family.map((m) => {
			if (m.id === "friend" && scenario.regionId === "kr") return {
				...m,
				status: "same-shake",
				lastSeenMin: 0
			};
			if (m.id === "sib" && scenario.regionId === "jp") return {
				...m,
				status: "same-shake",
				lastSeenMin: 0
			};
			return m;
		}) });
	});
	if (official && official.source !== "none") later(official.delaySec * 180, () => {
		const prev = get().wavefront;
		let next = prev;
		if (prev && official.lat != null && official.lng != null) {
			const epi = {
				lat: official.lat,
				lng: official.lng
			};
			const brg = bearingTo(origin, epi);
			const km = haversineKm(origin, epi);
			next = {
				...prev,
				method: "official-epicenter",
				bearingDeg: brg,
				officialBearingDeg: brg,
				approxKm: km
			};
		}
		set({
			official,
			wavefront: next
		});
		pushLog(set, get, {
			id: `off-${eventId}`,
			at: Date.now(),
			kind: "official",
			title: `${official.sourceLabel} · M${official.magnitude.toFixed(1)}`,
			body: next?.method === "official-epicenter" ? `나침반을 공식 진앙 방위로 바꿈 · ${official.region}` : official.region
		});
	});
	else if (official?.source === "none") later(2400, () => {
		set({ official });
		pushLog(set, get, {
			id: `off-${eventId}`,
			at: Date.now(),
			kind: "official",
			title: "공식 경보 없음",
			body: "군중 파면을 유지합니다."
		});
	});
}
//#endregion
export { waveformAt as S, haversineKm as _, DEMO_QUAKES as a, regionCenter as b, METHOD_LABEL as c, STATUS_LABEL as d, TRAVEL as f, feltHistogram as g, cardinal as h, DAMAGE_LEVELS as i, OUTDOOR_STEPS as l, bearingTo as m, APP_TAGLINE as n, FELT_LEVELS as o, TRAVEL_LIST as p, CLASS_LABEL as r, INDOOR_STEPS as s, APP_NAME as t, SCENARIOS as u, nearestShelters as v, useQuakeStore as x, playAlertSound as y };
