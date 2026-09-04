"use client";
import { useState } from "react";
import Shell from "@/components/Shell";
import { Panel, Head, Badge } from "@/components/ui";
import { teacherRole, teacherNav } from "@/lib/roles";
import { useT, t3, UI } from "@/lib/i18n";
import { proposals, agents } from "@/lib/data";

export default function Proposals() {
  const t = useT();
  const [state, setState] = useState<Record<string, string>>({});
  return (
    <Shell role={teacherRole} nav={teacherNav} title={t3("AI 提议收件箱", "AI proposal inbox", "Kikasha cha mapendekezo ya AI")} sub={t3("Agent 只能提议，不能执行；你批准后系统才写，并留哈希链", "Agents can only propose; the system writes only after your approval, with a hash chain", "Mawakala hupendekeza tu; mfumo huandika baada ya idhini yako")} net={3}>
      <div className="grid c3">
        <div className="span2 grid">
          {proposals.map((p, i) => {
            const st = state[p.id] ?? p.status; const a = agents.find((x) => x.id === p.agent)!;
            return (
              <Panel key={p.id} className={`in in-${i + 1}`} lift={false} style={{ opacity: st === "rejected" ? .5 : 1 }}>
                <div className="between"><div className="row"><span className="avatar" style={{ background: a.color, width: 34, height: 34, fontSize: 11 }}>{t(a.name).slice(0, 1)}</span><div><b>{t(a.name)}</b><div className="dim small">{t(t3("为", "for", "kwa"))} {typeof p.from === "string" ? p.from : t(p.from)}</div></div></div><Badge tone={st === "approved" ? "good" : st === "rejected" ? "bad" : "warn"}>{st === "approved" ? t(t3("已批准 · 已执行", "Approved · executed", "Imekubaliwa · imetekelezwa")) : st === "rejected" ? t(t3("已婉拒", "Declined", "Imekataliwa")) : t(t3("待审批", "Pending", "Inasubiri"))}</Badge></div>
                <h3 style={{ marginTop: 14, fontSize: 18 }}>{t(p.what)}</h3>
                <p className="mute small" style={{ marginTop: 6 }}>{t(t3("依据：", "Evidence: ", "Ushahidi: "))}{t(p.why)}</p>
                {st === "pending" && <div className="row" style={{ marginTop: 14 }}><button className="btn btn--good" onClick={() => setState({ ...state, [p.id]: "approved" })}>✓ {t(UI.approve)} · {t(t3("生成", "generate", "unda"))}</button><button className="btn btn--bad" onClick={() => setState({ ...state, [p.id]: "rejected" })}>{t(UI.reject)}</button><button className="btn btn--ghost">{t(t3("修改后批准", "Edit then approve", "Hariri kisha ukubali"))}</button></div>}
                {st === "approved" && <div className="small mono dim" style={{ marginTop: 12 }}>decision_hash sha256(prev‖id‖approved) = 8c1f…a9e3 · {t(t3("执行：quizassembly 生成 10 题 → 班级练习", "executed: quizassembly generated 10 items → class practice", "imetekelezwa: maswali 10 yameundwa"))}</div>}
              </Panel>
            );
          })}
        </div>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2" gold><Head title={t3("为什么要审批", "Why approval", "Kwa nini idhini")} /><p className="small mute">{t(t3("写动作（安排练习、调整进度、发证书）一律 propose → approve → execute。Agent 永远没有写权限；每个决定盖防篡改哈希，可审计。", "Every write action (assigning drills, changing pace, issuing certificates) goes propose → approve → execute. Agents never hold write permission; every decision is hashed and auditable.", "Kila kitendo cha kuandika huenda pendekeza → kubali → tekeleza. Mawakala hawana ruhusa ya kuandika."))}</p></Panel>
          <Panel className="in in-3"><Head title={t3("本月", "This month", "Mwezi huu")} /><dl className="kv"><dt>{t(t3("提议", "Proposals", "Mapendekezo"))}</dt><dd>38</dd><dt>{t(t3("批准率", "Approval rate", "Kiwango cha kukubali"))}</dt><dd>84%</dd><dt>{t(t3("修改后批准", "Edited then approved", "Yamehaririwa"))}</dt><dd>9</dd><dt>{t(t3("平均处理", "Median handling", "Wastani wa kushughulikia"))}</dt><dd>14 s</dd></dl></Panel>
        </div>
      </div>
    </Shell>
  );
}
