import { Seismograph } from "@/components/seismograph";
import { Badge } from "@/components/ui/badge";
import { CLASS_LABEL, METHOD_LABEL } from "@/lib/quake/copy";
import { cardinal } from "@/lib/quake/geo";
import { dutyHint } from "@/lib/quake/duty-cycle";
import { useQuakeStore } from "@/stores/quake-store";
import { cn } from "@/lib/cn";

function toneFor(cls: string) {
  if (cls === "construction") return "construction" as const;
  if (cls === "body") return "body" as const;
  if (cls === "quake-candidate") return "danger" as const;
  if (cls === "idle") return "steel" as const;
  return "muted" as const;
}

export function WatchFace() {
  const phase = useQuakeStore((s) => s.phase);
  const result = useQuakeStore((s) => s.result);
  const wavefront = useQuakeStore((s) => s.wavefront);
  const cls = result?.cls ?? "idle";
  const aftershockUntil = useQuakeStore((s) => s.aftershockUntil);
  const aftershock = !!aftershockUntil && aftershockUntil > Date.now();
  const haptic = useQuakeStore((s) => s.haptic);
  const dutyMode = useQuakeStore((s) => s.dutyMode);

  return (
    <div className="relative mx-auto flex w-full max-w-sm flex-col items-center">
      <div
        className={cn(
          "relative aspect-square w-[min(100%,22rem)] rounded-full border bg-bg-elevated shadow-soft",
          phase === "action" ? "border-danger/50" : "border-border-strong",
          haptic === "nudge" && "haptic-nudge",
          haptic === "warn" && "haptic-warn",
          dutyMode === "burst" && "duty-burst",
        )}
      >
        <div className="absolute inset-[10%] rounded-full border border-border" />
        <div className="absolute inset-[18%] rounded-full border border-border/60" />
        <Ticks />
        <Needle
          deg={
            wavefront && (phase === "confirmed" || phase === "action")
              ? wavefront.bearingDeg
              : null
          }
        />
        <div className="absolute inset-[26%] flex flex-col items-center justify-center rounded-full bg-bg px-6 text-center">
          <p className="font-display text-[0.7rem] tracking-[0.22em] text-muted">
            그건지진
          </p>
          <p className="mt-2 font-display text-3xl font-semibold leading-none">
            {phase === "sensing" ? "읽는 중" : CLASS_LABEL[cls]}
          </p>
          <p className="mt-2 font-mono text-xs tabular-nums text-muted">
            {result
              ? `${result.dominantHz.toFixed(1)} Hz · ${(result.peakG * 1000).toFixed(0)} mg`
              : "—"}
          </p>
          {wavefront && (phase === "confirmed" || phase === "action") ? (
            <p className="mt-3 text-sm text-steel">
              {METHOD_LABEL[wavefront.method]} · {cardinal(wavefront.bearingDeg)} {wavefront.approxKm.toFixed(0)} km
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <Badge tone={toneFor(cls)}>{CLASS_LABEL[cls]}</Badge>
        {aftershock ? <Badge tone="warn">여진 구간 72h</Badge> : null}
        {phase === "crowding" ? <Badge tone="steel">근처 기기 확인 중</Badge> : null}
        <Badge tone={dutyMode === "burst" ? "ok" : "muted"}>
          {dutyHint(dutyMode, aftershock)}
        </Badge>
      </div>
      <div className="mt-4 w-full overflow-hidden rounded-lg border border-border bg-bg-elevated px-2 py-2">
        <Seismograph height={64} compact />
      </div>
    </div>
  );
}

function Needle({ deg }: { deg: number | null }) {
  if (deg == null) return null;
  return (
    <div
      className="pointer-events-none absolute inset-0 transition-transform duration-500"
      style={{ transform: `rotate(${deg}deg)` }}
    >
      <div className="absolute left-1/2 top-[6%] h-[18%] w-0.5 -translate-x-1/2 rounded-full bg-danger" />
      <div className="absolute left-1/2 top-[6%] size-2 -translate-x-1/2 rounded-full bg-danger" />
    </div>
  );
}

function Ticks() {
  return (
    <svg className="pointer-events-none absolute inset-0" viewBox="0 0 100 100" aria-hidden>
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i * 30 - 90) * Math.PI) / 180;
        const x1 = +(50 + Math.cos(a) * 47).toFixed(2);
        const y1 = +(50 + Math.sin(a) * 47).toFixed(2);
        const x2 = +(50 + Math.cos(a) * 43).toFixed(2);
        const y2 = +(50 + Math.sin(a) * 43).toFixed(2);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(197,203,211,0.45)"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
