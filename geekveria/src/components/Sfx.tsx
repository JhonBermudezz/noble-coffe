import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SFX, SFX_COLORS, pick } from "../fx";
import { Burst } from "./Burst";

type Hit = { id: number; x: number; y: number; text: string; color: string; rot: number };

// Cada clic suelta una onomatopeya de cómic donde se hizo clic.
export function Sfx() {
  const [hits, setHits] = useState<Hit[]>([]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    const down = (e: PointerEvent) => {
      if (e.pointerType === "touch" && !(e.target as Element).closest("a, button")) return;
      const hit = { id: id++, x: e.clientX, y: e.clientY, text: pick(SFX), color: pick(SFX_COLORS), rot: Math.random() * 30 - 15 };
      setHits((h) => [...h.slice(-4), hit]);
      window.setTimeout(() => setHits((h) => h.filter((x) => x.id !== hit.id)), 650);
    };
    window.addEventListener("pointerdown", down);
    return () => window.removeEventListener("pointerdown", down);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[120]" aria-hidden>
      <AnimatePresence>
        {hits.map((h) => (
          <motion.div
            key={h.id}
            className="absolute"
            style={{ left: h.x - 60, top: h.y - 60 }}
            initial={{ scale: 0, rotate: h.rot - 30 }}
            animate={{ scale: [0, 1.25, 1], rotate: h.rot }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Burst text={h.text} color={h.color} className="h-[120px] w-[120px]" size="text-2xl" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
