import { useEffect } from "react";
import { useQuakeStore } from "@/stores/quake-store";

export function useMotionWatch() {
  const sensorOn = useQuakeStore((s) => s.sensorOn);
  const ingest = useQuakeStore((s) => s.ingestMotion);

  useEffect(() => {
    if (!sensorOn) return;
    const accel: number[] = [];
    const gyro: number[] = [];
    const onMotion = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      const g = Math.hypot(a.x ?? 0, a.y ?? 0, a.z ?? 0) / 9.81 - 1;
      const r = e.rotationRate;
      const gy = Math.hypot(r?.alpha ?? 0, r?.beta ?? 0, r?.gamma ?? 0) * (Math.PI / 180);
      accel.push(g);
      gyro.push(gy);
      if (accel.length > 200) {
        accel.shift();
        gyro.shift();
      }
      if (accel.length === 200) {
        ingest([...accel], 1 / 50, [...gyro]);
      }
    };
    window.addEventListener("devicemotion", onMotion);
    return () => window.removeEventListener("devicemotion", onMotion);
  }, [sensorOn, ingest]);
}
