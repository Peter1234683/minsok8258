import { v as Link, y as useNavigate, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as haversineKm, b as regionCenter, f as TRAVEL, x as useQuakeStore } from "./quake-store-Cl37Qgmg.mjs";
import { t as Badge } from "./badge-DqVDPLMK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/map-D53KoKDE.js
var import_jsx_runtime = require_jsx_runtime();
var W = 360;
var H = 180;
function xy(lat, lng) {
	return {
		x: (lng + 180) / 360 * W,
		y: (90 - lat) / 180 * H
	};
}
function QuakeWorldMap() {
	const live = useQuakeStore((s) => s.liveQuakes);
	const local = useQuakeStore((s) => s.localEvents);
	const homebaseId = useQuakeStore((s) => s.homebaseId);
	const navigate = useNavigate();
	const origin = regionCenter(homebaseId);
	const rows = [...local, ...live].slice(0, 40);
	const home = xy(origin.lat, origin.lng);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-h-56 overflow-hidden rounded-xl border border-border bg-bg-elevated",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: `0 0 ${W} ${H}`,
			className: "block h-full w-full",
			role: "img",
			"aria-label": "전 세계 지진 지도",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: W,
					height: H,
					fill: "#141518"
				}),
				[
					30,
					90,
					150
				].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "0",
					y1: y,
					x2: W,
					y2: y,
					stroke: "rgba(237,236,232,0.06)"
				}, y)),
				[
					60,
					180,
					300
				].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: x,
					y1: "0",
					x2: x,
					y2: H,
					stroke: "rgba(237,236,232,0.06)"
				}, x)),
				rows.map((q) => {
					const p = xy(q.lat, q.lng);
					const r = q.mag >= 6 ? 5 : q.mag >= 5 ? 3.6 : 2.4;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: p.x,
						cy: p.y,
						r,
						fill: q.mag >= 6 ? "#C45C4A" : q.id.startsWith("local") ? "#C5CBD3" : "#6E8CA0",
						className: "cursor-pointer",
						onClick: () => navigate({
							to: "/quake/$id",
							params: { id: q.id }
						})
					}, q.id);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: home.x,
					cy: home.y,
					r: "3",
					fill: "none",
					stroke: "#C5CBD3",
					strokeWidth: "1.2"
				})
			]
		})
	});
}
function MapPage() {
	const live = useQuakeStore((s) => s.liveQuakes);
	const local = useQuakeStore((s) => s.localEvents);
	const error = useQuakeStore((s) => s.liveError);
	const homebaseId = useQuakeStore((s) => s.homebaseId);
	const origin = regionCenter(homebaseId);
	const travel = TRAVEL[homebaseId];
	const rows = [...local, ...live];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-muted",
					children: "MAP + LIST"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl font-semibold",
					children: "지진 지도"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						"홈베이스 ",
						travel.city,
						" · 흰 고리가 당신. 점은 발표와 손목 확정."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuakeWorldMap, {}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-warn",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border rounded-xl border border-border bg-bg-elevated px-3",
				children: rows.slice(0, 16).map((q) => {
					const km = haversineKm(origin, q);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-2.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/quake/$id",
							params: { id: q.id },
							className: "flex min-w-0 items-start gap-3",
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
										children: [
											km.toFixed(0),
											" km · ",
											q.depthKm != null ? `${q.depthKm.toFixed(0)} km 깊이` : "깊이 —"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: q.id.startsWith("local") ? "ok" : "muted",
									children: q.source
								})
							]
						})
					}, q.id);
				})
			})
		]
	});
}
//#endregion
export { MapPage as component };
