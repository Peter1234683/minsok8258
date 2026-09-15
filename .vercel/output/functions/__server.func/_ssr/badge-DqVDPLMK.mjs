import { t as cn } from "./cn-Ccejyh36.mjs";
import { z as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-DqVDPLMK.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "muted", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex max-w-full items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-tight text-pretty", {
			muted: "bg-bg-subtle text-muted border-border",
			steel: "bg-steel/15 text-steel border-steel/25",
			danger: "bg-danger/15 text-danger border-danger/30",
			warn: "bg-warn/15 text-warn border-warn/30",
			ok: "bg-ok/15 text-ok border-ok/30",
			construction: "bg-construction/15 text-construction border-construction/30",
			body: "bg-body-move/15 text-body-move border-body-move/30"
		}[tone], className),
		children
	});
}
//#endregion
export { Badge as t };
