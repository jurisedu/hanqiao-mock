"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar } from "@/components/ui";
import { enterpriseRole, enterpriseNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Attendance() {
  const t = useT();
  const staff = ["Blessing Okoro", "Ibrahim Musa", "Chiamaka Eze", "Samuel Adebayo", "Grace Nnamdi", "Yusuf Bello", "Ada Obi", "Kunle Ojo"];
  return (
    <Shell role={enterpriseRole} nav={enterpriseNav} title={t3("出勤与进度", "Attendance & progress", "Mahudhurio na maendeleo")} sub={t3("按周导出 · 回放计入出勤 · 每人进度来自校准掌握度", "Weekly export · replays count as attendance · progress from calibrated mastery", "Hamisha kwa wiki · rekodi huhesabiwa · maendeleo kutoka umahiri")} net={3}>
      <div className="grid c3">
        <Panel className="span2 in" lift={false}><Head title={t3("A 组 · 现场运营", "Group A · field operations", "Kikundi A")} right={<div className="row"><button className="btn btn--sm">CSV</button><button className="btn btn--sm">PDF</button></div>} /><div className="tbl"><table><thead><tr><th>{t(t3("员工", "Employee", "Mfanyakazi"))}</th>{["W1", "W2", "W3", "W4", "W5", "W6", "W7"].map((w) => <th key={w}>{w}</th>)}<th>{t(t3("进度", "Progress", "Maendeleo"))}</th></tr></thead><tbody>{staff.map((n, i) => <tr key={n}><td><b>{n}</b></td>{[0, 1, 2, 3, 4, 5, 6].map((w) => { const v = (i * 7 + w * 3) % 10; return <td key={w}>{v < 7 ? <Badge tone="good">✓</Badge> : v < 9 ? <Badge tone="acc">▶</Badge> : <Badge tone="bad">✕</Badge>}</td>; })}<td><Bar v={0.45 + (i % 4) * 0.1} /></td></tr>)}</tbody></table></div><div className="small mute" style={{ marginTop: 8 }}>✓ {t(t3("直播出席", "live", "moja kwa moja"))} · ▶ {t(t3("回放补课", "replay", "rekodi"))} · ✕ {t(t3("缺席", "absent", "hayupo"))}</div></Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2" glow><Head title={t3("班主任智能体 提醒", "Homeroom Agent notice", "Taarifa ya wakala")} /><p className="small">{t(t3("Kunle Ojo 连续两周缺席且未看回放，进度落后 3 周。建议 HR 确认排班冲突；老师已准备 15 分钟补课录播。", "Kunle Ojo has missed two weeks without replays and is three weeks behind. Suggest HR checks for shift conflicts; the teacher has a 15-minute catch-up recording ready.", "Kunle Ojo amekosa wiki mbili. Pendekeza HR ikague zamu."))}</p><div className="row" style={{ marginTop: 10 }}><button className="btn btn--sm btn--primary">{t(t3("通知主管", "Notify supervisor", "Arifu msimamizi"))}</button></div></Panel>
          <Panel className="in in-3"><Head title={t3("结业门槛", "Completion threshold", "Kizingiti cha kuhitimu")} /><dl className="kv"><dt>{t(t3("出勤", "Attendance", "Mahudhurio"))}</dt><dd>≥ 80%</dd><dt>{t(t3("模拟考", "Mock exam", "Mtihani"))}</dt><dd>≥ 120 / 200</dd><dt>{t(t3("口语", "Speaking", "Kuzungumza"))}</dt><dd>{t(t3("老师签发", "teacher sign-off", "idhini ya mwalimu"))}</dd></dl></Panel>
        </div>
      </div>
    </Shell>
  );
}
