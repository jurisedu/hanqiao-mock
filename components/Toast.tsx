"use client";
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Tone = "good" | "warn" | "acc" | "gold" | "";
type Item = { id: number; msg: string; sub?: string; tone: Tone };
const Ctx = createContext<(msg: string, opts?: { sub?: string; tone?: Tone }) => void>(() => {});

export function useToast() { return useContext(Ctx); }

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const push = useCallback((msg: string, opts?: { sub?: string; tone?: Tone }) => {
    const id = Date.now() + Math.random();
    setItems((x) => [...x, { id, msg, sub: opts?.sub, tone: opts?.tone ?? "good" }]);
    setTimeout(() => setItems((x) => x.filter((t) => t.id !== id)), 2800);
  }, []);
  return (
    <Ctx.Provider value={push}>
      {children}
      <div className="toast-wrap" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className={`toast ${t.tone}`} role="status">
            <span className="toast__dot" />
            <div><b>{t.msg}</b>{t.sub && <span>{t.sub}</span>}</div>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
