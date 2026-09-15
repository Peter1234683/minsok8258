import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { useQuakeStore } from "@/stores/quake-store";

export const Route = createFileRoute("/log")({ component: LogPage });

const KIND: Record<string, string> = {
  eew: "경보",
  notify: "알림",
  local: "손목",
  felt: "체감",
  drill: "훈련",
  official: "공식",
  citizen: "시민망",
};

function LogPage() {
  const log = useQuakeStore((s) => s.log);
  const contributions = useQuakeStore((s) => s.contributions);
  const citizenScience = useQuakeStore((s) => s.citizenScience);
  const batterySave = useQuakeStore((s) => s.batterySave);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs tracking-[0.18em] text-muted">LOG</p>
        <h1 className="mt-1 font-display text-3xl font-semibold">기록</h1>
        <p className="mt-2 text-sm text-muted">경보·알림·손목 판별·체감 제보. 지우지 않습니다.</p>
      </div>
      <Card>
        <CardTitle>시민 망 기여</CardTitle>
        <CardMeta className="mt-2">
          {citizenScience && !batterySave
            ? "트리거 시각을 보냅니다. 파형은 올리지 않습니다."
            : "배터리 절약 또는 시민 망 끔."}
        </CardMeta>
        <p className="mt-3 font-display text-2xl tabular-nums">{contributions}회</p>
      </Card>
      {log.length === 0 ? (
        <p className="text-sm text-muted">아직 기록이 없습니다. 시연을 재생하거나 지도를 열어 두세요.</p>
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-bg-elevated px-3">
          {log.map((e) => (
            <li key={e.id} className="flex items-start gap-3 py-3">
              <Badge tone={e.kind === "eew" ? "danger" : e.kind === "drill" ? "warn" : "muted"}>
                {KIND[e.kind] ?? e.kind}
              </Badge>
              <div className="min-w-0 flex-1">
                <p className="text-sm">{e.title}</p>
                <p className="text-xs text-muted">{e.body}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
