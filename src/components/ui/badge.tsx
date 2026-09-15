import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  className,
  tone = "muted",
  children,
}: {
  className?: string;
  tone?: "muted" | "steel" | "danger" | "warn" | "ok" | "construction" | "body";
  children: ReactNode;
}) {
  const tones: Record<string, string> = {
    muted: "bg-bg-subtle text-muted border-border",
    steel: "bg-steel/15 text-steel border-steel/25",
    danger: "bg-danger/15 text-danger border-danger/30",
    warn: "bg-warn/15 text-warn border-warn/30",
    ok: "bg-ok/15 text-ok border-ok/30",
    construction: "bg-construction/15 text-construction border-construction/30",
    body: "bg-body-move/15 text-body-move border-body-move/30",
  };
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-tight text-pretty",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
