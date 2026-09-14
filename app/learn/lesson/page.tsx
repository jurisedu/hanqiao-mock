"use client";
import { useState } from "react";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar } from "@/components/ui";
import { learnerRole, learnerNav } from "@/lib/roles";
import { useT, t3, UI } from "@/lib/i18n";
import { lessons } from "@/lib/data";

export default function Lesson() {
  const t = useT();
  const [q, setQ] = useState<number | null>(null);
  return (
    <Shell role={learnerRole} nav={learnerNav} title={t3("课程", "Lessons", "Masomo")} sub={t3("Unit 6 · 在餐厅点餐 · 王老师", "Unit 6 · Ordering at a restaurant · Wang Laoshi", "Unit 6 · Kuagiza mgahawani · Wang Laoshi")} net={0}>
      <div className="grid c3">
        <Panel className="span2 in" lift={false} style={{ padding: 0 }}>
          <div style={{ aspectRatio: "16/9", background: "radial-gradient(60% 80% at 50% 50%, #1a2350, #070b18)", position: "relative", display: "grid", placeItems: "center" }}>
            <div className="float" style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,.92)", display: "grid", placeItems: "center", color: "#111", fontSize: 26, boxShadow: "0 20px 50px -10px rgba(108,140,255,.6)" }}>▶</div>
            <div style={{ position: "absolute", top: 14, left: 14 }} className="row"><Badge tone="bad">{t(UI.offline)}</Badge><Badge>240p · {t(t3("音频优先", "audio first", "sauti kwanza"))}</Badge><Badge tone="good">{t(UI.downloaded)} · 42 MB</Badge></div>
            <div style={{ position: "absolute", bottom: 44, left: 24, right: 24, textAlign: "center", fontFamily: "var(--serif)", fontSize: 22, textShadow: "0 2px 12px rgba(0,0,0,.8)" }}>服务员，我想点一杯茶。<div style={{ fontFamily: "var(--font)", fontSize: 13, opacity: .8 }}>{t(t3("服务员，我想点一杯茶。", "Waiter, I'd like to order a cup of tea.", "Mhudumu, ningependa kuagiza kikombe cha chai."))}</div></div>
            <div style={{ position: "absolute", bottom: 14, left: 24, right: 24 }}><Bar v={0.35} /><div className="between small mute" style={{ marginTop: 6 }}><span>06:18 / 18:02</span><span>{t(t3("字幕：中文 + 你的语言", "Captions: Chinese + your language", "Manukuu: Kichina + lugha yako"))}</span></div></div>
          </div>
          <div style={{ padding: 20 }}>
            <Head title={t3("随堂练 · 卡点答疑", "In-lesson check", "Jaribio la somo")} right={<Badge tone="acc">06:18</Badge>} />
            <p style={{ fontFamily: "var(--serif)", fontSize: 18 }}>「我想点<b>一杯</b>茶」— {t(t3("这里的量词是？", "which measure word is used?", "neno la kipimo ni lipi?"))}</p>
            <div className="chips" style={{ marginTop: 12 }}>{["个", "杯", "本", "只"].map((c, i) => <button key={c} className={`chip ${q === i ? (i === 1 ? "on" : "") : ""}`} style={q === i && i !== 1 ? { borderColor: "var(--bad)", color: "var(--bad)" } : undefined} onClick={() => setQ(i)}>{c}</button>)}</div>
            {q !== null && <div className="small" style={{ marginTop: 12, padding: 12, borderRadius: 10, background: q === 1 ? "rgba(31,157,106,.1)" : "rgba(214,69,69,.08)" }}>{q === 1 ? t(t3("正确。杯 用于杯装饮品。出处：Unit 6 词表 · HSK 1", "Correct. 杯 is used for drinks in cups. Source: Unit 6 word list · HSK 1", "Sahihi. 杯 hutumika kwa vinywaji. Chanzo: orodha ya maneno Unit 6 · HSK 1")) : t(t3("再想想：茶装在杯子里。提示来自课程图谱，不是猜测。", "Think again: tea comes in a cup. This hint comes from the course graph, not a guess.", "Fikiria tena: chai huwa kwenye kikombe. Kidokezo hiki kinatoka kwenye grafu ya kozi."))}</div>}
          </div>
        </Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2"><Head title={t3("本单元", "This unit", "Kitengo hiki")} />
            <ul className="list">{lessons.map((l) => <li key={l.id}><div className="t"><b>{l.unit} · {t(l.title)}</b><span>{l.dur} {t(UI.minutes)} · {l.size} · {l.teacher}</span></div>{l.downloaded ? <Badge tone="good">{t(UI.downloaded)}</Badge> : <button className="btn btn--sm">{t(t3("Wi-Fi 时下载", "Download on Wi-Fi", "Pakua kwa Wi-Fi"))}</button>}</li>)}</ul>
          </Panel>
          <Panel className="in in-3"><Head title={t3("下载与流量", "Downloads & data", "Upakuaji na data")} />
            <div className="small between"><span>{t(t3("本月流量", "Data this month", "Data mwezi huu"))}</span><b>38 / 200 MB</b></div><Bar v={0.19} tone="good" />
            <div className="small mute" style={{ marginTop: 10 }}>{t(t3("省流模式已开：仅 Wi-Fi 下载，视频默认 240p，图片压缩。夜间 02:00 自动补齐内容包。", "Low-data mode on: Wi-Fi-only downloads, 240p video, compressed images. Packs top up automatically at 02:00.", "Hali ya data kidogo: upakuaji kwa Wi-Fi tu, video 240p, picha zilizobanwa. Vifurushi hukamilika saa 8 usiku."))}</div>
          </Panel>
          <Panel className="in in-4"><Head title={t3("课后由智能体生成", "Generated after the lesson", "Huundwa baada ya somo")} /><ul className="list"><li><div className="t"><b>{t(t3("复习卡 8 张", "8 review cards", "Kadi 8 za marudio"))}</b><span>{t(t3("杯 · 点 · 想 · 服务员…", "杯 · 点 · 想 · 服务员…", "杯 · 点 · 想 · 服务员…"))}</span></div></li><li><div className="t"><b>{t(t3("情景对话：点餐", "Role-play: ordering", "Igizo: kuagiza"))}</b><span>{t(t3("老师音色 · 在线优先", "Teacher's voice · online first", "Sauti ya mwalimu · mtandaoni kwanza"))}</span></div></li></ul></Panel>
        </div>
      </div>
    </Shell>
  );
}
