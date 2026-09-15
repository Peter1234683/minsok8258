import { HAPTIC_STEPS } from "@/lib/quake/haptics";
import { useQuakeStore } from "@/stores/quake-store";
import { cn } from "@/lib/cn";

export function HapticStepper() {
  const phase = useQuakeStore((s) => s.phase);
  const haptic = useQuakeStore((s) => s.haptic);
  const active =
    phase === "sensing" ? 0 : phase === "local-result" ? 1 : phase === "crowding" || phase === "confirmed" || phase === "action" ? 2 : -1;

  return (
    <ol className="grid grid-cols-3 gap-2">
      {HAPTIC_STEPS.map((s, i) => (
        <li
          key={s.id}
          className={cn(
            "rounded-lg border px-2 py-2 text-center",
            i === active ? "border-steel/40 bg-steel/10" : "border-border bg-bg-elevated",
            haptic === "nudge" && i === 1 ? "haptic-nudge" : null,
            haptic === "warn" && i === 2 ? "haptic-warn" : null,
          )}
        >
          <p className="text-[10px] tracking-[0.14em] text-muted">{i + 1}</p>
          <p className="mt-0.5 text-sm font-medium">{s.label}</p>
          <p className="mt-1 text-[11px] leading-snug text-muted">{s.hint}</p>
        </li>
      ))}
    </ol>
  );
}
