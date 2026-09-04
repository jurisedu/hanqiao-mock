"use client";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useT, t3 } from "@/lib/i18n";
import LangSwitch from "@/components/LangSwitch";
import { Icon } from "@/components/Shell";

const Globe3D = dynamic(() => import("@/components/Globe3D"), { ssr: false });

const roles = [
  { href: "/learn", icon: "home", cls: "", title: t3("学员端", "Learner", "Mwanafunzi"), body: t3("离线优先的学、练、考、读；专属 Agent 花名册与知识星图。", "Offline-first learning, practice, exams and reading; personal agents and a 3D knowledge map.", "Kujifunza nje ya mtandao, mazoezi, mitihani na kusoma; mawakala binafsi na ramani ya maarifa ya 3D."), tag: "Amara · HSK 1 · Lagos" },
  { href: "/teach", icon: "check", cls: "gold", title: t3("老师端", "Teacher", "Mwalimu"), body: t3("复核队列、AI 提议审批、直播降级控制台、录课与音色复刻。", "Review queue, AI proposal approvals, live console with degradation, recording and voice cloning.", "Foleni ya ukaguzi, idhini ya mapendekezo ya AI, kidhibiti cha moja kwa moja, kurekodi na sauti."), tag: "王老师 · 郑州" },
  { href: "/ops", icon: "ops", cls: "green", title: t3("运营 / 教务", "Operations", "Uendeshaji"), body: t3("租户、内容包分发、AgentOps、合规审计、席位结算。", "Tenants, content delivery, AgentOps, compliance audit, seat billing.", "Wapangaji, usambazaji wa maudhui, AgentOps, ukaguzi, malipo ya viti."), tag: "Singapore core" },
  { href: "/school", icon: "school", cls: "gold", title: t3("学校管理员", "School admin", "Msimamizi wa shule"), body: t3("学员、设备共享、出勤、家长同意、报告与证书。", "Learners, shared devices, attendance, parental consent, reports and certificates.", "Wanafunzi, vifaa vya pamoja, mahudhurio, idhini ya wazazi, ripoti na vyeti."), tag: "Great Heights School" },
  { href: "/enterprise", icon: "users", cls: "green", title: t3("企业委托班", "Enterprise", "Kampuni"), body: t3("中资企业本地员工中文班：分组、出勤报表、结业证书、按班结算。", "Chinese classes for local staff: groups, attendance reports, certificates, per-class billing.", "Madarasa ya Kichina kwa wafanyakazi: vikundi, ripoti, vyeti, malipo kwa darasa."), tag: "Sino-Lagos Energy" },
];

export default function Landing() {
  const t = useT();
  return (
    <div className="landing">
      <div className="landing__top">
        <div className="side__brand"><Image src="/seal.png" alt="" width={40} height={40} /><span><b style={{ letterSpacing: ".14em" }}>{t(t3("汉桥", "HanQiao", "HanQiao"))}</b><small className="mute" style={{ display: "block", fontSize: 11 }}>{t(t3("GACEE 中文学习平台 · 演示", "GACEE Chinese learning platform · preview", "Jukwaa la GACEE · onyesho"))}</small></span></div>
        <div className="row"><LangSwitch /><Link href="/app" className="btn btn--sm">{t(t3("App 界面", "App screens", "Skrini za App"))}</Link><Link href="/login" className="btn btn--primary btn--sm">{t(t3("登录", "Sign in", "Ingia"))}</Link></div>
      </div>
      <section className="landing__hero">
        <div className="in">
          <div className="eyebrow">{t(t3("老师为根 · 非洲为试金石 · 弱网离线为默认 · 合规入地基", "Teachers first · Africa as the proving ground · offline by default · compliance in the foundation", "Walimu kwanza · Afrika kama uwanja wa majaribio · nje ya mtandao kwa chaguo-msingi"))}</div>
          <h1 style={{ marginTop: 14 }}>{t(t3("在最困难的地方，", "Chinese learning that keeps working", "Kujifunza Kichina kunakoendelea"))}<br /><em>{t(t3("也能被老师和孩子长期用起来的中文教育 AI。", "where the network does not.", "hata mtandao unapokosekana."))}</em></h1>
          <p>{t(t3("远程中文老师跨境直播与录播授课；JE Agent 混合编排与每用户持续记忆放大师资；TIDAR KAG 让每一次答疑有出处、拿不准就交给老师。", "Remote teachers teach live and recorded across borders; JE Agent orchestration and per-learner memory multiply scarce teachers; TIDAR KAG answers with sources and hands uncertainty to a human.", "Walimu hufundisha moja kwa moja na kwa rekodi; uratibu wa JE Agent na kumbukumbu ya kila mwanafunzi huzidisha walimu; TIDAR KAG hujibu kwa vyanzo na hukabidhi mashaka kwa mwalimu."))}</p>
          <div className="row" style={{ marginTop: 26 }}>
            <Link href="/learn" className="btn btn--primary">{t(t3("进入学员端", "Open learner app", "Fungua app ya mwanafunzi"))}</Link>
            <Link href="/teach" className="btn">{t(t3("进入老师端", "Open teacher console", "Fungua dawati la mwalimu"))}</Link>
            <Link href="/ops/agentops" className="btn btn--ghost">{t(t3("看 AgentOps", "See AgentOps", "Tazama AgentOps"))} →</Link>
          </div>
        </div>
        <div className="in in-2" style={{ position: "relative" }}>
          <Globe3D height={460} />
          <div className="row" style={{ position: "absolute", left: 12, bottom: 8, gap: 14 }}>
            <span className="badge gold"><span className="dot" />{t(t3("新加坡核心", "Singapore core", "Kiini cha Singapore"))}</span>
            <span className="badge acc"><span className="dot" />{t(t3("中国老师", "Teachers in China", "Walimu Uchina"))}</span>
            <span className="badge good"><span className="dot" />{t(t3("非洲学员", "Learners in Africa", "Wanafunzi Afrika"))}</span>
          </div>
        </div>
      </section>
      <div className="landing__strip">
        {[["2", t3("所试点学校 · 尼日利亚", "pilot schools · Nigeria", "shule za majaribio · Nigeria")], ["6", t3("类专属 Agent", "agent types per learner", "aina za mawakala")], ["3", t3("级直播降级 · 全程录制兜底", "live degradation levels, always recorded", "viwango vya kushuka, hurekodiwa kila wakati")], ["3", t3("种界面语言：中文 · English · Kiswahili", "interface languages: 中文 · English · Kiswahili", "lugha za kiolesura: 中文 · English · Kiswahili")]].map(([v, l], i) => (
          <div key={i} className={`in in-${i + 2}`}><b>{v as string}</b><span>{t(l as never)}</span></div>
        ))}
      </div>
      <section className="roles">
        {roles.map((r, i) => (
          <Link key={r.href} href={r.href} className={`role ${r.cls} in in-${i + 1}`}>
            <div className="ic"><Icon name={r.icon} className="ic" /></div>
            <h3>{t(r.title)}</h3>
            <p>{t(r.body)}</p>
            <div className="between"><span className="dim small">{r.tag}</span><span className="go">{t(t3("进入", "Enter", "Ingia"))} →</span></div>
          </Link>
        ))}
      </section>
      <div className="dim small" style={{ padding: "0 40px 40px" }}>GACEE × Juris&amp;Edu AI Technology · {t(t3("演示环境，全部数据为模拟", "Preview environment, all data is sample data", "Mazingira ya onyesho, data zote ni za mfano"))}</div>
    </div>
  );
}
