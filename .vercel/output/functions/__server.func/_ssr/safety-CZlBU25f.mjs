import { z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as CardTitle, t as Card } from "./card-BoTRSVH4.mjs";
import { x as useQuakeStore } from "./quake-store-Cl37Qgmg.mjs";
import { t as Button } from "./button-C4NTVTwa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/safety-CZlBU25f.js
var import_jsx_runtime = require_jsx_runtime();
var SAFETY = {
	prepare: {
		title: "대비",
		items: [
			"가구·가전을 벽에 고정하고 머리 위 선반을 비우세요.",
			"문 옆에 신발, 손전등, 약, 물을 모아 두세요.",
			"가족 집합 장소와 옥외 공터를 미리 캐시해 두세요.",
			"가스 잠그는 법과 엘리베이터 정지를 한 번 연습하세요."
		]
	},
	survive: {
		title: "흔들릴 때",
		items: [
			"낮추고, 머리와 목을 가리세요. (Drop / Cover / Hold On)",
			"창가·유리·선반에서 떨어지세요. 엘리베이터는 타지 마세요.",
			"흔들림이 잦아지기 전엔 뛰쳐나가지 마세요.",
			"차량을 쓰지 마세요. 도로가 막히고 낙하물이 있습니다."
		]
	},
	recover: {
		title: "잦아진 뒤",
		items: [
			"가스·전기를 확인하고 낙하물이 없는 공터로 걸어서 이동하세요.",
			"여진 72시간. 건물 안으로 바로 돌아가지 마세요.",
			"공식 속보와 이 앱의 손목 판별을 같이 보세요. SNS만 보지 마세요.",
			"가족 밴드에 안전 또는 SOS를 남기세요."
		]
	}
};
var SAFETY_LINKS = [{
	href: "https://www.weather.go.kr/w/eqk-vol/safety/eqk-action.do",
	label: "기상청 지진 행동요령"
}, {
	href: "https://www.safekorea.go.kr/",
	label: "국민재난안전포털"
}];
function SafetyPage() {
	const openDrill = useQuakeStore((s) => s.openDrill);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.18em] text-muted",
					children: "PREPARE · SURVIVE · RECOVER"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl font-semibold",
					children: "안전"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "낮추고 머리를 가린 다음, 한국 요령대로 공터로 걷습니다. 차량은 없습니다."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: openDrill,
				children: "훈련 경보음 · Drop Cover Hold On"
			}),
			Object.values(SAFETY).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: s.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 space-y-1.5 text-sm text-muted",
				children: s.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
			})] }, s.title)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2 text-sm",
				children: SAFETY_LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: l.href,
					className: "text-steel underline-offset-2 hover:underline",
					target: "_blank",
					rel: "noreferrer",
					children: l.label
				}) }, l.href))
			})
		]
	});
}
//#endregion
export { SafetyPage as component };
