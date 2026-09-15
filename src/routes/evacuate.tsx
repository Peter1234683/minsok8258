import { createFileRoute } from "@tanstack/react-router";
import { ShelterArrow } from "@/components/shelter-arrow";
import { RadarMap } from "@/components/radar-map";
import { WaveCompass } from "@/components/wave-compass";
import { WaveMethodPanel } from "@/components/wave-method-panel";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { INDOOR_STEPS, OUTDOOR_STEPS } from "@/lib/quake/copy";
import { nearestShelters, regionCenter } from "@/lib/quake/shelters";
import { TRAVEL } from "@/lib/quake/travel";
import { useQuakeStore } from "@/stores/quake-store";

export const Route = createFileRoute("/evacuate")({ component: EvacuatePage });

function EvacuatePage() {
  const regionId = useQuakeStore((s) => s.regionId);
  const wavefront = useQuakeStore((s) => s.wavefront);
  const origin = regionCenter(regionId);
  const travel = TRAVEL[regionId];
  const list = nearestShelters(origin, origin.city, 5);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs tracking-[0.18em] text-muted">WALK ONLY</p>
        <h1 className="mt-1 font-display text-3xl font-semibold">도보 대피</h1>
        <p className="mt-2 text-sm text-muted">
          {origin.city} · 차량 금지 · 사전 캐시된 옥외 장소 {list.length}곳
        </p>
      </div>

      <ShelterArrow />
      <WaveCompass size={240} />
      <WaveMethodPanel />
      <RadarMap />

      <Card>
        <CardTitle>흔들릴 때</CardTitle>
        <ol className="mt-3 space-y-1.5 text-sm text-muted">
          {INDOOR_STEPS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </Card>

      <Card>
        <CardTitle>잦아지면</CardTitle>
        <ol className="mt-3 space-y-1.5 text-sm text-muted">
          {OUTDOOR_STEPS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </Card>

      <section>
        <h2 className="font-display text-lg">가까운 옥외 장소</h2>
        <ul className="mt-3 space-y-2">
          {list.map((s) => (
            <li
              key={s.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-border bg-bg-elevated px-3 py-3"
            >
              <div>
                <p className="text-sm font-medium">{s.name}</p>
                <p className="text-xs text-muted">{s.note}</p>
              </div>
              <p className="shrink-0 font-mono text-sm tabular-nums text-steel">
                {s.walkMin}분
              </p>
            </li>
          ))}
        </ul>
      </section>

      <CardMeta>
        {travel.hint}
        {wavefront
          ? " 파동 방향은 어디로 갈지를 바꾸지 않습니다. 열린 공터가 우선입니다."
          : ""}
      </CardMeta>
    </div>
  );
}
