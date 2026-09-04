"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Stat, Badge, Bar, Bars, Spark } from "@/components/ui";
import { enterpriseRole, enterpriseNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Enterprise() {
  const t = useT();
  return (
    <Shell role={enterpriseRole} nav={enterpriseNav} title={t3("委托班总览", "Commissioned class overview", "Muhtasari wa darasa la agizo")} sub={t3("Sino-Lagos Energy · 本地员工中文班 · 2 组 36 人 · 职场中文 HSK 1 · 12 周", "Sino-Lagos Energy · Chinese for local staff · 2 groups, 36 people · workplace Chinese HSK 1 · 12 weeks", "Sino-Lagos Energy · Kichina kwa wafanyakazi · vikundi 2, watu 36 · wiki 12")} net={3}>
      <div className="grid c4">
        <Panel className="in in-1"><Stat value={36} label={t3("员工学员", "staff learners", "wafanyakazi")} /></Panel>
        <Panel className="in in-2"><Stat value={89} suffix="%" label={t3("出勤（含回放）", "attendance incl. replay", "mahudhurio")} delta="+2%" /></Panel>
        <Panel className="in in-3"><Stat value={7} label={t3("已完成周数 / 12", "weeks completed / 12", "wiki zilizokamilika / 12")} /></Panel>
        <Panel className="in in-4"><Stat value={31} label={t3("预计结业（≥80% 出勤 + 模拟考通过）", "expected to complete (≥80% attendance + mock pass)", "wanaotarajiwa kuhitimu")} /></Panel>
        <Panel className="span2 in in-2"><Head title={t3("分组", "Groups", "Vikundi")} /><div className="tbl"><table><thead><tr><th>{t(t3("组", "Group", "Kikundi"))}</th><th>{t(t3("部门", "Department", "Idara"))}</th><th>{t(t3("人数", "N", "Idadi"))}</th><th>{t(t3("出勤", "Attendance", "Mahudhurio"))}</th><th>{t(t3("进度", "Progress", "Maendeleo"))}</th><th>{t(t3("时段", "Slot", "Nafasi"))}</th></tr></thead><tbody>{[["A", t3("现场运营", "Field operations", "Uendeshaji"), 20, .91, .6, "Mon/Thu 18:00 WAT"], ["B", t3("行政与财务", "Admin & finance", "Utawala na fedha"), 16, .86, .55, "Tue/Fri 12:30 WAT"]].map(([g, d, n, a, p, s]) => <tr key={g as string}><td><b>{g as string}</b></td><td>{t(d as never)}</td><td className="num">{n as number}</td><td><Bar v={a as number} tone="good" /></td><td><Bar v={p as number} /></td><td className="small mono">{s as string}</td></tr>)}</tbody></table></div></Panel>
        <Panel className="span2 in in-3"><Head title={t3("职场场景进度", "Workplace scenario progress", "Maendeleo ya mandhari ya kazini")} /><ul className="list small">{[[t3("自我介绍与部门", "Introductions and departments", "Kujitambulisha"), 1], [t3("安全提示与指令", "Safety notices and instructions", "Taarifa za usalama"), .8], [t3("数字、时间、班次", "Numbers, time, shifts", "Nambari, muda, zamu"), .7], [t3("请假与报告", "Leave and reporting", "Likizo na ripoti"), .3], [t3("与中方同事用餐", "Meals with Chinese colleagues", "Chakula na wenzako"), 0]].map(([n, v]) => <li key={t(n as never)}><div className="t"><b>{t(n as never)}</b><Bar v={v as number} tone={(v as number) === 1 ? "good" : (v as number) > 0 ? "" : "warn"} /></div></li>)}</ul></Panel>
        <Panel className="span2 in in-4"><Head title={t3("每周出勤", "Weekly attendance", "Mahudhurio ya kila wiki")} /><Bars data={[94, 92, 88, 90, 86, 89, 89]} labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7"]} color="var(--good)" h={100} /></Panel>
        <Panel className="span2 in in-5"><Head title={t3("HR 可见范围", "What HR can see", "HR huona nini")} /><ul className="list small"><li><Badge tone="good">✓</Badge><div className="t"><b>{t(t3("出勤、进度、结业状态、结算", "Attendance, progress, completion status, billing", "Mahudhurio, maendeleo, hali ya kuhitimu, malipo"))}</b></div></li><li><Badge tone="bad">✕</Badge><div className="t"><b>{t(t3("员工的对话记录、错题原文与个人记忆", "Employees' conversation logs, error texts and personal memory", "Mazungumzo ya wafanyakazi na kumbukumbu binafsi"))}</b><span>{t(t3("员工作为学员的数据主体权利与学校学员相同", "employees have the same data-subject rights as school learners", "haki sawa za data"))}</span></div></li></ul><Spark data={[10, 14, 18, 22, 26, 29, 31]} color="var(--accent)" h={50} /><div className="small mute">{t(t3("预计结业人数趋势", "expected completions trend", "mwelekeo wa kuhitimu"))}</div></Panel>
      </div>
    </Shell>
  );
}
