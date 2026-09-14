"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge } from "@/components/ui";
import { teacherRole, teacherNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Schedule() {
  const t = useT();
  const days = [t3("周一", "Mon", "Jumatatu"), t3("周二", "Tue", "Jumanne"), t3("周三", "Wed", "Jumatano"), t3("周四", "Thu", "Alhamisi"), t3("周五", "Fri", "Ijumaa")];
  const slots: Record<number, { h: string; n: string; tone: string }[]> = { 0: [{ h: "23:00", n: "HSK1 A · " + t(t3("录播发布", "recording release", "rekodi")), tone: "" }], 2: [{ h: "23:00–23:40", n: "HSK1 A · LIVE", tone: "bad" }], 3: [{ h: "22:30–23:10", n: "HSK1 B · LIVE", tone: "bad" }], 4: [{ h: "23:00–23:40", n: "HSK2 C · LIVE", tone: "bad" }, { h: "21:00", n: t(t3("复核队列清零", "Clear review queue", "Safisha foleni")), tone: "warn" }] };
  return (
    <Shell role={teacherRole} nav={teacherNav} title={t3("排课", "Schedule", "Ratiba")} sub={t3("班主任智能体 按拉各斯放学时间（16:00 WAT = 23:00 CST）与停电预报排出建议，你确认后生效", "The Homeroom Agent proposes slots around Lagos school hours (16:00 WAT = 23:00 CST) and power-cut forecasts; effective after you confirm", "Wakala hupendekeza nafasi kulingana na saa za shule Lagos na utabiri wa umeme")} net={3}>
      <div className="grid c3">
        <Panel className="span2 in" lift={false}>
          <div className="grid" style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
            {days.map((d, i) => <div key={i} className="panel" style={{ minHeight: 220, padding: 12 }}><div className="eyebrow">{t(d)}</div>{(slots[i] ?? []).map((s, j) => <div key={j} style={{ marginTop: 10, padding: 10, borderRadius: 10, background: s.tone === "bad" ? "rgba(255,107,107,.12)" : s.tone === "warn" ? "rgba(245,185,63,.12)" : "var(--panel-2)", border: "1px solid var(--line)" }}><div className="small mono">{s.h}</div><b className="small">{s.n}</b></div>)}{i === 1 && <div className="small dim" style={{ marginTop: 10 }}>{t(t3("空 · 智能体建议：补录 Unit 8", "Free · agent suggests recording Unit 8", "Wazi · pendekezo: rekodi Unit 8"))}</div>}</div>)}
          </div>
          <div className="small mute" style={{ marginTop: 12 }}>{t(t3("时间按你的时区（北京）显示；学员端自动换算为 WAT / EAT。", "Times shown in your zone (Beijing); learners see WAT / EAT automatically.", "Saa zinaonyeshwa kwa eneo lako; wanafunzi huona WAT / EAT."))}</div>
        </Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2" glow><Head title={t3("智能体建议", "Agent suggestion", "Pendekezo la wakala")} /><p className="small">{t(t3("拉各斯 9/10（周三）19:00–21:00 预报停电，与 HSK1 A 直播重叠。建议提前到 16:00 WAT（23:00 CST）或改为录播 + 周四答疑。", "Lagos forecasts a power cut on Wed 9/10, 19:00–21:00, overlapping the HSK1 A live class. Move to 16:00 WAT (23:00 CST) or switch to recording plus Thursday Q&A.", "Lagos inatabiri kukatika kwa umeme Jumatano 9/10, 19:00–21:00. Sogeza hadi 16:00 WAT au badilisha kuwa rekodi."))}</p><div className="row" style={{ marginTop: 10 }}><button className="btn btn--sm btn--good">{t(t3("采纳 · 通知学员（三语）", "Accept · notify learners (3 languages)", "Kubali · arifu wanafunzi"))}</button><button className="btn btn--sm">{t(t3("忽略", "Ignore", "Puuza"))}</button></div></Panel>
          <Panel className="in in-3"><Head title={t3("本周", "This week", "Wiki hii")} /><dl className="kv"><dt>{t(t3("直播", "Live", "Moja kwa moja"))}</dt><dd>3 × 40 min</dd><dt>{t(t3("录播", "Recordings", "Rekodi"))}</dt><dd>1</dd><dt>{t(t3("学员时段", "Learner windows", "Nafasi za wanafunzi"))}</dt><dd>WAT 16:00–18:00</dd><dt>{t(t3("时差", "Time difference", "Tofauti ya saa"))}</dt><dd>+7 h</dd></dl><Badge tone="acc">{t(t3("已同步到学员日历", "Synced to learner calendars", "Imesawazishwa"))}</Badge></Panel>
        </div>
      </div>
    </Shell>
  );
}
