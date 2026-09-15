import { i as __toESM } from "../_runtime.mjs";
import { v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-BoTRSVH4.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as haversineKm, b as regionCenter, h as cardinal, m as bearingTo, x as useQuakeStore } from "./quake-store-Cl37Qgmg.mjs";
import { n as Route, r as FeltForm } from "./router-D0chT5Hb.mjs";
import { t as Badge } from "./badge-DqVDPLMK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quake._id-DEa7VIv_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuakeDetail() {
	const { id } = Route.useParams();
	const live = useQuakeStore((s) => s.liveQuakes);
	const local = useQuakeStore((s) => s.localEvents);
	const homebaseId = useQuakeStore((s) => s.homebaseId);
	const ensureFelt = useQuakeStore((s) => s.ensureFelt);
	const q = [...local, ...live].find((e) => e.id === id);
	const origin = regionCenter(homebaseId);
	(0, import_react.useEffect)(() => {
		if (q) ensureFelt(q.id, q.mag);
	}, [q, ensureFelt]);
	if (!q) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl",
			children: "이 지진을 찾지 못했습니다"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/map",
			className: "text-sm text-steel",
			children: "지도로"
		})]
	});
	const km = haversineKm(origin, q);
	const brg = bearingTo(origin, q);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-muted",
					children: "EVENT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-3xl font-semibold",
					children: ["M", q.mag.toFixed(1)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: q.place
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "muted",
						children: q.source
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: "steel",
						children: [
							cardinal(brg),
							" ",
							km.toFixed(0),
							" km"
						]
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "나 → 진앙" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, {
					className: "mt-2",
					children: "방법 4. 발표된 좌표에서 방위를 그립니다. 손목 한 대로 찍은 값이 아닙니다."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-display text-2xl",
					children: [
						cardinal(brg),
						" · ",
						Math.round(brg),
						"°"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-mono text-xs text-subtle",
					children: [
						q.lat.toFixed(2),
						", ",
						q.lng.toFixed(2),
						q.depthKm != null ? ` · 깊이 ${q.depthKm.toFixed(0)} km` : ""
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeltForm, { eventId: q.id }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/map",
				className: "text-sm text-steel",
				children: "지도로 돌아가기"
			})
		]
	});
}
//#endregion
export { QuakeDetail as component };
