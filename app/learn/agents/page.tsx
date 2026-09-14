"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Tilt } from "@/components/ui";
import { learnerRole, learnerNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";
import { agents } from "@/lib/data";

export default function Agents() {
  const t = useT();
  return (
    <Shell role={learnerRole} nav={learnerNav} title={t3("我的智能体", "My agents", "Mawakala wangu")} sub={t3("学习端智能体 · 同属 JE 混合编排智能体阵列；「发音正音」「考试评测」与老师备课端复用同一智能体", "Learner-side agents · part of the JE agent array; Pronunciation & Assessment are the very same agents the teacher's Lesson Studio uses", "Mawakala wa mwanafunzi · sehemu ya mkusanyiko wa JE")} net={3}>
      <div className="grid c3">
        {agents.map((a, i) => (
          <Tilt key={a.id} max={6}><Panel className={`in in-${i + 1}`} style={{ minHeight: 230 }}>
            <div className="between"><span className="avatar" style={{ background: a.color, width: 40, height: 40 }}>{t(a.name).slice(0, 1)}</span><div className="row" style={{ gap: 6 }}>{a.shared && <Badge tone="acc">{t(t3("复用 · 老师端", "Shared · teacher", "Inatumika pia"))}</Badge>}<Badge tone="good" live>{t(t3("在线", "Active", "Inafanya kazi"))}</Badge></div></div>
            <h3 style={{ marginTop: 14 }}><span className="expert__code">{a.code}</span>{t(a.name)}</h3>
            <p className="mute small" style={{ marginTop: 6 }}>{t(a.desc)}</p>
            <div className="chips" style={{ marginTop: 12 }}>{t(a.style).split(" · ").map((s) => <span key={s} className="chip">{s}</span>)}</div>
            <div className="row" style={{ marginTop: 14 }}><button className="btn btn--sm">{t(t3("定制", "Customise", "Badilisha"))}</button><button className="btn btn--sm btn--ghost">{t(t3("查看记忆", "View memory", "Angalia kumbukumbu"))}</button></div>
          </Panel></Tilt>
        ))}
        <Panel className="in in-6" gold>
          <Head title={t3("记忆分层", "Memory layers", "Tabaka za kumbukumbu")} />
          <dl className="kv">
            <dt>{t(t3("档案", "Profile", "Wasifu"))}</dt><dd>HSK 1 → {t(t3("12 月前考试", "exam by December", "mtihani kabla ya Desemba"))} · Kiswahili/English · WAT · 2 GB Android · {t(t3("温和纠错", "gentle corrections", "masahihisho ya upole"))}</dd>
            <dt>{t(t3("掌握度", "Mastery", "Umahiri"))}</dt><dd>{t(t3("12 个知识点 · 实时计算，不缓存结论", "12 knowledge points · computed on read, never cached verdicts", "Mada 12 · huhesabiwa wakati wa kusoma"))}</dd>
            <dt>{t(t3("情节", "Episodic", "Matukio"))}</dt><dd>{t(t3("47 条互动摘要 · 只追加 · 可导出 / 删除", "47 session summaries · append-only · export / delete", "Muhtasari 47 · huongezwa tu · hamisha / futa"))}</dd>
            <dt>{t(t3("工作", "Working", "Kazi"))}</dt><dd>{t(t3("当前会话 · 结束即蒸馏", "Current session · distilled at end", "Kipindi cha sasa · huchujwa mwishoni"))}</dd>
          </dl>
          <p className="small mute" style={{ marginTop: 10 }}>{t(t3("记忆只做检索证据，不当事实。事实以课程图谱与实时掌握度为准。", "Memory is retrieval evidence, not truth. Facts come from the course graph and live mastery.", "Kumbukumbu ni ushahidi wa kurejelea, si ukweli. Ukweli hutoka kwenye grafu ya kozi."))}</p>
        </Panel>
      </div>
    </Shell>
  );
}
