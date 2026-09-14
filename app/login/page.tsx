"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useT, t3 } from "@/lib/i18n";
import LangSwitch from "@/components/LangSwitch";
import EnvBadge from "@/components/EnvBadge";

const roles = [
  { key: "learn", href: "/learn", label: t3("学员", "Learner", "Mwanafunzi"), hint: t3("学号或手机 · 支持共享设备切换", "Student ID or phone · shared-device switching", "Nambari ya mwanafunzi au simu · kubadilisha kifaa cha pamoja") },
  { key: "teach", href: "/teach", label: t3("老师", "Teacher", "Mwalimu"), hint: t3("邮箱 + 验证码", "Email + one-time code", "Barua pepe + msimbo") },
  { key: "school", href: "/school", label: t3("学校", "School", "Shule"), hint: t3("学校管理员", "School administrator", "Msimamizi wa shule") },
  { key: "ops", href: "/ops", label: t3("运营", "Operations", "Uendeshaji"), hint: t3("协会与平台运营", "Association and platform ops", "Uendeshaji wa chama na jukwaa") },
  { key: "enterprise", href: "/enterprise", label: t3("企业", "Enterprise", "Kampuni"), hint: t3("委托班 HR", "Commissioned-class HR", "HR ya darasa la agizo") },
];

export default function Login() {
  const t = useT();
  const [role, setRole] = useState(roles[0]);
  const [pin, setPin] = useState(false);
  return (
    <div className="landing" style={{ display: "grid", placeItems: "center", padding: 24 }}>
      <div className="panel in" style={{ width: "min(960px, 100%)", padding: 0, display: "grid", gridTemplateColumns: "1.1fr 1fr", overflow: "hidden" }}>
        <div style={{ padding: 40, background: "linear-gradient(160deg, rgba(108,140,255,.25), rgba(212,175,90,.12))", position: "relative" }}>
          <div className="orbit" />
          <div className="side__brand" style={{ position: "relative" }}><Image src="/seal.png" alt="" width={44} height={44} /><span><b style={{ letterSpacing: ".14em", fontSize: 18 }}>SHANHAI TONGWEN 山海同文</b><small className="mute" style={{ display: "block" }}>learn.gacee.org</small></span></div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: 34, marginTop: 40, position: "relative" }}>{t(t3("一个账号，学、练、读、考。", "One account: learn, practise, read, test.", "Akaunti moja: jifunze, fanya mazoezi, soma, fanya mtihani."))}</h1>
          <p className="mute" style={{ marginTop: 12, position: "relative" }}>{t(t3("断网也能继续学习，联网后自动同步。一部手机可以切换多个学员账号。", "Keep learning offline and sync when you reconnect. One phone can switch between several learners.", "Endelea kujifunza nje ya mtandao na usawazishe ukiunganishwa. Simu moja inaweza kubadilisha wanafunzi kadhaa."))}</p>
          <div className="row" style={{ marginTop: 28, position: "relative" }}><EnvBadge /><LangSwitch /></div>
          <div className="row" style={{ marginTop: 40, gap: 18, position: "relative" }}>
            {[["AO", "Amara"], ["CN", "Chidi"], ["FB", "Fatima"]].map(([i, n]) => <button key={i} className="row" style={{ gap: 8 }} onClick={() => setPin(true)}><span className="avatar">{i}</span><span className="small">{n}</span></button>)}
            <span className="dim small">{t(t3("← 共享设备 · 点头像切换", "← shared device · tap to switch", "← kifaa cha pamoja · gusa kubadilisha"))}</span>
          </div>
        </div>
        <div style={{ padding: 40 }}>
          <div className="eyebrow">{t(t3("选择角色", "Choose a role", "Chagua nafasi"))}</div>
          <div className="chips" style={{ margin: "12px 0 24px" }}>{roles.map((r) => <button key={r.key} className={`chip ${role.key === r.key ? "on" : ""}`} onClick={() => setRole(r)}>{t(r.label)}</button>)}</div>
          <p className="mute small" style={{ marginBottom: 18 }}>{t(role.hint)}</p>
          <form className="list" style={{ gap: 14 }} onSubmit={(e) => e.preventDefault()}>
            <label className="small mute">{t(t3("账号", "Account", "Akaunti"))}<input style={inp} defaultValue={role.key === "learn" ? "amara.okafor" : role.key === "teach" ? "wang@gacee.org" : ""} /></label>
            {pin || role.key === "learn" ? (
              <label className="small mute">PIN<input style={inp} type="password" defaultValue="1234" /></label>
            ) : (
              <label className="small mute">{t(t3("验证码", "One-time code", "Msimbo"))}<input style={inp} placeholder="••••••" /></label>
            )}
            <Link href={role.href} className="btn btn--primary" style={{ marginTop: 6 }}>{t(t3("登录", "Sign in", "Ingia"))} → {t(role.label)}</Link>
          </form>
          <p className="dim small" style={{ marginTop: 24 }}>{t(t3("演示环境：任何输入均可进入，不会创建真实账号。", "Preview environment: any input signs in; no real account is created.", "Mazingira ya onyesho: ingizo lolote linaingia; hakuna akaunti halisi."))}</p>
          <p className="small" style={{ marginTop: 8 }}><Link href="/" style={{ color: "var(--accent-2)" }}>← {t(t3("返回角色总览", "Back to overview", "Rudi kwenye muhtasari"))}</Link></p>
        </div>
      </div>
    </div>
  );
}
const inp: React.CSSProperties = { display: "block", width: "100%", marginTop: 6, padding: "11px 12px", borderRadius: 10, border: "1px solid var(--line-2)", background: "var(--panel)", color: "var(--text)", font: "inherit" };
