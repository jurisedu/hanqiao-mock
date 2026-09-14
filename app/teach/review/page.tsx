"use client";
import { useState } from "react";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Trace } from "@/components/ui";
import { useToast } from "@/components/Toast";
import { teacherRole, teacherNav } from "@/lib/roles";
import { useT, t3, UI } from "@/lib/i18n";
import { reviewQueue } from "@/lib/data";

const kindLabel = (k: string) => k === "sign" ? t3("签发", "Sign", "Idhinisha") : k === "decide" ? t3("裁定", "Decide", "Amua") : k === "grade" ? t3("批改", "Grade", "Sahihisha") : t3("通知", "Notice", "Taarifa");
const kindTone = (k: string) => k === "sign" ? "good" : k === "decide" ? "warn" : k === "grade" ? "bad" : "" as const;

export default function Review() {
  const t = useT();
  const toast = useToast();
  const [selId, setSelId] = useState(reviewQueue[1].id);
  const [done, setDone] = useState<string[]>([]);
  const [playing, setPlaying] = useState(false);
  const [note, setNote] = useState("");
  const sel = reviewQueue.find((r) => r.id === selId)!;
  const pending = reviewQueue.filter((r) => !done.includes(r.id));
  const allDone = pending.length === 0;

  function advance(fromId: string) {
    const next = reviewQueue.find((r) => !done.includes(r.id) && r.id !== fromId);
    if (next) setSelId(next.id);
  }
  function resolve(msg: string, sub: string, tone: "good" | "warn" | "acc" = "good") {
    setDone((d) => [...d, sel.id]);
    toast(msg, { sub, tone });
    setNote("");
    advance(sel.id);
  }

  return (
    <Shell role={teacherRole} nav={teacherNav} title={t3("复核队列", "Review queue", "Foleni ya ukaguzi")} sub={t3("AI 先做，人来定：只有分歧、低置信与主观题会到这里", "AI works first, you decide: only disagreements, low confidence and subjective items arrive here", "AI hufanya kwanza, wewe unaamua")} net={3}>
      <div className="grid c3">
        <Panel className="in" lift={false}>
          <Head title={t3("待处理", "Pending", "Zinazosubiri")} right={<Badge tone={allDone ? "good" : "warn"}>{pending.length}</Badge>} />
          <ul className="list">{reviewQueue.map((r) => { const d = done.includes(r.id); return (
            <li key={r.id} style={{ cursor: "pointer", opacity: d ? .45 : 1, background: selId === r.id ? "var(--panel-2)" : undefined, borderRadius: 8, padding: "10px 8px" }} onClick={() => setSelId(r.id)}>
              <Badge tone={d ? "" : kindTone(r.kind)}>{d ? "✓ " + t(t3("已处理", "Done", "Imekamilika")) : t(kindLabel(r.kind))}</Badge>
              <div className="t"><b>{r.learner}</b><span>{t(r.type)}</span></div>
            </li>); })}</ul>
          <div className="small mute" style={{ marginTop: 8 }}>{t(t3("已处理", "Done", "Imekamilika"))} {done.length} / {reviewQueue.length}</div>
        </Panel>

        <Panel className="span2 in in-2" glow lift={false}>
          {allDone ? (
            <div style={{ textAlign: "center", padding: "48px 20px" }}>
              <div style={{ fontSize: 44 }}>✓</div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, marginTop: 8 }}>{t(t3("队列已清空", "Queue cleared", "Foleni imekwisha"))}</h3>
              <p className="mute" style={{ marginTop: 6 }}>{t(t3("今天的分歧项、低置信与主观题都已由你裁定。裁定已写入创作链，并作为评测样本改进智能体。", "Every disagreement, low-confidence and subjective item is decided. Your calls are written to the creation chain and improve the agents.", "Kila kitu kimeamuliwa; maamuzi yako yanaboresha mawakala."))}</p>
              <button className="btn btn--ghost" style={{ marginTop: 18 }} onClick={() => { setDone([]); setSelId(reviewQueue[1].id); }}>{t(t3("重演一遍（演示）", "Replay (demo)", "Rudia (onyesho)"))}</button>
            </div>
          ) : (<>
          <div className="between"><div><div className="eyebrow">{t(sel.type)}</div><h3 style={{ fontFamily: "var(--serif)", fontSize: 26, marginTop: 4 }}>{sel.item}</h3><div className="mute small">{sel.learner} · HSK1 · Great Heights A</div></div>
            <div className="row"><button className={`btn btn--sm ${playing ? "btn--primary" : ""}`} onClick={() => { setPlaying(true); toast(t(t3("正在播放学员录音…", "Playing learner audio…", "Inacheza sauti…")), { tone: "acc" }); setTimeout(() => setPlaying(false), 2200); }}>{playing ? "❚❚ " + t(t3("播放中", "Playing", "Inacheza")) : "▶ " + t(t3("听录音", "Play audio", "Cheza sauti"))}</button><button className="btn btn--sm" onClick={() => toast(t(t3("已打开原始图片 / 波形", "Opened original photo / waveform", "Imefungua picha halisi")), { tone: "acc" })}>{t(t3("看原图", "View photo", "Angalia picha"))}</button></div></div>
          {playing && <div className="wave-mini" style={{ marginTop: 12, height: 30, display: "flex", gap: 3, alignItems: "center" }}>{Array.from({ length: 40 }).map((_, i) => <i key={i} style={{ flex: 1, background: "var(--accent)", opacity: .8, height: `${20 + Math.abs(Math.sin(i * 0.9)) * 80}%`, borderRadius: 2, animation: "grow .5s ease both", animationDelay: `${i * 12}ms` }} />)}</div>}
          <div className="grid c2" style={{ marginTop: 18 }}>
            <div className="panel"><div className="eyebrow">{t(t3("评分智能体", "Grader agent", "Wakala wa alama"))}</div><div style={{ fontSize: 30, fontWeight: 800, fontFamily: "var(--serif)" }}>{sel.kind === "decide" ? "62" : sel.kind === "sign" ? "88" : "—"}</div><p className="small mute">{sel.kind === "decide" ? t(t3("「很」第三声起调偏高，判为二声倾向", "很 starts high, leaning toward tone 2", "很 huanza juu, inaelekea toni ya 2")) : t(sel.ai)}</p></div>
            <div className="panel"><div className="eyebrow">{t(t3("复核智能体", "Verifier agent", "Wakala wa ukaguzi"))}</div><div style={{ fontSize: 30, fontWeight: 800, fontFamily: "var(--serif)" }}>{sel.kind === "decide" ? "74" : sel.kind === "sign" ? "90" : "—"}</div><p className="small mute">{sel.kind === "decide" ? t(t3("基频有明显下降段，可判第三声但不到位", "Clear dip in pitch; tone 3 recognisable but incomplete", "Kushuka wazi kwa sauti; toni ya 3 inatambulika lakini haijakamilika")) : sel.kind === "grade" ? t(t3("主观题弃权：仅给结构提示（开头 / 家庭成员 / 感受）", "Abstained: structure hints only (opening / family / feelings)", "Imejizuia: vidokezo vya muundo tu")) : t(t3("一致", "Agrees", "Inakubali"))}</p></div>
          </div>
          <div style={{ marginTop: 14 }}><Trace steps={[["route", sel.kind === "decide" ? "ASR" : "OCR"], ["ground", t(t3("课程图谱", "course graph", "grafu ya kozi"))], ["verify", t(t3("评分", "grade", "alama"))], ["verify", t(t3("复核", "verify", "kagua"))], ["human", t(t3("老师", "teacher", "mwalimu"))]]} /><div className="small mute" style={{ marginTop: 6 }}>{t(sel.reason)} · {t(UI.source)}: Unit 5</div></div>
          <div style={{ marginTop: 18 }}><div className="eyebrow" style={{ marginBottom: 8 }}>{t(t3("老师裁定", "Teacher decision", "Uamuzi wa mwalimu"))}</div>
            <div className="row">
              {sel.kind === "decide" && [["62", ""], ["70", "btn--primary"], ["74", ""]].map(([v, c]) => <button key={v} className={`btn ${c}`} onClick={() => resolve(t(t3("已裁定 · 判为", "Decided · set to", "Imeamuliwa")) + " " + v, t(t3("已写入创作链 · 已通知学员", "Written to creation chain · learner notified", "Imeandikwa · mwanafunzi amejulishwa")), "good")}>{t(t3("判为", "Set", "Weka"))} {v}</button>)}
              {sel.kind === "sign" && <button className="btn btn--good" onClick={() => resolve(t(t3("已签发 AI 批改", "AI feedback signed", "Maoni yameidhinishwa")), t(t3("证据置信 91% · 已写入创作链", "Confidence 91% · written to creation chain", "Uhakika 91% · imeandikwa")), "good")}>✓ {t(t3("签发 AI 批改", "Sign the AI feedback", "Idhinisha maoni ya AI"))}</button>}
              {sel.kind === "grade" && <button className="btn btn--primary" onClick={() => resolve(t(t3("作文已批改完成", "Composition graded", "Insha imesahihishwa")), t(t3("主观题由老师定分 · 已签发", "Subjective item graded by teacher · signed", "Imesahihishwa na mwalimu"))) }>{t(t3("打开作文批改", "Open essay grading", "Fungua usahihishaji"))}</button>}
              {sel.kind === "info" && <button className="btn btn--good" onClick={() => resolve(t(t3("已知悉", "Acknowledged", "Imepokelewa")), t(t3("客观题已自动入图谱", "Objective item written to graph", "Imeandikwa kwenye grafu")))}>✓ {t(t3("知悉并归档", "Acknowledge", "Pokea"))}</button>}
              <button className="btn btn--ghost" onClick={() => toast(t(t3("正在用王老师音色合成语音评语…", "Synthesising a voice note in Wang Laoshi's voice…", "Inatengeneza sauti ya mwalimu…")), { sub: t(t3("cosyvoice · 复刻音色", "cosyvoice · cloned voice", "cosyvoice")), tone: "acc" })}>{t(t3("附语音评语（用我的声音）", "Add voice note (my voice)", "Ongeza sauti (sauti yangu)"))}</button>
            </div>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={t(t3("给学员的一句话（可选，双语自动翻译）…", "One line for the learner (optional, auto-translated)…", "Sentensi moja kwa mwanafunzi (hiari)…"))} style={{ width: "100%", marginTop: 12, minHeight: 70, padding: 12, borderRadius: 10, border: "1px solid var(--line-2)", background: "var(--panel)", color: "var(--text)", font: "inherit" }} />
            <div className="small mute" style={{ marginTop: 8 }}>{t(t3("你的裁定会写入创作链（哈希留痕），并作为评测集样本改进智能体。", "Your decision is written to the creation chain (hashed) and becomes an evaluation sample that improves the agents.", "Uamuzi wako huandikwa kwenye mnyororo (hashi) na kuwa sampuli ya tathmini."))}</div>
          </div>
          </>)}
        </Panel>
      </div>
    </Shell>
  );
}
