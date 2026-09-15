import { useEffect, useState } from "react";
import { waveformAt } from "@/lib/quake/scenarios";
import { useQuakeStore } from "@/stores/quake-store";

export function Seismograph({
  height = 72,
}: {
  height?: number;
  compact?: boolean;
}) {
  const kind = useQuakeStore((s) => s.waveformKind);
  const [d, setD] = useState("M 0 36");

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const start = performance.now();
    const buf: number[] = [];
    const w = 320;
    const h = height;
    const amp = h * 0.4;

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      let v = 0;
      for (let i = 0; i < 12; i++) {
        const s = waveformAt(kind, t - i * 0.004);
        if (Math.abs(s) > Math.abs(v)) v = s;
      }
      buf.push(v);
      if (buf.length > 80) buf.shift();
      if (now - last > 50) {
        last = now;
        const path = buf
          .map((sample, i) => {
            const x = (i / Math.max(1, buf.length - 1)) * w;
            const y = h / 2 - sample * amp;
            return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
          })
          .join(" ");
        setD(path || `M 0 ${h / 2}`);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [kind, height]);

  const stroke =
    kind === "construction"
      ? "#a3926f"
      : kind === "walk"
        ? "#7a8ea3"
        : kind === "wind"
          ? "#c4a574"
          : kind === "idle"
            ? "#c5cbd3"
            : "#c45c4a";

  return (
    <svg
      viewBox={`0 0 320 ${height}`}
      className="block w-full"
      height={height}
      aria-hidden
    >
      <line
        x1="0"
        y1={height / 2}
        x2="320"
        y2={height / 2}
        stroke="rgba(197,203,211,0.12)"
      />
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
}
