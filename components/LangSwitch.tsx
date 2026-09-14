"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Languages, Search, Check } from "lucide-react";
import { LANGS, useLang, useT, resolve, t3, UI, type Cov } from "@/lib/i18n";

const COV: Record<Cov, { label: ReturnType<typeof t3>; tone: string }> = {
  full: { label: t3("已就绪", "Ready", "Tayari"), tone: "good" },
  core: { label: t3("核心已就绪", "Core ready", "Msingi tayari"), tone: "acc" },
  soon: { label: t3("接入中", "In progress", "Inaandaliwa"), tone: "warn" },
};

export default function LangSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cur = LANGS.find((l) => l.code === lang)!;
  const ready = LANGS.filter((l) => l.cov === "full").length;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    setTimeout(() => inputRef.current?.focus(), 20);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const hit = LANGS.filter((l) => !needle || l.label.toLowerCase().includes(needle) || l.en.toLowerCase().includes(needle) || l.code.toLowerCase().includes(needle) || resolve(l.region, lang).toLowerCase().includes(needle) || t(l.region).toLowerCase().includes(needle));
    const order: string[] = []; const map: Record<string, typeof LANGS> = {};
    for (const l of hit) { const r = t(l.region); if (!map[r]) { map[r] = []; order.push(r); } map[r].push(l); }
    return order.map((r) => [r, map[r]] as const);
  }, [q, lang, t]);

  return (
    <div className={`langpick ${compact ? "langpick--compact" : ""}`} ref={boxRef}>
      <button type="button" className="langpick__btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="listbox" title={t(UI.language)}>
        <Languages size={14} aria-hidden="true" />
        <span className="langpick__cur">{cur.label}</span>
        <span className="langpick__count">{LANGS.length}</span>
      </button>
      {open && (
        <div className="langpop" role="listbox">
          <div className="langpop__search"><Search size={14} /><input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(t3("搜索语言或地区…", "Search language or region…", "Tafuta lugha au eneo…"))} aria-label={t(UI.language)} /></div>
          <div className="langpop__list">
            {groups.length === 0 && <div className="langpop__empty">{t(t3("未找到", "No match", "Hakuna"))}</div>}
            {groups.map(([region, items]) => (
              <div key={region} className="langpop__group">
                <div className="langpop__region">{region}</div>
                {items.map((l) => { const c = COV[l.cov]; return (
                  <button key={l.code} type="button" role="option" aria-selected={l.code === lang} className={`langpop__item ${l.code === lang ? "on" : ""}`} onClick={() => { setLang(l.code); setOpen(false); setQ(""); }}>
                    <span className="langpop__code">{l.code.toUpperCase()}</span>
                    <span className="langpop__names"><b>{l.label}</b><small>{l.en}</small></span>
                    <span className={`langpop__cov ${c.tone}`}>{t(c.label)}</span>
                    {l.code === lang && <Check size={14} className="langpop__check" />}
                  </button>
                ); })}
              </div>
            ))}
          </div>
          <div className="langpop__foot">{t(t3(`已就绪 ${ready} 种，其余按试点排期接入母语包。`, `${ready} languages ready; others land on the pilot schedule.`, `Lugha ${ready} tayari; nyingine kwa ratiba.`))}</div>
        </div>
      )}
    </div>
  );
}
