"use client";
import { useState } from "react";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Net } from "@/components/ui";
import { learnerRole, learnerNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Live() {
  const t = useT();
  const [lvl, setLvl] = useState<1 | 2 | 3>(2);
  return (
    <Shell role={learnerRole} nav={learnerNav} title={t3("直播课", "Live class", "Somo la moja kwa moja")} sub={t3("Unit 6 · 王老师 · 郑州 → 新加坡 → 拉各斯 · 通过 Zoom 承载，平台管点名、录制与降级", "Unit 6 · Wang Laoshi · Zhengzhou → Singapore → Lagos · carried on Zoom, platform handles roll call, recording and degradation", "Unit 6 · Wang Laoshi · Zhengzhou → Singapore → Lagos")} net={lvl}>
      <div className="grid c3">
        <Panel className="span2 in" lift={false} style={{ padding: 0 }}>
          <div style={{ aspectRatio: "16/9", position: "relative", background: lvl === 3 ? "radial-gradient(70% 90% at 50% 40%, #223066, #070b18)" : "#fbfaf5", color: lvl === 3 ? "#fff" : "#111", display: "grid", placeItems: "center", borderRadius: "14px 14px 0 0" }}>
            {lvl === 3 ? <div style={{ textAlign: "center" }}><div className="avatar gold" style={{ width: 90, height: 90, fontSize: 30, margin: "0 auto" }}>王</div><div style={{ marginTop: 10 }}>{t(t3("视频 · 白板 · 实时问答", "Video · whiteboard · live Q&A", "Video · ubao · maswali ya moja kwa moja"))}</div></div>
              : <div style={{ fontFamily: "var(--serif)", fontSize: 26, lineHeight: 1.8, padding: 30 }}><div className="dim small" style={{ fontFamily: "var(--font)" }}>{t(t3("板书 · 老师声音持续", "Board · teacher audio continues", "Ubao · sauti ya mwalimu inaendelea"))}</div><b>第三声：214</b><br />低 → 更低 → 升<br /><span style={{ color: "#a83e3e" }}>你好 = ní hǎo（变调）</span>{lvl === 1 && <div style={{ fontFamily: "var(--font)", fontSize: 13, color: "#d8930f", marginTop: 8 }}>{t(t3("极弱网：音频已暂停，只保留字幕与文字互动", "Very weak: audio paused, captions and text chat only", "Dhaifu sana: sauti imesimamishwa, manukuu na maandishi tu"))}</div>}</div>}
            <div style={{ position: "absolute", top: 14, left: 14 }} className="row"><Badge tone="bad" live>LIVE 22:14</Badge><Badge tone="acc">{t(t3("云端录制中", "Recording to cloud", "Inarekodiwa"))}</Badge></div>
            <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, padding: "8px 12px", borderRadius: 10, background: "rgba(0,0,0,.55)", color: "#fff", fontSize: 14 }}>大家跟我读：wǒ hěn hǎo。 <span style={{ opacity: .7 }}>· {t(t3("大家跟我读", "Everyone repeat after me", "Kila mtu rudia baada yangu"))}</span></div>
          </div>
          <div style={{ padding: 16 }} className="between">
            <div className="row"><span className="small mute">{t(t3("模拟网络：", "Simulate network:", "Iga mtandao:"))}</span>{([3, 2, 1] as const).map((l) => <button key={l} className={`chip ${lvl === l ? "on" : ""}`} onClick={() => setLvl(l)}>{l === 3 ? t(t3("一级 · 全互动", "Level 1 · full", "Kiwango 1 · kamili")) : l === 2 ? t(t3("二级 · 音频+板书", "Level 2 · audio+board", "Kiwango 2 · sauti+ubao")) : t(t3("三级 · 文字", "Level 3 · text", "Kiwango 3 · maandishi"))}</button>)}</div>
            <div className="row"><button className="btn btn--sm">✋ {t(t3("举手", "Raise hand", "Inua mkono"))}</button><button className="btn btn--sm">{t(t3("文字提问", "Ask in text", "Uliza kwa maandishi"))}</button></div>
          </div>
        </Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2"><Head title={t3("班级", "Class", "Darasa")} /><div className="row" style={{ gap: 6 }}>{["AO", "CN", "FB", "TA", "KO", "EM", "+22"].map((x) => <span key={x} className="avatar" style={{ width: 30, height: 30, fontSize: 10 }}>{x}</span>)}</div><div className="small mute" style={{ marginTop: 10 }}>{t(t3("28 人 · 24 在线 · 4 人将看回放", "28 learners · 24 online · 4 will watch the replay", "Wanafunzi 28 · 24 mtandaoni · 4 watatazama rekodi"))}</div></Panel>
          <Panel className="in in-3"><Head title={t3("互动", "Interaction", "Mwingiliano")} /><div className="chat"><div className="msg ai" style={{ fontSize: 13 }}>Chidi: 老师，「很」是第几声？</div><div className="msg ai" style={{ fontSize: 13 }}>王老师: 第三声，等一下我们一起练。</div><div className="msg me" style={{ fontSize: 13 }}>{t(t3("明白了！", "Got it!", "Nimeelewa!"))}</div></div></Panel>
          <Panel className="in in-4"><Head title={t3("掉线也不丢课", "Nothing lost if you drop", "Hakuna kinachopotea ukikatika")} /><ol className="tl small"><li className="done">{t(t3("全程云端录制", "Recorded in the cloud", "Inarekodiwa kwenye wingu"))}</li><li>{t(t3("下课 15 分钟内可回看", "Replay within 15 minutes", "Rekodi ndani ya dakika 15"))}</li><li className="todo">{t(t3("伴学 Agent 补齐缺席片段的练习", "Companion fills in practice for missed parts", "Rafiki hukamilisha mazoezi ya sehemu zilizokosa"))}</li></ol><Net level={lvl} /></Panel>
        </div>
      </div>
    </Shell>
  );
}
