import { RadarMap } from "@/components/radar-map";
import { WaveCompass } from "@/components/wave-compass";
import { ShelterArrow } from "@/components/shelter-arrow";
import { MeshPanel } from "@/components/mesh-panel";
import { Button } from "@/components/ui/button";
import { INDOOR_STEPS, OUTDOOR_STEPS } from "@/lib/quake/copy";
import { TRAVEL } from "@/lib/quake/travel";
import { useQuakeStore } from "@/stores/quake-store";
import { Shield, X } from "lucide-react";
import { FeltForm } from "@/components/felt-form";

export function EventOverlay() {
  const phase = useQuakeStore((s) => s.phase);
  const official = useQuakeStore((s) => s.official);
  const regionId = useQuakeStore((s) => s.regionId);
  const lastEventId = useQuakeStore((s) => s.lastEventId);
  const reset = useQuakeStore((s) => s.reset);
  const pingFamily = useQuakeStore((s) => s.pingFamily);
  const setFamilyStatus = useQuakeStore((s) => s.setFamilyStatus);
  const travel = TRAVEL[regionId];

  if (phase !== "action") return null;

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-bg px-4 py-6 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <div className="mx-auto grid min-h-full max-w-5xl gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs tracking-[0.2em] text-danger">DROP COVER HOLD ON</p>
              <h1 className="mt-1 font-display text-3xl font-semibold">강한 흔들림</h1>
              <p className="mt-1 text-sm text-muted">
                {travel.city} · {travel.officialLabel}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={reset} aria-label="닫기">
              <X className="size-5" />
            </Button>
          </div>

          <div className="rounded-xl border border-danger/35 bg-danger/10 p-4">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Shield className="size-4 text-danger" />
              지금은 밖으로 뛰지 마세요. 머리부터.
            </p>
            <ol className="mt-3 space-y-1.5 text-sm text-muted">
              {INDOOR_STEPS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>

          <ShelterArrow hero />
          <WaveCompass size={200} />

          {official ? (
            <p className="text-center text-sm text-muted">
              {official.sourceLabel} · M{official.magnitude.toFixed(1)} · {official.region}
              {official.source === "none" ? " · 공식 알림 없음, 군중 파면 유지" : " · 나침반을 공식 진앙으로 전환"}
            </p>
          ) : (
            <p className="text-center text-sm text-steel">
              공식 속보 대기. 지금은 군중 파면입니다.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 pb-8">
          <div>
            <h2 className="font-display text-lg">흔들림이 잦아지면</h2>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {OUTDOOR_STEPS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <RadarMap />
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="paper"
              onClick={() => {
                setFamilyStatus("me", "safe");
              }}
            >
              안전하다고 알림
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setFamilyStatus("me", "help");
                pingFamily();
              }}
            >
              도움 필요
            </Button>
          </div>
          {lastEventId ? <FeltForm eventId={lastEventId} /> : null}
          <MeshPanel />
        </div>
      </div>
    </div>
  );
}
