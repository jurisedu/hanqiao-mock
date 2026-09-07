"use client";
import { Languages } from "lucide-react";
import { LANGS, useLang, useT, UI, type Lang } from "@/lib/i18n";

const PARTIAL: Lang[] = ["fr", "es", "nl", "id"];

/* Full list as chips on landing-type pages; a compact select inside the app shell. */
export default function LangSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  const t = useT();
  const note = PARTIAL.includes(lang) ? t(UI.partial) : "";
  if (compact) {
    return (
      <label className="langsel" title={note || t(UI.language)}>
        <Languages size={14} aria-hidden="true" />
        <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} aria-label={t(UI.language)}>
          {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
        </select>
      </label>
    );
  }
  return (
    <div className="langwrap">
      <div className="chips" role="group" aria-label={t(UI.language)}>
        {LANGS.map((l) => <button key={l.code} className={`chip ${lang === l.code ? "on" : ""}`} onClick={() => setLang(l.code)}>{l.label}</button>)}
      </div>
      {note && <div className="dim small" style={{ marginTop: 6 }}>{note}</div>}
    </div>
  );
}
