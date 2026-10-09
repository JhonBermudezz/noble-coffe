import { motion, type MotionValue } from "motion/react";
import { useRef } from "react";
import { INSTAGRAM_DM, img } from "../data";
import { BrushTrail } from "./BrushTrail";
import { Painted } from "./Painted";
import type { PaintedName } from "./painted-data";
import { useDepth, usePointer } from "./parallax";

const ease = [0.16, 1, 0.3, 1] as const;

type Item = { photo?: string; shape?: PaintedName; color?: string; className: string; depth: number; rotate: number; round?: boolean };

// Posiciones alrededor del titular; en celular quedan arriba y abajo.
const ITEMS: Item[] = [
  { photo: "osito", className: "left-[3%] top-[16%] w-[30%] md:left-[2%] md:top-[21%] md:w-[11%]", depth: 50, rotate: -8 },
  { photo: "unicornio", className: "right-[4%] top-[15%] w-[34%] md:right-[2%] md:top-[13%] md:w-[13%]", depth: 70, rotate: 7, round: true },
  { photo: "vaso", className: "bottom-[6%] left-[5%] w-[28%] md:bottom-[8%] md:left-[5%] md:w-[11%]", depth: 40, rotate: 5, round: true },
  { photo: "velas", className: "bottom-[5%] right-[6%] w-[36%] md:bottom-[6%] md:right-[4%] md:w-[13%]", depth: 60, rotate: -6 },
  { photo: "lienzo", className: "hidden md:block md:bottom-[5%] md:left-[19%] md:w-[8%]", depth: 30, rotate: 10 },
  { shape: "monstera", color: "#1f4a32", className: "left-[40%] top-[12%] w-[20%] md:left-[auto] md:right-[17%] md:top-[11%] md:w-[7%]", depth: 90, rotate: -20 },
  { shape: "flower", color: "#f28bb0", className: "bottom-[24%] right-[2%] w-[18%] md:bottom-[38%] md:right-[1%] md:w-[6%]", depth: 110, rotate: 15 },
  { shape: "heart", color: "#ee5a24", className: "bottom-[10%] left-[42%] w-[14%] md:bottom-[6%] md:left-[auto] md:right-[20%] md:w-[5%]", depth: 80, rotate: -10 },
  { shape: "dots", color: "#3fb8a6", className: "left-[3%] top-[50%] hidden w-[5%] md:block", depth: 100, rotate: 0 },
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

// Inicio: titular al centro y un collage de fotos y formas que flotan, siguen al mouse
// y se pueden arrastrar.
export function HeroCollage() {
  const ref = useRef<HTMLElement>(null);
  const { x, y } = usePointer(ref);

  return (
    <section ref={ref} id="top" className="relative min-h-[100dvh] overflow-hidden">
      <BrushTrail area={ref} />
      {ITEMS.map((it, i) => (
        <Floating key={i} item={it} i={i} area={ref} px={x} py={y} />
      ))}
      <div className="pointer-events-none relative z-20 mx-auto flex min-h-[100dvh] max-w-[820px] flex-col items-center justify-center px-5 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className="font-display text-[clamp(3.2rem,min(8vw,14vh),7.5rem)] leading-[0.92] text-forest [text-shadow:0_0_18px_#f6efe2,0_0_36px_#f6efe2]"
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
