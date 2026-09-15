import { useNavigate } from "@tanstack/react-router";
import { useQuakeStore } from "@/stores/quake-store";
import { regionCenter } from "@/lib/quake/shelters";

const W = 360;
const H = 180;

function xy(lat: number, lng: number) {
  return { x: ((lng + 180) / 360) * W, y: ((90 - lat) / 180) * H };
}

export function QuakeWorldMap() {
  const live = useQuakeStore((s) => s.liveQuakes);
  const local = useQuakeStore((s) => s.localEvents);
  const homebaseId = useQuakeStore((s) => s.homebaseId);
  const navigate = useNavigate();
  const origin = regionCenter(homebaseId);
  const rows = [...local, ...live].slice(0, 40);
  const home = xy(origin.lat, origin.lng);

  return (
    <div className="max-h-56 overflow-hidden rounded-xl border border-border bg-bg-elevated">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-full w-full"
        role="img"
        aria-label="전 세계 지진 지도"
      >
        <rect width={W} height={H} fill="#141518" />
        {[30, 90, 150].map((y) => (
          <line key={y} x1="0" y1={y} x2={W} y2={y} stroke="rgba(237,236,232,0.06)" />
        ))}
        {[60, 180, 300].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2={H} stroke="rgba(237,236,232,0.06)" />
        ))}
        {rows.map((q) => {
          const p = xy(q.lat, q.lng);
          const r = q.mag >= 6 ? 5 : q.mag >= 5 ? 3.6 : 2.4;
          return (
            <circle
              key={q.id}
              cx={p.x}
              cy={p.y}
              r={r}
              fill={q.mag >= 6 ? "#C45C4A" : q.id.startsWith("local") ? "#C5CBD3" : "#6E8CA0"}
              className="cursor-pointer"
              onClick={() => navigate({ to: "/quake/$id", params: { id: q.id } })}
            />
          );
        })}
        <circle cx={home.x} cy={home.y} r="3" fill="none" stroke="#C5CBD3" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
