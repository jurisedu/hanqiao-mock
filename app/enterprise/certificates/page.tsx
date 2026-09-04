"use client";
import Image from "next/image";
import Shell from "@/components/Shell";
import { Panel, Head, Badge } from "@/components/ui";
import { enterpriseRole, enterpriseNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function EntCerts() {
  const t = useT();
  return (
    <Shell role={enterpriseRole} nav={enterpriseNav} title={t3("结业证书", "Completion certificates", "Vyeti vya kuhitimu")} sub={t3("协会颁发 · 平台验真 · 批量下载 · 学习报告随附", "Issued by the association · verified by the platform · bulk download · learning report attached", "Vimetolewa na chama · vinathibitishwa na jukwaa")} net={3}>
      <div className="grid c3">
        <div className="span2 in"><div className="cert" style={{ transform: "scale(.92)", transformOrigin: "top left" }}><h2>结业证书</h2><div className="en">Certificate of Completion · Workplace Chinese</div><p>兹证明 <b>Blessing Okoro</b>（Sino-Lagos Energy · Field Operations）于 2026 年 12 月完成由全球文化教育交流协会主办的「企业委托班 · 职场中文 HSK 一级」课程（12 周 · 出勤 91% · 模拟考 142/200 · 口语经老师签发），特发此证。<br /><span style={{ fontSize: 13, color: "#666" }}>Sample. Certificates are issued on completion.</span></p><div style={{ fontSize: 12, color: "#666", fontFamily: "IBM Plex Mono, monospace" }}>No. GACEE-2026-00xxxx · verify.gacee.org</div><div className="qr" /><Image src="/seal.png" alt="" width={90} height={90} /></div></div>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2"><Head title={t3("状态", "Status", "Hali")} /><ul className="list small">{[[t3("预计结业", "Expected", "Inatarajiwa"), 31, "good"], [t3("需补课", "Needs catch-up", "Inahitaji fidia"), 4, "warn"], [t3("已退出", "Withdrawn", "Wameondoka"), 1, "bad"]].map(([n, v, s]) => <li key={t(n as never)}><div className="t"><b>{t(n as never)}</b></div><Badge tone={s as never}>{v as number}</Badge></li>)}</ul></Panel>
          <Panel className="in in-3" gold><Head title={t3("随附学习报告", "Attached learning report", "Ripoti ya kujifunza")} /><p className="small mute">{t(t3("每份证书附一页学习报告：出勤、四技掌握度、职场场景完成度、老师评语。数据可追溯，无个人对话记录。", "Each certificate comes with a one-page report: attendance, four-skill mastery, workplace scenario completion, teacher comment. Traceable, no conversation logs.", "Kila cheti kina ripoti ya ukurasa mmoja."))}</p><button className="btn btn--sm btn--gold" style={{ marginTop: 8 }}>{t(t3("12 月批量生成", "Generate in December", "Tengeneza Desemba"))}</button></Panel>
        </div>
      </div>
    </Shell>
  );
}
