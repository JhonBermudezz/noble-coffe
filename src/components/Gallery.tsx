import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { INSTAGRAM } from "../data/menu";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

type Shot = { name: string; alt: string; shape: string };

// Cada columna se mueve a su propio ritmo; las formas alternan óvalo, arco, círculo y rectángulo.
const columns: Shot[][] = [
  [
    { name: "silla", alt: "Silla plegable blanca con un vaso NOBLE frente a un muro verde", shape: "aspect-[3/4] rounded-t-full" },
    { name: "cafelicidad", alt: "Ficha del café: Pitalito, Huila, variedad Castillo, acidez media", shape: "aspect-[4/5]" },
  ],
  [
    { name: "iced-latte", alt: "Café helado NOBLE sobre una mesa redonda", shape: "aspect-square rounded-full" },
    { name: "chemex-vertido", alt: "Leche vertida junto a una Chemex. El método Chemex respeta el tiempo del café", shape: "aspect-[4/5]" },
  ],
  [
    { name: "buen-dia", alt: "Manos sosteniendo una taza, un pan y un vaso NOBLE. Buen día, buen café", shape: "aspect-[4/5]" },
    { name: "cliente", alt: "Cliente con chaqueta de cuero y café para llevar entre plantas", shape: "aspect-[3/5] rounded-full" },
  ],
];

function Column({ shots, y, className = "" }: { shots: Shot[]; y?: MotionValue<number>; className?: string }) {
  return (
    <motion.div style={y ? { y } : undefined} className={`gap-3 md:gap-5 ${className || "flex flex-col"}`}>
      {shots.map((s) => (
        <a
          key={s.name}
          href={INSTAGRAM}
          target="_blank"
          rel="noreferrer"
          className={`group block overflow-hidden ${s.shape}`}
        >
          <Photo
            name={s.name}
            alt={s.alt}
            sizes="(min-width: 768px) 30vw, 50vw"
            className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
          />
        </a>
      ))}
    </motion.div>
  );
}

export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const slow = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const fast = useTransform(scrollYProgress, [0, 1], [180, -180]);

  return (
    <section ref={ref} aria-labelledby="gallery-title" className="mx-auto max-w-[1400px] overflow-hidden px-4 py-24 md:px-8 md:py-36">
      <Reveal className="mb-14 md:mb-20">
        <h2 id="gallery-title" className="font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.95]">
          Así se ve un día en Noble.
        </h2>
        <a
          href={INSTAGRAM}
          target="_blank"
          rel="noreferrer"
          className="group mt-5 inline-flex items-center gap-1.5 font-mono text-[15px] underline-offset-4 hover:underline"
        >
          @somos.noble
          <ArrowUpRight size={16} weight="bold" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </Reveal>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        <Column shots={columns[0]} y={reduce ? undefined : slow} />
        <Column shots={columns[1]} y={reduce ? undefined : fast} className="flex flex-col md:pt-24" />
        <Column shots={columns[2]} y={reduce ? undefined : slow} className="col-span-2 grid grid-cols-2 items-start md:col-span-1 md:flex md:flex-col" />
      </div>
    </section>
  );
}
