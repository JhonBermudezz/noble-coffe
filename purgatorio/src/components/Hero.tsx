import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { img } from "../data";

// Murciélago en silueta.
function Bat({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 40" className={className} style={style} aria-hidden>
      <path
        d="M50 14c2-4 4-6 6-5-1 2 0 4 2 5 6-6 16-9 26-8-6 3-8 7-8 11 6-1 12 1 16 6-8-2-14 0-18 4-4-3-10-4-14-2-2 1-4 4-6 7-2-3-4-6-6-7-4-2-10-1-14 2-4-4-10-6-18-4 4-5 10-7 16-6 0-4-2-8-8-11 10-1 20 2 26 8 2-1 3-3 2-5 2-1 4 1 6 5z"
        fill="#050304"
      />
    </svg>
  );
}

const BATS = [
  { top: "18%", delay: 0, dur: 14, size: "w-12" },
  { top: "30%", delay: 5, dur: 18, size: "w-8" },
  { top: "12%", delay: 9, dur: 16, size: "w-10" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  // Cursor de vela: un círculo de luz cálida que revela la escena en penumbra.
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const sx = useSpring(mx, { stiffness: 200, damping: 30 });
  const sy = useSpring(my, { stiffness: 200, damping: 30 });
  const mask = useTransform([sx, sy], ([x, y]) => `radial-gradient(circle 220px at ${x}px ${y}px, transparent 0%, transparent 35%, rgb(5 3 4 / 0.55) 100%)`);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, [mx, my]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[620px] overflow-hidden">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: bgY, scale: 1.12 }}>
        <img src={img("hero-night")} alt="El castillo de El Purgatorio de noche con luna llena" className="h-full w-full object-cover object-[65%_50%]" />
      </motion.div>
      {/* Penumbra: más oscura lejos de la vela (solo en computador). */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 hidden [@media(pointer:fine)]:block" style={{ background: mask }} />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/40 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night to-transparent" />

      {/* Niebla */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-56 overflow-hidden opacity-70">
        <div
          className="fog absolute bottom-0 h-full w-[200%]"
          style={{ background: "radial-gradient(ellipse 30% 60% at 25% 100%, rgb(239 230 216 / 0.25), transparent 70%), radial-gradient(ellipse 30% 60% at 75% 100%, rgb(239 230 216 / 0.2), transparent 70%)" }}
        />
      </div>

      {/* Murciélagos */}
      {!reduce &&
        BATS.map((b, i) => (
          <motion.div
            key={i}
            aria-hidden
            className="absolute left-0"
            style={{ top: b.top }}
            initial={{ x: "-15vw" }}
            animate={{ x: "115vw", y: [0, -30, 10, -20, 0] }}
            transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "linear" }}
          >
            <motion.div animate={{ scaleY: [1, 0.4, 1] }} transition={{ duration: 0.35, repeat: Infinity }}>
              <Bat className={b.size} />
            </motion.div>
          </motion.div>
        ))}

      <motion.div style={reduce ? undefined : { y: titleY }} className="relative z-10 mx-auto flex h-full max-w-[1300px] flex-col justify-center px-5 md:px-10">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} className="title text-sm tracking-[0.5em] text-blood md:text-base">
          Un café dentro de un castillo · Bogotá
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.01em" }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="title neon mt-4 text-[clamp(4rem,9vw,8rem)]"
        >
          El
          <br />
          Purgatorio
        </motion.h1>
        <motion.p
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 2, delay: 1.4, ease: "easeInOut" }}
          className="mt-2 font-script text-[clamp(2.4rem,5vw,4.2rem)] text-bone"
        >
          Arte, café y algo más
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.8 }} className="mt-10 flex flex-wrap gap-4">
          <a href="#pecados" className="title border border-blood bg-blood px-7 py-4 text-xl text-bone shadow-[0_0_30px_rgb(200_16_46/0.45)] transition-transform hover:scale-105">
            Elige tu pecado
          </a>
          <a href="#villanos" className="title border border-bone/40 px-7 py-4 text-xl text-bone transition-colors hover:border-bone hover:bg-bone/10">
            Noche de Villanos
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
