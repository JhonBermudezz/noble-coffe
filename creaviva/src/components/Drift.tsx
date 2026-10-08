import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// Envuelve una forma decorativa para que gire y flote mientras pasa por la pantalla.
export function Drift({ children, className = "", rotate = 40, y = -50 }: { children: React.ReactNode; className?: string; rotate?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const r = useTransform(scrollYProgress, [0, 1], [-rotate / 2, rotate / 2]);
  const ty = useTransform(scrollYProgress, [0, 1], [-y / 2, y / 2]);
  return (
    <motion.div ref={ref} aria-hidden style={reduce ? undefined : { rotate: r, y: ty }} className={className}>
      {children}
    </motion.div>
  );
}
