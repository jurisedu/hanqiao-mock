"use client";
import Link from "next/link";
import Shell from "@/components/Shell";
import { Panel, Head, Stat, Badge, Bar, Ring, Spark } from "@/components/ui";
import { learnerRole, learnerNav } from "@/lib/roles";
import { useT, t3, UI } from "@/lib/i18n";
import { learner, lessons, kps, agents } from "@/lib/data";

export default function LearnHome() {
  const t = useT();
  const weak = kps.filter((k) => k.status === "weak");
  return (
    <Shell role={learnerRole} nav={learnerNav} title={t3("今天", "Today", "Leo")} sub={t3("周五 · 拉各斯 16:20 · 停电预报 19:00–21:00", "Friday · Lagos 16:20 · power cut forecast 19:00–21:00", "Ijumaa · Lagos 16:20 · umeme utakatika 19:00–21:00")} net={2}>
      <div className="grid c3">
        <div className="hero span2 in">
          <div className="eyebrow" style={{ color: "rgba(255,255,255,.75)" }}>{t(UI.streak)} · {learner.streak} {t(UI.days)}</div>
          <h2>{t(t3("今天再学 15 分钟，就能在停电前完成。", "15 more minutes and you are done before the power cut.", "Dakika 15 zaidi na utamaliza kabla umeme haujakatika."))}</h2>
          <p>{t(t3("伴学 Agent 已把今天的任务压缩到可离线完成：复习卡、Unit 6 录播（已下载）、第三声 5 组跟读。", "Your Study Companion packed today into offline-ready tasks: review cards, Unit 6 recording (saved), five tone-3 drills.", "Rafiki wa Masomo amepanga kazi za leo ziwezekane nje ya mtandao: kadi za marudio, rekodi ya Unit 6, mazoezi 5 ya toni ya 3."))}</p>
          <div className="row" style={{ marginTop: 20 }}><Link href="/learn/review" className="btn btn--gold">{t(t3("开始复习", "Start review", "Anza marudio"))}</Link><Link href="/learn/lesson" className="btn" style={{ background: "rgba(255,255,255,.15)", borderColor: "rgba(255,255,255,.3)", color: "#fff" }}>{t(t3("看 Unit 6", "Watch Unit 6", "Tazama Unit 6"))}</Link></div>
        </div>
        <Panel className="in in-2"><Head title={t3("本周", "This week", "Wiki hii")} /><div className="row" style={{ gap: 20 }}><Ring v={0.73} size={110} color="var(--accent)" label={<span>{learner.minutesWeek}<small style={{ fontSize: 11, display: "block", color: "var(--mute)" }}>{t(UI.minutes)}</small></span>} /><div><Stat value={learner.xp} label={t3("经验值", "XP", "XP")} delta="+320" /><div className="small mute" style={{ marginTop: 8 }}>{t(t3("目标 200 分钟 · 已完成 73%", "Goal 200 min · 73% done", "Lengo dakika 200 · 73% imekamilika"))}</div></div></div></Panel>
        <Panel className="in in-3"><Head title={t3("今日任务", "Today's tasks", "Kazi za leo")} />
          <ul className="list">
            <li><Badge tone="good">✓</Badge><div className="t"><b>{t(t3("复习 12 张卡", "Review 12 cards", "Rudia kadi 12"))}</b><span>{t(t3("已完成 · 离线", "Done · offline", "Imekamilika · nje ya mtandao"))}</span></div></li>
            <li><Badge tone="acc">18′</Badge><div className="t"><b>{t(t3("Unit 6 · 在餐厅点餐", "Unit 6 · Ordering at a restaurant", "Unit 6 · Kuagiza mgahawani"))}</b><span>{t(t3("录播已下载 · 240p 音频优先", "Recording saved · 240p audio first", "Rekodi imehifadhiwa · 240p sauti kwanza"))}</span></div><Link href="/learn/lesson" className="btn btn--sm">{t(UI.continue)}</Link></li>
            <li><Badge tone="warn">5×</Badge><div className="t"><b>{t(t3("第三声跟读", "Tone 3 drills", "Mazoezi ya toni ya 3"))}</b><span>{t(t3("发音教练 · 在线优先，离线可录音", "Coach · online first, offline records", "Kocha · mtandaoni kwanza, hurekodi nje ya mtandao"))}</span></div><Link href="/learn/speak" className="btn btn--sm">{t(UI.start)}</Link></li>
            <li><Badge>📖</Badge><div className="t"><b>{t(t3("读 10 分钟《我的文化之旅》", "Read 10 min: My Cultural Journey", "Soma dakika 10: Safari Yangu ya Utamaduni"))}</b><span>{t(t3("第 4 章 · 42%", "Chapter 4 · 42%", "Sura ya 4 · 42%"))}</span></div><Link href="/learn/library/b1" className="btn btn--sm">{t(UI.continue)}</Link></li>
          </ul>
        </Panel>
        <Panel className="in in-4"><Head title={t3("薄弱点", "Weak points", "Sehemu dhaifu")} more={t3("知识星图", "Knowledge map", "Ramani")} />
          {weak.map((k) => <div key={k.id} style={{ marginBottom: 12 }}><div className="between small"><b>{k.han} <span className="mute">{k.pinyin}</span></b><span className="mute">{Math.round(k.mastery * 100)}% · {k.n} {t(t3("次", "attempts", "majaribio"))}</span></div><Bar v={k.mastery} tone="bad" /></div>)}
          <div className="small mute">{t(t3("掌握度按置信下界判定，少于 3 题不下结论。", "Mastery uses the confidence lower bound; fewer than 3 attempts means no verdict.", "Umahiri hutumia kikomo cha chini cha uhakika; chini ya majaribio 3 hakuna hukumu."))}</div>
        </Panel>
        <Panel className="in in-5"><Head title={t3("我的 Agent 今天做了什么", "What your agents did today", "Mawakala wako walifanya nini leo")} more={t3("管理", "Manage", "Dhibiti")} />
          <ul className="list">
            {agents.slice(0, 3).map((a) => <li key={a.id}><span className="avatar" style={{ background: a.color, width: 30, height: 30, fontSize: 10 }}>{t(a.name).slice(0, 1)}</span><div className="t"><b>{t(a.name)}</b><span>{t(a.desc)}</span></div></li>)}
          </ul>
          <div className="small" style={{ marginTop: 10 }}><Badge tone="warn">{t(UI.abstain)}</Badge> <span className="mute">{t(t3("「为什么『吗』不能放句首？」→ 王老师将在周三直播回答", "“Why can't 吗 start a sentence?” → Wang Laoshi answers in Wednesday's live class", "“Kwa nini 吗 haiwezi kuanza sentensi?” → Wang Laoshi atajibu Jumatano"))}</span></div>
        </Panel>
        <Panel className="in in-6"><Head title={t3("学习曲线", "Learning curve", "Mkondo wa kujifunza")} /><Spark data={[12, 18, 15, 22, 30, 26, 34, 31, 40, 44, 42, 51]} color="var(--accent)" h={70} /><div className="between small mute" style={{ marginTop: 8 }}><span>{t(t3("12 周 · 每周练习分钟", "12 weeks · practice minutes", "Wiki 12 · dakika za mazoezi"))}</span><span className="up">▲ 21%</span></div>
          <div style={{ marginTop: 14 }} className="small"><b>{t(t3("下次直播", "Next live class", "Somo lijalo"))}</b> · {t(lessons[0].title)} · {t(t3("周三 16:00", "Wed 16:00", "Jumatano 16:00"))} <Link href="/learn/live" style={{ color: "var(--accent)" }}>→</Link></div>
        </Panel>
      </div>
    </Shell>
  );
}
