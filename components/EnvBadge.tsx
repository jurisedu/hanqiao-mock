"use client";
import { FlaskConical } from "lucide-react";
import { useT, UI } from "@/lib/i18n";

/* Global environment marker: every screen says it is the preview environment with sample data. */
export default function EnvBadge({ compact = false }: { compact?: boolean }) {
  const t = useT();
  return (
    <span className={`env ${compact ? "env--compact" : ""}`} title={t(UI.mock)}>
      <FlaskConical size={13} strokeWidth={2} aria-hidden="true" />
      <span>{compact ? t(UI.env) : t(UI.mock)}</span>
    </span>
  );
}
