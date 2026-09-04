"use client";
import { useEffect, useRef } from "react";

export default function Waveform({ height = 90, color = "#6c8cff", active = true }: { height?: number; color?: string; active?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return; const ctx = c.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0; const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => { c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; };
    resize(); const ro = new ResizeObserver(resize); ro.observe(c);
    const draw = (tm: number) => {
      const w = c.width, h = c.height; ctx.clearRect(0, 0, w, h);
      const bars = 64, gap = w / bars;
      for (let i = 0; i < bars; i++) {
        const env = Math.exp(-Math.pow((i - bars * 0.55) / (bars * 0.28), 2));
        const a = active ? (0.35 + 0.65 * Math.abs(Math.sin(tm * 0.004 + i * 0.35)) * env) : 0.2 * env + 0.05;
        const bh = a * h * 0.9;
        ctx.fillStyle = color; ctx.globalAlpha = 0.35 + 0.65 * a;
        ctx.beginPath(); ctx.roundRect(i * gap + gap * 0.25, (h - bh) / 2, gap * 0.5, bh, 3 * dpr); ctx.fill();
      }
      if (!reduce && active) raf = requestAnimationFrame(draw);
    };
    draw(performance.now());
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [color, active]);
  return <canvas ref={ref} style={{ width: "100%", height }} aria-hidden="true" />;
}
