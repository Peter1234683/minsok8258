import { z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Card } from "./card-BoTRSVH4.mjs";
import { b as regionCenter, d as STATUS_LABEL, v as nearestShelters, x as useQuakeStore } from "./quake-store-Cl37Qgmg.mjs";
import { t as Button } from "./button-C4NTVTwa.mjs";
import { o as Radio, s as Plane } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-DqVDPLMK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/family-BvEq5KDB.js
var import_jsx_runtime = require_jsx_runtime();
function FamilyPage() {
	const family = useQuakeStore((s) => s.family);
	const setStatus = useQuakeStore((s) => s.setFamilyStatus);
	const ping = useQuakeStore((s) => s.pingFamily);
	const origin = regionCenter(useQuakeStore((s) => s.regionId));
	const cached = nearestShelters(origin, origin.city, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-muted",
					children: "BAND"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl font-semibold",
					children: "가족 밴드"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "같은 흔들림을 봤는지, 안전한지, 도움이 필요한지만 나눕니다. 위치 좌표는 보내지 않습니다."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "paper",
					onClick: () => setStatus("me", "safe"),
					children: "난 안전"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "danger",
					onClick: () => setStatus("me", "help"),
					children: "도움 필요"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "secondary",
				onClick: ping,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-4" }), "같은 흔들림 신호 보내기"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: family.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 rounded-xl border border-border bg-bg-elevated px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-sm font-medium",
							children: [m.name, m.traveling ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plane, {
								className: "size-3.5 text-muted",
								"aria-label": "여행 중"
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								m.relation,
								" · ",
								m.city,
								" · ",
								m.lastSeenMin === 0 ? "방금" : `${m.lastSeenMin}분 전`
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: m.status })]
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.16em] text-muted",
					children: "OFFLINE CACHE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-lg",
					children: "통신이 끊겨도 남는 대피소"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: cached.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono tabular-nums text-muted",
							children: [s.walkMin, "분"]
						})]
					}, s.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted",
					children: "여행 전에 목적 도시 옥외 장소를 워치에 넣어 둡니다. 대사관 문자는 기다리지 않습니다."
				})
			] })
		]
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: status === "safe" ? "ok" : status === "help" ? "danger" : status === "same-shake" ? "warn" : "muted",
		children: STATUS_LABEL[status]
	});
}
//#endregion
export { FamilyPage as component };
