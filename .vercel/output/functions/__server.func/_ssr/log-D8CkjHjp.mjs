import { z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-BoTRSVH4.mjs";
import { x as useQuakeStore } from "./quake-store-Cl37Qgmg.mjs";
import { t as Badge } from "./badge-DqVDPLMK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/log-D8CkjHjp.js
var import_jsx_runtime = require_jsx_runtime();
var KIND = {
	eew: "경보",
	notify: "알림",
	local: "손목",
	felt: "체감",
	drill: "훈련",
	official: "공식",
	citizen: "시민망"
};
function LogPage() {
	const log = useQuakeStore((s) => s.log);
	const contributions = useQuakeStore((s) => s.contributions);
	const citizenScience = useQuakeStore((s) => s.citizenScience);
	const batterySave = useQuakeStore((s) => s.batterySave);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-muted",
					children: "LOG"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl font-semibold",
					children: "기록"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "경보·알림·손목 판별·체감 제보. 지우지 않습니다."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "시민 망 기여" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, {
					className: "mt-2",
					children: citizenScience && !batterySave ? "트리거 시각을 보냅니다. 파형은 올리지 않습니다." : "배터리 절약 또는 시민 망 끔."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-display text-2xl tabular-nums",
					children: [contributions, "회"]
				})
			] }),
			log.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "아직 기록이 없습니다. 시연을 재생하거나 지도를 열어 두세요."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border rounded-xl border border-border bg-bg-elevated px-3",
				children: log.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: e.kind === "eew" ? "danger" : e.kind === "drill" ? "warn" : "muted",
						children: KIND[e.kind] ?? e.kind
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: e.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: e.body
						})]
					})]
				}, e.id))
			})
		]
	});
}
//#endregion
export { LogPage as component };
