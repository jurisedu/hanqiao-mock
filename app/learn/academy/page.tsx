"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar, Tilt } from "@/components/ui";
import { learnerRole, learnerNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Academy() {
  const t = useT();
  const strands = [
    { n: t3("中华文化与中文教育", "Chinese culture & language", "Utamaduni na lugha ya Kichina"), c: "#1f3aa8", items: [t3("中文阅读与写作", "Reading & writing", "Kusoma na kuandika"), t3("国学经典与传统文化", "Classics & traditions", "Klasiki na desturi"), t3("非遗、历史与文明", "Heritage & history", "Urithi na historia")], p: 0.46 },
    { n: t3("世界文明与全球视野", "World civilisations & global outlook", "Ustaarabu wa dunia"), c: "#b8912f", items: [t3("世界文学与文明", "World literature", "Fasihi ya dunia"), t3("跨文化理解", "Intercultural understanding", "Uelewa wa tamaduni"), t3("全球议题", "Global issues", "Masuala ya kimataifa")], p: 0.2 },
    { n: t3("AI 科技与未来能力", "AI & future capabilities", "AI na uwezo wa baadaye"), c: "#4b3fb5", items: [t3("AI 素养", "AI literacy", "Ujuzi wa AI"), t3("创新思维与问题解决", "Creative problem solving", "Utatuzi wa matatizo"), t3("跨学科探索", "Interdisciplinary enquiry", "Uchunguzi wa taaluma mbalimbali")], p: 0.12 },
    { n: t3("青少年成长与社会实践", "Growth & social practice", "Ukuaji na mazoezi ya kijamii"), c: "#1f9d6a", items: [t3("思辨、表达与领导力", "Debate, expression, leadership", "Mjadala, kujieleza, uongozi"), t3("公益与志愿服务", "Service & volunteering", "Huduma na kujitolea"), t3("项目制学习", "Project-based learning", "Kujifunza kwa miradi")], p: 0.3 },
  ];
  return (
    <Shell role={learnerRole} nav={learnerNav} title={t3("未来书院", "Future Academy", "Future Academy")} sub={t3("中学为体 · 西学为用 · 面向未来 — 四大板块，课程 → 国际课堂 → 研学 → 全球交流", "Rooted in culture, open to the world, ready for what comes next: four strands, from curriculum to classroom, study journeys and global exchange", "Vipengele vinne: mtaala → darasa la kimataifa → safari za masomo → ubadilishanaji wa kimataifa")} net={3}>
      <div className="grid c2">
        {strands.map((s, i) => (
          <Tilt key={i} max={5}><Panel className={`in in-${i + 1}`} style={{ borderTop: `3px solid ${s.c}` }}>
            <div className="between"><h3>{t(s.n)}</h3><Badge tone="gold">{Math.round(s.p * 100)}%</Badge></div>
            <Bar v={s.p} tone="gold" />
            <ul className="list" style={{ marginTop: 10 }}>{s.items.map((it, j) => <li key={j}><span className="avatar" style={{ background: s.c, width: 26, height: 26, fontSize: 10 }}>{j + 1}</span><div className="t"><b>{t(it)}</b><span>{j === 0 ? t(t3("进行中 · 与 HSK 课程共享知识图谱", "In progress · shares the course graph with HSK lessons", "Inaendelea · hushiriki grafu ya kozi na HSK")) : t(t3("即将开放", "Coming soon", "Inakuja hivi karibuni"))}</span></div>{j === 0 && <button className="btn btn--sm">{t(t3("进入", "Enter", "Ingia"))}</button>}</li>)}</ul>
          </Panel></Tilt>
        ))}
        <Panel className="span2 in in-5" gold>
          <Head title={t3("你的书院之路", "Your academy path", "Njia yako ya chuo")} />
          <ol className="tl"><li className="done">{t(t3("课程体系 · HSK 1 + 中华文化读本", "Curriculum · HSK 1 + culture readers", "Mtaala · HSK 1 + vitabu vya utamaduni"))}</li><li>{t(t3("国际课堂 · 与郑州二中同学共读一本书（10 月）", "International classroom · shared reading with Zhengzhou No.2 students (October)", "Darasa la kimataifa · usomaji wa pamoja (Oktoba)"))}</li><li className="todo">{t(t3("研学实践 · 作文大赛优胜者赴华研学", "Study journey · competition winners travel to China", "Safari ya masomo · washindi wa shindano huenda Uchina"))}</li><li className="todo">{t(t3("全球交流 · 青少年成长共同体", "Global exchange · youth community", "Ubadilishanaji wa kimataifa · jumuiya ya vijana"))}</li></ol>
        </Panel>
      </div>
    </Shell>
  );
}
