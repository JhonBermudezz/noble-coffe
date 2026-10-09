import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { img } from "../data";
import { shake } from "../fx";
import { Burst } from "./Burst";

const KEY = "geekveria-intro";

export function shouldShowIntro() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return sessionStorage.getItem(KEY) !== "1";
  } catch {
    return true;
  }
}

// Pantalla de carga: rayos girando, el logo cae de golpe (con sacudida) y la viñeta se parte en dos.
export function Preloader({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const hit = window.setTimeout(shake, 650);
    const end = window.setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* sin almacenamiento */
      }
      setOpen(false);
      onDone();
    }, 1900);
    return () => [hit, end].forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[200] overflow-hidden" exit={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          {/* Dos mitades que se separan en diagonal al salir. */}
          {[0, 1].map((half) => (
            <motion.div
              key={half}
              className="absolute inset-0 overflow-hidden bg-cream"
              style={{ clipPath: half ? "polygon(0 0, 100% 0, 100% 40%, 0 60%)" : "polygon(0 60%, 100% 40%, 100% 100%, 0 100%)" }}
              exit={{ y: half ? "-100%" : "100%" }}
              transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
            >
              <div className="rays spin-slow absolute -inset-[60%]" />
            </motion.div>
          ))}
          <motion.div className="absolute inset-0 grid place-items-center px-6" exit={{ scale: 1.6, opacity: 0 }} transition={{ duration: 0.35 }}>
            <div className="relative">
              <motion.img
                src={img("logo")}
                alt="Geekveria"
                className="relative w-[min(78vw,560px)] drop-shadow-[10px_10px_0_#2a1610]"
                initial={{ scale: 3.2, rotate: -12, opacity: 0 }}
                animate={{ scale: 1, rotate: -3, opacity: 1 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 15 }}
              />
              <motion.div
                className="absolute -right-6 -top-14 md:-right-14 md:-top-16"
                initial={{ scale: 0, rotate: -40 }}
                animate={{ scale: 1, rotate: 12 }}
                transition={{ delay: 0.75, type: "spring", stiffness: 300, damping: 12 }}
              >
                <Burst text="¡BIENVENIDO!" color="#e63946" textColor="#fff" className="h-28 w-28 md:h-36 md:w-36" size="text-lg md:text-2xl" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
