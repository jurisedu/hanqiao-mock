"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar, Stat } from "@/components/ui";
import { schoolRole, schoolNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Reports() {
  const t = useT();
  return (
    <Shell role={schoolRole} nav={schoolNav} title={t3("报告与证书", "Reports & certificates", "Ripoti na vyeti")} sub={t3("周报自动生成（英文 / 中文）· 结业证书批量核验 · 与当地教育部门衔接的学期报告", "Weekly reports auto-generated (English / Chinese) · batch certificate verification · term report for the local education authority", "Ripoti za wiki · uthibitisho wa vyeti · ripoti ya muhula")} net={2}>
      <div className="grid c3">
        <Panel className="span2 in" lift={false}><Head title={t3("本周报告 · 第 3 周", "Weekly report · week 3", "Ripoti ya wiki · wiki 3")} right={<div className="row"><Badge tone="good">{t(t3("已生成", "Generated", "Imetengenezwa"))}</Badge><button className="btn btn--sm">PDF · EN</button><button className="btn btn--sm">PDF · 中文</button></div>} />
          <div className="grid c4" style={{ marginBottom: 14 }}><Stat value={93} suffix="%" label={t3("出勤", "attendance", "mahudhurio")} /><Stat value={86} suffix="%" label={t3("作业", "homework", "kazi")} /><Stat value={146} label={t3("人均练习分钟", "practice min / learner", "dakika / mwanafunzi")} /><Stat value={70} suffix="%" label={t3("离线完成", "completed offline", "nje ya mtandao")} /></div>
          <p className="small" style={{ lineHeight: 1.8 }}>{t(t3("本周 128 名学员中 119 人活跃。班级层面最薄弱的知识点是第三声（42% 校准掌握度）与 j/q/x 声母；老师已安排周三直播专项带读。停电影响两次，均通过离线练习与回放补齐。3 名学员连续缺席两次，已通知班主任与家长。", "119 of 128 learners were active this week. The weakest class-level points are tone 3 (42% calibrated mastery) and the j/q/x initials; the teacher has scheduled a live drill on Wednesday. Two power cuts were absorbed through offline practice and replays. Three learners missed two consecutive sessions; homeroom and parents notified.", "Wanafunzi 119 kati ya 128 walikuwa hai. Mada dhaifu ni toni ya 3 (42%) na j/q/x. Kukatika kwa umeme mara mbili kulifidiwa."))}</p>
          <div className="small mute" style={{ marginTop: 10 }}>{t(t3("报告只汇总班级层面数据，不含个人错题原文；数字来自系统日志，可追溯。", "Reports aggregate class-level data only, with no individual error texts; every figure traces back to system logs.", "Ripoti hujumlisha data ya darasa tu; kila nambari inafuatiliwa."))}</div>
        </Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2" gold><Head title={t3("证书核验", "Certificate verification", "Uthibitisho wa vyeti")} /><p className="small mute">{t(t3("上传证书编号列表或扫码，批量核验真伪。", "Upload a list of certificate numbers or scan codes to verify in bulk.", "Pakia orodha ya nambari za vyeti au changanua msimbo."))}</p><div className="row" style={{ marginTop: 10 }}><button className="btn btn--sm btn--gold">{t(t3("批量核验", "Verify in bulk", "Thibitisha kwa wingi"))}</button></div><ul className="list small" style={{ marginTop: 10 }}><li><div className="t"><b>GACEE-2026-000917</b><span>Fatima Bello · YCT 1</span></div><Badge tone="good">{t(t3("有效", "Valid", "Halali"))}</Badge></li><li><div className="t"><b>GACEE-2026-000918</b><span>Emeka Obi · YCT 1</span></div><Badge tone="good">{t(t3("有效", "Valid", "Halali"))}</Badge></li></ul></Panel>
          <Panel className="in in-3"><Head title={t3("学期报告 · 教育部门版", "Term report · education authority", "Ripoti ya muhula")} /><Bar v={0.45} /><div className="small mute" style={{ marginTop: 8 }}>{t(t3("与拉各斯州课程标准对照的学期报告，11 月底试点复盘后生成。", "A term report mapped to Lagos State curriculum standards, generated after the pilot review in late November.", "Ripoti ya muhula ikilinganishwa na viwango vya mtaala wa Lagos, baada ya Novemba."))}</div></Panel>
        </div>
      </div>
    </Shell>
  );
}
