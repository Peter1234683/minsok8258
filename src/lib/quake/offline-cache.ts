import { nearestShelters, regionCenter } from "./shelters.ts";
import type { TravelRegionId } from "./types.ts";

export interface CachedShelter {
  id: string;
  name: string;
  kind: string;
  lat: number;
  lng: number;
  walkMin: number;
}

export interface ShelterCache {
  regionId: TravelRegionId;
  city: string;
  at: number;
  bytes: number;
  count: number;
  features: CachedShelter[];
}

export function packShelters(regionId: TravelRegionId, at = Date.now()): ShelterCache {
  const origin = regionCenter(regionId);
  const list = nearestShelters(origin, origin.city, 12);
  const features: CachedShelter[] = list.map((s) => ({
    id: s.id,
    name: s.name,
    kind: s.kind,
    lat: +s.lat.toFixed(5),
    lng: +s.lng.toFixed(5),
    walkMin: s.walkMin,
  }));
  const geojson = {
    type: "FeatureCollection",
    features: features.map((s) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [s.lng, s.lat] },
      properties: { id: s.id, name: s.name, kind: s.kind, walkMin: s.walkMin },
    })),
  };
  const bytes = new TextEncoder().encode(JSON.stringify(geojson)).length;
  return {
    regionId,
    city: origin.city,
    at,
    bytes,
    count: features.length,
    features,
  };
}

export function cacheKb(cache: ShelterCache | null) {
  if (!cache) return 0;
  return Math.max(1, Math.round((cache.bytes / 1024) * 10) / 10);
}
