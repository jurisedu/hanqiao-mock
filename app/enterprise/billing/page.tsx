"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar, Stat } from "@/components/ui";
import { enterpriseRole, enterpriseNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function EntBilling() {
  const t = useT();
  return (
    <Shell role={enterpriseRole} nav={enterpriseNav} title={t3("结算", "Billing", "Malipo")} sub={t3("按班结算 · 协会开票 · Stripe 对公 · 价格待定（试点提案）", "Billed per class · invoiced by the association · corporate Stripe · pricing to be set (pilot proposal)", "Malipo kwa darasa · ankara na chama · bei bado")} net={3}>
      <div className="grid c3">
        <Panel className="span2 in"><Head title={t3("账单", "Invoices", "Ankara")} /><div className="tbl"><table><thead><tr><th>#</th><th>{t(t3("项目", "Item", "Kipengele"))}</th><th>{t(t3("期间", "Period", "Kipindi"))}</th><th>{t(t3("金额", "Amount", "Kiasi"))}</th><th>{t(t3("状态", "Status", "Hali"))}</th></tr></thead><tbody>{[["INV-2026-0041", t3("委托班 · A/B 组 · 12 周", "Commissioned class · groups A/B · 12 weeks", "Darasa · A/B · wiki 12"), "2026-09 → 12", t3("待定", "TBD", "Bado"), "warn"], ["INV-2026-0042", t3("结业证书与报告", "Certificates and reports", "Vyeti na ripoti"), "2026-12", t3("含", "Included", "Imejumuishwa"), "good"]].map(([n, i, p, a, s]) => <tr key={n as string}><td className="mono small">{n as string}</td><td>{t(i as never)}</td><td className="small">{p as string}</td><td>{t(a as never)}</td><td><Badge tone={s as never}>{s === "good" ? t(t3("包含", "Included", "Imejumuishwa")) : t(t3("提案中", "Proposed", "Pendekezo"))}</Badge></td></tr>)}</tbody></table></div></Panel>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2"><Head title={t3("包含内容", "What is included", "Kilichojumuishwa")} /><ul className="list small">{[t3("远程老师直播 2 次 / 周 + 录播", "2 live classes / week + recordings", "Masomo 2 ya moja kwa moja / wiki + rekodi"), t3("全部 Agent（伴学、发音、对话、复习、评测）", "All agents (companion, coach, conversation, review, assessment)", "Mawakala wote"), t3("HR 看板与报表", "HR dashboard and reports", "Dashibodi ya HR"), t3("结业证书与学习报告", "Certificates and learning reports", "Vyeti na ripoti")].map((x, i) => <li key={i}><Badge tone="good">✓</Badge><div className="t"><b>{t(x)}</b></div></li>)}</ul></Panel>
          <Panel className="in in-3" gold><Head title={t3("说明", "Note", "Maelezo")} /><p className="small mute">{t(t3("协会为非营利机构；委托班收入用于协会章程范围内的教育与公益支出。平台按合作备忘录取得技术服务对价。", "The association is non-profit; commissioned-class income funds education and public-good activities within its charter. The platform receives technology service consideration under the MOU.", "Chama si cha faida; mapato huenda kwenye elimu na manufaa ya umma."))}</p></Panel>
        </div>
      </div>
    </Shell>
  );
}
