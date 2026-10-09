import { useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect } from "react";

// Posición del mouse sobre un área, de -0.5 a 0.5, suavizada con un resorte.
export function usePointer(area: React.RefObject<HTMLElement | null>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 18 });
  const sy = useSpring(y, { stiffness: 60, damping: 18 });
  useEffect(() => {
    const el = area.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set((e.clientX - r.left) / r.width - 0.5);
      y.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, [area, x, y]);
  return { x: sx, y: sy };
}

export const useDepth = (v: MotionValue<number>, depth: number) => useTransform(v, (n) => n * depth);
