"use client";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import LangSwitch from "@/components/LangSwitch";
import { Badge } from "@/components/ui";
import { useT, t3 } from "@/lib/i18n";

export default function Verify({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); const t = useT();
  return (
    <div className="landing" style={{ padding: 32, display: "grid", placeItems: "center" }}>
      <div className="panel in" style={{ width: "min(720px, 100%)", padding: 36, textAlign: "center" }}>
        <div className="row" style={{ justifyContent: "space-between" }}><span className="eyebrow">verify.gacee.org</span><LangSwitch compact /></div>
        <Image src="/seal.png" alt="" width={84} height={84} style={{ margin: "20px auto 10px" }} />
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 26 }}>{t(t3("证书验真", "Certificate verification", "Uthibitisho wa cheti"))}</h1>
        <div className="mono" style={{ marginTop: 6 }}>{id}</div>
        <div style={{ margin: "20px 0" }}><Badge tone="good" live>{t(t3("有效 · 由全球文化教育交流协会颁发", "Valid · issued by the Global Association of Cultural and Educational Exchange", "Halali · kimetolewa na GACEE"))}</Badge></div>
        <dl className="kv" style={{ textAlign: "left", maxWidth: 480, margin: "0 auto" }}>
          <dt>{t(t3("持有人", "Holder", "Mmiliki"))}</dt><dd>Amara O.</dd>
          <dt>{t(t3("课程", "Programme", "Programu"))}</dt><dd>{t(t3("全球中文在线培训 · HSK 一级", "Global Online Chinese Programme · HSK 1", "Programu ya Kichina · HSK 1"))}</dd>
          <dt>{t(t3("颁发日期", "Issued", "Imetolewa"))}</dt><dd>2026-11-27</dd>
          <dt>{t(t3("学习记录哈希", "Record hash", "Hashi ya rekodi"))}</dt><dd className="mono">sha256 3f9a…c21e</dd>
          <dt>{t(t3("技术", "Technology", "Teknolojia"))}</dt><dd>Juris&amp;Edu AI Technology</dd>
        </dl>
        <p className="small mute" style={{ marginTop: 20 }}>{t(t3("本页只显示核验所需的最少信息；完整学习报告仅持有人与授权机构可见。", "This page shows the minimum needed to verify; the full learning report is visible only to the holder and authorised institutions.", "Ukurasa huu huonyesha taarifa ndogo zinazohitajika kuthibitisha."))}</p>
        <Link href="/" className="btn btn--sm" style={{ marginTop: 16 }}>← SHANHAI TONGWEN</Link>
      </div>
    </div>
  );
}
