import { cardinal } from "@/lib/quake/geo";
import { nearestShelters, regionCenter } from "@/lib/quake/shelters";
import { useQuakeStore } from "@/stores/quake-store";
import { MapPin, PersonStanding } from "lucide-react";

export function RadarMap() {
  const regionId = useQuakeStore((s) => s.regionId);
  const wavefront = useQuakeStore((s) => s.wavefront);
  const phase = useQuakeStore((s) => s.phase);
  const origin = regionCenter(regionId);
  const shelters = nearestShelters(origin, origin.city, 4);
  const nearest = shelters[0];
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const pxPerKm = 36;

  function plot(lat: number, lng: number) {
    const dx = (lng - origin.lng) * 111 * Math.cos((origin.lat * Math.PI) / 180);
    const dy = (lat - origin.lat) * 111;
    return { x: cx + dx * pxPerKm, y: cy - dy * pxPerKm };
  }

  const shownWave =
    wavefront && (phase === "confirmed" || phase === "action");

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-border bg-bg-elevated">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="block w-full"
          role="img"
          aria-label={`${origin.city} 주변 옥외 대피`}
        >
          <rect width={size} height={size} fill="#141518" />
          {[1, 2, 3].map((i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={i * pxPerKm}
              fill="none"
              stroke="rgba(237,236,232,0.08)"
            />
          ))}
          <text x={cx + 8} y={cy - 3 * pxPerKm + 12} fill="#5E5D59" fontSize="10">
            3 km
          </text>
          {shownWave && wavefront
            ? [0.6, 1.2, 1.8].map((k) => {
                const rad = ((wavefront.bearingDeg - 90) * Math.PI) / 180;
                const x = cx + Math.cos(rad) * pxPerKm * 2.4 * k;
                const y = cy + Math.sin(rad) * pxPerKm * 2.4 * k;
                return (
                  <circle
                    key={k}
                    cx={x}
                    cy={y}
                    r={18 * k}
                    fill="none"
                    stroke="rgba(196,92,74,0.35)"
                  />
                );
              })
            : null}
          {shelters.map((s, i) => {
            const p = plot(s.lat, s.lng);
            if (p.x < 12 || p.x > size - 12 || p.y < 12 || p.y > size - 12) return null;
            const labelOn = i < 2;
            return (
              <g key={s.id}>
                <rect
                  x={p.x - 4}
                  y={p.y - 4}
                  width={8}
                  height={8}
                  rx={1.5}
                  fill="#6B8F78"
                />
                {labelOn ? (
                  <text
                    x={p.x + 8}
                    y={p.y - 6}
                    fill="#EDECE8"
                    fontSize="10"
                  >
                    {s.name}
                  </text>
                ) : null}
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r="6" fill="#C5CBD3" />
          <circle cx={cx} cy={cy} r="11" fill="none" stroke="#C5CBD3" />
        </svg>
      </div>
      {nearest ? (
        <div className="mt-3 flex items-start gap-3 rounded-lg bg-bg-subtle px-3 py-3">
          <MapPin className="mt-0.5 size-4 shrink-0 text-ok" />
          <div className="min-w-0">
            <p className="text-sm font-medium">
              {nearest.name} · 도보 {nearest.walkMin}분
            </p>
            <p className="text-xs text-muted">
              {nearest.note} · {origin.city}
              {shownWave && wavefront
                ? ` · 파동은 ${cardinal(wavefront.bearingDeg)}에서`
                : ""}
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-warn">
              <PersonStanding className="size-3.5" />
              차량 이용 금지. 흔들림이 잦아진 뒤 걸어서 이동.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
