"use client";
import { useState } from "react";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Trace } from "@/components/ui";
import { teacherRole, teacherNav } from "@/lib/roles";
import { useT, t3, UI } from "@/lib/i18n";
import { reviewQueue } from "@/lib/data";

export default function Review() {
  const t = useT();
  const [sel, setSel] = useState(reviewQueue[1]);
  const [done, setDone] = useState<string[]>([]);
  return (
    <Shell role={teacherRole} nav={teacherNav} title={t3("复核队列", "Review queue", "Foleni ya ukaguzi")} sub={t3("AI 先做，人来定：只有分歧、低置信与主观题会到这里", "AI works first, you decide: only disagreements, low confidence and subjective items arrive here", "AI hufanya kwanza, wewe unaamua")} net={3}>
      <div className="grid c3">
        <Panel className="in" lift={false}>
          <Head title={t3("待处理", "Pending", "Zinazosubiri")} right={<Badge tone="warn">{reviewQueue.length - done.length}</Badge>} />
          <ul className="list">{reviewQueue.map((r) => <li key={r.id} style={{ cursor: "pointer", opacity: done.includes(r.id) ? .4 : 1, background: sel.id === r.id ? "var(--panel-2)" : undefined, borderRadius: 8, padding: "10px 8px" }} onClick={() => setSel(r)}><Badge tone={r.kind === "sign" ? "good" : r.kind === "decide" ? "warn" : r.kind === "grade" ? "bad" : ""}>{r.kind === "sign" ? t(t3("签发", "Sign", "Idhinisha")) : r.kind === "decide" ? t(t3("裁定", "Decide", "Amua")) : r.kind === "grade" ? t(t3("批改", "Grade", "Sahihisha")) : t(t3("通知", "Notice", "Taarifa"))}</Badge><div className="t"><b>{r.learner}</b><span>{t(r.type)}</span></div></li>)}</ul>
        </Panel>
        <Panel className="span2 in in-2" glow lift={false}>
          <div className="between"><div><div className="eyebrow">{t(sel.type)}</div><h3 style={{ fontFamily: "var(--serif)", fontSize: 26, marginTop: 4 }}>{sel.item}</h3><div className="mute small">{sel.learner} · HSK1 · Great Heights A</div></div><div className="row"><button className="btn btn--sm">▶ {t(t3("听录音", "Play audio", "Cheza sauti"))}</button><button className="btn btn--sm">{t(t3("看原图", "View photo", "Angalia picha"))}</button></div></div>
          <div className="grid c2" style={{ marginTop: 18 }}>
            <div className="panel" lift-none=""><div className="eyebrow">{t(t3("评分 Agent", "Grader agent", "Wakala wa alama"))}</div><div style={{ fontSize: 30, fontWeight: 800, fontFamily: "var(--serif)" }}>{sel.kind === "decide" ? "62" : sel.kind === "sign" ? "88" : "—"}</div><p className="small mute">{sel.kind === "decide" ? t(t3("「很」第三声起调偏高，判为二声倾向", "很 starts high, leaning toward tone 2", "很 huanza juu, inaelekea toni ya 2")) : t(sel.ai)}</p></div>
            <div className="panel"><div className="eyebrow">{t(t3("复核 Agent", "Verifier agent", "Wakala wa ukaguzi"))}</div><div style={{ fontSize: 30, fontWeight: 800, fontFamily: "var(--serif)" }}>{sel.kind === "decide" ? "74" : sel.kind === "sign" ? "90" : "—"}</div><p className="small mute">{sel.kind === "decide" ? t(t3("基频有明显下降段，可判第三声但不到位", "Clear dip in pitch; tone 3 recognisable but incomplete", "Kushuka wazi kwa sauti; toni ya 3 inatambulika lakini haijakamilika")) : sel.kind === "grade" ? t(t3("主观题弃权：仅给结构提示（开头 / 家庭成员 / 感受）", "Abstained: structure hints only (opening / family / feelings)", "Imejizuia: vidokezo vya muundo tu")) : t(t3("一致", "Agrees", "Inakubali"))}</p></div>
          </div>
          <div style={{ marginTop: 14 }}><Trace steps={[["route", sel.kind === "decide" ? "ASR" : "OCR"], ["ground", t(t3("课程图谱", "course graph", "grafu ya kozi"))], ["verify", t(t3("评分", "grade", "alama"))], ["verify", t(t3("复核", "verify", "kagua"))], ["human", t(t3("老师", "teacher", "mwalimu"))]]} /><div className="small mute" style={{ marginTop: 6 }}>{t(sel.reason)} · {t(UI.source)}: Unit 5</div></div>
          <div style={{ marginTop: 18 }}><div className="eyebrow" style={{ marginBottom: 8 }}>{t(t3("老师裁定", "Teacher decision", "Uamuzi wa mwalimu"))}</div>
            <div className="row">{sel.kind === "decide" && [["62", ""], ["70", "btn--primary"], ["74", ""]].map(([v, c]) => <button key={v} className={`btn ${c}`} onClick={() => setDone([...done, sel.id])}>{t(t3("判为", "Set", "Weka"))} {v}</button>)}{sel.kind === "sign" && <button className="btn btn--good" onClick={() => setDone([...done, sel.id])}>✓ {t(t3("签发 AI 批改", "Sign the AI feedback", "Idhinisha maoni ya AI"))}</button>}{sel.kind === "grade" && <button className="btn btn--primary" onClick={() => setDone([...done, sel.id])}>{t(t3("打开作文批改", "Open essay grading", "Fungua usahihishaji wa insha"))}</button>}<button className="btn btn--ghost">{t(t3("附语音评语（用我的声音）", "Add voice note (my voice)", "Ongeza sauti (sauti yangu)"))}</button></div>
            <textarea placeholder={t(t3("给学员的一句话（可选，双语自动翻译）…", "One line for the learner (optional, auto-translated)…", "Sentensi moja kwa mwanafunzi (hiari)…"))} style={{ width: "100%", marginTop: 12, minHeight: 70, padding: 12, borderRadius: 10, border: "1px solid var(--line-2)", background: "var(--panel)", color: "var(--text)", font: "inherit" }} />
            <div className="small mute" style={{ marginTop: 8 }}>{t(t3("你的裁定会写入创作链（哈希留痕），并作为评测集样本改进 Agent。", "Your decision is written to the creation chain (hashed) and becomes an evaluation sample that improves the agents.", "Uamuzi wako huandikwa kwenye mnyororo (hashi) na kuwa sampuli ya tathmini."))}</div>
          </div>
        </Panel>
      </div>
    </Shell>
  );
}
