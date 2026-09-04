"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Trace } from "@/components/ui";
import { learnerRole, learnerNav } from "@/lib/roles";
import { useT, t3, UI } from "@/lib/i18n";

export default function Homework() {
  const t = useT();
  return (
    <Shell role={learnerRole} nav={learnerNav} title={t3("拍照作业", "Photo homework", "Kazi ya picha")} sub={t3("手写练习 · 识别 → 双 Agent 批改 → 老师签发", "Handwritten practice · recognition → two-agent grading → teacher sign-off", "Mazoezi ya mwandiko · utambuzi → usahihishaji wa wakala wawili → idhini ya mwalimu")} net={2}>
      <div className="grid c3">
        <Panel className="in" lift={false} style={{ padding: 0 }}>
          <div style={{ aspectRatio: "3/4", background: "linear-gradient(180deg,#fbfaf5,#efece2)", position: "relative", borderRadius: 14, display: "grid", placeItems: "center", color: "#333" }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 30, lineHeight: 2.2, transform: "rotate(-1.5deg)", opacity: .85 }}>我 有 三 个 姐姐。<br />她 们 都 是 学 生。<br />我 们 很 高 兴。</div>
            <div style={{ position: "absolute", top: 12, left: 12 }} className="row"><Badge tone="acc">Qwen-VL</Badge><Badge tone="good">{t(t3("识别 98%", "OCR 98%", "OCR 98%"))}</Badge></div>
            <div style={{ position: "absolute", inset: "38% 22% 47% 42%", border: "2px solid var(--warn)", borderRadius: 6 }} />
          </div>
          <div style={{ padding: 16 }} className="row"><button className="btn btn--primary">📷 {t(t3("再拍一页", "Photograph another page", "Piga picha ukurasa mwingine"))}</button><span className="small mute">{t(t3("离线可暂存，联网后提交", "Saved offline, submitted when online", "Huhifadhiwa nje ya mtandao, hutumwa mtandaoni"))}</span></div>
        </Panel>
        <Panel className="in in-2" lift={false}><Head title={t3("批改结果", "Feedback", "Maoni")} right={<Badge tone="warn">{t(t3("待老师签发", "Awaiting teacher sign-off", "Inasubiri idhini ya mwalimu"))}</Badge>} />
          <ul className="list">
            <li><Badge tone="good">✓</Badge><div className="t"><b>{t(t3("语法：量词「个」用于人，正确", "Grammar: measure word 个 for people, correct", "Sarufi: 个 kwa watu, sahihi"))}</b><span>{t(UI.source)}: Unit 5 · {t(t3("语法卡 1", "grammar card 1", "kadi ya sarufi 1"))}</span></div></li>
            <li><Badge tone="warn">!</Badge><div className="t"><b>{t(t3("书写：「个」结构偏右，「们」的「门」框略小", "Writing: 个 leans right; the 门 in 们 is a little small", "Kuandika: 个 imeinama kulia; 门 ndani ya 们 ni ndogo kidogo"))}</b><span>{t(t3("书写 Agent · 间架结构校验", "Writing Agent · structure check", "Wakala wa Kuandika · ukaguzi wa muundo"))}</span></div></li>
            <li><Badge tone="good">✓</Badge><div className="t"><b>{t(t3("「们」用于复数人称，正确", "们 marks plural persons, correct", "们 huonyesha wingi wa watu, sahihi"))}</b><span>{t(UI.source)}: Unit 5 {t(t3("词表", "word list", "orodha ya maneno"))}</span></div></li>
            <li><Badge>?</Badge><div className="t"><b>{t(t3("「很高兴」是否需要「都」——两个 Agent 判断不一致", "Whether 很高兴 needs 都: the two agents disagree", "Ikiwa 很高兴 inahitaji 都: wakala wawili hawakubaliani"))}</b><span>{t(UI.abstain)}</span></div></li>
          </ul>
          <div style={{ marginTop: 14 }}><div className="eyebrow" style={{ marginBottom: 8 }}>{t(t3("这次批改是怎么来的", "How this feedback was produced", "Maoni haya yalitengenezwa vipi"))}</div><Trace steps={[["route", "OCR"], ["ground", t(t3("课程图谱 Unit 5", "Course graph Unit 5", "Grafu ya kozi Unit 5"))], ["verify", t(t3("评分 Agent", "Grader", "Msahihishaji"))], ["verify", t(t3("复核 Agent", "Verifier", "Mkaguzi"))], ["human", t(t3("王老师签发", "Wang Laoshi signs", "Wang Laoshi anaidhinisha"))]]} /></div>
        </Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-3"><Head title={t3("已提交", "Submitted", "Zilizotumwa")} /><ul className="list">{[["09-05", "Unit 5 · 家人", t3("待签发", "Awaiting", "Inasubiri"), "warn"], ["09-02", "Unit 4 · 数字", t3("已签发 · 92", "Signed · 92", "Imeidhinishwa · 92"), "good"], ["08-29", "Unit 3 · 问候", t3("已签发 · 88", "Signed · 88", "Imeidhinishwa · 88"), "good"]].map(([d, n, s, tone]) => <li key={d as string}><div className="t"><b>{n as string}</b><span>{d as string}</span></div><Badge tone={tone as never}>{t(s as never)}</Badge></li>)}</ul></Panel>
          <Panel className="in in-4"><Head title={t3("老师的话", "From your teacher", "Kutoka kwa mwalimu wako")} /><p className="small" style={{ fontFamily: "var(--serif)", fontSize: 15 }}>「上次的『数字』写得很工整。这次注意『个』的重心。」</p><div className="dim small" style={{ marginTop: 6 }}>— {t(t3("王老师 · 09-02", "Wang Laoshi · 09-02", "Wang Laoshi · 09-02"))}</div></Panel>
        </div>
      </div>
    </Shell>
  );
}
