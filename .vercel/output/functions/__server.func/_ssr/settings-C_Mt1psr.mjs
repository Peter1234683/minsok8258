import { t as cn } from "./cn-Ccejyh36.mjs";
import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-BoTRSVH4.mjs";
import { p as TRAVEL_LIST, x as useQuakeStore, y as playAlertSound } from "./quake-store-Cl37Qgmg.mjs";
import { t as Button } from "./button-C4NTVTwa.mjs";
import { t as Badge } from "./badge-DqVDPLMK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-C_Mt1psr.js
var import_jsx_runtime = require_jsx_runtime();
var BUILDINGS = [
	{
		id: "home",
		label: "집 · 아파트",
		floors: 15,
		learnedHz: [.35, .9],
		constructionHours: [8, 18],
		weekdayOnly: true,
		noiseFloorG: .004,
		note: "고층 장주기와 주간 공사 패턴을 학습했습니다. 평일 낮 고주파는 공사 쪽으로 기울입니다."
	},
	{
		id: "work",
		label: "직장 · 사무실",
		floors: 8,
		learnedHz: [1.1, 2.4],
		constructionHours: [7, 19],
		weekdayOnly: true,
		noiseFloorG: .006,
		note: "지하철 통과 진동이 있습니다. 짧은 2Hz 대역은 교통으로 봅니다."
	},
	{
		id: "hotel",
		label: "여행 · 호텔",
		floors: 12,
		learnedHz: [.4, 1.2],
		constructionHours: [0, 0],
		weekdayOnly: false,
		noiseFloorG: .005,
		note: "프로필을 모릅니다. 여행 모드에서는 군중 확인 비중을 높입니다."
	}
];
function SettingsPage() {
	const regionId = useQuakeStore((s) => s.regionId);
	const setRegion = useQuakeStore((s) => s.setRegion);
	const buildingId = useQuakeStore((s) => s.buildingId);
	const setBuilding = useQuakeStore((s) => s.setBuilding);
	const sensorOn = useQuakeStore((s) => s.sensorOn);
	const setSensorOn = useQuakeStore((s) => s.setSensorOn);
	const until = useQuakeStore((s) => s.aftershockUntil);
	const aftershock = !!until && until > Date.now();
	const homebaseId = useQuakeStore((s) => s.homebaseId);
	const setHomebase = useQuakeStore((s) => s.setHomebase);
	const notifyGlobalMag = useQuakeStore((s) => s.notifyGlobalMag);
	const notifyHomeMag = useQuakeStore((s) => s.notifyHomeMag);
	const notifyHomeKm = useQuakeStore((s) => s.notifyHomeKm);
	const setNotify = useQuakeStore((s) => s.setNotify);
	const citizenScience = useQuakeStore((s) => s.citizenScience);
	const setCitizenScience = useQuakeStore((s) => s.setCitizenScience);
	const batterySave = useQuakeStore((s) => s.batterySave);
	const setBatterySave = useQuakeStore((s) => s.setBatterySave);
	const criticalAlerts = useQuakeStore((s) => s.criticalAlerts);
	const setCriticalAlerts = useQuakeStore((s) => s.setCriticalAlerts);
	const locationShare = useQuakeStore((s) => s.locationShare);
	const setLocationShare = useQuakeStore((s) => s.setLocationShare);
	const contributions = useQuakeStore((s) => s.contributions);
	const openDrill = useQuakeStore((s) => s.openDrill);
	async function enableSensor() {
		const DE = DeviceMotionEvent;
		if (typeof DE.requestPermission === "function") {
			if (await DE.requestPermission() !== "granted") return;
		}
		setSensorOn(true);
	}
	const hoursLeft = until && aftershock ? Math.max(1, Math.round((until - Date.now()) / 36e5)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.18em] text-muted",
				children: "CONTEXT"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-3xl font-semibold",
				children: "여행 · 건물 · 알림"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/safety",
						className: "text-steel",
						children: "안전"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-subtle",
						children: "·"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/log",
						className: "text-steel",
						children: "기록"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-subtle",
						children: "·"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/compare",
						className: "text-steel",
						children: "비교"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "홈베이스" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardMeta, {
					className: "mt-2",
					children: [
						"자리비움에도 이 도시 기준 M",
						notifyHomeMag.toFixed(1),
						" 알림을 받습니다. 서버에 주소를 올리지 않습니다."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-1.5",
					children: TRAVEL_LIST.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setHomebase(t.id),
						className: cn("rounded-full border px-3 py-1 text-xs", homebaseId === t.id ? "border-steel/50 bg-steel/15" : "border-border text-muted"),
						children: t.city
					}, t.id))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "지진 알림 (속보 아님)" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, {
					className: "mt-2",
					children: "발표 수 분 뒤 정보 알림입니다. EEW 사이렌과 다릅니다. 기본값: 글로벌 M6.5+, 홈베이스 80km M3.0+."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-3 gap-2 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs text-muted",
							children: ["글로벌 M", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								step: "0.1",
								value: notifyGlobalMag,
								onChange: (e) => setNotify({ global: Number(e.target.value) }),
								className: "mt-1 h-10 w-full rounded-md border border-border bg-bg px-2 font-mono text-sm text-fg"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs text-muted",
							children: ["홈 M", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								step: "0.1",
								value: notifyHomeMag,
								onChange: (e) => setNotify({ home: Number(e.target.value) }),
								className: "mt-1 h-10 w-full rounded-md border border-border bg-bg px-2 font-mono text-sm text-fg"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-xs text-muted",
							children: ["반경 km", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								step: "10",
								value: notifyHomeKm,
								onChange: (e) => setNotify({ km: Number(e.target.value) }),
								className: "mt-1 h-10 w-full rounded-md border border-border bg-bg px-2 font-mono text-sm text-fg"
							})]
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: criticalAlerts,
						label: "중요 알림",
						hint: "집중 모드를 뚫는 강한 흔들림 경보.",
						onClick: () => setCriticalAlerts(!criticalAlerts)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: locationShare,
						label: "대략 위치",
						hint: "홈베이스 외에 지금 있는 곳으로 알림을 맞춥니다. 식별에 쓰지 않습니다.",
						onClick: () => setLocationShare(!locationShare)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: citizenScience,
						label: "시민 망",
						hint: "트리거 시각만 보냅니다. 파형 5분은 올리지 않습니다.",
						onClick: () => setCitizenScience(!citizenScience)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: batterySave,
						label: "배터리 절약",
						hint: "시민 망 수집을 끕니다.",
						onClick: () => setBatterySave(!batterySave)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "경보음 · 훈련" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, {
					className: "mt-2",
					children: "실제 지진이 아닙니다. 낮추고 머리 보호만 연습합니다."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "sm",
						onClick: () => void playAlertSound(),
						children: "경보음 재생"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "sm",
						onClick: openDrill,
						children: "월간 훈련"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-subtle",
					children: [
						"시민 망 기여 ",
						contributions,
						"회"
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "여행 모드"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "나라마다 공식 경보의 빈 칸이 다릅니다. 군중 비중만 바꿉니다."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: TRAVEL_LIST.map((t) => {
						const on = t.id === regionId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setRegion(t.id),
							className: cn("w-full rounded-xl border px-4 py-3 text-left", on ? "border-steel/40 bg-bg-elevated" : "border-border bg-bg-elevated/60"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-medium",
										children: [t.city, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-2 text-muted",
											children: t.country
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										tone: t.officialEew === "none" ? "warn" : t.officialEew === "strong" ? "ok" : "muted",
										children: [
											"군중 ",
											Math.round(t.crowdWeight * 100),
											"%"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: t.hint
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-[11px] text-subtle",
									children: [
										"공식 ",
										t.officialLabel,
										" · 대사관",
										" ",
										t.embassyQuality === "caution-only" ? "주의 문자" : t.embassyQuality === "slow" ? "느림" : t.embassyQuality === "none" ? "없음" : "상세"
									]
								})
							]
						}) }, t.id);
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg",
					children: "건물 필터"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "평소 진동을 학습해 오탐을 줄입니다. 고층 장주기는 지진이 아닙니다."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-2",
					children: BUILDINGS.map((b) => {
						const on = b.id === buildingId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setBuilding(b.id),
							className: cn("rounded-xl border px-4 py-3 text-left", on ? "border-steel/40 bg-bg-elevated" : "border-border bg-bg-elevated/60"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-medium",
									children: [b.label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-2 font-mono text-xs text-muted",
										children: [b.floors, "층"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: b.note
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 font-mono text-[11px] text-subtle",
									children: [
										b.learnedHz[0],
										"–",
										b.learnedHz[1],
										" Hz · 바닥 ",
										(b.noiseFloorG * 1e3).toFixed(0),
										" mg"
									]
								})
							]
						}, b.id);
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "여진 시계" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, {
					className: "mt-2",
					children: "확정된 강진 이후 72시간만 민감도를 올립니다. 약진 사이렌은 여전히 없습니다."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-2xl tabular-nums",
					children: aftershock ? `${hoursLeft}시간 남음` : "비활성"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "이 기기를 센서로" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, {
					className: "mt-2",
					children: "미리보기와 데스크톱에서는 시연 버튼이 정확합니다. 폰에서는 가속도계를 켤 수 있습니다."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: sensorOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "ok",
						children: "가속도계 켜짐"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => void enableSensor(),
						children: "동작 센서 허용"
					})
				})
			] })
		]
	});
}
function Toggle({ on, label, hint, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex w-full items-start justify-between gap-3 rounded-xl border border-border bg-bg-elevated px-4 py-3 text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-0.5 block text-xs text-muted",
			children: hint
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: on ? "ok" : "muted",
			children: on ? "켜짐" : "꺼짐"
		})]
	});
}
//#endregion
export { SettingsPage as component };
