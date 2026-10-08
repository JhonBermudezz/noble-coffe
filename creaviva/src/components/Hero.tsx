import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { INSTAGRAM_DM, img } from "../data";
import { Painted } from "./Painted";
import type { PaintedName } from "./painted-data";

const ease = [0.16, 1, 0.3, 1] as const;

// Formas del cuadro del local que se pueden arrastrar por el inicio.
function Sticker({
  area,
  name,
  color,
  className,
  delay,
  rotate,
}: {
  area: React.RefObject<HTMLElement | null>;
  name: PaintedName;
  color: string;
  className: string;
  delay: number;
  rotate: number;
}) {
  return (
    <motion.div
      drag
      dragConstraints={area}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 260, bounceDamping: 14 }}
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      initial={{ scale: 0, rotate: rotate - 30 }}
      animate={{ scale: 1, rotate }}
      transition={{ type: "spring", stiffness: 150, damping: 14, delay }}
      className={`absolute z-20 cursor-grab touch-none ${className}`}
    >
      <Painted name={name} color={color} className="w-full" />
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} id="top" className="relative overflow-hidden">
      <div className="relative mx-auto grid min-h-[100dvh] max-w-[1300px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-28 md:px-8 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="font-display text-[clamp(3.4rem,8.4vw,7.4rem)] leading-[0.95] text-forest"
          >
            ¿Y si cambiamos de <em>plan</em>?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="mt-6 max-w-md text-xl leading-snug text-forest/80"
          >
            Un café con los planes más creativos de Bogotá.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.42, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href="#kits" className="rounded-full bg-forest px-7 py-4 text-[17px] font-semibold text-cream transition-transform hover:-translate-y-0.5 active:scale-[0.97]">
              Ver kits
            </a>
            <a
              href={INSTAGRAM_DM}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-mustard px-7 py-4 text-[17px] font-semibold text-forest transition-transform hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Reservar
            </a>
          </motion.div>
        </div>

        {/* Foto principal con formas del cuadro asomándose por detrás, como en sus piezas de Instagram. */}
        <div className="relative mx-auto w-full max-w-[520px] lg:col-span-6 lg:ml-auto lg:mr-0">
          <Painted name="monstera" color="#1f4a32" className="absolute -left-16 -top-10 w-48 -rotate-12 md:-left-24 md:w-64" />
          <Painted name="flower" color="#f28bb0" className="absolute -bottom-10 -right-8 w-40 rotate-12 md:w-52" />
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0 round 240px 240px 28px 28px)" }}
            animate={{ clipPath: "inset(0% 0 0 0 round 240px 240px 28px 28px)" }}
            transition={{ duration: 1.3, delay: 0.15, ease }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, delay: 0.15, ease }}
              src={img("mural-logo")}
              alt="Clienta con su cerámica pintada frente al mural de Creaviva"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.7 }}
            className="absolute -bottom-6 -left-6 aspect-square w-[38%] overflow-hidden rounded-full border-[6px] border-cream md:-left-12"
          >
            <img src={img("osito")} alt="Osito de cerámica pintado de rosado" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </div>

      {!reduce && (
        <>
          <Sticker area={ref} name="heart" color="#ee5a24" className="left-[44%] top-[18%] hidden w-16 md:block" delay={0.9} rotate={-10} />
          <Sticker area={ref} name="dots" color="#3fb8a6" className="bottom-[10%] left-[6%] w-14 md:left-[40%] md:w-16" delay={1} rotate={8} />
          <Sticker area={ref} name="sprig" color="#c8643b" className="right-[6%] top-[52%] w-12 md:top-[16%] md:w-14" delay={1.1} rotate={18} />
        </>
      )}
    </section>
  );
}
