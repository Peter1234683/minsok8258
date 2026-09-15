export const FELT_LEVELS = [
  { id: 1, label: "안 느낌", hint: "움직임만 의심" },
  { id: 2, label: "약함", hint: "선반이 살짝" },
  { id: 3, label: "가벼움", hint: "걸어 둔 물건이 흔들림" },
  { id: 4, label: "중간", hint: "서 있기 불안" },
  { id: 5, label: "강함", hint: "서기 어렵고 물건이 떨어짐" },
] as const;

export const DAMAGE_LEVELS = [
  { id: "none", label: "피해 없음" },
  { id: "objects", label: "물건이 떨어짐" },
  { id: "cracks", label: "벽에 금" },
  { id: "infra", label: "도로·교량" },
  { id: "collapse", label: "붕괴 위험" },
] as const;

export type FeltLevel = (typeof FELT_LEVELS)[number]["id"];
export type DamageId = (typeof DAMAGE_LEVELS)[number]["id"];

export interface FeltReport {
  id: string;
  eventId: string;
  intensity: FeltLevel;
  damage: DamageId;
  at: number;
  mine?: boolean;
}

export function seedFelt(eventId: string, mag: number, count: number): FeltReport[] {
  const n = Math.max(4, count);
  const rows: FeltReport[] = [];
  const base = mag >= 6 ? 4 : mag >= 5 ? 3 : mag >= 4 ? 2 : 1;
  for (let i = 0; i < n; i++) {
    const jitter = ((i * 37) % 5) - 2;
    const intensity = Math.min(5, Math.max(1, base + jitter)) as FeltLevel;
    const damage: DamageId =
      intensity >= 5 ? (i % 3 === 0 ? "cracks" : "objects") : intensity >= 4 ? "objects" : "none";
    rows.push({
      id: `${eventId}-f${i}`,
      eventId,
      intensity,
      damage,
      at: Date.now() - i * 42000,
    });
  }
  return rows;
}

export function feltHistogram(rows: FeltReport[]) {
  const bins = [0, 0, 0, 0, 0];
  for (const r of rows) bins[r.intensity - 1] += 1;
  return bins;
}
