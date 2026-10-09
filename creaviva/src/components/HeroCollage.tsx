import { motion, type MotionValue } from "motion/react";
import { useRef } from "react";
import { INSTAGRAM_DM, img } from "../data";
import { Painted } from "./Painted";
import type { PaintedName } from "./painted-data";
import { useDepth, usePointer } from "./parallax";

const ease = [0.16, 1, 0.3, 1] as const;

type Item = { photo?: string; shape?: PaintedName; color?: string; className: string; depth: number; rotate: number; round?: boolean };

// Posiciones alrededor del titular; en celular quedan arriba y abajo.
const ITEMS: Item[] = [
  { photo: "osito", className: "left-[3%] top-[14%] w-[30%] md:left-[6%] md:top-[16%] md:w-[15%]", depth: 50, rotate: -8 },
  { photo: "unicornio", className: "right-[4%] top-[12%] w-[34%] md:right-[7%] md:top-[14%] md:w-[17%]", depth: 70, rotate: 7, round: true },
  { photo: "vaso", className: "bottom-[6%] left-[5%] w-[28%] md:bottom-[10%] md:left-[12%] md:w-[13%]", depth: 40, rotate: 5, round: true },
  { photo: "velas", className: "bottom-[5%] right-[6%] w-[36%] md:bottom-[8%] md:right-[10%] md:w-[18%]", depth: 60, rotate: -6 },
  { photo: "lienzo", className: "hidden md:block md:left-[30%] md:top-[11%] md:w-[11%]", depth: 30, rotate: 10 },
  { shape: "monstera", color: "#1f4a32", className: "left-[38%] top-[8%] w-[22%] md:left-[60%] md:top-[4%] md:w-[11%]", depth: 90, rotate: -20 },
  { shape: "flower", color: "#f28bb0", className: "bottom-[24%] right-[2%] w-[18%] md:bottom-[30%] md:right-[3%] md:w-[8%]", depth: 110, rotate: 15 },
  { shape: "heart", color: "#ee5a24", className: "bottom-[10%] left-[42%] w-[14%] md:bottom-[6%] md:left-[44%] md:w-[6%]", depth: 80, rotate: -10 },
  { shape: "dots", color: "#3fb8a6", className: "left-[4%] top-[48%] hidden w-[6%] md:block", depth: 100, rotate: 0 },
];

function Floating({ item, i, area, px, py }: { item: Item; i: number; area: React.RefObject<HTMLElement | null>; px: MotionValue<number>; py: MotionValue<number> }) {
  const x = useDepth(px, -item.depth);
  const y = useDepth(py, -item.depth);
  return (
    <motion.div style={{ x, y }} className={`absolute z-10 ${item.className}`}>
      <motion.div
        drag
        dragConstraints={area}
        dragElastic={0.2}
        whileDrag={{ scale: 1.08, cursor: "grabbing" }}
        initial={{ scale: 0, rotate: item.rotate - 30 }}
        animate={{ scale: 1, rotate: item.rotate, y: [0, -10, 0] }}
        transition={{
          scale: { type: "spring", stiffness: 120, damping: 13, delay: 0.3 + i * 0.07 },
          rotate: { type: "spring", stiffness: 120, damping: 13, delay: 0.3 + i * 0.07 },
          y: { duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
        }}
        className="cursor-grab touch-none"
      >
        {item.photo ? (
          <div className={`overflow-hidden shadow-[0_18px_40px_-16px_rgb(31_74_50/0.5)] ${item.round ? "aspect-square rounded-full" : "aspect-[4/5] rounded-[22px]"}`}>
            <img src={img(item.photo)} alt="" draggable={false} className="h-full w-full object-cover" />
          </div>
        ) : (
          <Painted name={item.shape!} color={item.color!} className="w-full" />
        )}
      </motion.div>
    </motion.div>
  );
}

// Inicio C: titular al centro y un collage de fotos y formas que flotan, siguen al mouse
// y se pueden arrastrar.
export function HeroCollage() {
  const ref = useRef<HTMLElement>(null);
  const { x, y } = usePointer(ref);

  return (
    <section ref={ref} id="top" className="relative min-h-[100dvh] overflow-hidden">
      {ITEMS.map((it, i) => (
        <Floating key={i} item={it} i={i} area={ref} px={x} py={y} />
      ))}
      <div className="pointer-events-none relative z-20 mx-auto flex min-h-[100dvh] max-w-[900px] flex-col items-center justify-center px-5 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className="font-display text-[clamp(3.4rem,9vw,8.5rem)] leading-[0.92] text-forest"
        >
          ¿Y si cambiamos de <em>plan</em>?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease }}
          className="mt-5 text-xl text-forest/80"
        >
          Un café con los planes más creativos de Bogotá.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3"
        >
          <a href="#kits" className="rounded-full bg-forest px-7 py-4 text-[17px] font-semibold text-cream transition-transform hover:-translate-y-0.5">
            Ver kits
          </a>
          <a
            href={INSTAGRAM_DM}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-mustard px-7 py-4 text-[17px] font-semibold text-forest transition-transform hover:-translate-y-0.5"
          >
            Reservar
          </a>
        </motion.div>
      </div>
    </section>
  );
}
