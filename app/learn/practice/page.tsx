"use client";
import { useState } from "react";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar } from "@/components/ui";
import { learnerRole, learnerNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Practice() {
  const t = useT();
  const [tab, setTab] = useState(0);
  const tabs = [t3("听力", "Listening", "Kusikiliza"), t3("阅读", "Reading", "Kusoma"), t3("汉字书写", "Character writing", "Kuandika herufi"), t3("语法", "Grammar", "Sarufi")];
  return (
    <Shell role={learnerRole} nav={learnerNav} title={t3("练习", "Practice", "Mazoezi")} sub={t3("听说读写四技 · 离线可用 · 客观题本地判分", "Four skills · works offline · objective items scored locally", "Ujuzi nne · nje ya mtandao · maswali ya lengo hupewa alama ndani")} net={0}>
      <div className="tabs">{tabs.map((x, i) => <button key={i} className={i === tab ? "on" : ""} onClick={() => setTab(i)}>{t(x)}</button>)}</div>
      <div className="grid c3">
        <Panel className="span2 in" lift={false}>
          {tab === 2 ? (
            <div className="grid c2" style={{ alignItems: "center" }}>
              <div style={{ textAlign: "center" }}><div className="stroke" data-han="茶">茶</div><div className="mute small">chá · {t(t3("笔顺 10 画 · 上下结构", "10 strokes · top-bottom structure", "mistari 10 · muundo wa juu-chini"))}</div></div>
              <div><div className="grid-han"><div className="on">茶</div><div>茶</div><div></div><div></div></div><div className="small mute" style={{ marginTop: 10 }}>{t(t3("书写 Agent 校验笔顺与间架结构；第 2 格「艹」偏窄，请再宽一点。", "The Writing Agent checks stroke order and structure: in box 2 the 艹 is narrow, make it wider.", "Wakala wa Kuandika hukagua mpangilio wa mistari: kisanduku 2, 艹 ni nyembamba, ipanue."))}</div></div>
            </div>
          ) : tab === 0 ? (
            <div><div className="row"><button className="btn btn--primary">▶ {t(t3("播放（第 2 次）", "Play (2nd time)", "Cheza (mara ya 2)"))}</button><span className="small mute">{t(t3("音频已随内容包下载", "Audio included in the content pack", "Sauti imo kwenye kifurushi"))}</span></div><p style={{ marginTop: 18, fontSize: 16 }}>{t(t3("听到的是哪一句？", "Which sentence did you hear?", "Ulisikia sentensi ipi?"))}</p><div className="grid c2" style={{ marginTop: 10 }}>{["我想点一杯茶。", "我想点一杯水。", "我想买一杯茶。", "我要一个茶。"].map((s, i) => <button key={i} className="panel" style={{ textAlign: "left", fontFamily: "var(--serif)", fontSize: 18, borderColor: i === 0 ? "var(--accent)" : undefined }}>{s}</button>)}</div></div>
          ) : tab === 1 ? (
            <div><p style={{ fontFamily: "var(--serif)", fontSize: 20, lineHeight: 2 }}>小明在餐厅。他想点一杯茶和一个包子。服务员说：「好的，请等一下。」</p><p style={{ marginTop: 12 }}>{t(t3("小明点了什么？", "What did Xiaoming order?", "Xiaoming aliagiza nini?"))}</p><div className="chips" style={{ marginTop: 10 }}>{["一杯水", "一杯茶和一个包子", "两个包子"].map((c, i) => <span key={i} className={`chip ${i === 1 ? "on" : ""}`}>{c}</span>)}</div></div>
          ) : (
            <div><p style={{ fontSize: 16 }}>{t(t3("把词排成正确的句子：", "Arrange into a correct sentence:", "Panga kuwa sentensi sahihi:"))}</p><div className="chips" style={{ marginTop: 12, fontSize: 18 }}>{["茶", "一杯", "想", "我", "点"].map((w) => <span key={w} className="chip" style={{ fontFamily: "var(--serif)", fontSize: 18 }}>{w}</span>)}</div><div className="panel" style={{ marginTop: 16, minHeight: 60, fontFamily: "var(--serif)", fontSize: 20, borderStyle: "dashed" }}>我 想 点 一杯 茶</div><div className="small mute" style={{ marginTop: 10 }}>{t(t3("语法点：想 + 动词 · 量词 杯。出处：Unit 6 语法卡 2", "Grammar: 想 + verb · measure word 杯. Source: Unit 6 grammar card 2", "Sarufi: 想 + kitenzi · neno la kipimo 杯. Chanzo: kadi ya sarufi 2 ya Unit 6"))}</div></div>
          )}
        </Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2"><Head title={t3("今日练习", "Today", "Leo")} /><div className="between small"><span>{t(t3("已完成", "Done", "Imekamilika"))}</span><b>14 / 20</b></div><Bar v={0.7} /><div className="small mute" style={{ marginTop: 10 }}>{t(t3("答题记录暂存本地，联网后回传并更新知识星图。", "Answers are stored locally and sent when online to update your knowledge map.", "Majibu huhifadhiwa ndani na kutumwa mtandaoni kusasisha ramani yako."))}</div><Badge tone="warn">6 {t(t3("条待同步", "pending sync", "zinasubiri")) }</Badge></Panel>
          <Panel className="in in-3"><Head title={t3("四技本周", "Four skills this week", "Ujuzi nne wiki hii")} /><ul className="list">{[[t3("听", "Listening", "Kusikiliza"), 0.82], [t3("说", "Speaking", "Kuzungumza"), 0.61], [t3("读", "Reading", "Kusoma"), 0.77], [t3("写", "Writing", "Kuandika"), 0.54]].map(([l, v]) => <li key={t(l as never)}><div className="t"><b>{t(l as never)}</b><Bar v={v as number} tone={(v as number) > .75 ? "good" : "warn"} /></div></li>)}</ul></Panel>
        </div>
      </div>
    </Shell>
  );
}
