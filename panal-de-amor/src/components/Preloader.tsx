import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { img } from "../data";
import { playMusic } from "./Musica";

const KEY = "panal-bienvenida";

// La bienvenida sale una vez por sesión.
export function shouldShowIntro() {
  try {
    return sessionStorage.getItem(KEY) !== "1";
  } catch {
    return true;
  }
}

// Bienvenida: la imagen de la marca a pantalla completa, sin texto encima. Abajo, dos botones para entrar
// (con o sin música). Si nadie toca nada, entra sola. Al salir, la cortina de miel gotea hacia abajo.
export function Preloader({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);

  const enter = (music: boolean) => {
    if (open) return;
    if (music) playMusic();
    setOpen(true);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* sin almacenamiento la bienvenida se repite */
    }
    setTimeout(onDone, 450);
  };

  useEffect(() => {
    const t = setTimeout(() => enter(false), 6500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="bienvenida"
          className="fixed inset-x-0 top-0 z-[90] h-[100svh] bg-crema"
          exit={{ y: "112%" }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.25, 1] }}
        >
          {/* Relleno desenfocado para pantallas verticales */}
          <img src={img("bienvenida-blur")} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl" />
          <motion.img
            src={img("bienvenida")}
            alt="Panal de Amor · Jeremías 32:41"
            className="absolute left-1/2 top-[44%] w-[190%] max-w-none -translate-x-1/2 -translate-y-1/2 [@media(min-aspect-ratio:4/3)]:inset-0 [@media(min-aspect-ratio:4/3)]:top-0 [@media(min-aspect-ratio:4/3)]:left-0 [@media(min-aspect-ratio:4/3)]:h-full [@media(min-aspect-ratio:4/3)]:w-full [@media(min-aspect-ratio:4/3)]:translate-x-0 [@media(min-aspect-ratio:4/3)]:translate-y-0 [@media(min-aspect-ratio:4/3)]:object-cover"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* El borde que gotea al salir */}
          <img src={img("miel-goteo")} alt="" aria-hidden className="absolute left-0 top-[calc(100%-2px)] w-full" />
          <motion.div
            className="absolute inset-x-0 bottom-[6%] flex flex-wrap justify-center gap-3 px-4 [@media(min-aspect-ratio:4/3)]:bottom-[4%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <button onClick={() => enter(true)} className="btn-fucsia flex items-center gap-2 rounded-full px-6 py-3.5 font-bold text-white transition-transform hover:-translate-y-0.5">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path d="M9 18V5l11-2v13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6" cy="18" r="3" fill="currentColor" />
                <circle cx="17" cy="16" r="3" fill="currentColor" />
              </svg>
              Entrar con música
            </button>
            <button onClick={() => enter(false)} className="rounded-full bg-white/90 px-6 py-3.5 font-bold text-cafe shadow-[0_10px_24px_-12px_rgb(74_42_20/0.5)] backdrop-blur transition-transform hover:-translate-y-0.5">
              Entrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
