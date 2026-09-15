import { createFileRoute, Link } from "@tanstack/react-router";
import { LiveFeed } from "@/components/live-feed";
import { ScenarioBar } from "@/components/scenario-bar";
import { WatchFace } from "@/components/watch-face";
import { WaveMethodPanel } from "@/components/wave-method-panel";
import { FeltForm } from "@/components/felt-form";
import { FeaturePanel } from "@/components/feature-panel";
import { ClassifierPipeline } from "@/components/classifier-pipeline";
import { HapticStepper } from "@/components/haptic-stepper";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TRAVEL } from "@/lib/quake/travel";
import { useQuakeStore } from "@/stores/quake-store";
import { useMotionWatch } from "@/components/use-motion-watch";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const result = useQuakeStore((s) => s.result);
  const phase = useQuakeStore((s) => s.phase);
  const official = useQuakeStore((s) => s.official);
  const regionId = useQuakeStore((s) => s.regionId);
  const strength = useQuakeStore((s) => s.strength);
  const travel = TRAVEL[regionId];
  const aftershockUntil = useQuakeStore((s) => s.aftershockUntil);
  const lastEventId = useQuakeStore((s) => s.lastEventId);
  const aftershock = !!aftershockUntil && aftershockUntil > Date.now();
  useMotionWatch();

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:items-start">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="steel">
            {travel.city} · {travel.country}
          </Badge>
          <Badge tone={travel.officialEew === "none" ? "warn" : "ok"}>
            {travel.officialLabel}
          </Badge>
          {aftershock ? <Badge tone="warn">여진 민감도 상승</Badge> : null}
        </div>

        <WatchFace />
        <HapticStepper />

        {result && phase !== "idle" ? (
          <Card>
            <p className="text-xs tracking-[0.16em] text-muted">로컬 판별</p>
            <p className="mt-1 font-display text-xl">{result.label}</p>
            <p className="mt-2 text-sm text-muted">{result.reason}</p>
            {result.pThenS ? (
              <p className="mt-2 text-xs text-steel">P파 다음 S파 형태가 보입니다. 거리는 방향이 아닙니다.</p>
            ) : null}
            {result.gyroBodyHint ? (
              <p className="mt-2 text-xs text-body-move">가속도만 보면 약진과 닮았지만 자이로가 걸음을 말합니다.</p>
            ) : null}
            {phase === "crowding" ? (
              <p className="mt-2 text-sm text-steel">
                반경 2km 기기 확인 중. 한 대만이면 공사로 남고 바늘은 숨깁니다.
              </p>
            ) : null}
            {phase === "confirmed" && strength === "weak" ? (
              <p className="mt-2 text-sm">
                지진 맞습니다. 사이렌은 울리지 않습니다. 여진만 주시하세요.
              </p>
            ) : null}
            {official ? (
              <p className="mt-3 border-t border-border pt-3 text-sm">
                {official.sourceLabel} · M{official.magnitude.toFixed(1)} · {official.region} ·{" "}
                {official.intensityLocal}
              </p>
            ) : null}
          </Card>
        ) : (
          <Card>
            <p className="text-sm text-muted">
              가만히 서 있으면 손목이 땅을 봅니다. 흔들리면 공사인지, 당신인지, 지진 후보인지를
              먼저 말하고, 근처 기기가 동의해야 파면 나침반을 켭니다.
            </p>
          </Card>
        )}
        <ClassifierPipeline />
        <FeaturePanel />
        {lastEventId && (phase === "confirmed" || phase === "action") ? (
          <FeltForm eventId={lastEventId} />
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        <ScenarioBar />
        <WaveMethodPanel />
        <LiveFeed />
        <p className="text-xs text-muted">
          <Link to="/safety" className="text-steel">안전</Link>
          {" · "}
          <Link to="/log" className="text-steel">기록</Link>
          {" · "}
          <Link to="/compare" className="text-steel">비교</Link>
        </p>
      </div>
    </div>
  );
}
