import { useEffect } from "react";
import { cardinal } from "@/lib/quake/geo";
import { bearingTo, nearestShelters, regionCenter } from "@/lib/quake/shelters";
import { useQuakeStore } from "@/stores/quake-store";
import { cn } from "@/lib/cn";

export function ShelterArrow({ hero = false }: { hero?: boolean }) {
  const regionId = useQuakeStore((s) => s.regionId);
  const heading = useQuakeStore((s) => s.headingDeg);
  const setHeading = useQuakeStore((s) => s.setHeading);
  const cache = useQuakeStore((s) => s.shelterCache);
  const origin = regionCenter(regionId);
  const nearest =
    cache?.regionId === regionId && cache.features[0]
      ? cache.features[0]
      : nearestShelters(origin, origin.city, 1)[0];

  useEffect(() => {
    const onOri = (e: DeviceOrientationEvent) => {
      const abs = e as DeviceOrientationEvent & { webkitCompassHeading?: number };
      const h = abs.webkitCompassHeading ?? e.alpha;
      if (h == null) return;
      setHeading((360 - h + 360) % 360);
    };
    window.addEventListener("deviceorientation", onOri);
    return () => window.removeEventListener("deviceorientation", onOri);
  }, [setHeading]);

  if (!nearest) return null;
  const bearing = bearingTo(origin, nearest);
  const relative = (bearing - (heading ?? 0) + 360) % 360;
  const label = heading == null ? "시연은 북을 위" : "손목 나침반";

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs tracking-[0.16em] text-muted">WALK TO OPEN GROUND</p>
      <svg
        viewBox="0 0 200 220"
        className={cn("mt-2 w-full", hero ? "max-w-[22rem]" : "max-w-[18rem]")}
        role="img"
        aria-label={`${nearest.name} 방향`}
      >
        <g transform={`rotate(${relative} 100 100)`}>
          <polygon points="100,8 128,86 100,70 72,86" fill="#c45c4a" />
          <rect x="94" y="70" width="12" height="86" fill="#edece8" />
        </g>
        <circle cx="100" cy="100" r="5" fill="#edece8" />
        <text x="100" y="196" textAnchor="middle" fill="#8b8a86" fontSize="13">
          {nearest.name}
        </text>
        <text x="100" y="214" textAnchor="middle" fill="#c5cbd3" fontSize="11">
          {cardinal(bearing)} · {nearest.walkMin}분 · {label}
        </text>
      </svg>
      <p className="mt-1 max-w-xs text-center text-xs text-muted">
        파동이 오는 쪽이 아닙니다. 가장 가까운 옥외 공터입니다. 지도 타일은 쓰지 않습니다.
      </p>
    </div>
  );
}
