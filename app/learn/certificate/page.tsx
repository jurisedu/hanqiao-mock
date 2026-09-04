"use client";
import Image from "next/image";
import Shell from "@/components/Shell";
import { Panel, Head, Badge } from "@/components/ui";
import { learnerRole, learnerNav } from "@/lib/roles";
import { useT, t3 } from "@/lib/i18n";

export default function Cert() {
  const t = useT();
  return (
    <Shell role={learnerRole} nav={learnerNav} title={t3("证书", "Certificates", "Vyeti")} sub={t3("平台结业证书可验真；HSK 官方证书由考点出具", "Platform certificates are verifiable; official HSK certificates come from the test centre", "Vyeti vya jukwaa vinathibitishwa; vyeti rasmi vya HSK hutoka kituo cha mtihani")} net={3}>
      <div className="grid c3">
        <div className="span2 in"><div className="cert">
          <h2>结业证书</h2><div className="en">Certificate of Completion</div>
          <p>兹证明 <b>Amara Okafor</b>（Great Heights School, Lagos）于 2026 年 11 月完成由全球文化教育交流协会主办的「全球中文在线培训 · HSK 一级」课程（12 周 · 出勤 93% · 模拟考 156/200），经考核合格，特发此证。<br /><span style={{ fontSize: 13, color: "#666" }}>This certifies that Amara Okafor completed the Global Online Chinese Programme, HSK Level 1, organised by the Global Association of Cultural and Educational Exchange.</span></p>
          <div style={{ fontSize: 12, color: "#666", fontFamily: "IBM Plex Mono, monospace" }}>No. GACEE-2026-001284 · verify.gacee.org · SHA-256 3f9a…c21e</div>
          <div className="qr" /><Image src="/seal.png" alt="" width={90} height={90} />
        </div></div>
        <div className="grid" style={{ alignContent: "start" }}>
          <Panel className="in in-2" gold><Head title={t3("验真", "Verification", "Uthibitisho")} /><ul className="list small"><li><Badge tone="good">✓</Badge><div className="t"><b>{t(t3("唯一编号 + 二维码", "Unique number + QR", "Nambari ya kipekee + QR"))}</b><span>verify.gacee.org</span></div></li><li><Badge tone="good">✓</Badge><div className="t"><b>{t(t3("创作链哈希", "Creation-chain hash", "Hashi ya mnyororo"))}</b><span>{t(t3("学习记录追加式留痕，不可篡改", "Append-only learning record, tamper-evident", "Rekodi ya kujifunza isiyobadilishwa"))}</span></div></li><li><Badge tone="good">✓</Badge><div className="t"><b>{t(t3("颁发：协会 · 技术：平台", "Issued by the association · technology by the platform", "Imetolewa na chama · teknolojia na jukwaa"))}</b></div></li></ul></Panel>
          <Panel className="in in-3"><Head title={t3("我的证书", "My certificates", "Vyeti vyangu")} /><ul className="list small"><li><div className="t"><b>HSK 1 · {t(t3("结业", "Completion", "Kuhitimu"))}</b><span>{t(t3("预计 2026-11-27", "expected 2026-11-27", "inatarajiwa 2026-11-27"))}</span></div><Badge tone="warn">{t(t3("学习中", "In progress", "Inaendelea"))}</Badge></li><li><div className="t"><b>{t(t3("作文大赛参赛证书", "Composition Competition participant", "Cheti cha kushiriki shindano"))}</b><span>2026-05</span></div><Badge tone="good">{t(t3("已颁发", "Issued", "Imetolewa"))}</Badge></li></ul></Panel>
          <Panel className="in in-4"><Head title={t3("正式认证", "Official certification", "Cheti rasmi")} /><p className="small mute">{t(t3("HSK 一级正式考试：拉各斯考点 · 2026 年 12 月。平台负责备考、模拟与学情证明，不代替官方发证。", "Official HSK 1: Lagos test centre, December 2026. The platform prepares, simulates and documents; it never replaces official certification.", "HSK 1 rasmi: kituo cha Lagos, Desemba 2026. Jukwaa huandaa na kuandika; halichukui nafasi ya cheti rasmi."))}</p></Panel>
        </div>
      </div>
    </Shell>
  );
}
