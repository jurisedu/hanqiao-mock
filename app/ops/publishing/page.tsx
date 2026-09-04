"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar, Stat, Bars } from "@/components/ui";
import { opsRole, opsNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";
import { books } from "@/lib/data";

export default function Publishing() {
  const t = useT();
  return (
    <Shell role={opsRole} nav={opsNav} title={t3("出版与图书馆", "Publishing & library", "Uchapishaji na maktaba")} sub={t3("出版沉淀内容 → 未来书院形成课程 → 平台规模化 → 协会连接资源：图书馆是四者在学员面前的交汇点", "Publishing curates → Future Academy builds curricula → the platform scales → the association connects: the library is where all four meet the learner", "Uchapishaji → Future Academy → jukwaa → chama: maktaba ndipo yote hukutana")} net={3}>
      <div className="grid c4">
        <Panel className="in in-1"><Stat value={51} label={t3("在架图书", "titles on shelf", "vitabu")} delta="+5" /></Panel>
        <Panel className="in in-2"><Stat value={3812} label={t3("本月阅读时长（小时）", "reading hours this month", "saa za kusoma mwezi huu")} delta="+28%" /></Panel>
        <Panel className="in in-3"><Stat value={14620} label={t3("划线与笔记", "highlights & notes", "mistari na maelezo")} /></Panel>
        <Panel className="in in-4"><Stat value={2140} label={t3("生词加入复习卡", "words added to review cards", "maneno kwenye kadi")} /></Panel>
        <Panel className="span2 in in-2"><Head title={t3("出版流水线 · 第二届作品集", "Publishing pipeline · 2nd anthology", "Mchakato · mkusanyiko wa 2")} right={<Badge tone="gold">{t(t3("李社长 · 出版与媒体", "Publishing & media lead", "Uchapishaji na vyombo vya habari"))}</Badge>} />
          <ol className="tl"><li className="done">{t(t3("获奖作文 186 篇 → 家长与作者授权（非独占）", "186 winning essays → parental and author licences (non-exclusive)", "Insha 186 → idhini za wazazi na waandishi"))}</li><li className="done">{t(t3("编辑审校 → 版式 → ISBN", "Editing → layout → ISBN", "Uhariri → mpangilio → ISBN"))}</li><li className="done">{t(t3("分级标注：HSK 1–3 · 挂到课程图谱知识点", "Level tagging: HSK 1–3 · linked to knowledge points", "Viwango: HSK 1–3 · imeunganishwa na grafu"))}</li><li>{t(t3("电子版上架图书馆（离线可缓存）· 老师音色朗读生成中 62%", "Digital edition listed (cacheable offline) · teacher-voice read-aloud 62% generated", "Toleo la kidijitali · sauti ya mwalimu 62%"))}</li><li className="todo">{t(t3("纸质版 → 校长中国行伴手礼 · 海外华校馆藏", "Print edition → Principals Tour gifts · overseas school libraries", "Toleo la karatasi → zawadi · maktaba za shule"))}</li></ol>
        </Panel>
        <Panel className="span2 in in-3"><Head title={t3("馆藏 · 按板块与等级", "Collection · by strand and level", "Mkusanyiko · kwa vipengele")} /><div className="tbl"><table><thead><tr><th>{t(t3("书名", "Title", "Kichwa"))}</th><th>{t(t3("来源", "Source", "Chanzo"))}</th><th>{t(t3("板块", "Strand", "Kipengele"))}</th><th>{t(t3("阅读率", "Read rate", "Kiwango cha kusoma"))}</th></tr></thead><tbody>{books.map((b) => <tr key={b.id}><td><div className="row"><span style={{ width: 22, height: 30, borderRadius: 2, background: b.color }} /><b>{b.title}</b></div></td><td className="small">{t(b.source)}</td><td className="small">{t(b.strand)}</td><td><Bar v={b.progress || .05} tone="gold" /></td></tr>)}</tbody></table></div></Panel>
        <Panel className="span2 in in-4"><Head title={t3("阅读回流知识图谱", "Reading feeds the knowledge graph", "Kusoma hulisha grafu")} /><Bars data={[120, 210, 340, 290, 410, 520, 610]} labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7"]} color="var(--gold)" h={110} /><div className="small mute" style={{ marginTop: 8 }}>{t(t3("每周由阅读产生的生词卡与理解题作答数；阅读中的点词与理解题按知识点打点，进入校准掌握度。", "Weekly word cards and comprehension attempts generated from reading; taps and comprehension items are mapped to knowledge points and enter calibrated mastery.", "Kadi za maneno na majibu ya ufahamu kila wiki; huingia kwenye umahiri uliosahihishwa."))}</div></Panel>
        <Panel className="span2 in in-5" gold><Head title={t3("未来书院 · 读本规划", "Future Academy · reader plan", "Future Academy · mpango wa vitabu")} /><ul className="list small">{[[t3("中华文化与中文", "Chinese culture & language", "Utamaduni na lugha"), 24, 8], [t3("世界文明与全球视野", "World civilisations", "Ustaarabu wa dunia"), 11, 6], [t3("AI 与未来能力", "AI & future capabilities", "AI na uwezo"), 7, 5], [t3("青少年成长与实践", "Growth & practice", "Ukuaji na mazoezi"), 9, 4]].map(([n, have, plan]) => <li key={t(n as never)}><div className="t"><b>{t(n as never)}</b><span>{have as number} {t(t3("在架", "on shelf", "kwenye rafu"))} · {plan as number} {t(t3("编写中", "in production", "zinatengenezwa"))}</span></div><Badge tone="gold">{t(t3("张老师评审", "Expert review", "Ukaguzi wa mtaalamu"))}</Badge></li>)}</ul></Panel>
      </div>
    </Shell>
  );
}
