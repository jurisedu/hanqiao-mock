"use client";
import { useState } from "react";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bars } from "@/components/ui";
import { learnerRole, learnerNav } from "@/lib/roles";
import { useT, t3, UI } from "@/lib/i18n";

const cards = [
  { han: "杯", py: "bēi", en: "cup (measure word)", sw: "kikombe (neno la kipimo)", ex: "一杯茶" },
  { han: "服务员", py: "fúwùyuán", en: "waiter", sw: "mhudumu", ex: "服务员，买单！" },
  { han: "想", py: "xiǎng", en: "would like / to think", sw: "kutaka / kufikiri", ex: "我想点菜。" },
];

export default function Review() {
  const t = useT();
  const [i, setI] = useState(0); const [flip, setFlip] = useState(false);
  const c = cards[i % cards.length];
  const next = () => { setFlip(false); setTimeout(() => setI(i + 1), 250); };
  return (
    <Shell role={learnerRole} nav={learnerNav} title={t3("复习卡", "Review cards", "Kadi za marudio")} sub={t3("复习智能体 · FSRS 间隔重复 · 今日 12 张，剩 4 张 · 离线", "Review Agent · FSRS spaced repetition · 12 today, 4 left · offline", "Wakala wa Marudio · marudio ya FSRS · 12 leo, 4 zimebaki · nje ya mtandao")} net={0}>
      <div className="grid c3">
        <Panel className="span2 in" lift={false}>
          <div className="between small mute"><span>{t(t3("卡片", "Card", "Kadi"))} {9 + (i % 4)} / 12</span><Badge tone="bad">{t(UI.offline)} · {t(t3("本地判分", "scored locally", "alama za ndani"))}</Badge></div>
          <div className="srs" style={{ margin: "18px auto", maxWidth: 520 }}>
            <div className={`srs__card ${flip ? "flip" : ""}`} onClick={() => setFlip(!flip)}>
              <div className="srs__face srs__front"><div><div className="srs__han">{c.han}</div><div style={{ opacity: .8, marginTop: 8 }}>{t(t3("点击翻面", "Tap to flip", "Gusa kugeuza"))}</div></div></div>
              <div className="srs__face srs__back"><div><div style={{ fontSize: 22, fontWeight: 700 }}>{c.py}</div><div className="mute">{t(t3(c.en, c.en, c.sw))}</div><div style={{ fontFamily: "var(--serif)", fontSize: 20, marginTop: 10 }}>{c.ex}</div><button className="btn btn--sm" style={{ marginTop: 10 }}>▶ {t(t3("老师读", "Teacher reads", "Mwalimu anasoma"))}</button></div></div>
            </div>
          </div>
          <div className="row" style={{ justifyContent: "center", gap: 10 }}>
            {[[t3("忘了", "Forgot", "Nimesahau"), "btn--bad", "1d"], [t3("模糊", "Hard", "Ngumu"), "", "3d"], [t3("记得", "Good", "Nzuri"), "btn--good", "7d"], [t3("很熟", "Easy", "Rahisi"), "btn--primary", "16d"]].map(([l, cls, d]) => <button key={d as string} className={`btn ${cls}`} onClick={next}>{t(l as never)} <span className="dim small">{d as string}</span></button>)}
          </div>
        </Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2"><Head title={t3("未来 7 天到期", "Due in the next 7 days", "Zinazoiva siku 7 zijazo")} /><Bars data={[12, 9, 15, 7, 11, 18, 6]} labels={["F", "S", "S", "M", "T", "W", "T"]} color="var(--accent)" h={110} /></Panel>
          <Panel className="in in-3"><Head title={t3("复习智能体的调整", "Review Agent adjustments", "Marekebisho ya Wakala")} /><p className="small mute">{t(t3("检测到本周有 3 天在停电时段（19:00–21:00）未完成，已把提醒改到 17:30，并把每日卡量从 20 降到 12。此调整已记入你的档案记忆。", "Three sessions this week fell in the power-cut window (19:00–21:00). Reminders moved to 17:30 and daily cards reduced from 20 to 12. Saved to your profile memory.", "Vipindi vitatu wiki hii vilianguka wakati wa kukatika kwa umeme (19:00–21:00). Vikumbusho vimehamishiwa 17:30 na kadi za kila siku zimepunguzwa kutoka 20 hadi 12."))}</p></Panel>
          <Panel className="in in-4"><Head title={t3("记忆稳定度", "Retention", "Uhifadhi")} /><ul className="list">{[["你好", 0.98], ["谢谢", 0.94], ["杯", 0.62], ["第三声", 0.41]].map(([h, v]) => <li key={h as string}><div className="t"><b style={{ fontFamily: "var(--serif)" }}>{h}</b></div><Badge tone={(v as number) > .8 ? "good" : (v as number) > .5 ? "warn" : "bad"}>{Math.round((v as number) * 100)}%</Badge></li>)}</ul></Panel>
        </div>
      </div>
    </Shell>
  );
}
