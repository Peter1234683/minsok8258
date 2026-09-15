import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { COMPARE_ROWS, HONEST_CAN, HONEST_CANT } from "@/lib/quake/compare";
import {
  CLASSIFIER_NOTES,
  MYSHAKE_FACTS,
  MYSHAKE_VS_US,
  SURVIVAL_NOTES,
  WAVE_METHODS,
} from "@/lib/quake/science";

export const Route = createFileRoute("/compare")({ component: ComparePage });

const COLS = [
  ["us", "그건지진"],
  ["google", "Google AEA"],
  ["myshake", "MyShake"],
  ["safety", "안전디딤돌"],
  ["trackers", "피드 앱"],
] as const;

function ComparePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs tracking-[0.18em] text-muted">NOT FIRST. SPECIFIC.</p>
        <h1 className="mt-1 font-display text-3xl font-semibold">이미 있는 것, 없는 것</h1>
        <p className="mt-2 text-sm text-muted">
          지진 알림 앱은 많습니다. 그건지진은 기상청을 이기려 하지 않습니다. 손목에서 ‘방금 그거’를
          가릅니다.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-xl">분류가 오탐을 줄이는 법</h2>
        {CLASSIFIER_NOTES.map((n) => (
          <Card key={n.title}>
            <h3 className="font-display text-base">{n.title}</h3>
            <p className="mt-2 text-sm text-muted">{n.body}</p>
          </Card>
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-xl">손목에서 살아남기</h2>
        {SURVIVAL_NOTES.map((n) => (
          <Card key={n.title}>
            <h3 className="font-display text-base">{n.title}</h3>
            <p className="mt-2 text-sm text-muted">{n.body}</p>
          </Card>
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-xl">파면 방향을 구하는 네 가지</h2>
        <p className="text-sm text-muted">
          바늘이 가리키는 것은 진앙 좌표가 아닙니다. 지금 이 지점으로 파동이 들어오는 방위입니다.
        </p>
        {WAVE_METHODS.map((m) => (
          <article key={m.id} className="rounded-xl border border-border bg-bg-elevated p-4">
            <h3 className="font-display text-base font-semibold">{m.title}</h3>
            <p className="mt-1 font-mono text-xs text-steel">{m.formula}</p>
            <p className="mt-2 text-sm text-muted">{m.body}</p>
            <p className="mt-2 text-xs text-subtle">{m.usedBy}</p>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-xl">MyShake를 벤치마크한 이유</h2>
        <p className="text-sm text-muted">
          시민 폰 지진망의 원형입니다. 그걸 베끼지 않고, 한 사람이 방금 느낀 흔들림을 가르는 쪽으로
          갈라집니다.
        </p>
        {MYSHAKE_FACTS.map((f) => (
          <Card key={f.title}>
            <h3 className="font-display text-base">{f.title}</h3>
            <p className="mt-2 text-sm text-muted">{f.body}</p>
          </Card>
        ))}
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-elevated text-muted">
              <tr>
                <th className="px-3 py-2 font-medium">축</th>
                <th className="px-3 py-2 font-medium">MyShake</th>
                <th className="px-3 py-2 font-medium">그건지진</th>
              </tr>
            </thead>
            <tbody>
              {MYSHAKE_VS_US.map((r) => (
                <tr key={r.axis} className="border-t border-border align-top">
                  <th className="px-3 py-2 font-medium">{r.axis}</th>
                  <td className="px-3 py-2 text-muted">{r.myshake}</td>
                  <td className="px-3 py-2 text-steel">{r.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ul className="flex flex-col gap-3">
        {COMPARE_ROWS.map((row) => (
          <li key={row.feature} className="rounded-xl border border-border bg-bg-elevated p-4">
            <h2 className="font-display text-base font-semibold">{row.feature}</h2>
            <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {COLS.map(([key, label]) => (
                <div key={key} className="rounded-md bg-bg px-3 py-2">
                  <dt className="text-[11px] text-muted">{label}</dt>
                  <dd className={key === "us" ? "mt-0.5 text-sm text-steel" : "mt-0.5 text-sm"}>
                    {row[key]}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted">
        피드 앱은 QuakeWatch+, 지진체크, Earthquake HQ처럼 공식 발표 후 지도를 보여주는 부류입니다.
      </p>

      <Card>
        <h2 className="font-display text-lg">하는 일</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          {HONEST_CAN.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Card>
      <Card>
        <h2 className="font-display text-lg">하지 않는 일</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          {HONEST_CANT.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
