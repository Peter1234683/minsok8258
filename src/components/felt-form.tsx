import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DAMAGE_LEVELS, FELT_LEVELS, feltHistogram, type DamageId, type FeltLevel } from "@/lib/quake/felt";
import { useQuakeStore } from "@/stores/quake-store";
import { cn } from "@/lib/cn";

export function FeltForm({ eventId }: { eventId: string }) {
  const rows = useQuakeStore((s) => s.feltByEvent[eventId] ?? []);
  const submitted = useQuakeStore((s) => s.feltSubmittedFor === eventId);
  const submitFelt = useQuakeStore((s) => s.submitFelt);
  const [intensity, setIntensity] = useState<FeltLevel>(3);
  const [damage, setDamage] = useState<DamageId>("none");
  const hist = feltHistogram(rows);
  const max = Math.max(1, ...hist);

  return (
    <section className="rounded-xl border border-border bg-bg-elevated p-4">
      <h2 className="font-display text-base font-semibold">체감 제보</h2>
      <p className="mt-1 text-xs text-muted">방금 그 흔들림을 다섯 단계로. 지도에 바로 합쳐집니다.</p>
      <div className="mt-3 flex h-16 items-end gap-1">
        {hist.map((n, i) => (
          <div key={i} className="flex min-w-0 flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-sm bg-steel/70"
              style={{ height: `${Math.max(8, (n / max) * 48)}px` }}
            />
            <span className="text-[10px] text-subtle">{FELT_LEVELS[i]!.label}</span>
          </div>
        ))}
      </div>
      {submitted ? (
        <p className="mt-3 text-sm text-steel">제보했습니다. {rows.length}건.</p>
      ) : (
        <>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {FELT_LEVELS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setIntensity(l.id)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs",
                  intensity === l.id ? "border-steel/50 bg-steel/15 text-fg" : "border-border text-muted",
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {DAMAGE_LEVELS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDamage(d.id)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs",
                  damage === d.id ? "border-steel/50 bg-steel/15 text-fg" : "border-border text-muted",
                )}
              >
                {d.label}
              </button>
            ))}
          </div>
          <Button className="mt-3" size="sm" onClick={() => submitFelt(eventId, intensity, damage)}>
            제보 올리기
          </Button>
        </>
      )}
    </section>
  );
}
