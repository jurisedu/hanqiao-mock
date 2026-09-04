"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar } from "@/components/ui";
import { opsRole, opsNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Content() {
  const t = useT();
  const units = [["Unit 1–4", "HSK 1", 4, 1, 1], ["Unit 5", "HSK 1", 1, 1, .98], ["Unit 6", "HSK 1", 1, 1, .86], ["Unit 7", "HSK 1", 1, .6, 0], ["Unit 8", "HSK 1", 1, .2, 0], ["HSK 2 · Unit 1–3", "HSK 2", 3, .35, 0]];
  return (
    <Shell role={opsRole} nav={opsNav} title={t3("课程与内容包", "Courses & content packs", "Kozi na vifurushi")} sub={t3("教研审校 → 图谱挂载 → 转码 → 内容包 → 夜间推送；未经审校内容不进图谱", "Pedagogy review → graph mounting → transcoding → packs → night push; unreviewed content never enters the graph", "Ukaguzi → grafu → ubadilishaji → vifurushi → usiku")} net={3}>
      <div className="grid c3">
        <Panel className="span2 in" lift={false}><Head title={t3("内容流水线", "Content pipeline", "Mchakato wa maudhui")} />
          <div className="tbl"><table><thead><tr><th>{t(t3("单元", "Unit", "Kitengo"))}</th><th>{t(t3("等级", "Level", "Kiwango"))}</th><th>{t(t3("课件", "Lessons", "Masomo"))}</th><th>{t(t3("审校", "Reviewed", "Imekaguliwa"))}</th><th>{t(t3("已分发到学员", "Delivered to learners", "Imesambazwa"))}</th><th></th></tr></thead><tbody>{units.map(([u, l, n, r, d]) => <tr key={u as string}><td><b>{u}</b></td><td>{l}</td><td className="num">{n}</td><td><Bar v={r as number} tone={(r as number) === 1 ? "good" : "warn"} /></td><td><Bar v={d as number} /></td><td>{(r as number) === 1 ? <Badge tone="good">{t(t3("已入图谱", "In graph", "Kwenye grafu"))}</Badge> : <Badge tone="warn">{t(t3("刘老师终审中", "Final review", "Ukaguzi wa mwisho"))}</Badge>}</td></tr>)}</tbody></table></div>
        </Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2"><Head title={t3("内容产能", "Content capacity", "Uwezo wa maudhui")} /><dl className="kv"><dt>{t(t3("课件", "Lessons", "Masomo"))}</dt><dd>8 / 12 {t(t3("周", "weeks", "wiki"))}</dd><dt>{t(t3("题库", "Item bank", "Benki ya maswali"))}</dt><dd className="num">412 / 300 ✓</dd><dt>{t(t3("复习卡", "Review cards", "Kadi"))}</dt><dd className="num">520 / 400 ✓</dd><dt>{t(t3("拍照作业题", "Photo tasks", "Kazi za picha"))}</dt><dd className="num">6 / 6 ✓</dd><dt>{t(t3("AI 辅助生成占比", "AI-assisted share", "Sehemu ya AI"))}</dt><dd>62% · {t(t3("全部经老师逐题审校", "all teacher-reviewed item by item", "yote yamekaguliwa"))}</dd></dl></Panel>
          <Panel className="in in-3"><Head title={t3("内容包分发", "Pack delivery", "Usambazaji wa vifurushi")} /><ul className="list small">{[["Unit 6 · 42 MB", "Lagos", .98, "Cloudflare"], ["Unit 6 · 42 MB", "Abuja", .86, "Cloudflare"], ["Unit 6 audio · 9 MB", "Abuja 2G", 1, t(t3("学校缓存点", "school cache", "hifadhi ya shule"))], ["Unit 5 · 48 MB", "Mombasa", .91, "Alibaba CDN"]].map(([n, c, v, cdn]) => <li key={(n as string) + c}><div className="t"><b>{n}</b><span>{c} · {cdn}</span><Bar v={v as number} tone={(v as number) > .9 ? "good" : "warn"} /></div></li>)}</ul></Panel>
        </div>
      </div>
    </Shell>
  );
}
