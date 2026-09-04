"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Stat, Badge, Bar, Bars, Spark } from "@/components/ui";
import { schoolRole, schoolNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";
import { classes } from "@/lib/data";

export default function School() {
  const t = useT();
  return (
    <Shell role={schoolRole} nav={schoolNav} title={t3("Great Heights School · 总览", "Great Heights School · overview", "Great Heights School · muhtasari")} sub={t3("拉各斯 · 128 名学员 · 5 个班 · 22 台共享设备 · 试点校（免费期至 2027-02）", "Lagos · 128 learners · 5 classes · 22 shared devices · pilot school (free until 2027-02)", "Lagos · wanafunzi 128 · madarasa 5 · vifaa 22")} net={2}>
      <div className="grid c4">
        <Panel className="in in-1"><Stat value={128} label={t3("学员", "learners", "wanafunzi")} delta="+12" /></Panel>
        <Panel className="in in-2"><Stat value={93} suffix="%" label={t3("本周出勤（含回放）", "attendance this week incl. replay", "mahudhurio wiki hii")} /></Panel>
        <Panel className="in in-3"><Stat value={100} suffix="%" label={t3("家长同意", "parental consent", "idhini ya wazazi")} /></Panel>
        <Panel className="in in-4"><Stat value={41} label={t3("停电时段仍完成练习（昨晚）", "practised during last night's power cut", "walifanya mazoezi wakati wa kukatika")} /></Panel>
        <Panel className="span2 in in-2"><Head title={t3("班级", "Classes", "Madarasa")} /><div className="tbl"><table><thead><tr><th>{t(t3("班级", "Class", "Darasa"))}</th><th>{t(t3("老师", "Teacher", "Mwalimu"))}</th><th>{t(t3("人数", "N", "Idadi"))}</th><th>{t(t3("出勤", "Attendance", "Mahudhurio"))}</th><th>{t(t3("下次直播（WAT）", "Next live (WAT)", "Somo lijalo (WAT)"))}</th></tr></thead><tbody>{classes.filter((c) => c.school === "Great Heights School").concat([{ ...classes[0], id: "c4", name: "YCT1 · Great Heights D", n: 31, attendance: .9, next: t3("周二 15:30", "Tue 15:30", "Jumanne 15:30"), teacher: "Li Laoshi" }, { ...classes[0], id: "c5", name: "HSK1 · Great Heights E", n: 26, attendance: .87, next: t3("周四 16:00", "Thu 16:00", "Alhamisi 16:00"), teacher: "Li Laoshi" }]).map((c) => <tr key={c.id}><td><b>{c.name}</b></td><td>{c.teacher}</td><td className="num">{c.n}</td><td><Bar v={c.attendance} tone="good" /></td><td className="small">{t(c.next)}</td></tr>)}</tbody></table></div></Panel>
        <Panel className="span2 in in-3"><Head title={t3("学校看到什么，看不到什么", "What the school sees, and does not", "Shule huona nini")} /><ul className="list small"><li><Badge tone="good">✓</Badge><div className="t"><b>{t(t3("本校学员的出勤、进度、班级薄弱点汇总", "Own learners' attendance, progress and class-level weak points", "Mahudhurio na maendeleo ya wanafunzi wa shule"))}</b></div></li><li><Badge tone="good">✓</Badge><div className="t"><b>{t(t3("设备与网络、同意书、报告与证书", "Devices, network, consent forms, reports and certificates", "Vifaa, mtandao, idhini, ripoti na vyeti"))}</b></div></li><li><Badge tone="bad">✕</Badge><div className="t"><b>{t(t3("其它学校的任何数据", "Any data from other schools", "Data yoyote ya shule nyingine"))}</b><span>{t(t3("租户隔离，自动化测试每次发布验证", "tenant isolation, verified by automated tests on every release", "utengano wa wapangaji"))}</span></div></li><li><Badge tone="bad">✕</Badge><div className="t"><b>{t(t3("学员的个人错题原文与对话记录", "Individual learners' error texts and conversation logs", "Maandishi ya makosa ya mtu binafsi"))}</b><span>{t(t3("仅老师与学员本人可见", "visible only to the teacher and the learner", "mwalimu na mwanafunzi tu"))}</span></div></li></ul></Panel>
        <Panel className="span2 in in-4"><Head title={t3("每日活跃 · 14 天", "Daily active · 14 days", "Hai kila siku · siku 14")} /><Bars data={[80, 92, 88, 95, 90, 40, 35, 84, 96, 91, 97, 89, 45, 38]} labels={["M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F", "S", "S"]} color="var(--accent)" h={100} /></Panel>
        <Panel className="span2 in in-5"><Head title={t3("停电与离线", "Power cuts & offline", "Kukatika kwa umeme na nje ya mtandao")} /><Spark data={[52, 58, 61, 64, 66, 64, 70]} color="var(--gold)" h={60} /><div className="small mute" style={{ marginTop: 8 }}>{t(t3("离线完成的练习占比升到 70%；昨晚 19:00–21:00 停电，41 名学员用共享设备完成复习，联网后 06:12 全部同步。", "Practice completed offline rose to 70%; during last night's 19:00–21:00 outage, 41 learners finished review on shared devices and all synced by 06:12.", "Mazoezi nje ya mtandao yamefikia 70%; jana usiku wanafunzi 41 walimaliza marudio na kusawazisha saa 06:12."))}</div></Panel>
      </div>
    </Shell>
  );
}
