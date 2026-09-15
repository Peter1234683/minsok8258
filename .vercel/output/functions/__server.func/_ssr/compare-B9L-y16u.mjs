import { z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Card } from "./card-BoTRSVH4.mjs";
import { n as MYSHAKE_VS_US, r as WAVE_METHODS, t as MYSHAKE_FACTS } from "./science-CCfclsLM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compare-B9L-y16u.js
var import_jsx_runtime = require_jsx_runtime();
var COMPARE_ROWS = [
	{
		feature: "방금 그 흔들림이 뭔지",
		us: "공사 / 몸 / 지진 후보를 즉시 말함",
		google: "안드로이드만, 정지된 폰",
		myshake: "일상 vs 지진만",
		safety: "없음",
		trackers: "없음 · 발표 후 피드"
	},
	{
		feature: "손목 로컬 판별",
		us: "워치가 센서",
		google: "Wear는 알림만",
		myshake: "폰만",
		safety: "없음",
		trackers: "워치는 피드 표시만"
	},
	{
		feature: "파면 나침반",
		us: "군중 확정 뒤에만",
		google: "진앙은 알림 후 지도",
		myshake: "서버 추정 후",
		safety: "없음",
		trackers: "진앙 핀만"
	},
	{
		feature: "한국 기상청 융합",
		us: "속보가 오면 덮어씀",
		google: "한국 특화 없음",
		myshake: "미국 ShakeAlert",
		safety: "재난문자 중계",
		trackers: "기상청 목록만"
	},
	{
		feature: "옥외대피 · 도보",
		us: "가장 가까운 공터 + 차량 금지",
		google: "Drop / Cover",
		myshake: "Drop / Cover",
		safety: "대피소 목록 있음",
		trackers: "거의 없음"
	},
	{
		feature: "해외 여행",
		us: "나라별 경보 공백을 군중으로 메움",
		google: "98개국 · 안드로이드",
		myshake: "글로벌 시민과학",
		safety: "국내 중심",
		trackers: "지도만"
	},
	{
		feature: "대사관 문자",
		us: "주의 문자로는 부족한 세부(방향·대피)를 채움",
		google: "해당 없음",
		myshake: "해당 없음",
		safety: "해당 없음",
		trackers: "해당 없음"
	},
	{
		feature: "약진 알림",
		us: "이름만 붙임 · 사이렌 없음",
		google: "대략 M4.5부터",
		myshake: "EEW는 M4.5+",
		safety: "문자 기준에 따름",
		trackers: "설정한 규모부터"
	},
	{
		feature: "가족",
		us: "같은 흔들림 · SOS · 사전 캐시 대피소",
		google: "없음",
		myshake: "체감 제보",
		safety: "없음",
		trackers: "일부 SOS만"
	},
	{
		feature: "건물 학습",
		us: "집/회사 소음 프로필",
		google: "네트워크로 오탐 제거",
		myshake: "정지 폰만 사용",
		safety: "없음",
		trackers: "없음"
	},
	{
		feature: "여진 72시간",
		us: "민감도만 올림",
		google: "없음",
		myshake: "없음",
		safety: "없음",
		trackers: "피드 연속"
	},
	{
		feature: "아이폰 감지망",
		us: "워치+폰 시민 망 (프로토타입)",
		google: "없음",
		myshake: "iOS 앱은 있음",
		safety: "수신만",
		trackers: "수신만"
	}
];
var HONEST_CANT = [
	"지진 전조를 예측하지 않습니다. 이미 시작된 흔들림만 봅니다.",
	"워치 한 대로 진앙 좌표를 찍지 않습니다. 방향은 군중이 모인 뒤에만 켭니다.",
	"약진마다 전면 사이렌을 울리지 않습니다. 끄게 되기 때문입니다.",
	"차량 대피를 안내하지 않습니다.",
	"기상청·JMA보다 항상 빠르다고 주장하지 않습니다. 문자가 비거나 늦을 때를 메웁니다."
];
var HONEST_CAN = [
	"서 있는 동안 손목 진동을 공사·몸·지진 후보로 가릅니다.",
	"근처 기기가 동시에 흔들리면 지진으로 확정하고 파면 방향을 그립니다.",
	"공식 속보가 오면 규모·진앙으로 교체합니다.",
	"가장 가까운 옥외 대피 장소까지 걸어서 가는 방향을 보여 줍니다.",
	"한국·일본·대만·네팔처럼 나라마다 공식 망의 빈 칸을 다르게 채웁니다."
];
var COLS = [
	["us", "그건지진"],
	["google", "Google AEA"],
	["myshake", "MyShake"],
	["safety", "안전디딤돌"],
	["trackers", "피드 앱"]
];
function ComparePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-muted",
					children: "NOT FIRST. SPECIFIC."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl font-semibold",
					children: "이미 있는 것, 없는 것"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "지진 알림 앱은 많습니다. 그건지진은 기상청을 이기려 하지 않습니다. 손목에서 ‘방금 그거’를 가릅니다."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "파면 방향을 구하는 네 가지"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "바늘이 가리키는 것은 진앙 좌표가 아닙니다. 지금 이 지점으로 파동이 들어오는 방위입니다."
					}),
					WAVE_METHODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-xl border border-border bg-bg-elevated p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-base font-semibold",
								children: m.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-xs text-steel",
								children: m.formula
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: m.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-subtle",
								children: m.usedBy
							})
						]
					}, m.id))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "MyShake를 벤치마크한 이유"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "시민 폰 지진망의 원형입니다. 그걸 베끼지 않고, 한 사람이 방금 느낀 흔들림을 가르는 쪽으로 갈라집니다."
					}),
					MYSHAKE_FACTS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base",
						children: f.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: f.body
					})] }, f.title)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-xl border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-bg-elevated text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-medium",
										children: "축"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-medium",
										children: "MyShake"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-medium",
										children: "그건지진"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: MYSHAKE_VS_US.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border align-top",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-medium",
										children: r.axis
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 text-muted",
										children: r.myshake
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 text-steel",
										children: r.us
									})
								]
							}, r.axis)) })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-3",
				children: COMPARE_ROWS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-border bg-bg-elevated p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-base font-semibold",
						children: row.feature
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2",
						children: COLS.map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-bg px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[11px] text-muted",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: key === "us" ? "mt-0.5 text-sm text-steel" : "mt-0.5 text-sm",
								children: row[key]
							})]
						}, key))
					})]
				}, row.feature))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "피드 앱은 QuakeWatch+, 지진체크, Earthquake HQ처럼 공식 발표 후 지도를 보여주는 부류입니다."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: "하는 일"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2 text-sm text-muted",
				children: HONEST_CAN.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: "하지 않는 일"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2 text-sm text-muted",
				children: HONEST_CANT.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
			})] })
		]
	});
}
//#endregion
export { ComparePage as component };
