import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { img } from "../data";

const KEY = "casita-intro";

// Solo una vez por sesión y nunca con "reducir movimiento".
export function shouldShowIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(KEY) !== "1";
  } catch {
    return true;
  }
}

// Entrada: de noche, el letrero de neón del mostrador se enciende titilando,
// y el toldo de la fachada sube como una persiana para abrir la casita.
export function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"off" | "on" | "up">("off");

  useEffect(() => {
    const a = setTimeout(() => setPhase("on"), 450);
    const b = setTimeout(() => setPhase("up"), 2300);
    const c = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* sin almacenamiento la intro se repite */
      }
      onDone();
    }, 2900);
    return () => [a, b, c].forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== "up" && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-cacao-2"
          exit={{ y: "-118%" }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
        >
          {/* El letrero */}
          <div className={phase === "on" ? "neon-glow" : ""}>
          <motion.img
            src={img("logo-casita")}
            alt="La Casita de Dios"
            className="w-[min(78vw,520px)]"
            initial={{ opacity: 0.08, filter: "brightness(0.35) saturate(0.4)" }}
            animate={
              phase === "on"
                ? { opacity: [0.08, 1, 0.3, 1, 0.6, 1], filter: "brightness(1) saturate(1)" }
                : { opacity: 0.08 }
            }
            transition={{ duration: 0.9, times: [0, 0.15, 0.25, 0.45, 0.6, 1] }}
          />
          </div>
          <motion.p
            className="script mt-6 text-3xl text-chicle md:text-4xl"
            initial={{ opacity: 0, y: 10 }}
            animate={phase === "on" ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Bienvenido a casa
          </motion.p>
          {/* Borde de toldo que queda abajo cuando la persiana sube */}
          <div aria-hidden className="toldo feston absolute inset-x-0 top-full h-12" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
