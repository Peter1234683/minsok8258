import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { playAlertSound } from "@/lib/quake/alert-sound";
import { BUILDINGS } from "@/lib/quake/buildings";
import {
  baroToFloor,
  naturalBand,
  naturalPeriodSec,
} from "@/lib/quake/building-filter";
import { DUTY, estimateBatteryHrs } from "@/lib/quake/duty-cycle";
import { cacheKb } from "@/lib/quake/offline-cache";
import { TRAVEL_LIST } from "@/lib/quake/travel";
import { useQuakeStore } from "@/stores/quake-store";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const regionId = useQuakeStore((s) => s.regionId);
  const setRegion = useQuakeStore((s) => s.setRegion);
  const buildingId = useQuakeStore((s) => s.buildingId);
  const setBuilding = useQuakeStore((s) => s.setBuilding);
  const sensorOn = useQuakeStore((s) => s.sensorOn);
  const setSensorOn = useQuakeStore((s) => s.setSensorOn);
  const until = useQuakeStore((s) => s.aftershockUntil);
  const aftershock = !!until && until > Date.now();
  const homebaseId = useQuakeStore((s) => s.homebaseId);
  const setHomebase = useQuakeStore((s) => s.setHomebase);
  const notifyGlobalMag = useQuakeStore((s) => s.notifyGlobalMag);
  const notifyHomeMag = useQuakeStore((s) => s.notifyHomeMag);
  const notifyHomeKm = useQuakeStore((s) => s.notifyHomeKm);
  const setNotify = useQuakeStore((s) => s.setNotify);
  const citizenScience = useQuakeStore((s) => s.citizenScience);
  const setCitizenScience = useQuakeStore((s) => s.setCitizenScience);
  const batterySave = useQuakeStore((s) => s.batterySave);
  const setBatterySave = useQuakeStore((s) => s.setBatterySave);
  const criticalAlerts = useQuakeStore((s) => s.criticalAlerts);
  const setCriticalAlerts = useQuakeStore((s) => s.setCriticalAlerts);
  const locationShare = useQuakeStore((s) => s.locationShare);
  const setLocationShare = useQuakeStore((s) => s.setLocationShare);
  const contributions = useQuakeStore((s) => s.contributions);
  const openDrill = useQuakeStore((s) => s.openDrill);
  const dutyMode = useQuakeStore((s) => s.dutyMode);
  const wakeCount = useQuakeStore((s) => s.wakeCount);
  const lastWakeAt = useQuakeStore((s) => s.lastWakeAt);
  const cache = useQuakeStore((s) => s.shelterCache);
  const refreshCache = useQuakeStore((s) => s.refreshCache);
  const learnBuilding = useQuakeStore((s) => s.learnBuilding);
  const learned = useQuakeStore((s) => s.learnedByBuilding);
  const baroHpa = useQuakeStore((s) => s.baroHpa);
  const setBaroHpa = useQuakeStore((s) => s.setBaroHpa);

  async function enableSensor() {
    const DE = DeviceMotionEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (typeof DE.requestPermission === "function") {
      const perm = await DE.requestPermission();
      if (perm !== "granted") return;
    }
    setSensorOn(true);
  }

  const hoursLeft = until && aftershock ? Math.max(1, Math.round((until - Date.now()) / 36e5)) : 0;
  const hrs = estimateBatteryHrs({ aftershock, batterySave });
  const estFloor = baroToFloor(baroHpa);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs tracking-[0.18em] text-muted">CONTEXT</p>
        <h1 className="mt-1 font-display text-3xl font-semibold">여행 · 건물 · 알림</h1>
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        <Link to="/safety" className="text-steel">안전</Link>
        <span className="text-subtle">·</span>
        <Link to="/log" className="text-steel">기록</Link>
        <span className="text-subtle">·</span>
        <Link to="/compare" className="text-steel">비교</Link>
      </div>

      <Card>
        <CardTitle>홈베이스</CardTitle>
        <CardMeta className="mt-2">
          자리비움에도 이 도시 기준 M{notifyHomeMag.toFixed(1)} 알림을 받습니다. 서버에 주소를 올리지 않습니다.
        </CardMeta>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {TRAVEL_LIST.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setHomebase(t.id)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs",
                homebaseId === t.id ? "border-steel/50 bg-steel/15" : "border-border text-muted",
              )}
            >
              {t.city}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>오프라인 대피소 캐시</CardTitle>
        <CardMeta className="mt-2">
          국가 코드가 바뀌면 OSM 안전 지대만 GeoJSON으로 넣습니다. {cache.city} · {cache.count}곳 ·{" "}
          {cacheKb(cache)} KB.
        </CardMeta>
        <p className="mt-2 font-mono text-xs text-subtle">
          {cache.at ? new Date(cache.at).toISOString().slice(0, 16).replace("T", " ") : "시드"}
        </p>
        <Button className="mt-3" variant="secondary" size="sm" onClick={refreshCache}>
          지금 캐시
        </Button>
      </Card>

      <Card>
        <CardTitle>지진 알림 (속보 아님)</CardTitle>
        <CardMeta className="mt-2">
          발표 수 분 뒤 정보 알림입니다. EEW 사이렌과 다릅니다. 기본값: 글로벌 M6.5+, 홈베이스 80km M3.0+.
        </CardMeta>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <label className="text-xs text-muted">
            글로벌 M
            <input
              type="number"
              step="0.1"
              value={notifyGlobalMag}
              onChange={(e) => setNotify({ global: Number(e.target.value) })}
              className="mt-1 h-10 w-full rounded-md border border-border bg-bg px-2 font-mono text-sm text-fg"
            />
          </label>
          <label className="text-xs text-muted">
            홈 M
            <input
              type="number"
              step="0.1"
              value={notifyHomeMag}
              onChange={(e) => setNotify({ home: Number(e.target.value) })}
              className="mt-1 h-10 w-full rounded-md border border-border bg-bg px-2 font-mono text-sm text-fg"
            />
          </label>
          <label className="text-xs text-muted">
            반경 km
            <input
              type="number"
              step="10"
              value={notifyHomeKm}
              onChange={(e) => setNotify({ km: Number(e.target.value) })}
              className="mt-1 h-10 w-full rounded-md border border-border bg-bg px-2 font-mono text-sm text-fg"
            />
          </label>
        </div>
      </Card>

      <div className="grid gap-2">
        <Toggle
          on={criticalAlerts}
          label="중요 알림"
          hint="집중 모드를 뚫는 강한 흔들림 경보."
          onClick={() => setCriticalAlerts(!criticalAlerts)}
        />
        <Toggle
          on={locationShare}
          label="대략 위치"
          hint="홈베이스 외에 지금 있는 곳으로 알림을 맞춥니다. 식별에 쓰지 않습니다."
          onClick={() => setLocationShare(!locationShare)}
        />
        <Toggle
          on={citizenScience}
          label="시민 망"
          hint="트리거 시각만 보냅니다. 파형 5분은 올리지 않습니다."
          onClick={() => setCitizenScience(!citizenScience)}
        />
        <Toggle
          on={batterySave}
          label="배터리 절약"
          hint="시민 망을 끄고 깨우는 임계값을 올립니다."
          onClick={() => setBatterySave(!batterySave)}
        />
      </div>

      <Card>
        <CardTitle>듀티 사이클 · Wake-on-Motion</CardTitle>
        <CardMeta className="mt-2">
          평소 딥슬립, 흔들리면 {DUTY.wakeLatencyMs}ms 안에 깨어 {DUTY.burstMs / 1000}초간 {DUTY.sampleHz}Hz.
          100Hz를 72시간 켜두면 반나절입니다.
        </CardMeta>
        <p className="mt-3 font-display text-2xl tabular-nums">
          {dutyMode === "burst" ? "BURST 100Hz" : "SLEEP"}
        </p>
        <p className="mt-1 font-mono text-xs text-muted">
          깨어난 횟수 {wakeCount} · 추정 {hrs}시간
          {lastWakeAt ? ` · 마지막 ${Math.max(0, Math.round((Date.now() - lastWakeAt) / 1000))}s 전` : ""}
        </p>
        <p className="mt-2 text-xs text-subtle">
          연속 {DUTY.continuousHrs}h · 평시 듀티 {DUTY.dutyHrs}h · 여진 {DUTY.aftershockHrs}h · 절약 {DUTY.saveHrs}h
        </p>
      </Card>

      <Card>
        <CardTitle>경보음 · 훈련</CardTitle>
        <CardMeta className="mt-2">실제 지진이 아닙니다. 낮추고 머리 보호만 연습합니다.</CardMeta>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={() => void playAlertSound()}>
            경보음 재생
          </Button>
          <Button variant="secondary" size="sm" onClick={openDrill}>
            월간 훈련
          </Button>
        </div>
        <p className="mt-3 text-xs text-subtle">시민 망 기여 {contributions}회</p>
      </Card>

      <section>
        <h2 className="font-display text-lg">여행 모드</h2>
        <p className="mt-1 text-sm text-muted">
          나라마다 공식 경보의 빈 칸이 다릅니다. 군중 비중만 바꿉니다. 착륙 즉시 대피소를 캐시합니다.
        </p>
        <ul className="mt-3 space-y-2">
          {TRAVEL_LIST.map((t) => {
            const on = t.id === regionId;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setRegion(t.id)}
                  className={cn(
                    "w-full rounded-xl border px-4 py-3 text-left",
                    on ? "border-steel/40 bg-bg-elevated" : "border-border bg-bg-elevated/60",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">
                      {t.city}
                      <span className="ml-2 text-muted">{t.country}</span>
                    </p>
                    <Badge
                      tone={
                        t.officialEew === "none"
                          ? "warn"
                          : t.officialEew === "strong"
                            ? "ok"
                            : "muted"
                      }
                    >
                      군중 {Math.round(t.crowdWeight * 100)}%
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted">{t.hint}</p>
                  <p className="mt-1 text-[11px] text-subtle">
                    공식 {t.officialLabel} · 대사관{" "}
                    {t.embassyQuality === "caution-only"
                      ? "주의 문자"
                      : t.embassyQuality === "slow"
                        ? "느림"
                        : t.embassyQuality === "none"
                          ? "없음"
                          : "상세"}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-lg">건물 필터</h2>
        <p className="mt-1 text-sm text-muted">
          고유주기 T≈0.1N초. 기압계로 층을 가늠하고, 그 대역 임계값을 올립니다.
        </p>
        <label className="mt-3 block text-xs text-muted">
          기압 {baroHpa.toFixed(1)} hPa · 추정 {estFloor}층
          <input
            type="range"
            min={980}
            max={1013}
            step={0.5}
            value={baroHpa}
            onChange={(e) => setBaroHpa(Number(e.target.value))}
            className="mt-2 w-full"
          />
        </label>
        <div className="mt-3 grid gap-2">
          {BUILDINGS.map((b) => {
            const on = b.id === buildingId;
            const learn = learned[b.id];
            const T = naturalPeriodSec(b.floors);
            const [lo, hi] = naturalBand(b.floors);
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setBuilding(b.id)}
                className={cn(
                  "rounded-xl border px-4 py-3 text-left",
                  on ? "border-steel/40 bg-bg-elevated" : "border-border bg-bg-elevated/60",
                )}
              >
                <p className="text-sm font-medium">
                  {b.label}
                  <span className="ml-2 font-mono text-xs text-muted">
                    {b.floors}층 · T≈{T.toFixed(1)}s
                  </span>
                </p>
                <p className="mt-1 text-xs text-muted">{b.note}</p>
                <p className="mt-1 font-mono text-[11px] text-subtle">
                  고유 {lo}–{hi} Hz · 학습 {learn?.learnedHz[0]}–{learn?.learnedHz[1]} Hz ·{" "}
                  {learn?.windows ?? 0}창
                </p>
              </button>
            );
          })}
        </div>
        <Button className="mt-3" variant="secondary" size="sm" onClick={learnBuilding}>
          이 건물 지금 학습
        </Button>
      </section>

      <Card>
        <CardTitle>여진 시계</CardTitle>
        <CardMeta className="mt-2">
          확정된 강진 이후 72시간만 민감도를 올립니다. 센서는 여전히 듀티 사이클입니다. 약진 사이렌은 없습니다.
        </CardMeta>
        <p className="mt-3 font-display text-2xl tabular-nums">
          {aftershock ? `${hoursLeft}시간 남음` : "비활성"}
        </p>
      </Card>

      <Card>
        <CardTitle>이 기기를 센서로</CardTitle>
        <CardMeta className="mt-2">
          미리보기와 데스크톱에서는 시연 버튼이 정확합니다. 폰에서는 가속도+자이로를 켤 수 있습니다.
        </CardMeta>
        <div className="mt-4">
          {sensorOn ? (
            <Badge tone="ok">가속도계 켜짐</Badge>
          ) : (
            <Button variant="secondary" onClick={() => void enableSensor()}>
              동작 센서 허용
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

function Toggle({
  on,
  label,
  hint,
  onClick,
}: {
  on: boolean;
  label: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start justify-between gap-3 rounded-xl border border-border bg-bg-elevated px-4 py-3 text-left"
    >
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="mt-0.5 block text-xs text-muted">{hint}</span>
      </span>
      <Badge tone={on ? "ok" : "muted"}>{on ? "켜짐" : "꺼짐"}</Badge>
    </button>
  );
}
