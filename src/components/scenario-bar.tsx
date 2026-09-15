import { Button } from "@/components/ui/button";
import { SCENARIOS } from "@/lib/quake/scenarios";
import { useQuakeStore } from "@/stores/quake-store";
import { cn } from "@/lib/cn";

export function ScenarioBar() {
  const play = useQuakeStore((s) => s.playScenario);
  const reset = useQuakeStore((s) => s.reset);
  const active = useQuakeStore((s) => s.lastScenarioId);
  const phase = useQuakeStore((s) => s.phase);

  return (
    <section className="rounded-xl border border-border bg-bg-elevated p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-base font-semibold">시연</h2>
        {phase !== "idle" ? (
          <button
            type="button"
            className="text-xs text-muted hover:text-fg"
            onClick={reset}
          >
            리셋
          </button>
        ) : null}
      </div>
      <p className="mt-1 text-xs text-muted">
        실제 워치 센서 대신, 흔들림 종류를 재생해 판별·나침반·대피를 봅니다.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {SCENARIOS.map((s) => (
          <Button
            key={s.id}
            variant={active === s.id ? "primary" : "secondary"}
            size="sm"
            className={cn(
              "h-auto min-h-11 min-w-0 w-full whitespace-normal flex-col items-start py-2 text-left",
            )}
            onClick={() => play(s.id)}
          >
            <span className="text-sm">{s.label}</span>
            <span
              className={cn(
                "whitespace-normal text-pretty text-[11px] font-normal leading-snug",
                active === s.id ? "text-steel-fg/70" : "text-muted",
              )}
            >
              {s.blurb}
            </span>
          </Button>
        ))}
      </div>
    </section>
  );
}
