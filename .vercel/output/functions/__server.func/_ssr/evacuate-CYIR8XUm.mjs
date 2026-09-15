import { z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-BoTRSVH4.mjs";
import { b as regionCenter, f as TRAVEL, l as OUTDOOR_STEPS, s as INDOOR_STEPS, v as nearestShelters, x as useQuakeStore } from "./quake-store-Cl37Qgmg.mjs";
import { a as RadarMap, i as WaveCompass } from "./router-D0chT5Hb.mjs";
import { t as WaveMethodPanel } from "./wave-method-panel-B3KVzXOG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/evacuate-CYIR8XUm.js
var import_jsx_runtime = require_jsx_runtime();
function EvacuatePage() {
	const regionId = useQuakeStore((s) => s.regionId);
	const wavefront = useQuakeStore((s) => s.wavefront);
	const origin = regionCenter(regionId);
	const travel = TRAVEL[regionId];
	const list = nearestShelters(origin, origin.city, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-muted",
					children: "WALK ONLY"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl font-semibold",
					children: "도보 대피"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						origin.city,
						" · 차량 금지 · 사전 캐시된 옥외 장소 ",
						list.length,
						"곳"
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaveCompass, { size: 240 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaveMethodPanel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadarMap, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "흔들릴 때" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 space-y-1.5 text-sm text-muted",
				children: INDOOR_STEPS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "잦아지면" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 space-y-1.5 text-sm text-muted",
				children: OUTDOOR_STEPS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: "가까운 옥외 장소"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: list.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start justify-between gap-3 rounded-lg border border-border bg-bg-elevated px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: s.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: s.note
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "shrink-0 font-mono text-sm tabular-nums text-steel",
						children: [s.walkMin, "분"]
					})]
				}, s.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardMeta, { children: [travel.hint, wavefront ? " 파동 방향은 어디로 갈지를 바꾸지 않습니다. 열린 공터가 우선입니다." : ""] })
		]
	});
}
//#endregion
export { EvacuatePage as component };
