"use client";
import dynamic from "next/dynamic";
import Shell from "@/components/Shell";
import { Panel, Head, Stat, Badge, Bar, Spark, Bars } from "@/components/ui";
import { opsRole, opsNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";
import { schoolsData, news } from "@/lib/data";

const Globe3D = dynamic(() => import("@/components/Globe3D"), { ssr: false });

export default function Ops() {
  const t = useT();
  return (
    <Shell role={opsRole} nav={opsNav} title={t3("总览", "Overview", "Muhtasari")} sub={t3("GACEE 租户 · 试点第 3 周 · 新加坡核心 · 阿里云 ACK（可迁移）", "GACEE tenant · pilot week 3 · Singapore core · Alibaba Cloud ACK (portable)", "Mpangaji wa GACEE · wiki ya 3 · Singapore")} net={3}>
      <div className="grid c4">
        <Panel className="in in-1"><Stat value={264} label={t3("活跃学员 · 4 校", "active learners · 4 schools", "wanafunzi hai · shule 4")} delta="+41" /></Panel>
        <Panel className="in in-2"><Stat value={91} suffix="%" label={t3("周活跃率", "weekly active rate", "kiwango cha wiki")} delta="+4%" /></Panel>
        <Panel className="in in-3"><Stat value={0.9} label={t3("每学员每月成本（USD，实测）", "cost per learner per month (USD, measured)", "gharama kwa mwanafunzi kwa mwezi (USD)")} delta="−18%" up /></Panel>
        <Panel className="in in-4"><Stat value={2.1} suffix="%" label={t3("Agent 错误率（抽样 200 条）", "agent error rate (200 sampled)", "kiwango cha makosa ya wakala")} up={false} delta="0 unseen" /></Panel>
        <Panel className="span2 in in-2" lift={false} style={{ padding: 8, background: "#070b18" }}><div className="between" style={{ padding: "10px 12px 0" }}><b>{t(t3("三段网络路径 · 实时", "Three network segments · live", "Sehemu tatu za mtandao · moja kwa moja"))}</b><span className="small dim">{t(t3("金：核心 · 蓝：老师 · 绿：学员", "gold: core · blue: teachers · green: learners", "dhahabu: kiini · bluu: walimu · kijani: wanafunzi"))}</span></div><Globe3D height={330} /></Panel>
        <Panel className="span2 in in-3"><Head title={t3("学校与租户", "Schools & tenants", "Shule na wapangaji")} more={t3("管理", "Manage", "Dhibiti")} />
          <div className="tbl"><table><thead><tr><th>{t(t3("学校", "School", "Shule"))}</th><th>{t(t3("学员", "Learners", "Wanafunzi"))}</th><th>{t(t3("同意书", "Consent", "Idhini"))}</th><th>{t(t3("网络", "Net", "Mtandao"))}</th><th>{t(t3("状态", "Status", "Hali"))}</th></tr></thead><tbody>{schoolsData.map((s) => <tr key={s.name}><td><b>{s.name}</b><div className="dim small">{s.city}</div></td><td className="num">{s.learners}</td><td><Bar v={s.consent} tone={s.consent >= .98 ? "good" : "warn"} /></td><td className="small">{s.net}</td><td><Badge tone={s.status === "active" ? "good" : s.status === "pilot" ? "warn" : ""}>{s.status}</Badge></td></tr>)}</tbody></table></div>
        </Panel>
        <Panel className="in in-4"><Head title={t3("成本结构 · 本月", "Cost mix · this month", "Gharama · mwezi huu")} /><Bars data={[38, 22, 17, 12, 11]} labels={["LLM", "CDN", "RTC", "STT/TTS", "Store"]} color="var(--gold)" h={110} /><div className="small mute" style={{ marginTop: 8 }}>{t(t3("USD 238 · 租户预算 400 · Gateway 按成本选路节省 21%", "USD 238 · tenant budget 400 · gateway cost-routing saved 21%", "USD 238 · bajeti 400 · lango limeokoa 21%"))}</div></Panel>
        <Panel className="in in-5"><Head title={t3("老师杠杆", "Teacher leverage", "Faida ya mwalimu")} /><Spark data={[1.0, 1.3, 1.6, 1.9, 2.4, 2.7, 3.1, 3.4]} color="var(--good)" h={60} /><div className="small mute" style={{ marginTop: 6 }}>{t(t3("每老师课时服务学员数 ×3.4（试点前 1.0）", "learners served per teacher hour ×3.4 (1.0 before pilot)", "wanafunzi kwa saa ya mwalimu ×3.4"))}</div></Panel>
        <Panel className="in in-6"><Head title={t3("转人工与弃权", "Hand-offs & abstentions", "Kukabidhi na kujizuia")} /><dl className="kv"><dt>{t(t3("答疑转老师", "Q&A to teacher", "Maswali kwa mwalimu"))}</dt><dd>6.8%</dd><dt>{t(t3("批改分歧", "Grading disagreement", "Kutokubaliana"))}</dt><dd>3.1%</dd><dt>{t(t3("主观题", "Subjective", "Maoni"))}</dt><dd>100% → {t(t3("老师", "teacher", "mwalimu"))}</dd><dt>{t(t3("有出处率", "Sourced answers", "Majibu yenye vyanzo"))}</dt><dd>100%</dd></dl></Panel>
        <Panel className="in in-6"><Head title={t3("动态", "Updates", "Taarifa")} /><ul className="list small">{news.map((n) => <li key={n.d}><span className="mono dim">{n.d}</span><div className="t"><span>{t(n.t)}</span></div></li>)}</ul></Panel>
      </div>
    </Shell>
  );
}
