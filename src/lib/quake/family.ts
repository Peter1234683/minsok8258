import type { FamilyMember } from "./types";

export const DEFAULT_FAMILY: FamilyMember[] = [
  {
    id: "me",
    name: "나",
    relation: "본인",
    city: "서울",
    status: "safe",
    lastSeenMin: 0,
  },
  {
    id: "mom",
    name: "엄마",
    relation: "가족",
    city: "서울 마포",
    status: "silent",
    lastSeenMin: 42,
  },
  {
    id: "sib",
    name: "동생",
    relation: "가족",
    city: "오사카",
    status: "safe",
    lastSeenMin: 8,
    traveling: true,
  },
  {
    id: "friend",
    name: "지민",
    relation: "같은 건물",
    city: "서울 중구",
    status: "silent",
    lastSeenMin: 16,
  },
];
