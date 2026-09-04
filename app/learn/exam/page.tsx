"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Ring, Bar } from "@/components/ui";
import { learnerRole, learnerNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Exam() {
  const t = useT();
  return (
    <Shell role={learnerRole} nav={learnerNav} title={t3("模拟考", "Mock exam", "Mtihani wa majaribio")} sub={t3("HSK 1 模拟卷 B · 40 题 · 40 分钟 · 可离线作答，联网提交", "HSK 1 mock paper B · 40 items · 40 min · answer offline, submit online", "HSK 1 karatasi B · maswali 40 · dakika 40 · jibu nje ya mtandao, tuma mtandaoni")} net={0}>
      <div className="grid c3">
        <Panel className="span2 in" lift={false}>
          <div className="between"><Badge tone="acc">{t(t3("听力 · 第 12 / 20 题", "Listening · item 12 of 20", "Kusikiliza · swali 12 kati ya 20"))}</Badge><span className="mono" style={{ color: "var(--warn)" }}>27:41</span></div>
          <div style={{ padding: "26px 0" }}>
            <button className="btn">▶ {t(t3("播放录音（剩 1 次）", "Play audio (1 replay left)", "Cheza sauti (kurudia 1 imebaki)"))}</button>
            <p style={{ marginTop: 18, fontSize: 16 }}>{t(t3("根据录音，判断对错：", "True or false according to the recording:", "Kweli au si kweli kulingana na rekodi:"))}</p>
            <div style={{ fontFamily: "var(--serif)", fontSize: 24, margin: "10px 0 18px" }}>他今天很高兴。</div>
            <div className="row"><button className="btn btn--primary" style={{ minWidth: 120 }}>√ {t(t3("对", "True", "Kweli"))}</button><button className="btn" style={{ minWidth: 120 }}>× {t(t3("错", "False", "Si kweli"))}</button></div>
          </div>
          <div className="row" style={{ gap: 6 }}>{Array.from({ length: 20 }).map((_, i) => <span key={i} style={{ width: 22, height: 22, borderRadius: 6, display: "grid", placeItems: "center", fontSize: 10, background: i < 11 ? "var(--accent)" : i === 11 ? "var(--warn)" : "var(--panel-2)", color: i < 12 ? "#fff" : "var(--mute)", border: "1px solid var(--line)" }}>{i + 1}</span>)}</div>
        </Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2"><Head title={t3("上次模拟考", "Last mock", "Mtihani uliopita")} /><div className="row" style={{ gap: 18 }}><Ring v={0.78} size={100} color="var(--good)" label="156" /><div className="small"><div><b>156 / 200</b> · {t(t3("通过线 120", "pass mark 120", "alama ya kufaulu 120"))}</div><div className="mute" style={{ marginTop: 6 }}>{t(t3("听力 82 · 阅读 74", "Listening 82 · Reading 74", "Kusikiliza 82 · Kusoma 74"))}</div><Badge tone="good">{t(t3("已达 HSK 1 水平", "At HSK 1 level", "Kiwango cha HSK 1"))}</Badge></div></div></Panel>
          <Panel className="in in-3"><Head title={t3("三级评测", "Three levels of assessment", "Viwango vitatu vya tathmini")} /><ol className="tl"><li className="done">{t(t3("形成性练习 · 每天", "Formative practice · daily", "Mazoezi ya kila siku"))}</li><li>{t(t3("阶段模拟考 · 本周", "Stage mock exam · this week", "Mtihani wa majaribio · wiki hii"))}</li><li className="todo">{t(t3("正式认证 · 官方考点（拉各斯）· 12 月", "Official certification · test centre (Lagos) · December", "Cheti rasmi · kituo cha mtihani (Lagos) · Desemba"))}</li></ol><p className="small mute" style={{ marginTop: 8 }}>{t(t3("平台出具学情证明与结业证书；HSK 官方成绩由考点出具。", "The platform issues learning reports and completion certificates; official HSK results come from the test centre.", "Jukwaa hutoa ripoti na vyeti vya kuhitimu; matokeo rasmi ya HSK hutoka kituo cha mtihani."))}</p></Panel>
          <Panel className="in in-4"><Head title={t3("诚信", "Integrity", "Uadilifu")} /><div className="small mute">{t(t3("随机题库 · 时限 · 切屏检测 · 口语活体读题。正式考建议线下考点。", "Randomised bank · timed · tab-switch detection · live-read speaking items. Formal exams should be taken at a centre.", "Benki ya maswali · muda · ugunduzi wa kubadilisha skrini · maswali ya kuzungumza moja kwa moja."))}</div><Bar v={0.55} tone="warn" /><div className="small mute" style={{ marginTop: 4 }}>{t(t3("本卷进度 55%", "This paper 55%", "Karatasi hii 55%"))}</div></Panel>
        </div>
      </div>
    </Shell>
  );
}
