"use client";
import { useState } from "react";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Spark, Ring } from "@/components/ui";
import { teacherRole, teacherNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function TeachLive() {
  const t = useT();
  const [lvl, setLvl] = useState(2);
  return (
    <Shell role={teacherRole} nav={teacherNav} title={t3("直播控制台", "Live console", "Kidhibiti cha moja kwa moja")} sub={t3("Unit 6 · Great Heights A · 承载：Zoom（会议 ID 由平台生成）· 平台负责点名、录制回收、降级与课堂事件回流", "Unit 6 · Great Heights A · carried on Zoom (meeting created by platform) · platform handles roll call, recording, degradation and event capture", "Unit 6 · Great Heights A · Zoom · jukwaa hushughulikia mahudhurio, rekodi na kushuka")} net={3}>
      <div className="grid c4">
        <Panel className="span2 in" lift={false}>
          <Head title={t3("三段链路质量", "Three-segment link quality", "Ubora wa sehemu tatu")} right={<Badge tone="bad" live>LIVE 22:14</Badge>} />
          <div className="grid c3">
            {[[t3("郑州 → 新加坡", "Zhengzhou → Singapore", "Zhengzhou → Singapore"), 96, 1.2, "good"], [t3("新加坡核心", "Singapore core", "Kiini cha Singapore"), 99, 0.1, "good"], [t3("新加坡 → 拉各斯（24 端）", "Singapore → Lagos (24 clients)", "Singapore → Lagos (24)"), 71, 6.8, "warn"]].map(([n, q, loss, tone]) => <div key={t(n as never)} className="panel" style={{ textAlign: "center" }}><div className="small mute">{t(n as never)}</div><Ring v={(q as number) / 100} size={90} stroke={8} color={tone === "good" ? "var(--good)" : "var(--warn)"} /><div className="small mute">{t(t3("丢包", "loss", "upotevu"))} {loss as number}% · RTT {tone === "good" ? "118" : "312"} ms</div></div>)}
          </div>
          <div style={{ marginTop: 14 }}><Spark data={[92, 90, 88, 85, 80, 74, 71, 73, 70, 72, 71, 71]} color="var(--warn)" h={56} /><div className="small mute">{t(t3("学员端平均质量 · 最近 12 分钟 · 22:02 起进入二级降级", "Average learner-side quality · last 12 min · level-2 degradation since 22:02", "Ubora wa wastani · dakika 12 zilizopita · kiwango 2 tangu 22:02"))}</div></div>
        </Panel>
        <Panel className="span2 in in-2" glow lift={false}>
          <Head title={t3("降级策略", "Degradation policy", "Sera ya kushuka")} right={<Badge tone="warn">{t(t3("当前：二级", "Now: level 2", "Sasa: kiwango 2"))}</Badge>} />
          {[[3, t3("一级 · 全互动", "Level 1 · full interaction", "Kiwango 1 · kamili"), t3("音视频 + 白板 + 实时问答", "video + whiteboard + live Q&A", "video + ubao + maswali")], [2, t3("二级 · 音频优先", "Level 2 · audio first", "Kiwango 2 · sauti kwanza"), t3("关摄像头，保音频 + 板书 + 字幕 + 文字互动", "camera off; audio, board, captions and text kept", "kamera imezimwa; sauti, ubao, manukuu")], [1, t3("三级 · 准直播", "Level 3 · near-live", "Kiwango 3 · karibu moja kwa moja"), t3("转录播 + 15 分钟内回看 + Agent 陪练补齐", "switch to recording, replay within 15 min, agent fills practice", "badilisha kuwa rekodi, tazama ndani ya dakika 15")]].map(([l, n, d]) => <div key={l as number} className="between" style={{ padding: "12px 0", borderTop: "1px solid var(--line)" }}><div><b style={{ color: lvl === l ? "var(--warn)" : undefined }}>{t(n as never)}</b><div className="small mute">{t(d as never)}</div></div><button className={`btn btn--sm ${lvl === l ? "btn--primary" : ""}`} onClick={() => setLvl(l as number)}>{lvl === l ? t(t3("当前", "Current", "Sasa")) : t(t3("切换", "Switch", "Badilisha"))}</button></div>)}
          <div className="small mute" style={{ marginTop: 10 }}>{t(t3("自动降级由学员端质量触发；老师可手动覆盖。全程云端录制，掉线学员无缝转看录播。", "Auto-degradation is triggered by learner-side quality; the teacher can override. Always recorded; dropped learners switch to the replay seamlessly.", "Kushuka kiotomatiki huchochewa na ubora wa mwanafunzi; mwalimu anaweza kubatilisha."))}</div>
        </Panel>
        <Panel className="span2 in in-3"><Head title={t3("点名与参与", "Roll call & participation", "Mahudhurio na ushiriki")} /><div className="row" style={{ gap: 6, marginBottom: 10 }}>{Array.from({ length: 28 }).map((_, i) => <span key={i} className="avatar" style={{ width: 26, height: 26, fontSize: 9, background: i < 24 ? (i % 5 === 0 ? "var(--warn)" : "var(--accent)") : "var(--dim)" }}>{String.fromCharCode(65 + (i % 26))}</span>)}</div><div className="small mute">{t(t3("24 在线（5 人二级降级）· 4 缺席，已标记回放补课 · 举手 2 · 文字提问 7", "24 online (5 on level 2) · 4 absent, marked for replay · 2 hands raised · 7 text questions", "24 mtandaoni · 4 hawapo · mikono 2 · maswali 7"))}</div></Panel>
        <Panel className="span2 in in-4"><Head title={t3("课堂事件回流", "Classroom events captured", "Matukio ya darasani")} /><ul className="list small"><li><span className="mono dim">22:03</span><div className="t"><span>Chidi: 「很」是第几声？→ {t(t3("记入第三声知识点", "logged to tone-3 knowledge point", "imeandikwa kwenye toni ya 3"))}</span></div></li><li><span className="mono dim">22:09</span><div className="t"><span>{t(t3("老师板书「214」→ 自动生成复习卡", "Board note “214” → review card generated", "Ubao “214” → kadi ya marudio imeundwa"))}</span></div></li><li><span className="mono dim">22:12</span><div className="t"><span>{t(t3("4 名学员掉线 → 回放已排入今晚离线包", "4 learners dropped → replay queued into tonight's offline pack", "Wanafunzi 4 walikatika → rekodi imepangwa"))}</span></div></li></ul><div className="row" style={{ marginTop: 10 }}><button className="btn btn--sm btn--bad">■ {t(t3("结束并转 VOD", "End and convert to VOD", "Maliza na ubadilishe kuwa VOD"))}</button><button className="btn btn--sm">{t(t3("共享板书", "Share board", "Shiriki ubao"))}</button></div></Panel>
      </div>
    </Shell>
  );
}
