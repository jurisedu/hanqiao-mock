"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useT, type L } from "@/lib/i18n";

export function Panel({ children, className = "", glow = false, gold = false, lift = true, style }: { children: ReactNode; className?: string; glow?: boolean; gold?: boolean; lift?: boolean; style?: React.CSSProperties }) {
  return <div className={`panel ${lift ? "panel--lift" : ""} ${glow ? "panel--glow" : ""} ${gold ? "panel--gold" : ""} ${className}`} style={style}>{children}</div>;
}

export function Head({ title, more, right }: { title: L | string; more?: L | string; right?: ReactNode }) {
  const t = useT();
  return <div className="panel__head"><h3>{t(title)}</h3>{right ?? (more ? <a className="more" href="#">{t(more)} →</a> : null)}</div>;
}

export function Stat({ value, label, delta, up = true, suffix = "" }: { value: number | string; label: L | string; delta?: string; up?: boolean; suffix?: string }) {
  const t = useT();
  const v = useCountUp(typeof value === "number" ? value : 0);
  return (
    <div className="stat">
      <div className="stat__v num">{typeof value === "number" ? v.toLocaleString() : value}{suffix}</div>
      <div className="stat__l">{t(label)}</div>
      {delta && <div className={`stat__d ${up ? "up" : "down"}`}>{up ? "▲" : "▼"} {delta}</div>}
    </div>
  );
}

export function useCountUp(target: number, ms = 1100) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setV(target); return; }
    let raf = 0; const t0 = performance.now();
    const step = (now: number) => { const p = Math.min(1, (now - t0) / ms); const e = 1 - Math.pow(1 - p, 3); setV(Math.round(target * e)); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

export function Badge({ children, tone = "", live = false }: { children: ReactNode; tone?: "" | "good" | "warn" | "bad" | "acc" | "gold"; live?: boolean }) {
  return <span className={`badge ${tone} ${live ? "live" : ""}`}>{(live || tone) && <span className="dot" />}{children}</span>;
}

export function Bar({ v, tone = "" }: { v: number; tone?: "" | "gold" | "good" | "warn" | "bad" }) {
  return <div className="bar"><i className={tone} style={{ width: `${Math.round(v * 100)}%` }} /></div>;
}

export function Ring({ v, size = 120, stroke = 10, color = "var(--accent)", label }: { v: number; size?: number; stroke?: number; color?: string; label?: ReactNode }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const [p, setP] = useState(0);
  useEffect(() => { const id = setTimeout(() => setP(v), 60); return () => clearTimeout(id); }, [v]);
  return (
    <div className="gauge" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(128,140,180,.18)" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - p)} style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.2,.7,.2,1)" }} />
      </svg>
      <div className="v">{label ?? `${Math.round(v * 100)}%`}</div>
    </div>
  );
}

export function Spark({ data, color = "var(--accent)", h = 44, fill = true }: { data: number[]; color?: string; h?: number; fill?: boolean }) {
  const w = 160, max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((d, i) => [i * (w / (data.length - 1)), h - 4 - ((d - min) / (max - min || 1)) * (h - 8)]);
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const id = useRef("g" + Math.random().toString(36).slice(2, 7)).current;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id={id} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".35" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      {fill && <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill={`url(#${id})`} />}
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3" fill={color} />
    </svg>
  );
}

export function Bars({ data, labels, color = "var(--accent)", h = 120 }: { data: number[]; labels: string[]; color?: string; h?: number }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${data.length}, 1fr)`, gap: 6, alignItems: "end", height: h }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ width: "100%", height: `${(d / max) * 100}%`, background: color, borderRadius: 6, opacity: .9, transformOrigin: "bottom", animation: "grow 1s cubic-bezier(.2,.7,.2,1) both", animationDelay: `${i * 60}ms` }} title={String(d)} />
          <span className="dim" style={{ fontSize: 10 }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

export function Net({ level }: { level: 0 | 1 | 2 | 3 }) {
  const t = useT();
  const color = level === 3 ? "var(--good)" : level === 2 ? "var(--warn)" : level === 1 ? "var(--bad)" : "var(--dim)";
  const label = level === 3 ? { zh: "网络良好", en: "Good network", sw: "Mtandao mzuri" } : level === 2 ? { zh: "弱网 · 音频优先", en: "Weak · audio first", sw: "Dhaifu · sauti kwanza" } : level === 1 ? { zh: "极弱 · 仅文字", en: "Very weak · text only", sw: "Dhaifu sana · maandishi tu" } : { zh: "离线 · 本地练习", en: "Offline · local practice", sw: "Nje ya mtandao · mazoezi ya ndani" };
  return <span className="net" style={{ color }}>{[1, 2, 3].map((i) => <i key={i} style={{ height: 6 + i * 4, opacity: i <= level ? 1 : .25 }} />)}{t(label)}</span>;
}

export function Tilt({ children, className = "", max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    el.style.transform = `perspective(1000px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateZ(0)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return <div ref={ref} className={`tilt ${className}`} onMouseMove={onMove} onMouseLeave={reset}>{children}</div>;
}

export function Trace({ steps }: { steps: Array<[string, string]> }) {
  return (
    <div className="trace">
      {steps.map(([k, v], i) => (
        <span key={i} className={k}>{i > 0 && <i>→ </i>}{v}</span>
      ))}
    </div>
  );
}
