import { t as cn } from "./cn-Ccejyh36.mjs";
import { z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as WAVE_METHODS } from "./science-CCfclsLM.mjs";
import { x as useQuakeStore } from "./quake-store-Cl37Qgmg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wave-method-panel-B3KVzXOG.js
var import_jsx_runtime = require_jsx_runtime();
var ACTIVE = {
	hidden: "polar",
	"crowd-plane": "array",
	"official-epicenter": "network"
};
function WaveMethodPanel() {
	const wavefront = useQuakeStore((s) => s.wavefront);
	const phase = useQuakeStore((s) => s.phase);
	const active = phase === "crowding" ? "array" : wavefront ? ACTIVE[wavefront.method] ?? "polar" : "polar";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-bg-elevated p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-base font-semibold",
				children: "지금 쓰는 방법"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: "바늘은 진앙 핀이 아닙니다. 이 지점으로 들어오는 방위입니다."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-2",
				children: WAVE_METHODS.map((m) => {
					const on = m.id === active && (phase === "confirmed" || phase === "action" || phase === "crowding");
					const idleOn = m.id === "polar" && (phase === "idle" || phase === "sensing" || phase === "local-result");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("rounded-md px-3 py-2", on || idleOn ? "bg-bg ring-1 ring-steel/35" : "bg-bg/50"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: m.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 font-mono text-[11px] text-steel",
								children: m.formula
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: m.body
							})
						]
					}, m.id);
				})
			})
		]
	});
}
//#endregion
export { WaveMethodPanel as t };
