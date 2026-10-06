import { animate, stagger, svg } from "animejs";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { asset } from "../lib/paths";
import { Logo } from "./Logo";

const ease = [0.76, 0, 0.24, 1] as const;
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
  const min = new Promise((r) => setTimeout(r, 2000));
  const max = new Promise((r) => setTimeout(r, 4500));
  return Promise.race([Promise.all([loaded, min]), max]);
}

// anime.js se encarga de la coreografía interna: las letras del logo suben una a una,
// el óvalo de la marca se dibuja y el contador avanza. Motion solo levanta el telón al final.
export function Preloader({ onReveal }: { onReveal: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    document.documentElement.style.overflow = "hidden";
    let cancelled = false;

    const letters = el.querySelectorAll<SVGPathElement>("[data-letter]");
    letters.forEach((l) => (l.style.transformBox = "fill-box"));
    const registered = el.querySelector<SVGGElement>("[data-registered]");

    const rise = animate(letters, {
      translateY: ["120%", "0%"],
      delay: stagger(110, { start: 150 }),
      duration: 1100,
      ease: "outExpo",
    });
    const mark = registered
      ? animate(registered, { opacity: [0, 1], scale: [0.4, 1], delay: 1000, duration: 700, ease: "outBack" })
      : null;

    const [$oval] = svg.createDrawable("[data-oval]");
    const oval = animate($oval, { draw: ["0 0", "0 1"], duration: 1900, delay: 350, ease: "inOutQuart" });

    const count = { n: 0 };
    const write = () => {
      if (counter.current) counter.current.textContent = String(Math.round(count.n)).padStart(3, "0");
    };
    const toEighty = animate(count, { n: 86, duration: 1800, ease: "outQuad", onUpdate: write });

    waitForAssets().then(() => {
      if (cancelled) return;
      toEighty.pause();
      animate(count, {
        n: 100,
        duration: 380,
        ease: "outQuad",
        onUpdate: write,
        onComplete: () => {
          if (cancelled) return;
          setLeaving(true);
          try {
            sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            // Sin almacenamiento la intro simplemente se repite.
          }
          // El inicio arranca mientras el telón sube, así las dos animaciones se encadenan.
          setTimeout(onReveal, 350);
        },
      });
    });

    return () => {
      cancelled = true;
      rise.revert();
      mark?.revert();
      oval.revert();
      toEighty.revert();
      document.documentElement.style.overflow = "";
    };
  }, [onReveal]);

  if (gone) return null;

  return (
    <motion.div
      ref={root}
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
      className="fixed inset-0 z-[80] flex flex-col bg-paper text-ink"
    >
      <div className="relative flex flex-1 items-center justify-center">
        <motion.div animate={leaving ? { y: -120, opacity: 0 } : undefined} transition={{ duration: 0.8, ease }} className="relative">
          <svg
            viewBox="0 0 400 160"
            preserveAspectRatio="none"
            aria-hidden
            className="absolute -inset-x-[22%] -inset-y-[24%] h-[148%] w-[144%] -rotate-[8deg] overflow-visible"
          >
            <ellipse
              data-oval
              cx="200"
              cy="80"
              rx="196"
              ry="76"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.6"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="w-[52vw] max-w-[22rem] overflow-hidden md:w-[17vw] md:max-w-none">
            <Logo />
          </div>
        </motion.div>
      </div>

      <div className="flex items-end justify-between px-4 pb-6 font-mono text-sm md:px-8 md:pb-8">
        <span className="opacity-70">¡Somos pura #Cafelicidad!</span>
        <span ref={counter} className="tabular-nums">
          000
        </span>
      </div>
    </motion.div>
  );
}
