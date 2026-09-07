"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Home, PlayCircle, Radio, ClipboardCheck, Mic, MessagesSquare, Layers, Camera, Orbit, Bot, Library, GraduationCap, Award, CheckCircle2, Inbox, Users, Video, CalendarDays, Activity, ShieldCheck, CreditCard, FolderKanban, BookOpen, Globe, Smartphone, Sparkles, Search, Languages as LanguagesIcon, LifeBuoy, Flame, Download, Clock, Cpu, Wallet, Wifi, ChevronRight, type LucideIcon } from "lucide-react";
import { useT, UI, type L } from "@/lib/i18n";
import LangSwitch from "./LangSwitch";
import EnvBadge from "./EnvBadge";
import { Net } from "./ui";

export type NavItem = { href: string; label: L; icon: string; pill?: string; group?: L };
export type Role = { key: string; label: L; name: string; initials: string; tone?: "" | "gold" | "green"; theme?: "learner" | "dark" };

const ICONS: Record<string, LucideIcon> = {
  home: Home, play: PlayCircle, live: Radio, exam: ClipboardCheck, mic: Mic, chat: MessagesSquare, cards: Layers, cam: Camera, graph: Orbit, bot: Bot, lib: Library, school: GraduationCap, cert: Award,
  check: CheckCircle2, inbox: Inbox, users: Users, rec: Video, cal: CalendarDays, ops: Activity, shield: ShieldCheck, pay: CreditCard, content: FolderKanban, pub: BookOpen, globe: Globe, phone: Smartphone, star: Sparkles, languages: LanguagesIcon, support: LifeBuoy,
};

export function Icon({ name, className = "ic", size = 18 }: { name: string; className?: string; size?: number }) {
  const C = ICONS[name] ?? Home;
  return <C className={className} size={size} strokeWidth={1.75} aria-hidden="true" />;
}

/* Role-specific status strip: the four or five numbers this person checks first every day. */
const STRIPS: Record<string, Array<{ icon: LucideIcon; k: L; v: string; tone?: string }>> = {
  learn: [
    { icon: Flame, k: { zh: "连续学习", en: "Streak", sw: "Mfululizo" }, v: "12d", tone: "gold" },
    { icon: Clock, k: { zh: "今日目标", en: "Today", sw: "Leo" }, v: "11 / 15′" },
    { icon: Download, k: { zh: "离线包", en: "Offline packs", sw: "Vifurushi" }, v: "6 / 8", tone: "good" },
    { icon: Radio, k: { zh: "下次直播", en: "Next live", sw: "Somo lijalo" }, v: "Wed 16:00" },
  ],
  teach: [
    { icon: CheckCircle2, k: { zh: "待签发", en: "To sign", sw: "Kuidhinisha" }, v: "3", tone: "warn" },
    { icon: Inbox, k: { zh: "AI 提议", en: "Proposals", sw: "Mapendekezo" }, v: "2", tone: "warn" },
    { icon: Radio, k: { zh: "下次直播", en: "Next live", sw: "Somo lijalo" }, v: "Wed 23:00 CST" },
    { icon: Clock, k: { zh: "本周课时", en: "Hours this week", sw: "Saa wiki hii" }, v: "6.5", tone: "good" },
  ],
  ops: [
    { icon: Activity, k: { zh: "服务可用性", en: "Availability", sw: "Upatikanaji" }, v: "99.95%", tone: "good" },
    { icon: Users, k: { zh: "活跃学员", en: "Active", sw: "Hai" }, v: "264" },
    { icon: Cpu, k: { zh: "Agent 错误率", en: "Agent error", sw: "Makosa" }, v: "2.1%", tone: "good" },
    { icon: Wallet, k: { zh: "月预算", en: "Budget", sw: "Bajeti" }, v: "238 / 400" },
  ],
  school: [
    { icon: Smartphone, k: { zh: "在线设备", en: "Devices online", sw: "Vifaa" }, v: "19 / 22", tone: "good" },
    { icon: Users, k: { zh: "今日出勤", en: "Attendance", sw: "Mahudhurio" }, v: "93%" },
    { icon: ShieldCheck, k: { zh: "家长同意", en: "Consent", sw: "Idhini" }, v: "127 / 128", tone: "good" },
    { icon: Wifi, k: { zh: "缓存点", en: "Cache point", sw: "Hifadhi" }, v: "OK", tone: "good" },
  ],
  enterprise: [
    { icon: CalendarDays, k: { zh: "进度", en: "Week", sw: "Wiki" }, v: "7 / 12" },
    { icon: Users, k: { zh: "出勤", en: "Attendance", sw: "Mahudhurio" }, v: "89%", tone: "good" },
    { icon: Award, k: { zh: "预计结业", en: "Completing", sw: "Kuhitimu" }, v: "31 / 36" },
    { icon: CreditCard, k: { zh: "结算", en: "Billing", sw: "Malipo" }, v: "—" },
  ],
};

export default function Shell({ role, nav, title, sub, net = 3, children, actions }: { role: Role; nav: NavItem[]; title: L | string; sub?: L | string; net?: 0 | 1 | 2 | 3; children: ReactNode; actions?: ReactNode }) {
  const t = useT();
  const pathname = usePathname();
  useEffect(() => {
    document.body.classList.toggle("learner", role.theme === "learner");
    return () => document.body.classList.remove("learner");
  }, [role.theme]);
  let lastGroup = "";
  const strip = STRIPS[role.key] ?? [];
  return (
    <div className="shell">
      <aside className="side">
        <Link href="/" className="side__brand"><Image src="/seal.png" alt="" width={36} height={36} /><span><b>{t(UI.brand)}</b><small>{t(UI.brandSub)}</small></span></Link>
        <div className="side__role"><span className="dot" /><span><b>{role.name}</b><br />{t(role.label)}</span><ChevronRight size={14} className="side__role-chev" /></div>
        <nav className="nav">
          {nav.map((n) => {
            const g = n.group ? t(n.group) : "";
            const showGroup = g && g !== lastGroup; lastGroup = g || lastGroup;
            const current = pathname === n.href || (n.href.split("/").length > 2 && pathname.startsWith(n.href + "/"));
            return (
              <div key={n.href}>
                {showGroup && <div className="nav__group">{g}</div>}
                <Link href={n.href} aria-current={current ? "page" : undefined}><Icon name={n.icon} />{t(n.label)}{n.pill && <span className="pill">{n.pill}</span>}</Link>
              </div>
            );
          })}
        </nav>
        <div className="side__foot"><EnvBadge /><Link href="/" className="side__switch">{t(UI.switchRole)} →</Link></div>
      </aside>
      <main className="main">
        <div className="top">
          <div><h1>{t(title)}</h1>{sub && <div className="sub">{t(sub)}</div>}</div>
          <div className="top__right">
            {actions}
            <Net level={net} />
            <div className="search" aria-hidden="true"><Search size={14} />{t(UI.search)}<kbd>⌘K</kbd></div>
            <LangSwitch compact />
            <div className={`avatar ${role.tone ?? ""}`}>{role.initials}</div>
          </div>
        </div>
        {strip.length > 0 && (
          <div className="strip">
            {strip.map((s, i) => { const I = s.icon; return <div key={i} className={`strip__item ${s.tone ?? ""}`}><I size={15} strokeWidth={1.75} /><span className="strip__k">{t(s.k)}</span><b className="strip__v num">{s.v}</b></div>; })}
            <EnvBadge compact />
          </div>
        )}
        <div className="in">{children}</div>
      </main>
    </div>
  );
}
