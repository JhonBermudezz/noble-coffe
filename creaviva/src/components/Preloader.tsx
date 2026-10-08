import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Bear, PARTS, type Fills } from "./Bear";

const KEY = "creaviva-intro";
const COLORS = ["#f28bb0", "#f2c230", "#3fb8a6", "#ee5a24", "#b9a6e8", "#7f9a5b"];

export function shouldShowIntro() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return sessionStorage.getItem(KEY) !== "1";
  } catch {
    return true;
  }
}

// Pantalla de carga: el osito de cerámica se pinta solo, parte por parte, y luego se abre la página.
export function Preloader({ onDone }: { onDone: () => void }) {
  const [fills, setFills] = useState<Fills>({});
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const order = ["head", "earL", "earR", "body", "belly", "snout", "armL", "armR", "legL", "legR"] as const;
    const timers = order.map((part, i) =>
      window.setTimeout(() => setFills((f) => ({ ...f, [part]: COLORS[i % COLORS.length] })), 180 + i * 140),
    );
    const end = window.setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* sin almacenamiento: no pasa nada */
      }
      setOpen(false);
      onDone();
    }, 180 + PARTS.length * 140 + 650);
    return () => [...timers, end].forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-forest"
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div initial={{ scale: 0.6, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 140, damping: 12 }}>
              <Bear fills={fills} className="w-40 md:w-52" />
            </motion.div>
            <p className="font-hand text-4xl text-cream">pintando…</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
