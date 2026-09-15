import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Card } from "./card-BoTRSVH4.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as waveformAt, a as DEMO_QUAKES, c as METHOD_LABEL, f as TRAVEL, h as cardinal, r as CLASS_LABEL, u as SCENARIOS, x as useQuakeStore } from "./quake-store-Cl37Qgmg.mjs";
import { t as Button } from "./button-C4NTVTwa.mjs";
import { r as FeltForm } from "./router-D0chT5Hb.mjs";
import { t as WaveMethodPanel } from "./wave-method-panel-B3KVzXOG.mjs";
import { t as Badge } from "./badge-DqVDPLMK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dz-atQOq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LiveFeed() {
	const rows = useQuakeStore((s) => s.liveQuakes);
	const shown = rows.length ? rows : DEMO_QUAKES;
	const error = useQuakeStore((s) => s.liveError);
	const setLive = useQuakeStore((s) => s.setLive);
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setNow(Date.now());
		const tick = window.setInterval(() => setNow(Date.now()), 3e4);
		return () => window.clearInterval(tick);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		async function load() {
			try {
				const res = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson");
				if (!res.ok) throw new Error("feed");
				const mapped = (await res.json()).features.slice(0, 12).map((f) => ({
					id: f.id,
					mag: f.properties.mag,
					place: f.properties.place,
					time: f.properties.time,
					lng: f.geometry.coordinates[0],
					lat: f.geometry.coordinates[1],
					depthKm: f.geometry.coordinates[2] ?? null,
					source: "USGS"
				}));
				if (!cancelled) setLive([...DEMO_QUAKES, ...mapped].sort((a, b) => b.time - a.time));
			} catch {
				if (!cancelled) setLive(DEMO_QUAKES, "실시간 글로벌 피드를 읽지 못해 기상청형 샘플만 표시합니다.");
			}
		}
		load();
		const id = window.setInterval(load, 12e4);
		return () => {
			cancelled = true;
			window.clearInterval(id);
		};
	}, [setLive]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-bg-elevated p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-semibold",
					children: "공식 자료"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/map",
					className: "text-xs text-steel",
					children: "지도"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-warn",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-border",
				children: shown.slice(0, 8).map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "flex items-start gap-3 py-2.5 first:pt-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/quake/$id",
						params: { id: q.id },
						className: "flex min-w-0 flex-1 items-start gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `w-10 shrink-0 font-mono text-sm tabular-nums ${q.mag >= 5 ? "text-danger" : "text-steel"}`,
								children: q.mag.toFixed(1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm",
									children: q.place
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [now == null ? "—" : timeAgo(q.time, now), q.depthKm != null ? ` · ${q.depthKm.toFixed(0)} km` : ""]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: q.source.startsWith("기상") ? "ok" : "muted",
								children: q.source
							})
						]
					})
				}, q.id))
			})
		]
	});
}
function timeAgo(t, now) {
	const m = Math.max(1, Math.round((now - t) / 6e4));
	if (m < 60) return `${m}분 전`;
	const h = Math.round(m / 60);
	if (h < 24) return `${h}시간 전`;
	return `${Math.round(h / 24)}일 전`;
}
function ScenarioBar() {
	const play = useQuakeStore((s) => s.playScenario);
	const reset = useQuakeStore((s) => s.reset);
	const active = useQuakeStore((s) => s.lastScenarioId);
	const phase = useQuakeStore((s) => s.phase);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-bg-elevated p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-semibold",
					children: "시연"
				}), phase !== "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs text-muted hover:text-fg",
					onClick: reset,
					children: "리셋"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: "실제 워치 센서 대신, 흔들림 종류를 재생해 판별·나침반·대피를 봅니다."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3",
				children: SCENARIOS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: active === s.id ? "primary" : "secondary",
					size: "sm",
					className: cn("h-auto min-h-11 min-w-0 w-full whitespace-normal flex-col items-start py-2 text-left"),
					onClick: () => play(s.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: s.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("whitespace-normal text-pretty text-[11px] font-normal leading-snug", active === s.id ? "text-steel-fg/70" : "text-muted"),
						children: s.blurb
					})]
				}, s.id))
			})
		]
	});
}
function Seismograph({ height = 72 }) {
	const kind = useQuakeStore((s) => s.waveformKind);
	const [d, setD] = (0, import_react.useState)("M 0 36");
	(0, import_react.useEffect)(() => {
		let raf = 0;
		let last = 0;
		const start = performance.now();
		const buf = [];
		const w = 320;
		const h = height;
		const amp = h * .4;
		const draw = (now) => {
			const t = (now - start) / 1e3;
			let v = 0;
			for (let i = 0; i < 12; i++) {
				const s = waveformAt(kind, t - i * .004);
				if (Math.abs(s) > Math.abs(v)) v = s;
			}
			buf.push(v);
			if (buf.length > 80) buf.shift();
			if (now - last > 50) {
				last = now;
				const path = buf.map((sample, i) => {
					const x = i / Math.max(1, buf.length - 1) * w;
					const y = h / 2 - sample * amp;
					return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
				}).join(" ");
				setD(path || `M 0 ${h / 2}`);
			}
			raf = requestAnimationFrame(draw);
		};
		raf = requestAnimationFrame(draw);
		return () => cancelAnimationFrame(raf);
	}, [kind, height]);
	const stroke = kind === "construction" ? "#a3926f" : kind === "walk" ? "#7a8ea3" : kind === "idle" ? "#c5cbd3" : "#c45c4a";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 320 ${height}`,
		className: "block w-full",
		height,
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "0",
			y1: height / 2,
			x2: "320",
			y2: height / 2,
			stroke: "rgba(197,203,211,0.12)"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d,
			fill: "none",
			stroke,
			strokeWidth: "1.6"
		})]
	});
}
function toneFor(cls) {
	if (cls === "construction") return "construction";
	if (cls === "body") return "body";
	if (cls === "quake-candidate") return "danger";
	if (cls === "idle") return "steel";
	return "muted";
}
function WatchFace() {
	const phase = useQuakeStore((s) => s.phase);
	const result = useQuakeStore((s) => s.result);
	const wavefront = useQuakeStore((s) => s.wavefront);
	const cls = result?.cls ?? "idle";
	const aftershockUntil = useQuakeStore((s) => s.aftershockUntil);
	const aftershock = !!aftershockUntil && aftershockUntil > Date.now();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto flex w-full max-w-sm flex-col items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("relative aspect-square w-[min(100%,22rem)] rounded-full border bg-bg-elevated shadow-soft", phase === "action" ? "border-danger/50" : "border-border-strong"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[10%] rounded-full border border-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-[18%] rounded-full border border-border/60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticks, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Needle, { deg: wavefront && (phase === "confirmed" || phase === "action") ? wavefront.bearingDeg : null }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-[26%] flex flex-col items-center justify-center rounded-full bg-bg px-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-[0.7rem] tracking-[0.22em] text-muted",
								children: "그건지진"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-3xl font-semibold leading-none",
								children: phase === "sensing" ? "읽는 중" : CLASS_LABEL[cls]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-mono text-xs tabular-nums text-muted",
								children: result ? `${result.dominantHz.toFixed(1)} Hz · ${(result.peakG * 1e3).toFixed(0)} mg` : "—"
							}),
							wavefront && (phase === "confirmed" || phase === "action") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm text-steel",
								children: [
									METHOD_LABEL[wavefront.method],
									" · ",
									cardinal(wavefront.bearingDeg),
									" ",
									wavefront.approxKm.toFixed(0),
									" km"
								]
							}) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap items-center justify-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: toneFor(cls),
						children: CLASS_LABEL[cls]
					}),
					aftershock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "warn",
						children: "여진 구간 72h"
					}) : null,
					phase === "crowding" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "steel",
						children: "근처 기기 확인 중"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 w-full overflow-hidden rounded-lg border border-border bg-bg-elevated px-2 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seismograph, {
					height: 64,
					compact: true
				})
			})
		]
	});
}
function Needle({ deg }) {
	if (deg == null) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 transition-transform duration-500",
		style: { transform: `rotate(${deg}deg)` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-[6%] h-[18%] w-0.5 -translate-x-1/2 rounded-full bg-danger" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-[6%] size-2 -translate-x-1/2 rounded-full bg-danger" })]
	});
}
function Ticks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: "pointer-events-none absolute inset-0",
		viewBox: "0 0 100 100",
		"aria-hidden": true,
		children: Array.from({ length: 12 }, (_, i) => {
			const a = (i * 30 - 90) * Math.PI / 180;
			const x1 = +(50 + Math.cos(a) * 47).toFixed(2);
			const y1 = +(50 + Math.sin(a) * 47).toFixed(2);
			const x2 = +(50 + Math.cos(a) * 43).toFixed(2);
			const y2 = +(50 + Math.sin(a) * 43).toFixed(2);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1,
				y1,
				x2,
				y2,
				stroke: "rgba(197,203,211,0.45)",
				strokeWidth: "0.7",
				strokeLinecap: "round"
			}, i);
		})
	});
}
function useMotionWatch() {
	const sensorOn = useQuakeStore((s) => s.sensorOn);
	const ingest = useQuakeStore((s) => s.ingestMotion);
	(0, import_react.useEffect)(() => {
		if (!sensorOn) return;
		const buf = [];
		const onMotion = (e) => {
			const a = e.accelerationIncludingGravity;
			if (!a) return;
			const g = Math.hypot(a.x ?? 0, a.y ?? 0, a.z ?? 0) / 9.81 - 1;
			buf.push(g);
			if (buf.length > 64) buf.shift();
			if (buf.length === 64) ingest([...buf], 1 / 60);
		};
		window.addEventListener("devicemotion", onMotion);
		return () => window.removeEventListener("devicemotion", onMotion);
	}, [sensorOn, ingest]);
}
function Home() {
	const result = useQuakeStore((s) => s.result);
	const phase = useQuakeStore((s) => s.phase);
	const official = useQuakeStore((s) => s.official);
	const regionId = useQuakeStore((s) => s.regionId);
	const strength = useQuakeStore((s) => s.strength);
	const travel = TRAVEL[regionId];
	const aftershockUntil = useQuakeStore((s) => s.aftershockUntil);
	const lastEventId = useQuakeStore((s) => s.lastEventId);
	const aftershock = !!aftershockUntil && aftershockUntil > Date.now();
	useMotionWatch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-w-0 gap-6 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:items-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: "steel",
							children: [
								travel.city,
								" · ",
								travel.country
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: travel.officialEew === "none" ? "warn" : "ok",
							children: travel.officialLabel
						}),
						aftershock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "warn",
							children: "여진 민감도 상승"
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatchFace, {}),
				result && phase !== "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.16em] text-muted",
						children: "로컬 판별"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-xl",
						children: result.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: result.reason
					}),
					result.pThenS ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-steel",
						children: "P파 다음 S파 형태가 보입니다. 거리는 방향이 아닙니다."
					}) : null,
					phase === "crowding" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-steel",
						children: "반경 2km 기기 확인 중. 한 대만이면 공사로 남고 바늘은 숨깁니다."
					}) : null,
					phase === "confirmed" && strength === "weak" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: "지진 맞습니다. 사이렌은 울리지 않습니다. 여진만 주시하세요."
					}) : null,
					official ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 border-t border-border pt-3 text-sm",
						children: [
							official.sourceLabel,
							" · M",
							official.magnitude.toFixed(1),
							" · ",
							official.region,
							" ·",
							" ",
							official.intensityLocal
						]
					}) : null
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "가만히 서 있으면 손목이 땅을 봅니다. 흔들리면 공사인지, 당신인지, 지진 후보인지를 먼저 말하고, 근처 기기가 동의해야 파면 나침반을 켭니다."
				}) }),
				lastEventId && (phase === "confirmed" || phase === "action") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeltForm, { eventId: lastEventId }) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioBar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaveMethodPanel, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveFeed, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/safety",
							className: "text-steel",
							children: "안전"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/log",
							className: "text-steel",
							children: "기록"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/compare",
							className: "text-steel",
							children: "비교"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { Home as component };
