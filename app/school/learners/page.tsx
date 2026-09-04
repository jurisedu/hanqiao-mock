"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar } from "@/components/ui";
import { schoolRole, schoolNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Learners() {
  const t = useT();
  const rows = [["Amara Okafor", "HSK1 A", "P5", .93, "✓", "AO"], ["Chidi Nwosu", "HSK1 A", "P5", .82, "✓", "CN"], ["Fatima Bello", "HSK1 A", "P6", .96, "✓", "FB"], ["Tunde Adeyemi", "HSK1 A", "P5", .88, "✓", "TA"], ["Kemi Olawale", "HSK1 E", "P4", .71, "✓", "KO"], ["Emeka Obi", "YCT1 D", "P3", .9, "✓", "EO"], ["Ngozi Eze", "YCT1 D", "P3", .85, t3("待签", "pending", "inasubiri"), "NE"]];
  return (
    <Shell role={schoolRole} nav={schoolNav} title={t3("学员与班级", "Learners & classes", "Wanafunzi na madarasa")} sub={t3("上传名册 → Agent 提议分班（零编造姓名）→ 校方批准 → 发放账号与 PIN", "Upload roster → agent proposes classes (never invents names) → school approves → accounts and PINs issued", "Pakia orodha → wakala hupendekeza madarasa → shule huidhinisha → akaunti na PIN")} net={2}>
      <div className="grid c3">
        <Panel className="span2 in" lift={false}><Head title={t3("名册", "Roster", "Orodha")} right={<div className="row"><button className="btn btn--sm">{t(t3("上传名册（CSV / 照片）", "Upload roster (CSV / photo)", "Pakia orodha"))}</button><button className="btn btn--sm btn--primary">{t(t3("批量发放 PIN", "Issue PINs", "Toa PIN"))}</button></div>} /><div className="tbl"><table><thead><tr><th>{t(t3("学员", "Learner", "Mwanafunzi"))}</th><th>{t(t3("班级", "Class", "Darasa"))}</th><th>{t(t3("年级", "Grade", "Daraja"))}</th><th>{t(t3("出勤", "Attendance", "Mahudhurio"))}</th><th>{t(t3("家长同意", "Consent", "Idhini"))}</th><th>{t(t3("设备", "Device", "Kifaa"))}</th></tr></thead><tbody>{rows.map(([n, c, g, a, k, i]) => <tr key={n as string}><td><div className="row"><span className="avatar" style={{ width: 28, height: 28, fontSize: 10 }}>{i as string}</span><b>{n as string}</b></div></td><td>{c as string}</td><td>{g as string}</td><td><Bar v={a as number} tone="good" /></td><td>{k === "✓" ? <Badge tone="good">✓</Badge> : <Badge tone="warn">{t(k as never)}</Badge>}</td><td className="small mute">{(i as string) === "AO" || (i as string) === "CN" || (i as string) === "FB" ? t(t3("共享 #07", "Shared #07", "Pamoja #07")) : t(t3("自有", "Own", "Binafsi"))}</td></tr>)}</tbody></table></div></Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2" glow><Head title={t3("Agent 提议 · 待批准", "Agent proposal · awaiting approval", "Pendekezo · inasubiri idhini")} /><p className="small">{t(t3("新上传 12 名 P4 学员，建议新开「HSK1 F」班（周二 15:30，李老师）。姓名逐一来自名册，未编造。", "12 new P4 learners uploaded; propose a new class “HSK1 F” (Tue 15:30, Li Laoshi). Every name comes from the roster; none invented.", "Wanafunzi 12 wapya; pendekeza darasa jipya “HSK1 F”. Majina yote yanatoka kwenye orodha."))}</p><div className="row" style={{ marginTop: 10 }}><button className="btn btn--sm btn--good">{t(t3("批准建班", "Approve", "Kubali"))}</button><button className="btn btn--sm">{t(t3("调整", "Adjust", "Rekebisha"))}</button></div></Panel>
          <Panel className="in in-3"><Head title={t3("家长同意", "Parental consent", "Idhini ya wazazi")} /><Bar v={0.99} tone="good" /><div className="small mute" style={{ marginTop: 8 }}>{t(t3("127 / 128 · 1 份待签（Ngozi）· 同意书三语 · 含照片与作品使用的单独勾选", "127 / 128 · 1 pending (Ngozi) · form in 3 languages · separate tick for photos and work", "127 / 128 · 1 inasubiri · fomu kwa lugha 3"))}</div><button className="btn btn--sm" style={{ marginTop: 10 }}>{t(t3("发送提醒（WhatsApp）", "Send reminder (WhatsApp)", "Tuma kikumbusho"))}</button></Panel>
        </div>
      </div>
    </Shell>
  );
}
