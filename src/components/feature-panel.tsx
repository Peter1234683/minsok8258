import { Card } from "@/components/ui/card";
import { useQuakeStore } from "@/stores/quake-store";
import { ZERO_FEATURES } from "@/lib/quake/features";
import { buildingById } from "@/lib/quake/buildings";
import {
  baroToFloor,
  inNaturalBand,
  naturalBand,
  naturalPeriodSec,
} from "@/lib/quake/building-filter";
import { cn } from "@/lib/cn";

export function FeaturePanel() {
  const result = useQuakeStore((s) => s.result);
  const buildingId = useQuakeStore((s) => s.buildingId);
  const learned = useQuakeStore((s) => s.learnedByBuilding[buildingId]);
  const baroHpa = useQuakeStore((s) => s.baroHpa);
  const f = result?.features ?? ZERO_FEATURES;
  const gyro = result?.gyroBodyHint;
  const filtered = result?.filteredByBuilding;
  const b = buildingById(buildingId);
  const T = naturalPeriodSec(b.floors);
  const [lo, hi] = naturalBand(b.floors);
  const hz = result?.dominantHz ?? 0;
  const inBand = hz > 0.05 && inNaturalBand(hz, b.floors);
  const rows = [
    ["mean", f.mean.toFixed(3)],
    ["std", f.std.toFixed(3)],
    ["IQR", f.iqr.toFixed(3)],
    ["ZCR", f.zcr.toFixed(1)],
    ["FFT Hz", f.fftHz.toFixed(2)],
    ["gyro RMS", f.gyroRms.toFixed(2)],
    ["걸음 주기", f.gyroRegularity.toFixed(2)],
    ["P→S", f.pThenS ? "예" : "아니오"],
  ] as const;
  const peak = f.spectrum.reduce((m, bin) => Math.max(m, bin.mag), 0) || 1;

  return (
    <Card>
      <p className="text-xs tracking-[0.16em] text-muted">2초 창 · MyShake 특징</p>
      <p className="mt-1 text-sm text-muted">
        평균·표준편차·사분위수·영교차율에 자이로를 얹습니다. FFT는 온디바이스입니다.
      </p>
      <p
        className={cn(
          "mt-3 rounded-md border px-3 py-2 font-mono text-[11px] leading-relaxed",
          filtered || inBand
            ? "border-warn/40 bg-warn/10 text-warn"
            : "border-border text-subtle",
        )}
      >
        {b.label} · {baroToFloor(baroHpa)}층 · T≈{T.toFixed(1)}s ({lo}–{hi} Hz)
        {hz > 0 ? ` · 지금 ${hz.toFixed(2)} Hz` : ""}
        {filtered ? " · 고유주기로 올림" : ""}
        {learned ? ` · 학습 ${learned.windows}창` : ""}
      </p>
      {f.spectrum.length ? (
        <div className="mt-3 flex h-16 items-end gap-0.5" aria-hidden>
          {f.spectrum.map((bin) => (
            <div
              key={bin.hz.toFixed(2)}
              className="min-h-0.5 flex-1 rounded-t-sm bg-steel/70"
              style={{ height: `${Math.max(6, (bin.mag / peak) * 100)}%` }}
              title={`${bin.hz.toFixed(1)} Hz`}
            />
          ))}
        </div>
      ) : (
        <div className="mt-3 h-16 rounded-md border border-dashed border-border" />
      )}
      <p className="mt-1 font-mono text-[11px] text-subtle">0 — 16 Hz 스펙트럼</p>
      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 font-mono text-xs tabular-nums">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-2 border-b border-border/60 py-1">
            <dt className="text-muted">{k}</dt>
            <dd className={cn(k === "걸음 주기" && gyro && "text-body-move")}>{v}</dd>
          </div>
        ))}
      </dl>
      {gyro ? (
        <p className="mt-3 text-xs text-body-move">자이로가 1–2Hz로 돕니다. 걸음입니다.</p>
      ) : null}
      {filtered ? (
        <p className="mt-3 text-xs text-warn">건물 고유주기 대역이라 지진 후보에서 뺐습니다.</p>
      ) : null}
    </Card>
  );
}
