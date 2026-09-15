import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuakeStore } from "@/stores/quake-store";
import { cn } from "@/lib/cn";

export function MeshPanel() {
  const mesh = useQuakeStore((s) => s.mesh);
  if (mesh.kind === "idle" && !mesh.nodes.length) {
    return (
      <Card>
        <p className="text-xs tracking-[0.16em] text-muted">BLE MESH</p>
        <p className="mt-1 font-display text-lg">기지국이 죽어도</p>
        <p className="mt-2 text-sm text-muted">
          확정·SOS 때 50–100m hop으로 패킷을 던집니다. 미리보기는 근처 노드를 시연합니다. 실제
          Multipeer는 네이티브가 필요합니다.
        </p>
      </Card>
    );
  }
  const xs = [18, 78, 138, 198];
  return (
    <Card>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs tracking-[0.16em] text-muted">BLE MESH</p>
        <Badge tone={mesh.delivered ? "ok" : "warn"}>
          {mesh.delivered ? "가족 서버 도달" : mesh.broadcasting ? "송출 중" : "대기"}
        </Badge>
      </div>
      <p className="mt-1 font-mono text-xs text-steel">{mesh.lastPacket}</p>
      <svg viewBox="0 0 216 56" className="mt-3 w-full" aria-hidden>
        {xs.slice(0, -1).map((x, i) => (
          <line
            key={x}
            x1={x + 8}
            y1="22"
            x2={xs[i + 1]! - 8}
            y2="22"
            stroke={mesh.hopsDone >= i + 1 ? "#c5cbd3" : "rgba(197,203,211,0.2)"}
            strokeWidth="2"
            strokeDasharray={mesh.hopsDone >= i + 1 ? "0" : "4 4"}
          />
        ))}
        {mesh.nodes.map((n, i) => {
          const on = mesh.hopsDone >= n.hop;
          return (
            <g key={n.id}>
              <circle
                cx={xs[i]}
                cy="22"
                r="8"
                fill={on ? "#c5cbd3" : "#1a1c20"}
                stroke={on ? "#edece8" : "rgba(197,203,211,0.35)"}
              />
              <text
                x={xs[i]}
                y="48"
                textAnchor="middle"
                fill="#8b8a86"
                fontSize="8"
              >
                {n.role === "me" ? "나" : n.role === "gateway" ? "GW" : `h${n.hop}`}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="mt-2 space-y-2">
        {mesh.nodes.map((n) => {
          const on = mesh.hopsDone >= n.hop;
          return (
            <li
              key={n.id}
              className={cn(
                "flex items-center justify-between rounded-lg border px-3 py-2 text-sm",
                on ? "border-steel/35 bg-steel/10" : "border-border text-muted",
              )}
            >
              <span>
                {n.label}
                <span className="ml-2 font-mono text-[11px] text-subtle">hop {n.hop}</span>
              </span>
              <span className="font-mono text-xs tabular-nums">
                {n.role === "me" ? "TX" : `${n.rssi} dBm`}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
