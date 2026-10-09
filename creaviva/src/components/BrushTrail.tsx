import { useEffect, useRef } from "react";

const TRAIL = ["#f28bb0", "#f2c230", "#3fb8a6", "#ee5a24", "#b9a6e8"];

// Con el mouse se pinta sobre el inicio: la pintura se va secando (desvaneciendo) sola.
export function BrushTrail({ area }: { area: React.RefObject<HTMLElement | null> }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    const el = area.current;
    if (!c || !el) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      c.width = el.clientWidth * dpr;
      c.height = el.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let last: { x: number; y: number } | null = null;
    let hue = 0;
    let raf = 0;
    let visible = true;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const p = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (last) {
        const d = Math.hypot(p.x - last.x, p.y - last.y);
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = TRAIL[Math.floor(hue) % TRAIL.length];
        ctx.lineWidth = Math.max(8, 26 - d * 0.35);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        hue += 0.04;
      }
      last = p;
    };
    const leave = () => (last = null);
    const fade = () => {
      if (visible) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,0.035)";
        ctx.fillRect(0, 0, c.width, c.height);
      }
      raf = requestAnimationFrame(fade);
    };
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);
    raf = requestAnimationFrame(fade);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [area]);

  return <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />;
}
