import { motion } from "motion/react";

// Corazoncitos que flotan, en amarillo, fucsia y color miel, como los de la imagen de la marca.
export function Heart({ className = "", color = "#d63c7c" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 22" className={className} aria-hidden>
      <path d="M12 21S1 14 1 7a5.5 5.5 0 0 1 11-1 5.5 5.5 0 0 1 11 1c0 7-11 14-11 14z" fill={color} />
      <path d="M6.5 5.5a3 3 0 0 0-2.4 2.6" stroke="#fff" strokeOpacity=".7" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export type Float = { left: string; top: string; size: string; color: string; delay?: number };

export function FloatingHearts({ items, className = "" }: { items: Float[]; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {items.map((h, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: h.left, top: h.top }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0], rotate: [-8, 8, -8] }}
          transition={{
            opacity: { delay: 0.6 + (h.delay ?? i * 0.12), duration: 0.4 },
            scale: { delay: 0.6 + (h.delay ?? i * 0.12), type: "spring", stiffness: 260, damping: 12 },
            y: { duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4 + (i % 2), repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Heart className={h.size} color={h.color} />
        </motion.div>
      ))}
    </div>
  );
}
