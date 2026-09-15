import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as regionCenter, c as METHOD_LABEL, f as TRAVEL, g as feltHistogram, h as cardinal, i as DAMAGE_LEVELS, l as OUTDOOR_STEPS, n as APP_TAGLINE, o as FELT_LEVELS, s as INDOOR_STEPS, t as APP_NAME, v as nearestShelters, x as useQuakeStore } from "./quake-store-Cl37Qgmg.mjs";
import { t as Button } from "./button-C4NTVTwa.mjs";
import { a as Settings2, c as PersonStanding, d as Globe, f as Compass, i as Shield, l as MapPinned, n as Users, r as TriangleAlert, t as X, u as MapPin } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D0chT5Hb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function RadarMap() {
	const regionId = useQuakeStore((s) => s.regionId);
	const wavefront = useQuakeStore((s) => s.wavefront);
	const phase = useQuakeStore((s) => s.phase);
	const origin = regionCenter(regionId);
	const shelters = nearestShelters(origin, origin.city, 4);
	const nearest = shelters[0];
	const size = 320;
	const cx = size / 2;
	const cy = size / 2;
	const pxPerKm = 36;
	function plot(lat, lng) {
		const dx = (lng - origin.lng) * 111 * Math.cos(origin.lat * Math.PI / 180);
		const dy = (lat - origin.lat) * 111;
		return {
			x: cx + dx * pxPerKm,
			y: cy - dy * pxPerKm
		};
	}
	const shownWave = wavefront && (phase === "confirmed" || phase === "action");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-bg-elevated",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: `0 0 ${size} ${size}`,
			className: "block w-full",
			role: "img",
			"aria-label": `${origin.city} 주변 옥외 대피`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: size,
					height: size,
					fill: "#141518"
				}),
				[
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx,
					cy,
					r: i * pxPerKm,
					fill: "none",
					stroke: "rgba(237,236,232,0.08)"
				}, i)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 168,
					y: 64,
					fill: "#5E5D59",
					fontSize: "10",
					children: "3 km"
				}),
				shownWave && wavefront ? [
					.6,
					1.2,
					1.8
				].map((k) => {
					const rad = (wavefront.bearingDeg - 90) * Math.PI / 180;
					const x = cx + Math.cos(rad) * pxPerKm * 2.4 * k;
					const y = cy + Math.sin(rad) * pxPerKm * 2.4 * k;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: x,
						cy: y,
						r: 18 * k,
						fill: "none",
						stroke: "rgba(196,92,74,0.35)"
					}, k);
				}) : null,
				shelters.map((s, i) => {
					const p = plot(s.lat, s.lng);
					if (p.x < 12 || p.x > 308 || p.y < 12 || p.y > 308) return null;
					const labelOn = i < 2;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: p.x - 4,
						y: p.y - 4,
						width: 8,
						height: 8,
						rx: 1.5,
						fill: "#6B8F78"
					}), labelOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: p.x + 8,
						y: p.y - 6,
						fill: "#EDECE8",
						fontSize: "10",
						children: s.name
					}) : null] }, s.id);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx,
					cy,
					r: "6",
					fill: "#C5CBD3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx,
					cy,
					r: "11",
					fill: "none",
					stroke: "#C5CBD3"
				})
			]
		})
	}), nearest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 flex items-start gap-3 rounded-lg bg-bg-subtle px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-4 shrink-0 text-ok" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-medium",
					children: [
						nearest.name,
						" · 도보 ",
						nearest.walkMin,
						"분"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						nearest.note,
						" · ",
						origin.city,
						shownWave && wavefront ? ` · 파동은 ${cardinal(wavefront.bearingDeg)}에서` : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 flex items-center gap-1.5 text-xs text-warn",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonStanding, { className: "size-3.5" }), "차량 이용 금지. 흔들림이 잦아진 뒤 걸어서 이동."]
				})
			]
		})]
	}) : null] });
}
function WaveCompass({ size = 260 }) {
	const wavefront = useQuakeStore((s) => s.wavefront);
	const phase = useQuakeStore((s) => s.phase);
	const official = useQuakeStore((s) => s.official);
	const shown = !!wavefront && (phase === "confirmed" || phase === "action") && wavefront.method !== "hidden";
	const deg = wavefront?.bearingDeg ?? 0;
	const cx = size / 2;
	const cy = size / 2;
	const r = size / 2 - 18;
	const rad = (deg - 90) * Math.PI / 180;
	const x2 = cx + Math.cos(rad) * (r - 8);
	const y2 = cy + Math.sin(rad) * (r - 8);
	const scale = r * .5 / 1.2;
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		if (!wavefront?.sWaveEndsAt) return;
		const id = window.setInterval(() => setNow(Date.now()), 250);
		return () => window.clearInterval(id);
	}, [wavefront?.sWaveEndsAt]);
	const sLeft = wavefront?.sWaveEndsAt ? Math.max(0, Math.ceil((wavefront.sWaveEndsAt - now) / 1e3)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full min-w-0 flex-col items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: `0 0 ${size} ${size}`,
				className: "mx-auto block w-full max-w-[16.25rem]",
				role: "img",
				"aria-label": shown ? `파동이 ${cardinal(deg)}에서 옵니다` : "파면 대기",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx,
						cy,
						r,
						fill: "none",
						stroke: "rgba(237,236,232,0.12)",
						strokeWidth: "1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx,
						cy,
						r: r * .66,
						fill: "none",
						stroke: "rgba(237,236,232,0.08)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx,
						cy,
						r: r * .33,
						fill: "none",
						stroke: "rgba(237,236,232,0.08)"
					}),
					[
						"북",
						"동",
						"남",
						"서"
					].map((label, i) => {
						const a = (i * 90 - 90) * Math.PI / 180;
						const x = cx + Math.cos(a) * (r - 14);
						const y = cy + Math.sin(a) * (r - 14) + 4;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x,
							y,
							textAnchor: "middle",
							fill: "#8B8A86",
							fontSize: "11",
							children: label
						}, label);
					}),
					shown && wavefront ? wavefront.crowd.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: cx + p.x * scale,
						cy: cy - p.y * scale,
						r: "1.6",
						fill: p.t < 0 ? "#C5CBD3" : "rgba(197,203,211,0.35)"
					}, i)) : null,
					shown && wavefront ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: arcFan(cx, cy, r, deg, 28),
							fill: "rgba(196,92,74,0.16)",
							stroke: "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: cx,
							y1: cy,
							x2,
							y2,
							stroke: "#C45C4A",
							strokeWidth: "2.5",
							strokeLinecap: "round"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: x2,
							cy: y2,
							r: "4",
							fill: "#C45C4A"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx,
							cy,
							r: "5",
							fill: "#C5CBD3"
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx,
						cy,
						r: "5",
						fill: "#5E5D59"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-sm text-muted",
				children: phase === "crowding" ? "근처 기기 트리거 시각을 모으는 중. 바늘은 아직 숨깁니다." : shown && wavefront ? `${METHOD_LABEL[wavefront.method]} · ${cardinal(deg)}쪽 · ${wavefront.confirmedBy}대` : "한 대 추측은 숨깁니다. 군중이 모이면 바늘이 켜집니다."
			}),
			shown && wavefront?.crowdBearingDeg != null && wavefront.officialBearingDeg != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-center text-xs text-subtle",
				children: [
					"군중 ",
					Math.round(wavefront.crowdBearingDeg),
					"° → 공식",
					" ",
					Math.round(wavefront.officialBearingDeg),
					"°",
					official ? ` · ${official.sourceLabel}` : ""
				]
			}) : null,
			shown && wavefront?.apparentC != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-center font-mono text-[11px] text-subtle",
				children: [
					"c ",
					wavefront.apparentC.toFixed(1),
					" km/s · RMS ",
					Math.round(wavefront.residualMs ?? 0),
					" ms",
					wavefront.psKm != null ? ` · P–S ${wavefront.psKm.toFixed(0)} km` : ""
				]
			}) : null,
			shown && sLeft > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 font-display text-2xl tabular-nums text-fg",
				children: [
					"S파 ",
					sLeft,
					"초"
				]
			}) : null
		]
	});
}
function arcFan(cx, cy, r, bearing, spread) {
	const a0 = (bearing - spread / 2 - 90) * Math.PI / 180;
	const a1 = (bearing + spread / 2 - 90) * Math.PI / 180;
	return `M ${cx} ${cy} L ${cx + Math.cos(a0) * r} ${cy + Math.sin(a0) * r} A ${r} ${r} 0 0 1 ${cx + Math.cos(a1) * r} ${cy + Math.sin(a1) * r} Z`;
}
function FeltForm({ eventId }) {
	const rows = useQuakeStore((s) => s.feltByEvent[eventId] ?? []);
	const submitted = useQuakeStore((s) => s.feltSubmittedFor === eventId);
	const submitFelt = useQuakeStore((s) => s.submitFelt);
	const [intensity, setIntensity] = (0, import_react.useState)(3);
	const [damage, setDamage] = (0, import_react.useState)("none");
	const hist = feltHistogram(rows);
	const max = Math.max(1, ...hist);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-bg-elevated p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-base font-semibold",
				children: "체감 제보"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: "방금 그 흔들림을 다섯 단계로. 지도에 바로 합쳐집니다."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex h-16 items-end gap-1",
				children: hist.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full rounded-sm bg-steel/70",
						style: { height: `${Math.max(8, n / max * 48)}px` }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-subtle",
						children: FELT_LEVELS[i].label
					})]
				}, i))
			}),
			submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-steel",
				children: [
					"제보했습니다. ",
					rows.length,
					"건."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-1.5",
					children: FELT_LEVELS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setIntensity(l.id),
						className: cn("rounded-full border px-2.5 py-1 text-xs", intensity === l.id ? "border-steel/50 bg-steel/15 text-fg" : "border-border text-muted"),
						children: l.label
					}, l.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-1.5",
					children: DAMAGE_LEVELS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setDamage(d.id),
						className: cn("rounded-full border px-2.5 py-1 text-xs", damage === d.id ? "border-steel/50 bg-steel/15 text-fg" : "border-border text-muted"),
						children: d.label
					}, d.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					size: "sm",
					onClick: () => submitFelt(eventId, intensity, damage),
					children: "제보 올리기"
				})
			] })
		]
	});
}
function EventOverlay() {
	const phase = useQuakeStore((s) => s.phase);
	const official = useQuakeStore((s) => s.official);
	const regionId = useQuakeStore((s) => s.regionId);
	const lastEventId = useQuakeStore((s) => s.lastEventId);
	const reset = useQuakeStore((s) => s.reset);
	const pingFamily = useQuakeStore((s) => s.pingFamily);
	const setFamilyStatus = useQuakeStore((s) => s.setFamilyStatus);
	const travel = TRAVEL[regionId];
	if (phase !== "action") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 overflow-y-auto bg-bg px-4 py-6 pt-[max(1.5rem,env(safe-area-inset-top))]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid min-h-full max-w-5xl gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.2em] text-danger",
								children: "DROP COVER HOLD ON"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-1 font-display text-3xl font-semibold",
								children: "강한 흔들림"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									travel.city,
									" · ",
									travel.officialLabel
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: reset,
							"aria-label": "닫기",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-danger/35 bg-danger/10 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4 text-danger" }), "지금은 밖으로 뛰지 마세요. 머리부터."]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-3 space-y-1.5 text-sm text-muted",
							children: INDOOR_STEPS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaveCompass, { size: 240 }),
					official ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-sm text-muted",
						children: [
							official.sourceLabel,
							" · M",
							official.magnitude.toFixed(1),
							" · ",
							official.region,
							official.source === "none" ? " · 공식 알림 없음, 군중 파면 유지" : " · 나침반을 공식 진앙으로 전환"
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm text-steel",
						children: "공식 속보 대기. 지금은 군중 파면입니다."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg",
						children: "흔들림이 잦아지면"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1 text-sm text-muted",
						children: OUTDOOR_STEPS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadarMap, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "paper",
							onClick: () => {
								setFamilyStatus("me", "safe");
							},
							children: "안전하다고 알림"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							onClick: () => {
								setFamilyStatus("me", "help");
								pingFamily();
							},
							children: "도움 필요"
						})]
					}),
					lastEventId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeltForm, { eventId: lastEventId }) : null
				]
			})]
		})
	});
}
var NAV = [
	{
		to: "/",
		label: "감지",
		icon: Compass
	},
	{
		to: "/map",
		label: "지도",
		icon: Globe
	},
	{
		to: "/evacuate",
		label: "대피",
		icon: MapPinned
	},
	{
		to: "/family",
		label: "가족",
		icon: Users
	},
	{
		to: "/settings",
		label: "설정",
		icon: Settings2
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const phase = useQuakeStore((s) => s.phase);
	const strength = useQuakeStore((s) => s.strength);
	const reset = useQuakeStore((s) => s.reset);
	const regionId = useQuakeStore((s) => s.regionId);
	const drillOpen = useQuakeStore((s) => s.drillOpen);
	const closeDrill = useQuakeStore((s) => s.closeDrill);
	(0, import_react.useEffect)(() => {
		useQuakeStore.persist.rehydrate();
	}, []);
	function navOn(to) {
		if (to === "/") return pathname === "/";
		if (to === "/map") return pathname === "/map" || pathname.startsWith("/quake/");
		if (to === "/settings") return pathname === "/settings" || pathname === "/safety" || pathname === "/log" || pathname === "/compare";
		return pathname === to;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-5xl flex-col overflow-x-hidden bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-end justify-between gap-4 px-5 pb-4 pt-[max(0.9rem,env(safe-area-inset-top))]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl font-semibold tracking-tight",
					children: APP_NAME
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "방금 그거, 지진이야"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pb-1 text-xs text-subtle",
					children: regionId === "kr" ? "손목 판별 · 한국" : "여행 모드"
				})]
			}),
			phase === "confirmed" && strength === "weak" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: reset,
				className: "mx-4 mb-3 rounded-md border border-warn/30 bg-warn/10 px-3 py-2 text-left text-sm text-warn",
				children: "지진 맞음 · 약진 · 사이렌 없음. 탭하면 닫힘."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "min-w-0 flex-1 px-4 pb-28",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mx-auto grid max-w-5xl grid-cols-5",
					children: NAV.map((item) => {
						const on = navOn(item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px]", on ? "text-steel" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
						}) }, item.to);
					})
				})
			}),
			phase === "action" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventOverlay, {}) : null,
			drillOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-bg/95 px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-sm text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.2em] text-warn",
							children: "DRILL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-3xl",
							children: "훈련입니다"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: "낮추고, 머리와 목을 가리세요. 실제 지진이 아닙니다."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-6",
							variant: "secondary",
							onClick: closeDrill,
							children: "닫기"
						})
					]
				})
			}) : null
		]
	});
}
var styles_default = "/assets/styles-EgqAzlGm.css";
var Route$9 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: `${APP_NAME} · ${APP_TAGLINE}` },
			{
				name: "description",
				content: "손목에서 공사와 지진을 가르고, 파면 방향과 도보 대피까지 이어 주는 개인 지진 판별기."
			},
			{
				name: "theme-color",
				content: "#0B0C0E"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ko",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$8 = () => import("./routes-Dz-atQOq.mjs");
var Route$8 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./compare-B9L-y16u.mjs");
var Route$7 = createFileRoute("/compare")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./evacuate-CYIR8XUm.mjs");
var Route$6 = createFileRoute("/evacuate")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./family-BvEq5KDB.mjs");
var Route$5 = createFileRoute("/family")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./log-D8CkjHjp.mjs");
var Route$4 = createFileRoute("/log")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./map-D53KoKDE.mjs");
var Route$3 = createFileRoute("/map")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./safety-CZlBU25f.mjs");
var Route$2 = createFileRoute("/safety")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./settings-C_Mt1psr.mjs");
var Route$1 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./quake._id-DEa7VIv_.mjs");
var Route = createFileRoute("/quake/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$8.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$9
	}),
	CompareRoute: Route$7.update({
		id: "/compare",
		path: "/compare",
		getParentRoute: () => Route$9
	}),
	EvacuateRoute: Route$6.update({
		id: "/evacuate",
		path: "/evacuate",
		getParentRoute: () => Route$9
	}),
	FamilyRoute: Route$5.update({
		id: "/family",
		path: "/family",
		getParentRoute: () => Route$9
	}),
	LogRoute: Route$4.update({
		id: "/log",
		path: "/log",
		getParentRoute: () => Route$9
	}),
	MapRoute: Route$3.update({
		id: "/map",
		path: "/map",
		getParentRoute: () => Route$9
	}),
	SafetyRoute: Route$2.update({
		id: "/safety",
		path: "/safety",
		getParentRoute: () => Route$9
	}),
	SettingsRoute: Route$1.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$9
	}),
	QuakeIdRoute: Route.update({
		id: "/quake/$id",
		path: "/quake/$id",
		getParentRoute: () => Route$9
	})
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { RadarMap as a, WaveCompass as i, Route as n, FeltForm as r, router_exports as t };
