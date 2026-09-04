"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useT, UI, type L } from "@/lib/i18n";
import LangSwitch from "./LangSwitch";
import { Net } from "./ui";

export type NavItem = { href: string; label: L; icon: string; pill?: string; group?: L };
export type Role = { key: string; label: L; name: string; initials: string; tone?: "" | "gold" | "green"; theme?: "learner" | "dark" };

const ICONS: Record<string, string> = {
  home: "M3 11 12 3l9 8v10h-6v-6H9v6H3z", play: "M6 4l14 8-14 8z", mic: "M12 15a4 4 0 0 0 4-4V6a4 4 0 0 0-8 0v5a4 4 0 0 0 4 4zm7-4a7 7 0 0 1-14 0M12 18v4",
  chat: "M4 5h16v11H8l-4 4z", cards: "M4 6h12v12H4zM8 4h12v12", exam: "M6 3h9l5 5v13H6zM9 12h6M9 16h6", cam: "M4 8h4l2-3h4l2 3h4v11H4zM12 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
  graph: "M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm14-9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-7 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 16l5-3m2-1 5-3", bot: "M8 3h8v4H8zM5 9h14v9H5zM9 13h2m4 0h2M12 18v3", live: "M4 6h16v10H4zM8 20h8M12 16v4",
  book: "M5 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H5zm14 0h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z", school: "M3 10l9-5 9 5-9 5zM6 12v5c0 1 3 3 6 3s6-2 6-3v-5",
  check: "M4 12l5 5L20 7", users: "M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3 3-5 6-5s6 2 6 5m0 0c0-3 3-5 6-5", cal: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  rec: "M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0-4a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", ops: "M4 19h16M6 15V9m6 6V5m6 10v-4", shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z", pay: "M3 7h18v10H3zM3 11h18",
  content: "M4 5h16v14H4zM8 9h8M8 13h5", pub: "M4 19V5l8 3 8-3v14l-8 3z", cert: "M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm-3 0v6l3-2 3 2v-6", phone: "M7 2h10v20H7zM11 19h2",
  inbox: "M3 13l3-8h12l3 8v6H3zM3 13h5l2 3h4l2-3h5", globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18", lib: "M4 4h4v16H4zM10 4h4v16h-4zM16 6l4-1 3 15-4 1z", star: "M12 3l2.8 6 6.2.7-4.6 4.3 1.3 6.4L12 17l-5.7 3.4 1.3-6.4L3 9.7 9.2 9z",
};

export function Icon({ name, className = "ic" }: { name: string; className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[name] ?? ICONS.home} /></svg>;
}

export default function Shell({ role, nav, title, sub, net = 3, children, actions }: { role: Role; nav: NavItem[]; title: L | string; sub?: L | string; net?: 0 | 1 | 2 | 3; children: ReactNode; actions?: ReactNode }) {
  const t = useT();
  const pathname = usePathname();
  useEffect(() => {
    document.body.classList.toggle("learner", role.theme === "learner");
    return () => document.body.classList.remove("learner");
  }, [role.theme]);
  let lastGroup = "";
  return (
    <div className="shell">
      <aside className="side">
        <Link href="/" className="side__brand"><Image src="/seal.png" alt="" width={36} height={36} /><span><b>{t(UI.brand)}</b><small>{t(UI.brandSub)}</small></span></Link>
        <div className="side__role"><span className="dot" /><span><b>{role.name}</b><br />{t(role.label)}</span></div>
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
        <div className="side__foot"><Link href="/" style={{ color: "var(--accent-2)" }}>{t(UI.switchRole)} →</Link><br />{t(UI.mock)}</div>
      </aside>
      <main className="main">
        <div className="top">
          <div><h1>{t(title)}</h1>{sub && <div className="sub">{t(sub)}</div>}</div>
          <div className="top__right">
            {actions}
            <Net level={net} />
            <div className="search" aria-hidden="true">{t(UI.search)}<kbd>⌘K</kbd></div>
            <LangSwitch compact />
            <div className={`avatar ${role.tone ?? ""}`}>{role.initials}</div>
          </div>
        </div>
        <div className="in">{children}</div>
      </main>
    </div>
  );
}
