import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { asset } from "../lib/paths";

const ease = [0.76, 0, 0.24, 1] as const;
const letters = "NOBLE".split("");
const STORAGE_KEY = "noble-intro";

// Solo se muestra una vez por sesión y nunca con "reducir movimiento".
export function shouldShowIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return true;
  }
}

// Espera a que carguen la fuente y la foto principal, con un mínimo para que la animación se lea
// y un máximo para no retener a nadie con conexión lenta.
function waitForAssets() {
  const image = new Image();
  image.src = asset("img/iced-mano-1600.webp");
  const loaded = Promise.all([document.fonts.ready, image.decode().catch(() => undefined)]);
  const min = new Promise((r) => setTimeout(r, 1700));
  const max = new Promise((r) => setTimeout(r, 4000));
  return Promise.race([Promise.all([loaded, min]), max]);
}

export function Preloader({ onReveal }: { onReveal: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const counter = animate(count, 86, { duration: 1.6, ease: "easeOut" });
    let cancelled = false;

    waitForAssets().then(async () => {
      if (cancelled) return;
      await animate(count, 100, { duration: 0.35, ease: "easeOut" });
      if (cancelled) return;
      setLeaving(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Sin almacenamiento la intro simplemente se repite.
      }
      // El inicio arranca mientras el telón sube, así las dos animaciones se encadenan.
      setTimeout(onReveal, 350);
    });

    return () => {
      cancelled = true;
      counter.stop();
      document.documentElement.style.overflow = "";
    };
  }, [count, onReveal]);

  if (gone) return null;

  return (
    <motion.div
      role="status"
      aria-label="Cargando Noble Café"
      initial={{ clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)" }}
      animate={leaving ? { clipPath: "inset(0% 0% 100% 0% round 0px 0px 50% 50%)" } : undefined}
      transition={{ duration: 1.1, ease }}
      onAnimationComplete={() => {
        if (leaving) {
          document.documentElement.style.overflow = "";
          setGone(true);
        }
      }}
      className="fixed inset-0 z-[80] flex flex-col bg-[#161614] text-[#ecebe6]"
    >
      <div className="relative flex flex-1 items-center justify-center">
        <motion.div animate={leaving ? { y: -120, opacity: 0 } : undefined} transition={{ duration: 0.8, ease }} className="relative">
          <svg
            viewBox="0 0 400 160"
            preserveAspectRatio="none"
            aria-hidden
            className="absolute -inset-x-[14%] -inset-y-[22%] h-[144%] w-[128%] -rotate-[8deg] overflow-visible"
          >
            <motion.ellipse
              cx="200"
              cy="80"
              rx="196"
              ry="76"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.6"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.3, ease }}
            />
          </svg>
          <p className="flex font-condensed text-[28vw] leading-[0.82] md:text-[17vw]">
            {letters.map((l, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </p>
        </motion.div>
      </div>

      <div className="flex items-end justify-between px-4 pb-6 font-mono text-sm md:px-8 md:pb-8">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.6 }}>
          ¡Somos pura #Cafelicidad!
        </motion.span>
        <motion.span className="tabular-nums">{rounded}</motion.span>
      </div>
    </motion.div>
  );
}
