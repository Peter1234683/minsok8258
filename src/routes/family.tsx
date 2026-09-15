import { createFileRoute } from "@tanstack/react-router";
import { MeshPanel } from "@/components/mesh-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { STATUS_LABEL } from "@/lib/quake/copy";
import { nearestShelters, regionCenter } from "@/lib/quake/shelters";
import { useQuakeStore } from "@/stores/quake-store";
import type { FamilyStatus } from "@/lib/quake/types";
import { Plane, Radio } from "lucide-react";

export const Route = createFileRoute("/family")({ component: FamilyPage });

function FamilyPage() {
  const family = useQuakeStore((s) => s.family);
  const setStatus = useQuakeStore((s) => s.setFamilyStatus);
  const ping = useQuakeStore((s) => s.pingFamily);
  const origin = regionCenter(useQuakeStore((s) => s.regionId));
  const cached = nearestShelters(origin, origin.city, 3);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs tracking-[0.18em] text-muted">BAND</p>
        <h1 className="mt-1 font-display text-3xl font-semibold">가족 밴드</h1>
        <p className="mt-2 text-sm text-muted">
          같은 흔들림을 봤는지, 안전한지, 도움이 필요한지만 나눕니다. 위치 좌표는 보내지 않습니다.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="paper" onClick={() => setStatus("me", "safe")}>
          난 안전
        </Button>
        <Button variant="danger" onClick={() => setStatus("me", "help")}>
          도움 필요
        </Button>
      </div>
      <Button variant="secondary" onClick={ping}>
        <Radio className="size-4" />
        같은 흔들림 신호 보내기
      </Button>

      <MeshPanel />

      <ul className="space-y-2">
        {family.map((m) => (
          <li
            key={m.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-bg-elevated px-4 py-3"
          >
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm font-medium">
                {m.name}
                {m.traveling ? (
                  <Plane className="size-3.5 text-muted" aria-label="여행 중" />
                ) : null}
              </p>
              <p className="text-xs text-muted">
                {m.relation} · {m.city} · {m.lastSeenMin === 0 ? "방금" : `${m.lastSeenMin}분 전`}
              </p>
            </div>
            <StatusBadge status={m.status} />
          </li>
        ))}
      </ul>

      <Card>
        <p className="text-xs tracking-[0.16em] text-muted">OFFLINE CACHE</p>
        <p className="mt-1 font-display text-lg">통신이 끊겨도 남는 대피소</p>
        <ul className="mt-3 space-y-2">
          {cached.map((s) => (
            <li key={s.id} className="flex justify-between text-sm">
              <span>{s.name}</span>
              <span className="font-mono tabular-nums text-muted">{s.walkMin}분</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">
          여행 전에 목적 도시 옥외 장소를 워치에 넣어 둡니다. 캐시는 설정에서 국가가 바뀌면 자동입니다.
          BLE 메쉬는 미리보기에서 hop을 보여 줍니다.
        </p>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: FamilyStatus }) {
  const tone =
    status === "safe"
      ? "ok"
      : status === "help"
        ? "danger"
        : status === "same-shake"
          ? "warn"
          : "muted";
  return <Badge tone={tone}>{STATUS_LABEL[status]}</Badge>;
}
