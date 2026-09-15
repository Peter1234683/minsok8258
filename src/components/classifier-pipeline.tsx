import { CLASSIFIER_GATES } from "@/lib/quake/science";
import { useQuakeStore } from "@/stores/quake-store";
import { cn } from "@/lib/cn";

export function ClassifierPipeline() {
  const gate = useQuakeStore((s) => s.result?.gate ?? "idle");
  const phase = useQuakeStore((s) => s.phase);

  return (
    <section className="rounded-xl border border-border bg-bg-elevated p-4">
      <h2 className="font-display text-base font-semibold">분류 게이트</h2>
      <p className="mt-1 text-xs text-muted">
        한 번에 하나만 통과합니다. 오탐을 말로 남깁니다.
      </p>
      <ol className="mt-3 grid gap-1.5">
        {CLASSIFIER_GATES.map((g) => {
          const on = g.id === gate && phase !== "idle";
          return (
            <li
              key={g.id}
              className={cn(
                "rounded-md px-3 py-2",
                on ? "bg-bg ring-1 ring-steel/40" : "bg-bg/40",
              )}
            >
              <p className="text-sm font-medium">{g.title}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted">{g.body}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
