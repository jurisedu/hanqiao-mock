"use client";
import Link from "next/link";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar, Bars } from "@/components/ui";
import { learnerRole, learnerNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";
import { books } from "@/lib/data";

export default function Library() {
  const t = useT();
  return (
    <Shell role={learnerRole} nav={learnerNav} title={t3("图书馆", "Library", "Maktaba")} sub={t3("GACEE 出版 × 未来书院 · 书架 · 进度 · 划线笔记 · 生词点读 · 老师音色朗读", "GACEE Publishing × Future Academy · shelf · progress · highlights · tap-to-define · teacher read-aloud", "Uchapishaji wa GACEE × Future Academy · rafu · maendeleo · mistari · gusa neno · sauti ya mwalimu")} net={2}>
      <div className="grid c3">
        <Panel className="span2 in" lift={false}>
          <Head title={t3("我的书架", "My shelf", "Rafu yangu")} right={<span className="small mute">{t(t3("本周阅读 84 分钟 · 连续 9 天", "84 min this week · 9-day streak", "Dakika 84 wiki hii · siku 9 mfululizo"))}</span>} />
          <div className="shelf">
            {books.map((b) => (
              <Link key={b.id} href={`/learn/library/${b.id}`} style={{ flex: "0 0 auto", width: 150 }}>
                <div className="book" style={{ background: b.color }}><div><b>{b.title}</b><small>{t(b.source)}</small></div></div>
                <div style={{ marginTop: 14 }}><Bar v={b.progress} tone="gold" /><div className="small mute" style={{ marginTop: 4 }}>{b.progress ? `${Math.round(b.progress * 100)}% · ${Math.round(b.pages * b.progress)}/${b.pages}` : t(t3("未开始", "Not started", "Haijaanza"))}</div></div>
              </Link>
            ))}
          </div>
          <div style={{ height: 8, borderRadius: 4, background: "linear-gradient(180deg,#e8e2d2,#cfc6b0)", boxShadow: "0 8px 20px -10px rgba(0,0,0,.5)", margin: "-14px 8px 0" }} />
        </Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2" gold><Head title={t3("继续阅读", "Continue reading", "Endelea kusoma")} /><div style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 700 }}>{books[0].title}</div><div className="small mute">{t(books[0].sub)} · {t(t3("第 4 章", "Chapter 4", "Sura ya 4"))}</div><div style={{ margin: "12px 0" }}><Bar v={books[0].progress} tone="gold" /></div><Link href="/learn/library/b1" className="btn btn--primary btn--sm">{t(t3("打开", "Open", "Fungua"))}</Link></Panel>
          <Panel className="in in-3"><Head title={t3("阅读时长 · 近 7 天", "Reading minutes · last 7 days", "Dakika za kusoma · siku 7")} /><Bars data={[10, 14, 0, 18, 12, 16, 14]} labels={["S", "S", "M", "T", "W", "T", "F"]} color="var(--gold)" h={90} /></Panel>
          <Panel className="in in-4"><Head title={t3("我的划线与笔记", "My highlights & notes", "Mistari na maelezo yangu")} /><ul className="list small">{[["每天早上，我和妈妈一起去市场", "b1 · p.42"], ["热闹", "b1 · " + t(t3("生词", "new word", "neno jipya"))], ["学而时习之", "b2 · p.12"]].map(([q, w]) => <li key={q}><div className="t"><b style={{ fontFamily: "var(--serif)" }}>{q}</b><span>{w}</span></div></li>)}</ul><div className="small mute">{t(t3("划线与笔记同步到你的情节记忆，伴学智能体会在复习时引用。", "Highlights and notes sync to your episodic memory; your Study Companion cites them in review.", "Mistari na maelezo husawazishwa na kumbukumbu yako; Rafiki wa Masomo huyataja."))}</div></Panel>
        </div>
        <Panel className="span3 in in-5">
          <Head title={t3("发现 · 按未来书院四大板块", "Discover · by Future Academy strand", "Gundua · kwa vipengele vya Future Academy")} />
          <div className="grid c4">
            {[[t3("中华文化与中文", "Chinese culture & language", "Utamaduni na lugha ya Kichina"), 24, "#1f3aa8"], [t3("世界文明与全球视野", "World civilisations", "Ustaarabu wa dunia"), 11, "#b8912f"], [t3("AI 与未来能力", "AI & future capabilities", "AI na uwezo wa baadaye"), 7, "#4b3fb5"], [t3("青少年成长与实践", "Growth & practice", "Ukuaji na mazoezi"), 9, "#1f9d6a"]].map(([n, c, col]) => (
              <div key={t(n as never)} className="panel" style={{ borderTop: `3px solid ${col}` }}><b>{t(n as never)}</b><div className="mute small" style={{ marginTop: 4 }}>{c as number} {t(t3("本", "titles", "vitabu"))} · {t(t3("分级 HSK 1–3", "graded HSK 1–3", "viwango HSK 1–3"))}</div><div className="row" style={{ marginTop: 10 }}><Badge tone="gold">{t(t3("出版新书", "New from publishing", "Kipya"))}</Badge></div></div>
            ))}
          </div>
          <div className="small mute" style={{ marginTop: 12 }}>{t(t3("作文大赛获奖作品结集出版后自动上架；每本书按 HSK 等级分级并挂到课程图谱，阅读数据回流知识星图。", "Competition anthologies appear here automatically after publication; each title is graded by HSK level and linked to the course graph, and reading data flows back to your knowledge map.", "Mikusanyiko ya shindano huonekana hapa baada ya kuchapishwa; kila kitabu kimepangwa kwa kiwango cha HSK na kuunganishwa na grafu ya kozi."))}</div>
        </Panel>
      </div>
    </Shell>
  );
}
