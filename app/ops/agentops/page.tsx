"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Stat, Badge, Spark, Bars, Trace } from "@/components/ui";
import { opsRole, opsNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function AgentOps() {
  const t = useT();
  const runs = [["09-05 14:02", "tutor", "Amara", "route→ground→recall→answer", 1.8, "sourced"], ["09-05 14:01", "coach", "Chidi", "asr→gop→verify→human", 2.4, "handoff"], ["09-05 13:58", "exam", "Class A", "assemble→grade→verify→write", 6.1, "written"], ["09-05 13:55", "tutor", "Fatima", "route→ground→abstain", 0.9, "abstain"], ["09-05 13:52", "homeroom", "Wang", "ground→recall→draft", 3.2, "draft"]];
  return (
    <Shell role={opsRole} nav={opsNav} title="AgentOps" sub={t3("Harness 评估监控层：单次运行轨迹、有出处率、幻觉率、护栏命中、转人工率、Token 成本", "Harness evaluation layer: run traces, sourced rate, hallucination rate, guardrail hits, hand-off rate, token cost", "Tabaka la tathmini: nyayo za utekelezaji, kiwango cha vyanzo, makosa, gharama")} net={3}>
      <div className="grid c4">
        <Panel className="in in-1"><Stat value={100} suffix="%" label={t3("有出处率（答疑）", "sourced rate (Q&A)", "kiwango cha vyanzo")} /></Panel>
        <Panel className="in in-2"><Stat value={2.1} suffix="%" label={t3("错误率 · 抽样 200 · 全部被弃权或转人工捕获", "error rate · 200 sampled · all caught by abstain/hand-off", "kiwango cha makosa · 200")} up={false} delta="−0.6" /></Panel>
        <Panel className="in in-3"><Stat value={6.8} suffix="%" label={t3("转人工率", "hand-off rate", "kiwango cha kukabidhi")} /></Panel>
        <Panel className="in in-4"><Stat value={41} label={t3("护栏命中 · 本周（越权 / 超纲 / 记忆写入校验）", "guardrail hits this week (scope / off-syllabus / memory write checks)", "vizuizi vilivyogonga wiki hii")} /></Panel>
        <Panel className="span3 in in-2" lift={false}><Head title={t3("最近运行轨迹（无 PII，只存安全元数据）", "Recent run traces (no PII, safe metadata only)", "Nyayo za hivi karibuni (hakuna PII)")} />
          <div className="tbl"><table><thead><tr><th>{t(t3("时间", "Time", "Muda"))}</th><th>Agent</th><th>{t(t3("对象", "Subject", "Mhusika"))}</th><th>{t(t3("步骤", "Steps", "Hatua"))}</th><th>s</th><th>{t(t3("结果", "Outcome", "Matokeo"))}</th></tr></thead><tbody>{runs.map((r) => <tr key={r[0] as string}><td className="mono small">{r[0]}</td><td><Badge tone="acc">{r[1]}</Badge></td><td className="small">{r[2]}</td><td><Trace steps={(r[3] as string).split("→").map((s) => [s === "human" || s === "abstain" ? "human" : s === "verify" || s === "gop" ? "verify" : s === "recall" ? "recall" : s === "ground" ? "ground" : "route", s])} /></td><td className="num small">{r[4]}</td><td><Badge tone={r[5] === "sourced" || r[5] === "written" ? "good" : r[5] === "abstain" ? "warn" : ""}>{r[5]}</Badge></td></tr>)}</tbody></table></div>
        </Panel>
        <Panel className="in in-3"><Head title={t3("Model Gateway 选路", "Model Gateway routing", "Uelekezaji wa lango")} /><Bars data={[58, 22, 12, 8]} labels={["Qwen", "Claude", "Open", "Local"]} color="var(--violet)" h={100} /><div className="small mute" style={{ marginTop: 8 }}>{t(t3("按成本 / 延迟 / 合规选路；PII 去标识 → 新加坡驻留 → 故障转移 → 计量链不绕过", "Routed by cost / latency / compliance; PII de-identification → Singapore residency → failover → metering chain never bypassed", "Uelekezaji kwa gharama / kuchelewa / uzingatiaji"))}</div></Panel>
        <Panel className="span2 in in-4"><Head title={t3("评估集 · 每次发布", "Evaluation set · every release", "Seti ya tathmini · kila toleo")} /><div className="grid c3">{[[t3("有出处率", "Sourced", "Vyanzo"), [100, 100, 100, 100, 100, 100], "var(--good)"], [t3("错误率", "Error", "Makosa"), [4.1, 3.6, 3.0, 2.7, 2.4, 2.1], "var(--bad)"], [t3("转人工率", "Hand-off", "Kukabidhi"), [11, 9.5, 8.8, 7.9, 7.1, 6.8], "var(--warn)"]].map(([n, d, c]) => <div key={t(n as never)}><div className="small mute">{t(n as never)}</div><Spark data={d as number[]} color={c as string} h={50} /><div className="small"><b>{(d as number[]).at(-1)}%</b> · 200 {t(t3("题", "items", "maswali"))}</div></div>)}</div><div className="small mute" style={{ marginTop: 8 }}>{t(t3("三项不退步才允许发布；老师裁定自动回流为新样本。", "A release ships only if none of the three regresses; teacher decisions flow back as new samples.", "Toleo hutolewa tu ikiwa hakuna kinachorudi nyuma."))}</div></Panel>
        <Panel className="span2 in in-5"><Head title={t3("Token 与成本 · 按 Agent", "Tokens & cost by agent", "Tokeni na gharama kwa wakala")} /><ul className="list small">{[["tutor", 48, 41], ["coach", 12, 22], ["review", 6, 3], ["talk", 18, 19], ["exam", 9, 8], ["homeroom", 7, 7]].map(([a, tok, cost]) => <li key={a as string}><Badge tone="acc">{a}</Badge><div className="t"><span>{tok as number}% {t(t3("token", "tokens", "tokeni"))} · {cost as number}% {t(t3("成本", "cost", "gharama"))}</span></div><span className="mono small mute">{a === "coach" ? "ASR/TTS" : "LLM"}</span></li>)}</ul></Panel>
      </div>
    </Shell>
  );
}
