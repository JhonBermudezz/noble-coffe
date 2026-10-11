import { useEffect, useRef } from "react";

// Cada clic suelta pétalos de cerezo y corazoncitos del logo que caen girando.
// Se dibujan directo en el DOM (sin React por frame) y se borran al terminar.
const PETAL = `<svg viewBox="0 0 20 24" width="100%" height="100%"><path d="M10 23C3 17 0 11 2 6c1.5-4 5-5 8-2 3-3 6.5-2 8 2 2 5-1 11-8 17z" fill="url(#g)"/><defs><radialGradient id="g" cx="50%" cy="30%" r="70%"><stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="#f6b5d1"/><stop offset="1" stop-color="#d98aa6"/></radialGradient></defs></svg>`;
const HEART = `<svg viewBox="0 0 24 22" width="100%" height="100%"><path d="M12 21S1 14 1 7a5.5 5.5 0 0 1 11-1 5.5 5.5 0 0 1 11 1c0 7-11 14-11 14z" fill="#d98aa6" stroke="#fff" stroke-width="2"/></svg>`;

export function Petals() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const burst = (x: number, y: number, n: number) => {
      const root = layer.current;
      if (!root) return;
      for (let i = 0; i < n; i++) {
        const el = document.createElement("span");
        const heart = i % 4 === 0;
        const size = heart ? 14 + Math.random() * 8 : 12 + Math.random() * 10;
        el.innerHTML = heart ? HEART : PETAL;
        el.style.cssText = `position:fixed;left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;pointer-events:none;will-change:transform,opacity`;
        root.appendChild(el);
        const ang = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random() * 70;
        const dx = Math.cos(ang) * dist;
        const dy = Math.sin(ang) * dist * 0.7 - 30;
        const fall = 90 + Math.random() * 120;
        const rot = (Math.random() - 0.5) * 540;
        el.animate(
          [
            { transform: "translate(0,0) rotate(0) scale(0.4)", opacity: 1 },
            { transform: `translate(${dx}px,${dy}px) rotate(${rot / 2}deg) scale(1)`, opacity: 1, offset: 0.35 },
            { transform: `translate(${dx * 1.3}px,${dy + fall}px) rotate(${rot}deg) scale(0.9)`, opacity: 0 },
          ],
          { duration: 1300 + Math.random() * 700, easing: "cubic-bezier(.2,.7,.3,1)" },
        ).onfinish = () => el.remove();
      }
    };
    const down = (e: PointerEvent) => burst(e.clientX, e.clientY, 9);
    window.addEventListener("pointerdown", down);
    return () => window.removeEventListener("pointerdown", down);
  }, []);

  return <div ref={layer} aria-hidden className="pointer-events-none fixed inset-0 z-[80]" />;
}
