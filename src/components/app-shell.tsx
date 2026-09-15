import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { EventOverlay } from "@/components/event-overlay";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/quake/copy";
import { useQuakeStore } from "@/stores/quake-store";
import { Compass, Globe, MapPinned, Settings2, Users } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV = [
  { to: "/", label: "감지", icon: Compass },
  { to: "/map", label: "지도", icon: Globe },
  { to: "/evacuate", label: "대피", icon: MapPinned },
  { to: "/family", label: "가족", icon: Users },
  { to: "/settings", label: "설정", icon: Settings2 },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const phase = useQuakeStore((s) => s.phase);
  const strength = useQuakeStore((s) => s.strength);
  const reset = useQuakeStore((s) => s.reset);
  const regionId = useQuakeStore((s) => s.regionId);
  const drillOpen = useQuakeStore((s) => s.drillOpen);
  const closeDrill = useQuakeStore((s) => s.closeDrill);

  useEffect(() => {
    void useQuakeStore.persist.rehydrate();
  }, []);

  function navOn(to: string) {
    if (to === "/") return pathname === "/";
    if (to === "/map") return pathname === "/map" || pathname.startsWith("/quake/");
    if (to === "/settings")
      return pathname === "/settings" || pathname === "/safety" || pathname === "/log" || pathname === "/compare";
    return pathname === to;
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col overflow-x-hidden bg-bg">
      <header className="flex items-end justify-between gap-4 px-5 pb-4 pt-[max(0.9rem,env(safe-area-inset-top))]">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight">{APP_NAME}</p>
          <p className="text-sm text-muted">방금 그거, 지진이야</p>
        </div>
        <p className="pb-1 text-xs text-subtle">
          {regionId === "kr" ? "손목 판별 · 한국" : "여행 모드"}
        </p>
      </header>
      {phase === "confirmed" && strength === "weak" ? (
        <button
          type="button"
          onClick={reset}
          className="mx-4 mb-3 rounded-md border border-warn/30 bg-warn/10 px-3 py-2 text-left text-sm text-warn"
        >
          지진 맞음 · 약진 · 사이렌 없음. 탭하면 닫힘.
        </button>
      ) : null}
      <main className="min-w-0 flex-1 px-4 pb-28">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur-sm">
        <ul className="mx-auto grid max-w-5xl grid-cols-5">
          {NAV.map((item) => {
            const on = navOn(item.to);
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px]",
                    on ? "text-steel" : "text-muted",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {phase === "action" ? <EventOverlay /> : null}
      {drillOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 px-6">
          <div className="max-w-sm text-center">
            <p className="text-xs tracking-[0.2em] text-warn">DRILL</p>
            <h1 className="mt-2 font-display text-3xl">훈련입니다</h1>
            <p className="mt-3 text-sm text-muted">낮추고, 머리와 목을 가리세요. 실제 지진이 아닙니다.</p>
            <Button className="mt-6" variant="secondary" onClick={closeDrill}>
              닫기
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
