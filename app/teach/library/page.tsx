"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar } from "@/components/ui";
import { teacherRole, teacherNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";
import { books } from "@/lib/data";

export default function TeachLibrary() {
  const t = useT();
  return (
    <Shell role={teacherRole} nav={teacherNav} title={t3("图书馆 · 共读", "Library · shared reading", "Maktaba · usomaji wa pamoja")} sub={t3("给班级布置共读、批注范文、把出版新书与未来书院读本推给学员", "Assign shared reading, annotate model texts, push new titles from publishing and Future Academy to learners", "Panga usomaji wa pamoja, toa maelezo, sukuma vitabu vipya")} net={3}>
      <div className="grid c3">
        <Panel className="span2 in" lift={false}>
          <Head title={t3("本班共读 · 《中文链接世界 · 我的文化之旅》", "Class shared reading · My Cultural Journey", "Usomaji wa pamoja · Safari Yangu ya Utamaduni")} right={<Badge tone="gold">{t(t3("出版 · 第二届作品集", "Publishing · 2nd anthology", "Uchapishaji · mkusanyiko wa 2"))}</Badge>} />
          <div className="tbl"><table><thead><tr><th>{t(t3("学员", "Learner", "Mwanafunzi"))}</th><th>{t(t3("进度", "Progress", "Maendeleo"))}</th><th>{t(t3("划线", "Highlights", "Mistari"))}</th><th>{t(t3("笔记", "Notes", "Maelezo"))}</th><th>{t(t3("生词加卡", "Words to cards", "Maneno"))}</th></tr></thead><tbody>{[["Amara Okafor", .42, 9, 3, 6], ["Chidi Nwosu", .3, 4, 1, 9], ["Fatima Bello", .61, 12, 5, 4], ["Tunde Adeyemi", .18, 2, 0, 3]].map(([n, p, h, no, w]) => <tr key={n as string}><td><b>{n}</b></td><td><Bar v={p as number} tone="gold" /></td><td className="num">{h}</td><td className="num">{no}</td><td className="num">{w}</td></tr>)}</tbody></table></div>
          <div style={{ marginTop: 16 }} className="page">
            <div className="dim small" style={{ fontFamily: "var(--font)" }}>{t(t3("范文批注 · Amara · 第四章", "Model text annotation · Amara · Chapter 4", "Maelezo ya mfano · Amara · Sura ya 4"))}</div>
            <p style={{ fontSize: 17 }}>有的客人是中国人，他们听到我说中文，都很<span className="hl b">高兴<span className="note-mark">师</span></span>。晚上没有电的时候，我在手机上复习汉字。</p>
            <div style={{ fontFamily: "var(--font)", fontSize: 13, color: "#555", marginTop: 8 }}>{t(t3("王老师：「都很高兴」用得好。建议改「有的客人」为「有些客人」更自然。（已征得家长同意后可作范文）", "Wang Laoshi: “都很高兴” is well used. “有些客人” reads more naturally than “有的客人”. (Usable as a model text once parental consent is confirmed.)", "Wang Laoshi: “都很高兴” imetumika vizuri."))}</div>
          </div>
        </Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2"><Head title={t3("推荐给班级", "Recommend to class", "Pendekeza kwa darasa")} /><ul className="list">{books.slice(1, 4).map((b) => <li key={b.id}><div style={{ width: 34, height: 46, borderRadius: 3, background: b.color }} /><div className="t"><b>{b.title}</b><span>{t(b.source)} · {t(b.strand)}</span></div><button className="btn btn--sm">{t(t3("推送", "Push", "Sukuma"))}</button></li>)}</ul></Panel>
          <Panel className="in in-3" gold><Head title={t3("与出版、书院的衔接", "Link to publishing and the academy", "Uhusiano na uchapishaji")} /><p className="small mute">{t(t3("获奖作文 → 出版社编辑 → 分级标注 → 自动上架图书馆 → 老师布置共读 → 阅读数据回流知识图谱。优秀的班级作品可推荐进入下一届作品集。", "Winning essays → publisher editing → level tagging → auto-listed in the library → teacher assigns shared reading → reading data flows to the knowledge graph. Strong class work can be nominated for the next anthology.", "Insha zilizoshinda → uhariri → viwango → maktaba → usomaji wa pamoja → grafu ya maarifa."))}</p><button className="btn btn--sm btn--gold" style={{ marginTop: 8 }}>{t(t3("推荐 Amara 的作文进入作品集", "Nominate Amara's essay for the anthology", "Pendekeza insha ya Amara"))}</button></Panel>
        </div>
      </div>
    </Shell>
  );
}
