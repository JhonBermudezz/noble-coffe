import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { img } from "../data";
import { playMusic } from "./Musica";

const KEY = "panal-bienvenida";
// Círculo dorado del logo dentro de la imagen de bienvenida (1600 x 900): centro y diámetro en %.
const RING = { cx: 51.25, cy: 49.1, d: 45.6 };

// La bienvenida sale una vez por sesión.
export function shouldShowIntro() {
  try {
    return sessionStorage.getItem(KEY) !== "1";
  } catch {
    return true;
  }
}

// Bienvenida y loader: la imagen de la marca y, mientras la página carga, la abejita da vueltas
// alrededor del círculo dorado del logo y un anillo de miel se va llenando. Cuando todo cargó, aparecen
// los botones para entrar (con o sin música); si nadie toca nada, entra sola. Al salir, la miel gotea.
export function Preloader({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const progress = useMotionValue(0);
  const dash = useTransform(progress, (v) => `${v * 100} 100`);

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

  // Progreso: avanza solo hasta el 90 % mientras carga y llega al 100 % cuando la página terminó.
  useEffect(() => {
    const slow = animate(progress, 0.9, { duration: 4, ease: [0.2, 0.6, 0.4, 1] });
    const start = performance.now();
    const finish = () => {
      const wait = Math.max(0, 1800 - (performance.now() - start));
      setTimeout(() => {
        slow.stop();
        animate(progress, 1, { duration: 0.5, ease: "easeOut" }).then(() => setLoaded(true));
      }, wait);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const safety = setTimeout(finish, 7000);
    return () => {
      slow.stop();
      clearTimeout(safety);
      window.removeEventListener("load", finish);
    };
  }, [progress]);

  // Ya cargó: si nadie elige, entra sola.
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => enter(false), 4500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="bienvenida"
          className="fixed inset-x-0 top-0 z-[90] h-[100svh] overflow-hidden bg-crema"
          exit={{ y: "112%" }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.25, 1] }}
          role="status"
          aria-label={loaded ? "Listo" : "Cargando"}
        >
          {/* Relleno desenfocado para pantallas verticales */}
          <img src={img("bienvenida-blur")} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl" />

          {/* La imagen y el loader comparten la misma caja 16:9, así la abeja gira justo sobre el círculo del logo. */}
          <motion.div
            className="absolute left-1/2 top-[44%] aspect-[16/9] w-[190vw] -translate-x-1/2 -translate-y-1/2 [@media(min-aspect-ratio:4/3)]:top-1/2 [@media(min-aspect-ratio:4/3)]:w-[max(100vw,calc(100svh*16/9))]"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={img("bienvenida")} alt="Panal de Amor · Jeremías 32:41" className="absolute inset-0 h-full w-full" />
            <div className="absolute aspect-square -translate-x-1/2 -translate-y-1/2" style={{ left: `${RING.cx}%`, top: `${RING.cy}%`, width: `${RING.d * 1.06}%` }}>
              {/* Anillo de miel que se llena con el progreso */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
                <circle cx="50" cy="50" r="48" fill="none" stroke="#e9a426" strokeOpacity=".18" strokeWidth="1.2" />
                <motion.circle cx="50" cy="50" r="48" fill="none" stroke="#e9a426" strokeWidth="1.6" strokeLinecap="round" pathLength={100} style={{ strokeDasharray: dash }} />
              </svg>
              {/* La abejita da vueltas mientras carga; al terminar completa la vuelta y se queda arriba */}
              <motion.div
                className="absolute inset-0"
                animate={loaded ? { rotate: 360 } : { rotate: [0, 360] }}
                transition={loaded ? { duration: 0.8, ease: "easeOut" } : { duration: 2.2, ease: "linear", repeat: Infinity }}
              >
                <img src={img("abeja")} alt="" aria-hidden className="flap absolute left-1/2 top-0 w-[17%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_8px_8px_rgb(74_42_20/0.3)]" />
              </motion.div>
            </div>
          </motion.div>

          {/* El borde que gotea al salir */}
          <img src={img("miel-goteo")} alt="" aria-hidden className="absolute left-0 top-[calc(100%-2px)] w-full" />

          <AnimatePresence>
            {loaded && (
              <motion.div
                className="absolute inset-x-0 bottom-[6%] flex flex-wrap justify-center gap-3 px-4 [@media(min-aspect-ratio:4/3)]:bottom-[4%]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
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
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
