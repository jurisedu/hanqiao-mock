"use client";
import { LANGS, useLang } from "@/lib/i18n";

export default function LangSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div className="chips" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button key={l.code} className={`chip ${lang === l.code ? "on" : ""}`} onClick={() => setLang(l.code)} style={compact ? { padding: "4px 9px", fontSize: 11 } : undefined}>
          {compact ? (l.code === "zh" ? "中" : l.code.toUpperCase()) : l.label}
        </button>
      ))}
    </div>
  );
}
