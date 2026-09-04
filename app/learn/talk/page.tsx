"use client";
import { useState } from "react";
import Shell from "@/components/Shell";
import { Panel, Head, Badge } from "@/components/ui";
import { learnerRole, learnerNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Talk() {
  const t = useT();
  const [msgs, setMsgs] = useState([
    { ai: true, zh: "欢迎光临！请问几位？", en: "Welcome! How many people?", sw: "Karibu! Watu wangapi?" },
    { ai: false, zh: "两位。", en: "Two.", sw: "Wawili." },
    { ai: true, zh: "好的，请坐。想喝点什么？", en: "Please sit. What would you like to drink?", sw: "Tafadhali keti. Mngependa kunywa nini?" },
    { ai: false, zh: "我想点一个茶。", en: "I'd like to order one tea.", sw: "Ningependa kuagiza chai moja.", fix: true },
  ]);
  const scenes = [t3("餐厅点餐", "Ordering food", "Kuagiza chakula"), t3("问路", "Asking directions", "Kuuliza njia"), t3("自我介绍", "Introducing yourself", "Kujitambulisha"), t3("市场买东西", "At the market", "Sokoni"), t3("求职面试", "Job interview", "Mahojiano ya kazi")];
  return (
    <Shell role={learnerRole} nav={learnerNav} title={t3("情景对话", "Conversation", "Mazungumzo")} sub={t3("场景：餐厅点餐 · 对话 Agent · 王老师音色", "Scene: ordering food · Conversation Partner · Wang Laoshi's voice", "Mandhari: kuagiza chakula · Mshirika wa Mazungumzo · sauti ya Wang Laoshi")} net={3}>
      <div className="grid c3">
        <Panel className="span2 in" lift={false}>
          <div className="chips" style={{ marginBottom: 16 }}>{scenes.map((s, i) => <span key={i} className={`chip ${i === 0 ? "on" : ""}`}>{t(s)}</span>)}</div>
          <div className="chat">
            {msgs.map((m, i) => (
              <div key={i} className={`msg ${m.ai ? "ai" : "me"}`}>
                <span style={{ fontFamily: "var(--serif)", fontSize: 16 }}>{m.zh}</span>
                <small>{t(t3(m.zh, m.en, m.sw))}</small>
                {m.fix && <small style={{ color: "#ffe5a3", marginTop: 6 }}>{t(t3("温和纠错：茶要用「杯」——「我想点一杯茶」。你说得很清楚，只是量词换一下。", "Gentle fix: tea takes 杯 — 我想点一杯茶. You were clear; just swap the measure word.", "Sahihisho la upole: chai hutumia 杯 — 我想点一杯茶. Ulikuwa wazi; badilisha tu neno la kipimo."))}</small>}
              </div>
            ))}
            <div className="msg ai shimmer" style={{ width: 120, height: 34 }} />
          </div>
          <div className="row" style={{ marginTop: 18 }}>
            <button className="btn btn--primary" onClick={() => setMsgs([...msgs, { ai: false, zh: "再来一个包子。", en: "And one steamed bun.", sw: "Na bun moja." }])}>🎙 {t(t3("按住说话", "Hold to talk", "Shikilia kuzungumza"))}</button>
            <button className="btn">{t(t3("提示我", "Give me a hint", "Nipe kidokezo"))}</button>
            <button className="btn btn--ghost">{t(t3("用英语说也行", "I can say it in English", "Naweza kusema kwa Kiingereza"))}</button>
          </div>
        </Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2"><Head title={t3("本轮目标", "Goals this round", "Malengo ya raundi hii")} /><ul className="list">{[["量词 杯 / 个", true], ["想 + 动词", true], ["请问 …", false], ["多少钱？", false]].map(([g, d]) => <li key={g as string}><div className="t"><b>{g}</b></div>{d ? <Badge tone="good">✓</Badge> : <Badge>{t(t3("待用", "Not yet", "Bado"))}</Badge>}</li>)}</ul></Panel>
          <Panel className="in in-3"><Head title={t3("对话 Agent 的边界", "Where the partner stops", "Mipaka ya mshirika")} /><p className="small mute">{t(t3("只在课程词表与语法范围内对话；遇到超纲问题会告诉你「这个我们还没学」，并把问题记给老师。每次对话结束后，薄弱点写入知识星图。", "It stays within the course word list and grammar. Beyond that it says “we have not learned this yet” and logs the question for your teacher. Weak points go to your knowledge map after each session.", "Hubaki ndani ya orodha ya maneno na sarufi ya kozi. Nje ya hapo husema “hatujajifunza hili bado” na huandika swali kwa mwalimu. Sehemu dhaifu huenda kwenye ramani ya maarifa."))}</p></Panel>
          <Panel className="in in-4"><Head title={t3("最近三次", "Last three sessions", "Vipindi vitatu vilivyopita")} /><ul className="list">{[["09-04", "问路", 84], ["09-02", "自我介绍", 91], ["08-30", "点餐", 72]].map(([d, s, v]) => <li key={d as string}><div className="t"><b>{s}</b><span>{d}</span></div><Badge tone={(v as number) >= 85 ? "good" : "warn"}>{v}</Badge></li>)}</ul></Panel>
        </div>
      </div>
    </Shell>
  );
}
