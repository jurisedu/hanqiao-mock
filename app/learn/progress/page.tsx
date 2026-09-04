"use client";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar, Spark } from "@/components/ui";
import { learnerRole, learnerNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";
import { kps, statusColor, statusLabel } from "@/lib/data";

const Constellation3D = dynamic(() => import("@/components/Constellation3D"), { ssr: false });

export default function Progress() {
  const t = useT();
  const [sel, setSel] = useState<string | null>("k4");
  const onPick = useCallback((id: string | null) => { if (id) setSel(id); }, []);
  const k = kps.find((x) => x.id === sel) ?? kps[3];
  return (
    <Shell role={learnerRole} nav={learnerNav} title={t3("知识星图", "Knowledge map", "Ramani ya maarifa")} sub={t3("TIDAR KAG · 时序 · 可溯源 · 可校准 · 拖动旋转，滚轮缩放，点击节点", "TIDAR KAG · temporal · provenance · calibrated · drag to rotate, wheel to zoom, click a node", "TIDAR KAG · muda · chanzo · imesahihishwa · buruta kuzungusha, gusa nodi")} net={3}>
      <div className="grid c3">
        <Panel className="span2 in" lift={false} style={{ padding: 8, background: "#070b18" }}>
          <Constellation3D height={480} onPick={onPick} />
          <div className="row" style={{ padding: "8px 12px 6px", gap: 14 }}>{Object.keys(statusColor).map((s) => <span key={s} className="small" style={{ color: "#e9edf8" }}><span className="tone" style={{ background: statusColor[s], marginRight: 6 }} />{t(statusLabel[s])}</span>)}</div>
        </Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2" glow>
            <div className="between"><div><div className="eyebrow">{k.group}</div><h3 style={{ fontFamily: "var(--serif)", fontSize: 28, marginTop: 4 }}>{k.han}</h3><div className="mute">{k.pinyin} · {k.en}</div></div><Badge tone={k.status === "mastered" ? "good" : k.status === "weak" ? "bad" : k.status === "developing" ? "warn" : ""}>{t(statusLabel[k.status])}</Badge></div>
            <div style={{ marginTop: 14 }} className="small"><div className="between"><span>{t(t3("校准掌握度（置信下界）", "Calibrated mastery (lower bound)", "Umahiri uliosahihishwa (kikomo cha chini)"))}</span><b>{k.n >= 3 ? `${Math.round(k.mastery * 100)}%` : "—"}</b></div><Bar v={k.n >= 3 ? k.mastery : 0} tone={k.status === "weak" ? "bad" : k.status === "mastered" ? "good" : "warn"} /><div className="mute" style={{ marginTop: 6 }}>{k.n} {t(t3("次作答", "attempts", "majaribio"))} · {k.n < 3 ? t(t3("少于 3 题，不下结论", "fewer than 3, no verdict", "chini ya 3, hakuna hukumu")) : t(t3("Wilson 区间下界", "Wilson interval lower bound", "kikomo cha chini cha Wilson"))}</div></div>
            <div style={{ marginTop: 14 }}><div className="eyebrow" style={{ marginBottom: 6 }}>{t(t3("证据", "Evidence", "Ushahidi"))}</div><ul className="list small">{k.status === "weak" ? [["09-04", "hěn → hén", "✗"], ["09-02", "hǎo → hǎo", "✓"], ["08-30", "wǒ → wó", "✗"]].map(([d, e, r]) => <li key={d}><div className="t"><b>{e}</b><span>{d} · {t(t3("发音练习", "pronunciation drill", "mazoezi ya matamshi"))}</span></div><span style={{ color: r === "✓" ? "var(--good)" : "var(--bad)" }}>{r}</span></li>) : <li><div className="t"><span>{t(t3("最近作答来自 Unit 5 测验与自查", "Latest attempts from the Unit 5 quiz and self-check", "Majaribio ya hivi karibuni kutoka jaribio la Unit 5"))}</span></div></li>}</ul></div>
            <div style={{ marginTop: 12 }} className="row"><button className="btn btn--primary btn--sm">{t(t3("请老师安排练习", "Ask teacher for drills", "Omba mwalimu mazoezi"))}</button><span className="dim small">{t(t3("→ 进入老师的 AI 提议收件箱", "→ goes to the teacher's AI proposal inbox", "→ huenda kwenye kikasha cha mapendekezo cha mwalimu"))}</span></div>
          </Panel>
          <Panel className="in in-3"><Head title={t3("时序对比 · 08-01 → 09-05", "Change over time · 08-01 → 09-05", "Mabadiliko · 08-01 → 09-05")} /><ul className="list small">{[["你好", "+18", "up"], ["量词 个", "+12", "up"], ["第三声", "−6", "down"], ["吗 问句", t3("新评估", "new", "mpya"), ""]].map(([h, d, c]) => <li key={h as string}><div className="t"><b style={{ fontFamily: "var(--serif)" }}>{h as string}</b></div><span className={c as string} style={{ fontWeight: 700 }}>{typeof d === "string" ? d : t(d)}</span></li>)}</ul><Spark data={[40, 44, 48, 47, 55, 58, 62, 66]} color="var(--accent)" h={50} /></Panel>
        </div>
      </div>
    </Shell>
  );
}
