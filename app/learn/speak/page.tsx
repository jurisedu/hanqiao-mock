"use client";
import { useState } from "react";
import Shell from "@/components/Shell";
import { Panel, Head, Badge } from "@/components/ui";
import Waveform from "@/components/Waveform";
import { learnerRole, learnerNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Speak() {
  const t = useT();
  const [rec, setRec] = useState(false);
  const syl = [["wǒ", 92, 3], ["hěn", 61, 3], ["hǎo", 88, 3]];
  return (
    <Shell role={learnerRole} nav={learnerNav} title={t3("发音教练", "Pronunciation coach", "Kocha wa matamshi")} sub={t3("第三声专项 · 第 2 / 5 组 · 老师音色示范", "Tone-3 focus · set 2 of 5 · demo in your teacher's voice", "Toni ya 3 · seti 2 kati ya 5 · mfano kwa sauti ya mwalimu")} net={3}>
      <div className="grid c3">
        <Panel className="span2 in" lift={false}>
          <div className="between"><Badge tone="acc">{t(t3("跟读", "Repeat after", "Rudia"))}</Badge><span className="small mute">{t(t3("ASR + 声调轮廓 + 发音优度（GOP）", "ASR + pitch contour + goodness of pronunciation (GOP)", "ASR + mkondo wa sauti + ubora wa matamshi (GOP)"))}</span></div>
          <div style={{ textAlign: "center", padding: "26px 0 10px" }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 72, fontWeight: 700, letterSpacing: ".1em" }}>我很好</div>
            <div className="mute" style={{ fontSize: 20 }}>wǒ hěn hǎo</div>
            <div className="small mute">{t(t3("我很好。", "I am very well.", "Mimi ni mzima kabisa."))}</div>
          </div>
          <Waveform active={rec} color={rec ? "#d64545" : "#1f3aa8"} />
          <svg viewBox="0 0 600 140" width="100%" style={{ marginTop: 8 }}>
            <text x="8" y="16" fontSize="11" fill="#6a7290">{t(t3("音高轮廓 · 蓝：老师 · 橙：你", "Pitch contour · blue: teacher · orange: you", "Mkondo wa sauti · bluu: mwalimu · machungwa: wewe"))}</text>
            {[0, 1, 2].map((i) => <rect key={i} x={20 + i * 190} y={24} width={170} height={100} rx="8" fill="rgba(31,58,168,.05)" />)}
            <path d="M30 70 C 70 60, 100 60, 140 70 S 170 100, 185 95" fill="none" stroke="#1f3aa8" strokeWidth="3" />
            <path d="M30 74 C 70 66, 100 62, 140 72 S 170 98, 185 92" fill="none" stroke="#d8930f" strokeWidth="3" strokeDasharray="5 4" />
            <path d="M220 60 C 260 100, 300 110, 330 90 S 360 40, 375 34" fill="none" stroke="#1f3aa8" strokeWidth="3" />
            <path d="M220 62 C 260 70, 300 72, 330 70 S 360 66, 375 64" fill="none" stroke="#d8930f" strokeWidth="3" strokeDasharray="5 4" />
            <path d="M410 64 C 450 104, 490 112, 520 92 S 550 44, 565 36" fill="none" stroke="#1f3aa8" strokeWidth="3" />
            <path d="M410 66 C 450 100, 490 108, 520 90 S 550 48, 565 40" fill="none" stroke="#d8930f" strokeWidth="3" strokeDasharray="5 4" />
            {["wǒ", "hěn", "hǎo"].map((s, i) => <text key={s} x={105 + i * 190} y={136} fontSize="12" textAnchor="middle" fill="#6a7290">{s}</text>)}
          </svg>
          <div className="gop" style={{ marginTop: 10 }}>{syl.map(([s, v, tone]) => <div key={s as string}><small>{t(t3("第", "tone", "toni"))} {tone as number}</small><b>{s}</b><span className="s" style={{ color: (v as number) >= 80 ? "var(--good)" : "var(--warn)" }}>{v}</span></div>)}<div><small>{t(t3("总分", "Total", "Jumla"))}</small><b style={{ color: "var(--accent)" }}>80</b><span className="s mute">{t(t3("良好", "Good", "Vizuri"))}</span></div></div>
          <div style={{ display: "grid", placeItems: "center", marginTop: 22 }}>
            <button onClick={() => setRec(!rec)} style={{ width: 84, height: 84, borderRadius: "50%", background: rec ? "var(--bad)" : "var(--accent)", color: "#fff", fontSize: 28, boxShadow: `0 0 0 ${rec ? 18 : 12}px ${rec ? "rgba(214,69,69,.15)" : "rgba(31,58,168,.12)"}`, transition: "all .3s" }}>{rec ? "■" : "●"}</button>
            <div className="small mute" style={{ marginTop: 10 }}>{rec ? t(t3("正在录音… 说完点停止", "Recording… tap to stop", "Inarekodi… gusa kusimamisha")) : t(t3("点击开始跟读", "Tap to record", "Gusa kurekodi"))}</div>
          </div>
        </Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2"><Head title={t3("教练反馈", "Coach feedback", "Maoni ya kocha")} />
            <p style={{ fontSize: 14 }}>{t(t3("「很」的第三声没有降下去就升了。先把声音压低，停一下，再轻轻扬起。你的「好」已经很接近老师。", "In 很 the third tone rose before it dipped. Go low first, pause, then lift gently. Your 好 is already close to the teacher's.", "Katika 很 toni ya tatu ilipanda kabla ya kushuka. Shuka kwanza, simama kidogo, kisha inua taratibu. 好 yako iko karibu na ya mwalimu."))}</p>
            <div className="row" style={{ marginTop: 12 }}><button className="btn btn--sm btn--primary">▶ {t(t3("听王老师示范", "Hear Wang Laoshi", "Sikiliza Wang Laoshi"))}</button><button className="btn btn--sm">{t(t3("慢速", "Slow", "Polepole"))}</button></div>
            <div className="small mute" style={{ marginTop: 12 }}>{t(t3("示范用老师本人复刻音色（已授权）。评分低于置信阈值时不判定，转老师听。", "Demo uses the teacher's own cloned voice (authorised). Below the confidence threshold the coach abstains and the teacher listens.", "Mfano hutumia sauti ya mwalimu iliyonakiliwa (imeidhinishwa). Chini ya kizingiti, kocha hujizuia na mwalimu husikiliza."))}</div>
          </Panel>
          <Panel className="in in-3"><Head title={t3("本组进度", "This set", "Seti hii")} /><ul className="list">{[["你好", 96, true], ["我很好", 80, true], ["老师好", 0, false], ["好久不见", 0, false], ["我也很好", 0, false]].map(([h, v, d]) => <li key={h as string}><div className="t"><b style={{ fontFamily: "var(--serif)" }}>{h}</b></div>{d ? <Badge tone={(v as number) >= 85 ? "good" : "warn"}>{v}</Badge> : <span className="dim small">—</span>}</li>)}</ul></Panel>
          <Panel className="in in-4"><Head title={t3("离线时", "When offline", "Nje ya mtandao")} /><p className="small mute">{t(t3("录音先存本地，联网后由云端精评。端侧只做轻量提示，不给分数。", "Recordings are kept locally and scored precisely once online. On-device gives light hints only, never a score.", "Rekodi huhifadhiwa ndani na kupewa alama mtandaoni. Kifaa hutoa vidokezo tu, si alama."))}</p></Panel>
        </div>
      </div>
    </Shell>
  );
}
