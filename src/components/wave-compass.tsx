import { useEffect, useState } from "react";
import { METHOD_LABEL } from "@/lib/quake/copy";
import { cardinal } from "@/lib/quake/geo";
import { useQuakeStore } from "@/stores/quake-store";

export function WaveCompass({ size = 260 }: { size?: number }) {
  const wavefront = useQuakeStore((s) => s.wavefront);
  const phase = useQuakeStore((s) => s.phase);
  const official = useQuakeStore((s) => s.official);
  const shown =
    !!wavefront && (phase === "confirmed" || phase === "action") && wavefront.method !== "hidden";

  const deg = wavefront?.bearingDeg ?? 0;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 18;
  const rad = ((deg - 90) * Math.PI) / 180;
  const x2 = cx + Math.cos(rad) * (r - 8);
  const y2 = cy + Math.sin(rad) * (r - 8);
  const scale = (r * 0.5) / 1.2;

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!wavefront?.sWaveEndsAt) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [wavefront?.sWaveEndsAt]);

  const sLeft = wavefront?.sWaveEndsAt
    ? Math.max(0, Math.ceil((wavefront.sWaveEndsAt - now) / 1000))
    : 0;

  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="mx-auto block w-full max-w-[16.25rem]"
        role="img"
        aria-label={shown ? `파동이 ${cardinal(deg)}에서 옵니다` : "파면 대기"}
      >
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(237,236,232,0.12)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={r * 0.66} fill="none" stroke="rgba(237,236,232,0.08)" />
        <circle cx={cx} cy={cy} r={r * 0.33} fill="none" stroke="rgba(237,236,232,0.08)" />
        {["북", "동", "남", "서"].map((label, i) => {
          const a = ((i * 90 - 90) * Math.PI) / 180;
          const x = cx + Math.cos(a) * (r - 14);
          const y = cy + Math.sin(a) * (r - 14) + 4;
          return (
            <text key={label} x={x} y={y} textAnchor="middle" fill="#8B8A86" fontSize="11">
              {label}
            </text>
          );
        })}
        {shown && wavefront
          ? wavefront.crowd.map((p, i) => (
              <circle
                key={i}
                cx={cx + p.x * scale}
                cy={cy - p.y * scale}
                r="1.6"
                fill={p.t < 0 ? "#C5CBD3" : "rgba(197,203,211,0.35)"}
              />
            ))
          : null}
        {shown && wavefront ? (
          <>
            <path d={arcFan(cx, cy, r, deg, 28)} fill="rgba(196,92,74,0.16)" stroke="none" />
            <line
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke="#C45C4A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx={x2} cy={y2} r="4" fill="#C45C4A" />
            <circle cx={cx} cy={cy} r="5" fill="#C5CBD3" />
          </>
        ) : (
          <circle cx={cx} cy={cy} r="5" fill="#5E5D59" />
        )}
      </svg>
      <p className="mt-2 text-center text-sm text-muted">
        {phase === "crowding"
          ? "근처 기기 트리거 시각을 모으는 중. 바늘은 아직 숨깁니다."
          : shown && wavefront
            ? `${METHOD_LABEL[wavefront.method]} · ${cardinal(deg)}쪽 · ${wavefront.confirmedBy}대`
            : "한 대 추측은 숨깁니다. 군중이 모이면 바늘이 켜집니다."}
      </p>
      {shown && wavefront?.crowdBearingDeg != null && wavefront.officialBearingDeg != null ? (
        <p className="mt-1 text-center text-xs text-subtle">
          군중 {Math.round(wavefront.crowdBearingDeg)}° → 공식{" "}
          {Math.round(wavefront.officialBearingDeg)}°
          {official ? ` · ${official.sourceLabel}` : ""}
        </p>
      ) : null}
      {shown && wavefront?.apparentC != null ? (
        <p className="mt-1 text-center font-mono text-[11px] text-subtle">
          c {wavefront.apparentC.toFixed(1)} km/s · RMS {Math.round(wavefront.residualMs ?? 0)} ms
          {wavefront.psKm != null ? ` · P–S ${wavefront.psKm.toFixed(0)} km` : ""}
        </p>
      ) : null}
      {shown && sLeft > 0 ? (
        <p className="mt-1 font-display text-2xl tabular-nums text-fg">S파 {sLeft}초</p>
      ) : null}
    </div>
  );
}

function arcFan(cx: number, cy: number, r: number, bearing: number, spread: number) {
  const a0 = ((bearing - spread / 2 - 90) * Math.PI) / 180;
  const a1 = ((bearing + spread / 2 - 90) * Math.PI) / 180;
  const x0 = cx + Math.cos(a0) * r;
  const y0 = cy + Math.sin(a0) * r;
  const x1 = cx + Math.cos(a1) * r;
  const y1 = cy + Math.sin(a1) * r;
  return `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1} Z`;
}
