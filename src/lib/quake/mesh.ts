export type MeshRole = "me" | "peer" | "gateway";

export interface MeshNode {
  id: string;
  label: string;
  hop: number;
  rssi: number;
  role: MeshRole;
}

export interface MeshState {
  broadcasting: boolean;
  kind: "idle" | "shake" | "sos";
  nodes: MeshNode[];
  hopsDone: number;
  lastPacket: string | null;
  delivered: boolean;
}

export const IDLE_MESH: MeshState = {
  broadcasting: false,
  kind: "idle",
  nodes: [],
  hopsDone: 0,
  lastPacket: null,
  delivered: false,
};

export function seedMesh(city: string, kind: "shake" | "sos"): MeshState {
  return {
    broadcasting: true,
    kind,
    hopsDone: 0,
    delivered: false,
    lastPacket:
      kind === "sos"
        ? `SOS · ${city} · 좌표 없음`
        : `SHAKE · ${city} · 트리거 시각만`,
    nodes: [
      { id: "me", label: "내 워치", hop: 0, rssi: 0, role: "me" },
      { id: "p1", label: "근처 워치 18m", hop: 1, rssi: -57, role: "peer" },
      { id: "p2", label: "카페 폰 40m", hop: 1, rssi: -71, role: "peer" },
      { id: "gw", label: "외곽 게이트웨이", hop: 2, rssi: -84, role: "gateway" },
    ],
  };
}
