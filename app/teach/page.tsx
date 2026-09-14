"use client";
import Link from "next/link";
import Shell from "@/components/Shell";
import { Panel, Head, Stat, Badge, Bar, Spark, Trace } from "@/components/ui";
import { teacherRole, teacherNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";
import { classes, reviewQueue, proposals, news } from "@/lib/data";
import { Wand2 } from "lucide-react";

export default function TeachHome() {
  const t = useT();
  return (
    <Shell role={teacherRole} nav={teacherNav} title={t3("工作台", "Workbench", "Dawati")} sub={t3("周五 · 郑州 09:20 · 拉各斯 02:20 · 本周已授 6 课时，AI 承接练习 1,240 次", "Friday · Zhengzhou 09:20 · Lagos 02:20 · 6 hours taught this week, AI handled 1,240 practice sessions", "Ijumaa · Zhengzhou 09:20 · Lagos 02:20")} net={3}>
      <div className="grid c4">
        <Panel className="in in-1"><Stat value={71} label={t3("学员（3 个班）", "learners (3 classes)", "wanafunzi (madarasa 3)")} delta="+4" /></Panel>
        <Panel className="in in-2"><Stat value={3} label={t3("待复核 · 仅分歧与主观题", "to review · disagreements and subjective only", "kukaguliwa · kutokubaliana na maoni tu")} /></Panel>
        <Panel className="in in-3"><Stat value={6.5} label={t3("本周老师课时（去年同规模需 18）", "teacher hours this week (18 at the same scale last year)", "saa za mwalimu wiki hii (18 mwaka jana)")} delta="−64%" up /></Panel>
        <Panel className="in in-4"><Stat value={2} label={t3("AI 提议待审批", "AI proposals awaiting approval", "mapendekezo yanayosubiri")} /></Panel>
        <Panel className="span2 in in-2"><Head title={t3("班主任智能体 · 今晨摘要", "Homeroom Agent · morning brief", "Wakala wa Darasa · muhtasari wa asubuhi")} right={<Badge tone="acc">{t(t3("草拟，未发送", "Draft, not sent", "Rasimu, haijatumwa"))}</Badge>} />
          <p style={{ fontSize: 15, lineHeight: 1.8 }}>{t(t3("Great Heights A 班昨晚停电 2 小时，41 人仍完成离线练习；New Horizon B 班 6 人 Unit 5 下载失败（2G），已提议改推纯音频版。Chidi 的第三声出现评分分歧，建议周三直播用 3 分钟带读。Amara 在作文里写「把我们的故事讲给世界听」，可作范文（需家长同意）。", "Great Heights A lost power for 2 h last night; 41 learners still finished offline practice. Six in New Horizon B failed to download Unit 5 on 2G; an audio-only push is proposed. Chidi's tone 3 has a scoring disagreement; suggest a 3-minute drill in Wednesday's live class. Amara wrote “tell our story to the world” in her essay, a candidate model text (needs parental consent).", "Great Heights A ilikosa umeme saa 2; wanafunzi 41 walimaliza mazoezi nje ya mtandao. Sita katika New Horizon B walishindwa kupakua Unit 5; sauti pekee imependekezwa."))}</p>
          <div style={{ marginTop: 12 }}><Trace steps={[["route", t(t3("路由：班级学情", "route: class insight", "njia: hali ya darasa"))], ["ground", t(t3("依据：出勤 / 下载 / 掌握度", "ground: attendance / downloads / mastery", "msingi: mahudhurio / upakuaji / umahiri"))], ["recall", t(t3("召回：上周备注", "recall: last week's notes", "kumbuka: maelezo ya wiki iliyopita"))], ["human", t(t3("老师决定是否发送", "teacher decides to send", "mwalimu anaamua"))]]} /></div>
          <div className="row" style={{ marginTop: 14 }}><Link href="/teach/proposals" className="btn btn--primary btn--sm">{t(t3("处理 2 条提议", "Handle 2 proposals", "Shughulikia mapendekezo 2"))}</Link><Link href="/teach/studio" className="btn btn--sm"><Wand2 size={14} /> {t(t3("为周三这节课备课", "Prep Wednesday's lesson", "Andaa somo la Jumatano"))}</Link><button className="btn btn--sm">{t(t3("发给家长群（英文）", "Send to parents (English)", "Tuma kwa wazazi (Kiingereza)"))}</button></div>
        </Panel>
        <Panel className="span2 in in-3"><Head title={t3("复核队列", "Review queue", "Foleni ya ukaguzi")} more={t3("全部", "All", "Zote")} />
          <ul className="list">{reviewQueue.slice(0, 3).map((r) => <li key={r.id}><Badge tone={r.kind === "sign" ? "good" : r.kind === "decide" ? "warn" : "bad"}>{r.kind === "sign" ? t(t3("签发", "Sign", "Idhinisha")) : r.kind === "decide" ? t(t3("裁定", "Decide", "Amua")) : t(t3("批改", "Grade", "Sahihisha"))}</Badge><div className="t"><b>{r.learner} · {t(r.type)}</b><span>{t(r.ai)}</span></div><span className="small mono mute">{r.confidence ? Math.round(r.confidence * 100) + "%" : "—"}</span></li>)}</ul>
        </Panel>
        <Panel className="span2 in in-4"><Head title={t3("我的班级", "My classes", "Madarasa yangu")} />
          <div className="tbl"><table><thead><tr><th>{t(t3("班级", "Class", "Darasa"))}</th><th>{t(t3("人数", "N", "Idadi"))}</th><th>{t(t3("出勤", "Attendance", "Mahudhurio"))}</th><th>{t(t3("作业", "Homework", "Kazi"))}</th><th>{t(t3("薄弱", "Weak", "Dhaifu"))}</th><th>{t(t3("下次直播", "Next live", "Somo lijalo"))}</th></tr></thead><tbody>{classes.map((c) => <tr key={c.id}><td><Link href={`/teach/class/${c.id}`} style={{ color: "var(--accent-2)", fontWeight: 600 }}>{c.name}</Link><div className="dim small">{c.school} · {c.city}</div></td><td className="num">{c.n}</td><td><Bar v={c.attendance} tone="good" /><span className="small mute">{Math.round(c.attendance * 100)}%</span></td><td><Bar v={c.homework} /><span className="small mute">{Math.round(c.homework * 100)}%</span></td><td><Badge tone={c.weak > 5 ? "warn" : ""}>{c.weak}</Badge></td><td className="small">{t(c.next)}</td></tr>)}</tbody></table></div>
        </Panel>
        <Panel className="in in-5"><Head title={t3("老师时间去哪了", "Where teacher time goes", "Muda wa mwalimu unaenda wapi")} /><Spark data={[18, 16, 14, 12, 10, 8, 7, 6.5]} color="var(--gold)" h={60} /><div className="small mute" style={{ marginTop: 8 }}>{t(t3("每周课时：直播 3 · 复核 2 · 录课 1.5 · 沟通 0（智能体草拟）", "Weekly hours: live 3 · review 2 · recording 1.5 · messaging 0 (agent drafts)", "Saa za wiki: moja kwa moja 3 · ukaguzi 2 · kurekodi 1.5 · mawasiliano 0"))}</div></Panel>
        <Panel className="in in-6"><Head title={t3("动态", "Updates", "Taarifa")} /><ul className="list small">{news.map((n) => <li key={n.d}><span className="mono dim">{n.d}</span><div className="t"><span>{t(n.t)}</span></div></li>)}</ul></Panel>
      </div>
    </Shell>
  );
}
