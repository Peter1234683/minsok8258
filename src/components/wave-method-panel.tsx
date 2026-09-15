import { WAVE_METHODS } from "@/lib/quake/science";
import { useQuakeStore } from "@/stores/quake-store";
import { cn } from "@/lib/cn";

const ACTIVE: Record<string, string> = {
  hidden: "polar",
  "crowd-plane": "array",
  "official-epicenter": "network",
};

export function WaveMethodPanel() {
  const wavefront = useQuakeStore((s) => s.wavefront);
  const phase = useQuakeStore((s) => s.phase);
  const active =
    phase === "crowding"
      ? "array"
      : wavefront
        ? (ACTIVE[wavefront.method] ?? "polar")
        : "polar";

  return (
    <section className="rounded-xl border border-border bg-bg-elevated p-4">
      <h2 className="font-display text-base font-semibold">지금 쓰는 방법</h2>
      <p className="mt-1 text-xs text-muted">
        바늘은 진앙 핀이 아닙니다. 이 지점으로 들어오는 방위입니다.
      </p>
      <ul className="mt-3 grid gap-2">
        {WAVE_METHODS.map((m) => {
          const on = m.id === active && (phase === "confirmed" || phase === "action" || phase === "crowding");
          const idleOn = m.id === "polar" && (phase === "idle" || phase === "sensing" || phase === "local-result");
          return (
            <li
              key={m.id}
              className={cn(
                "rounded-md px-3 py-2",
                on || idleOn ? "bg-bg ring-1 ring-steel/35" : "bg-bg/50",
              )}
            >
              <p className="text-sm font-medium">{m.title}</p>
              <p className="mt-0.5 font-mono text-[11px] text-steel">{m.formula}</p>
              <p className="mt-1 text-xs text-muted">{m.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
