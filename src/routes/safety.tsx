import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { SAFETY, SAFETY_LINKS } from "@/lib/quake/safety";
import { useQuakeStore } from "@/stores/quake-store";

export const Route = createFileRoute("/safety")({ component: SafetyPage });

function SafetyPage() {
  const openDrill = useQuakeStore((s) => s.openDrill);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs tracking-[0.18em] text-muted">PREPARE · SURVIVE · RECOVER</p>
        <h1 className="mt-1 font-display text-3xl font-semibold">안전</h1>
        <p className="mt-2 text-sm text-muted">
          낮추고 머리를 가린 다음, 한국 요령대로 공터로 걷습니다. 차량은 없습니다.
        </p>
      </div>
      <Button variant="secondary" onClick={openDrill}>
        훈련 경보음 · Drop Cover Hold On
      </Button>
      {Object.values(SAFETY).map((s) => (
        <Card key={s.title}>
          <CardTitle>{s.title}</CardTitle>
          <ol className="mt-3 space-y-1.5 text-sm text-muted">
            {s.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </Card>
      ))}
      <ul className="space-y-2 text-sm">
        {SAFETY_LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="text-steel underline-offset-2 hover:underline" target="_blank" rel="noreferrer">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
