import { createFileRoute, Link } from "@tanstack/react-router";
import { QuakeWorldMap } from "@/components/quake-world-map";
import { Badge } from "@/components/ui/badge";
import { useQuakeStore } from "@/stores/quake-store";
import { regionCenter, haversineKm } from "@/lib/quake/shelters";
import { TRAVEL } from "@/lib/quake/travel";

export const Route = createFileRoute("/map")({ component: MapPage });

function MapPage() {
  const live = useQuakeStore((s) => s.liveQuakes);
  const local = useQuakeStore((s) => s.localEvents);
  const error = useQuakeStore((s) => s.liveError);
  const homebaseId = useQuakeStore((s) => s.homebaseId);
  const origin = regionCenter(homebaseId);
  const travel = TRAVEL[homebaseId];
  const rows = [...local, ...live];

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <div>
        <p className="text-xs tracking-[0.18em] text-muted">MAP + LIST</p>
        <h1 className="mt-1 font-display text-3xl font-semibold">지진 지도</h1>
        <p className="mt-2 text-sm text-muted">
          홈베이스 {travel.city} · 흰 고리가 당신. 점은 발표와 손목 확정.
        </p>
      </div>
      <QuakeWorldMap />
      {error ? <p className="text-xs text-warn">{error}</p> : null}
      <ul className="divide-y divide-border rounded-xl border border-border bg-bg-elevated px-3">
        {rows.slice(0, 16).map((q) => {
          const km = haversineKm(origin, q);
          return (
            <li key={q.id} className="py-2.5">
              <Link
                to="/quake/$id"
                params={{ id: q.id }}
                className="flex min-w-0 items-start gap-3"
              >
                <span
                  className={`w-10 shrink-0 font-mono text-sm tabular-nums ${q.mag >= 5 ? "text-danger" : "text-steel"}`}
                >
                  {q.mag.toFixed(1)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{q.place}</p>
                  <p className="text-xs text-muted">
                    {km.toFixed(0)} km · {q.depthKm != null ? `${q.depthKm.toFixed(0)} km 깊이` : "깊이 —"}
                  </p>
                </div>
                <Badge tone={q.id.startsWith("local") ? "ok" : "muted"}>{q.source}</Badge>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
