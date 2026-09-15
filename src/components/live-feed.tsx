import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { DEMO_QUAKES } from "@/lib/quake/demo-quakes";
import { useQuakeStore } from "@/stores/quake-store";
import type { LiveQuake } from "@/lib/quake/types";


export function LiveFeed() {
  const rows = useQuakeStore((s) => s.liveQuakes);
  const shown = rows.length ? rows : DEMO_QUAKES;
  const error = useQuakeStore((s) => s.liveError);
  const setLive = useQuakeStore((s) => s.setLive);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const tick = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson",
        );
        if (!res.ok) throw new Error("feed");
        const json = (await res.json()) as {
          features: Array<{
            id: string;
            properties: { mag: number; place: string; time: number };
            geometry: { coordinates: [number, number, number] };
          }>;
        };
        const mapped: LiveQuake[] = json.features.slice(0, 12).map((f) => ({
          id: f.id,
          mag: f.properties.mag,
          place: f.properties.place,
          time: f.properties.time,
          lng: f.geometry.coordinates[0],
          lat: f.geometry.coordinates[1],
          depthKm: f.geometry.coordinates[2] ?? null,
          source: "USGS",
        }));
        if (!cancelled) setLive([...DEMO_QUAKES, ...mapped].sort((a, b) => b.time - a.time));
      } catch {
        if (!cancelled)
          setLive(DEMO_QUAKES, "실시간 글로벌 피드를 읽지 못해 기상청형 샘플만 표시합니다.");
      }
    }
    load();
    const id = window.setInterval(load, 120000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [setLive]);

  return (
    <section className="rounded-xl border border-border bg-bg-elevated p-4">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-base font-semibold">공식 자료</h2>
        <Link to="/map" className="text-xs text-steel">
          지도
        </Link>
      </div>
      {error ? <p className="mt-2 text-xs text-warn">{error}</p> : null}
      <ul className="mt-3 divide-y divide-border">
        {shown.slice(0, 8).map((q) => (
          <li key={q.id} className="flex items-start gap-3 py-2.5 first:pt-0">
            <Link
              to="/quake/$id"
              params={{ id: q.id }}
              className="flex min-w-0 flex-1 items-start gap-3"
            >
            <span
              className={`w-10 shrink-0 font-mono text-sm tabular-nums ${q.mag >= 5 ? "text-danger" : "text-steel"}`}
            >
              {q.mag.toFixed(1)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{q.place}</p>
              <p className="text-xs text-muted">
                {now == null ? "—" : timeAgo(q.time, now)}
                {q.depthKm != null ? ` · ${q.depthKm.toFixed(0)} km` : ""}
              </p>
            </div>
            <Badge tone={q.source.startsWith("기상") ? "ok" : "muted"}>{q.source}</Badge>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function timeAgo(t: number, now: number) {
  const m = Math.max(1, Math.round((now - t) / 60000));
  if (m < 60) return `${m}분 전`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}시간 전`;
  return `${Math.round(h / 24)}일 전`;
}
