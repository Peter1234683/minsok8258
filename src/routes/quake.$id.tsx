import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { FeltForm } from "@/components/felt-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { bearingTo, cardinal } from "@/lib/quake/geo";
import { haversineKm, regionCenter } from "@/lib/quake/shelters";
import { useQuakeStore } from "@/stores/quake-store";

export const Route = createFileRoute("/quake/$id")({ component: QuakeDetail });

function QuakeDetail() {
  const { id } = Route.useParams();
  const live = useQuakeStore((s) => s.liveQuakes);
  const local = useQuakeStore((s) => s.localEvents);
  const homebaseId = useQuakeStore((s) => s.homebaseId);
  const ensureFelt = useQuakeStore((s) => s.ensureFelt);
  const q = [...local, ...live].find((e) => e.id === id);
  const origin = regionCenter(homebaseId);

  useEffect(() => {
    if (q) ensureFelt(q.id, q.mag);
  }, [q, ensureFelt]);

  if (!q) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-2xl">이 지진을 찾지 못했습니다</h1>
        <Link to="/map" className="text-sm text-steel">
          지도로
        </Link>
      </div>
    );
  }

  const km = haversineKm(origin, q);
  const brg = bearingTo(origin, q);

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <div>
        <p className="text-xs tracking-[0.18em] text-muted">EVENT</p>
        <h1 className="mt-1 font-display text-3xl font-semibold">M{q.mag.toFixed(1)}</h1>
        <p className="mt-2 text-sm text-muted">{q.place}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge tone="muted">{q.source}</Badge>
          <Badge tone="steel">
            {cardinal(brg)} {km.toFixed(0)} km
          </Badge>
        </div>
      </div>
      <Card>
        <CardTitle>나 → 진앙</CardTitle>
        <CardMeta className="mt-2">
          방법 4. 발표된 좌표에서 방위를 그립니다. 손목 한 대로 찍은 값이 아닙니다.
        </CardMeta>
        <p className="mt-3 font-display text-2xl">
          {cardinal(brg)} · {Math.round(brg)}°
        </p>
        <p className="mt-1 font-mono text-xs text-subtle">
          {q.lat.toFixed(2)}, {q.lng.toFixed(2)}
          {q.depthKm != null ? ` · 깊이 ${q.depthKm.toFixed(0)} km` : ""}
        </p>
      </Card>
      <FeltForm eventId={q.id} />
      <Link to="/map" className="text-sm text-steel">
        지도로 돌아가기
      </Link>
    </div>
  );
}
