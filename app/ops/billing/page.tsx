"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar, Stat, Bars } from "@/components/ui";
import { opsRole, opsNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Billing() {
  const t = useT();
  return (
    <Shell role={opsRole} nav={opsNav} title={t3("席位与结算", "Seats & billing", "Viti na malipo")} sub={t3("唯一原语 = 席位：机构学员席位自带免费基础版，完整版按席位升级；企业委托班按班结算；试点期全部免费", "One primitive: the seat. Institutional seats include a free basic tier; the full tier upgrades per seat; enterprise classes bill per class; everything free during the pilot", "Kitengo kimoja: kiti. Viti vya taasisi vina toleo la msingi bila malipo")} net={3}>
      <div className="grid c4">
        <Panel className="in in-1"><Stat value={264} label={t3("已分配席位", "seats allocated", "viti vilivyotengwa")} /></Panel>
        <Panel className="in in-2"><Stat value={264} label={t3("基础版（免费）", "basic (free)", "msingi (bure)")} /></Panel>
        <Panel className="in in-3"><Stat value={0} label={t3("完整版（试点期免费）", "full tier (free in pilot)", "kamili (bure wakati wa majaribio)")} /></Panel>
        <Panel className="in in-4"><Stat value={1} label={t3("企业委托班（提案中）", "enterprise class (proposed)", "darasa la kampuni (pendekezo)")} /></Panel>
        <Panel className="span2 in in-2"><Head title={t3("席位目录（价格待定，不臆造）", "Seat catalogue (prices to be set)", "Katalogi ya viti (bei bado)")} /><div className="tbl"><table><thead><tr><th>{t(t3("类型", "Type", "Aina"))}</th><th>{t(t3("包含", "Includes", "Inajumuisha"))}</th><th>{t(t3("计费", "Billing", "Malipo"))}</th></tr></thead><tbody>{[[t3("机构学员席位 · 基础版", "Institution seat · basic", "Kiti cha taasisi · msingi"), t3("录播 · 练习 · 复习卡 · 图书馆 · 1 份报告", "recordings · practice · cards · library · 1 report", "rekodi · mazoezi · kadi · maktaba · ripoti 1"), t3("免费", "Free", "Bure")], [t3("机构学员席位 · 完整版", "Institution seat · full", "Kiti cha taasisi · kamili"), t3("+ 直播 · 发音教练 · 对话 · 模拟考 · 证书", "+ live · coach · conversation · mock exams · certificates", "+ moja kwa moja · kocha · mazungumzo · mitihani · vyeti"), t3("按席位 / 月", "Per seat / month", "Kwa kiti / mwezi")], [t3("企业委托班", "Enterprise class", "Darasa la kampuni"), t3("分组 · 出勤报表 · 结业证书 · HR 看板", "groups · attendance reports · certificates · HR dashboard", "vikundi · ripoti · vyeti · dashibodi ya HR"), t3("按班", "Per class", "Kwa darasa")], [t3("公益席位", "Public-good seat", "Kiti cha manufaa ya umma"), t3("基金会资助的普惠版", "foundation-funded inclusive tier", "toleo linalofadhiliwa"), t3("资助", "Sponsored", "Imefadhiliwa")]].map(([a, b, c]) => <tr key={t(a as never)}><td><b>{t(a as never)}</b></td><td className="small">{t(b as never)}</td><td><Badge tone="gold">{t(c as never)}</Badge></td></tr>)}</tbody></table></div></Panel>
        <Panel className="span2 in in-3"><Head title={t3("收款与登记", "Collection & ledger", "Ukusanyaji na daftari")} /><ul className="list small">{[["Great Heights School", t3("学校代收 · 线下登记", "school collection · offline ledger", "ukusanyaji wa shule"), 0], ["New Horizon School", t3("学校代收 · 线下登记", "school collection · offline ledger", "ukusanyaji wa shule"), 0], ["Sino-Lagos Energy", t3("企业对公 · Stripe（协会账户）", "corporate · Stripe (association account)", "kampuni · Stripe"), 0], [t3("移动钱包（评估中）", "Mobile money (evaluating)", "Pesa za simu (inatathminiwa)"), t3("PoC-7 · 按国确认渠道", "PoC-7 · channel per country", "PoC-7 · njia kwa kila nchi"), 0]].map(([n, m]) => <li key={typeof n === "string" ? n : t(n as never)}><div className="t"><b>{typeof n === "string" ? n : t(n as never)}</b><span>{t(m as never)}</span></div><span className="mono small mute">USD 0</span></li>)}</ul></Panel>
        <Panel className="span2 in in-4"><Head title={t3("单位经济 · 每学员每月", "Unit economics · per learner per month", "Uchumi wa kitengo")} /><Bars data={[0.34, 0.2, 0.15, 0.11, 0.1]} labels={["LLM", "CDN", "RTC", "Voice", "Infra"]} color="var(--good)" h={100} /><div className="small mute" style={{ marginTop: 8 }}>USD 0.90 · {t(t3("11/27 复盘的定价依据", "the pricing basis for the 11/27 review", "msingi wa bei kwa 11/27"))}</div><Bar v={0.6} tone="good" /></Panel>
      </div>
    </Shell>
  );
}
