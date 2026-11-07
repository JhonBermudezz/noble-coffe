import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { img } from "../data";

const KEY = "panal-intro";

export function shouldShowIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(KEY) !== "1";
  } catch {
    return true;
  }
}

// Entrada: la abejita da una vuelta sobre una cortina de miel, y la cortina
// chorrea hacia abajo para destapar la página.
export function Preloader({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setOpen(true), 2300);
    const b = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* sin almacenamiento la intro se repite */
      }
      onDone();
    }, 2700);
    return () => [a, b].forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="intro"
          className="fixed inset-x-0 top-0 z-[90] h-[100svh]"
          exit={{ y: "112%" }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.25, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#f7c64a,#e9a426_45%,#b9740a)]" />
          <div className="panal-light absolute inset-0" />
          {/* El borde que gotea */}
          <img src={img("miel-goteo")} alt="" aria-hidden className="absolute left-0 top-[calc(100%-2px)] w-full" />
          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            <motion.div
              className="relative h-40 w-40"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 160, damping: 14 }}
            >
              <img src={img("logo")} alt="Panal de Amor" className="h-full w-full rounded-full shadow-[0_0_0_6px_#fff,0_20px_40px_-10px_rgb(74_42_20/0.6)]" />
              {/* La abejita da la vuelta */}
              <motion.div
                className="absolute left-1/2 top-1/2 h-0 w-0"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <img src={img("abeja")} alt="" aria-hidden className="flap absolute -left-7 -top-[132px] w-14" />
              </motion.div>
            </motion.div>
            <motion.p
              className="script mt-10 text-4xl text-cafe md:text-5xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Endulzando tu momento…
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
