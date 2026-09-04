"use client";
import Shell from "@/components/Shell";
import { Panel, Head, Badge, Bar, Stat } from "@/components/ui";
import { opsRole, opsNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";
import { schoolsData } from "@/lib/data";

export default function Schools() {
  const t = useT();
  return (
    <Shell role={opsRole} nav={opsNav} title={t3("学校与租户", "Schools & tenants", "Shule na wapangaji")} sub={t3("GACEE 为一级租户，每所学校为子租户；数据按学校隔离，跨校汇总只在协会视图", "GACEE is the top-level tenant; each school is a sub-tenant with isolated data; cross-school totals exist only in the association view", "GACEE ni mpangaji mkuu; kila shule ni mpangaji mdogo")} net={3}>
      <div className="grid c4">
        {schoolsData.map((s, i) => (
          <Panel key={s.name} className={`in in-${i + 1}`} glow={s.status === "active"}>
            <div className="between"><b>{s.name}</b><Badge tone={s.status === "active" ? "good" : s.status === "pilot" ? "warn" : ""}>{s.status}</Badge></div><div className="dim small">{s.city}</div>
            <div className="grid c2" style={{ marginTop: 12, gap: 8 }}><Stat value={s.learners} label={t3("学员", "learners", "wanafunzi")} /><Stat value={s.classes} label={t3("班级", "classes", "madarasa")} /></div>
            <div className="small" style={{ marginTop: 10 }}><div className="between"><span className="mute">{t(t3("家长同意", "Parental consent", "Idhini ya wazazi"))}</span><b>{Math.round(s.consent * 100)}%</b></div><Bar v={s.consent} tone={s.consent >= .98 ? "good" : "warn"} /></div>
            <div className="row" style={{ marginTop: 10 }}><Badge>{s.devices} {t(t3("共享设备", "shared devices", "vifaa"))}</Badge><Badge>{s.net}</Badge></div>
          </Panel>
        ))}
        <Panel className="span2 in in-5"><Head title={t3("租户配置 · Great Heights School", "Tenant config · Great Heights School", "Mipangilio · Great Heights School")} /><dl className="kv"><dt>{t(t3("数据驻留", "Data residency", "Uhifadhi wa data"))}</dt><dd>Singapore (ap-southeast-1)</dd><dt>{t(t3("隔离", "Isolation", "Utengano"))}</dt><dd>{t(t3("学校级命名空间 · 自动化隔离测试 ✓", "school-level namespace · automated isolation test ✓", "nafasi ya shule · jaribio la utengano ✓"))}</dd><dt>{t(t3("辅助语言", "Scaffold languages", "Lugha za msaada"))}</dt><dd>English · Kiswahili</dd><dt>{t(t3("月预算", "Monthly budget", "Bajeti ya mwezi"))}</dt><dd>USD 160 · {t(t3("超限降级到录播", "degrade to recordings over limit", "shuka hadi rekodi ikizidi"))}</dd><dt>{t(t3("支付", "Payments", "Malipo"))}</dt><dd>{t(t3("学校代收登记（试点期免费）", "school collection ledger (free during pilot)", "daftari la shule (bure wakati wa majaribio)"))}</dd><dt>{t(t3("联络人", "Contact", "Mawasiliano"))}</dt><dd>Mrs. Adaeze · +234 ···</dd></dl></Panel>
        <Panel className="span2 in in-6"><Head title={t3("四维打分 · 下一批候选", "Four-factor score · next candidates", "Alama nne · wagombea wajao")} /><div className="tbl"><table><thead><tr><th>{t(t3("国家 / 机构", "Country / institution", "Nchi / taasisi"))}</th><th>{t(t3("网络", "Network", "Mtandao"))}</th><th>{t(t3("需求", "Demand", "Mahitaji"))}</th><th>{t(t3("伙伴", "Partner", "Mshirika"))}</th><th>{t(t3("合规", "Compliance", "Uzingatiaji"))}</th><th>{t(t3("总分", "Total", "Jumla"))}</th></tr></thead><tbody>{[["Kenya · Mombasa centre", 3, 4, 4, 4, 15], ["Ghana · Accra academy", 4, 3, 3, 4, 14], ["Tanzania · Dar es Salaam", 3, 4, 2, 3, 12], ["Ethiopia · Addis", 2, 4, 2, 2, 10]].map(([n, a, b, c, d, s]) => <tr key={n as string}><td><b>{n}</b></td><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td><td><Badge tone={(s as number) >= 14 ? "good" : (s as number) >= 12 ? "warn" : ""}>{s}/20</Badge></td></tr>)}</tbody></table></div></Panel>
      </div>
    </Shell>
  );
}
