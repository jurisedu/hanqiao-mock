"use client";
import { use } from "react";
import dynamic from "next/dynamic";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar, Bars, Stat } from "@/components/ui";
import { teacherRole, teacherNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";
import { classes, kps } from "@/lib/data";

const Constellation3D = dynamic(() => import("@/components/Constellation3D"), { ssr: false });

export default function ClassPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); const t = useT();
  const c = classes.find((x) => x.id === id) ?? classes[0];
  const learners = [["Amara Okafor", 0.93, 0.86, "第三声"], ["Chidi Nwosu", 0.82, 0.7, "第三声 · j q x"], ["Fatima Bello", 0.96, 0.95, "—"], ["Tunde Adeyemi", 0.88, 0.8, "量词"], ["Kemi Olawale", 0.71, 0.55, "吗 问句 · 数字"], ["Emeka Obi", 0.9, 0.9, "—"]];
  return (
    <Shell role={teacherRole} nav={teacherNav} title={c.name} sub={t3(`${c.school} · ${c.city} · ${c.n} 人 · 下次直播 ${t(c.next)}`, `${c.school} · ${c.city} · ${c.n} learners · next live ${t(c.next)}`, `${c.school} · ${c.city} · wanafunzi ${c.n}`)} net={3}>
      <div className="grid c4">
        <Panel className="in in-1"><Stat value={Math.round(c.attendance * 100)} suffix="%" label={t3("出勤（含回放）", "attendance incl. replay", "mahudhurio pamoja na rekodi")} delta="+3%" /></Panel>
        <Panel className="in in-2"><Stat value={Math.round(c.homework * 100)} suffix="%" label={t3("作业提交", "homework submitted", "kazi zilizowasilishwa")} /></Panel>
        <Panel className="in in-3"><Stat value={c.weak} label={t3("需关注学员", "learners needing attention", "wanafunzi wanaohitaji umakini")} up={false} delta="−2" /></Panel>
        <Panel className="in in-4"><Stat value={64} suffix="%" label={t3("离线完成的练习占比", "practice completed offline", "mazoezi yaliyokamilika nje ya mtandao")} /></Panel>
        <Panel className="span2 in in-2" lift={false} style={{ padding: 8, background: "#070b18" }}><div style={{ padding: "10px 12px 0" }} className="between"><b>{t(t3("班级知识星图 · 聚合", "Class knowledge map · aggregated", "Ramani ya darasa · jumla"))}</b><span className="small dim">{t(t3("隐去个人错题，仅显示掌握度分布", "Individual errors hidden; mastery distribution only", "Makosa ya mtu binafsi yamefichwa"))}</span></div><Constellation3D height={340} /></Panel>
        <Panel className="span2 in in-3"><Head title={t3("班级薄弱点 · 校准", "Class weak points · calibrated", "Sehemu dhaifu za darasa")} />
          <ul className="list">{kps.filter((k) => k.status !== "untested").slice(0, 6).map((k) => <li key={k.id}><div className="t"><b style={{ fontFamily: "var(--serif)" }}>{k.han} <span className="mute" style={{ fontWeight: 400 }}>{k.pinyin}</span></b><Bar v={k.mastery} tone={k.status === "weak" ? "bad" : k.status === "mastered" ? "good" : "warn"} /></div><span className="small mute">{Math.round(k.mastery * 100)}% · {Math.round(c.n * (k.status === "weak" ? .4 : .15))} {t(t3("人薄弱", "weak", "dhaifu"))}</span></li>)}</ul>
          <div className="row" style={{ marginTop: 10 }}><button className="btn btn--sm btn--primary">{t(t3("让评测智能体 组一份「第三声」小测", "Ask the Assessment Agent to build a tone-3 quiz", "Omba Wakala wa Tathmini aunde jaribio la toni ya 3"))}</button><span className="dim small">→ {t(t3("进入提议审批", "goes to proposal approval", "huenda kwenye idhini"))}</span></div>
        </Panel>
        <Panel className="span3 in in-4"><Head title={t3("学员", "Learners", "Wanafunzi")} />
          <div className="tbl"><table><thead><tr><th>{t(t3("姓名", "Name", "Jina"))}</th><th>{t(t3("出勤", "Attendance", "Mahudhurio"))}</th><th>{t(t3("作业", "Homework", "Kazi"))}</th><th>{t(t3("薄弱点", "Weak points", "Sehemu dhaifu"))}</th><th>{t(t3("预警", "Alert", "Tahadhari"))}</th></tr></thead><tbody>{learners.map(([n, a, h, w]) => <tr key={n as string}><td><b>{n}</b></td><td><Bar v={a as number} tone="good" /></td><td><Bar v={h as number} /></td><td className="small">{w}</td><td>{(a as number) < .75 ? <Badge tone="warn">{t(t3("连续缺席 2 次", "2 consecutive absences", "kutokuwepo mara 2"))}</Badge> : (h as number) < .6 ? <Badge tone="warn">{t(t3("作业滞后", "Homework behind", "Kazi imechelewa"))}</Badge> : <span className="dim">—</span>}</td></tr>)}</tbody></table></div>
        </Panel>
        <Panel className="in in-5"><Head title={t3("出勤 · 6 周", "Attendance · 6 weeks", "Mahudhurio · wiki 6")} /><Bars data={[88, 90, 85, 93, 91, 93]} labels={["W1", "W2", "W3", "W4", "W5", "W6"]} color="var(--good)" h={100} /><div className="small mute" style={{ marginTop: 8 }}>{t(t3("W3 停电周：回放补齐 12 人", "W3 power cuts: 12 caught up via replay", "W3 kukatika kwa umeme: 12 walifidia kwa rekodi"))}</div></Panel>
      </div>
    </Shell>
  );
}
