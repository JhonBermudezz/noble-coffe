import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { img } from "../data";
import { Painted } from "./Painted";

// Colores tierra del mural de la entrada.
const EARTH = ["#5b3a2e", "#3c6e71", "#6b7f3a", "#c8643b", "#8a3b3b", "#2f4f4f", "#a0662f", "#4f6b3a"];

// Posiciones fijas (en %) para que el mural se vea igual siempre.
const FLOWERS = Array.from({ length: 34 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    left: r(1) * 100,
    top: r(2) * 100,
    size: 70 + r(3) * 120,
    color: EARTH[i % EARTH.length],
    shape: (i % 5 === 0 ? "monstera" : i % 4 === 0 ? "sprig" : "flower") as "monstera" | "sprig" | "flower",
    start: r(4) * 0.5,
    spin: (r(5) - 0.5) * 120,
  };
}).filter((f) => !(f.left > 18 && f.left < 82 && f.top > 30 && f.top < 72)); // el centro queda libre para la palabra

function Bloom({ f, progress }: { f: (typeof FLOWERS)[number]; progress: MotionValue<number> }) {
  const scale = useTransform(progress, [f.start, f.start + 0.35], [0, 1]);
  const rotate = useTransform(progress, [f.start, f.start + 0.35], [f.spin, 0]);
  return (
    <motion.div className="absolute" style={{ left: `${f.left}%`, top: `${f.top}%`, width: f.size, height: f.size, marginLeft: -f.size / 2, marginTop: -f.size / 2, scale, rotate }}>
      <Painted name={f.shape} className="h-full w-full" color={f.color} />
    </motion.div>
  );
}

const WORD = "CREAVIVA".split("");

// El mural de flores de la entrada, redibujado: las flores se abren con el scroll y forman la palabra.
export function Mural() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  return (
    <section ref={ref} aria-label="El mural de Creaviva" className="relative h-[110vh] min-h-[640px] overflow-hidden bg-[#f3ead8]">
      {FLOWERS.map((f, i) => (
        <Bloom key={i} f={f} progress={scrollYProgress} />
      ))}
      <div className="absolute inset-0 grid place-items-center px-4">
        <div className="text-center">
          <h2 className="flex font-display text-[clamp(3.2rem,12vw,11rem)] leading-none" aria-label="Creaviva">
            {WORD.map((ch, i) => (
              <Letter key={i} ch={ch} i={i} progress={scrollYProgress} />
            ))}
          </h2>
          <figure className="mx-auto mt-6 w-44 overflow-hidden rounded-[20px] md:w-52">
            <img src={img("mural")} alt="El mural de flores de la entrada de Creaviva" loading="lazy" className="aspect-[3/4] w-full object-cover" />
          </figure>
        </div>
      </div>
    </section>
  );
}

function Letter({ ch, i, progress }: { ch: string; i: number; progress: MotionValue<number> }) {
  const at = 0.45 + i * 0.05;
  const y = useTransform(progress, [at, at + 0.15], [80, 0]);
  const opacity = useTransform(progress, [at, at + 0.1], [0, 1]);
  const colors = ["#3c6e71", "#c8643b", "#4f6b3a", "#8a3b3b"];
  return (
    <motion.span
      aria-hidden
      style={{ y, opacity, color: colors[i % colors.length] }}
      className="inline-block"
    >
      {ch}
    </motion.span>
  );
}
