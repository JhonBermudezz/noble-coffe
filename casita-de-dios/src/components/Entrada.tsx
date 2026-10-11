import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { img } from "../data";

// Punto de la puerta en cada foto de la fachada (en % de la imagen). Con object-position en el
// mismo punto, la puerta queda fija en pantalla mientras la cámara se acerca.
const DOOR = { wide: { x: 43, y: 70 }, tall: { x: 38, y: 66 } };

// Silueta de casita centrada en la puerta, de tamaño k (en vmax).
function house(k: number, x: number, y: number) {
  const w = k * 0.5;
  const h = k * 0.62;
  const roof = k * 0.34;
  const P = (dx: number, dy: number) => `calc(${x}% + ${dx.toFixed(2)}vmax) calc(${y}% + ${dy.toFixed(2)}vmax)`;
  return `polygon(${P(0, -h / 2 - roof)}, ${P(w, -h / 2)}, ${P(w, h / 2)}, ${P(-w, h / 2)}, ${P(-w, -h / 2)})`;
}

function Caption({ p, range, children, className = "" }: { p: MotionValue<number>; range: [number, number, number, number]; children: React.ReactNode; className?: string }) {
  const opacity = useTransform(p, range, [0, 1, 1, 0]);
  const y = useTransform(p, [range[0], range[1]], [30, 0]);
  return (
    <motion.div style={{ opacity, y }} className={`pointer-events-none absolute z-30 rounded-[30px] bg-crema/85 px-6 py-4 shadow-[0_0_0_4px_#fff,0_0_0_9px_var(--color-menta)] backdrop-blur-sm md:px-8 md:py-6 ${className}`}>
      {children}
    </motion.div>
  );
}

// "Pasa a la casita": al bajar, la cámara se acerca a la puerta de la fachada, la puerta se abre
// en forma de casita y adentro aparece el salón con su techo de flores; al final se apagan las luces
// y se enciende el letrero.
export function Entrada() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [tall, setTall] = useState(() => window.innerHeight > window.innerWidth);
  useEffect(() => {
    const r = () => setTall(window.innerHeight > window.innerWidth);
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);
  const door = tall ? DOOR.tall : DOOR.wide;

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const facadeScale = useTransform(p, [0, 0.5], [1, 3.4]);
  const clip = useTransform(p, [0.14, 0.56], [0, 300], { clamp: true });
  const clipPath = useTransform(clip, (k) => house(k, door.x, door.y));
  const salonScale = useTransform(p, [0.14, 0.7], [1.35, 1]);
  const flowersY = useTransform(p, [0.4, 0.66], ["-100%", "0%"]);
  const night = useTransform(p, [0.72, 0.86], [0, 0.82]);
  const sign = useTransform(p, [0.8, 0.9], [0, 1]);
  const signScale = useTransform(p, [0.8, 0.95], [0.85, 1]);

  if (reduce) {
    return (
      <section className="relative">
        <img src={img("fachada-wide")} alt="La fachada rosada de La Casita de Dios con su toldo de rayas" className="h-[70vh] w-full object-cover" />
        <img src={img("salon-wide")} alt="El salón con el techo cubierto de flores" className="h-[70vh] w-full object-cover" />
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="Pasa a la casita" className="relative h-[420vh] bg-cacao-2">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Fachada */}
        <motion.img
          src={img(tall ? "fachada-tall" : "fachada-wide")}
          alt="La fachada rosada de La Casita de Dios con su toldo de rayas rosa y menta"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ scale: facadeScale, transformOrigin: `${door.x}% ${door.y}%`, objectPosition: `${door.x}% ${door.y}%` }}
        />
        {/* Salón, visto por la puerta en forma de casita */}
        <motion.div className="absolute inset-0" style={{ clipPath }}>
          <motion.img
            src={img(tall ? "salon" : "salon-wide")}
            alt="Adentro: el techo cubierto de flores de cerezo, sillas menta y rosadas"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale: salonScale }}
          />
          <motion.img src={img("guirnalda")} alt="" aria-hidden className="sway absolute inset-x-0 top-0 w-full" style={{ y: flowersY }} />
        </motion.div>
        {/* Se hace de noche */}
        <motion.div aria-hidden className="absolute inset-0 bg-cacao-2" style={{ opacity: night }} />
        <motion.div style={{ opacity: sign, scale: signScale }} className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
          <div className="neon-glow">
            <img src={img("logo-casita")} alt="El letrero de neón de La Casita de Dios" className="w-[min(74vw,560px)]" />
          </div>
          <p className="script mt-6 text-4xl text-chicle md:text-6xl">De día café, de noche luz</p>
        </motion.div>

        <Caption p={p} range={[0, 0.04, 0.12, 0.18]} className="left-4 top-28 md:left-12 md:top-32">
          <p className="display text-[clamp(3rem,8vw,6rem)] text-cacao">Toc, toc.</p>
          <p className="script mt-1 text-[clamp(2.4rem,5.5vw,4.2rem)] text-rosa-2">¿Se puede?</p>
        </Caption>
        <Caption p={p} range={[0.46, 0.52, 0.66, 0.72]} className="bottom-12 left-4 md:bottom-16 md:left-12">
          <p className="display text-[clamp(2.8rem,7vw,5.5rem)] text-cacao">Pasa,</p>
          <p className="script text-[clamp(2.4rem,6vw,4.6rem)] text-rosa-2">esta es tu casa</p>
        </Caption>
      </div>
    </section>
  );
}
