import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { VERSE, VERSE_REF, img } from "../data";
import { Bee } from "./Bits";

const WORDS = "Un detalle pequeño que tus invitados se llevan a casa y recuerdan con amor mucho después de la fiesta.".split(" ");

function Word({ w, i, p }: { w: string; i: number; p: MotionValue<number> }) {
  const start = 0.15 + (i / WORDS.length) * 0.45;
  const opacity = useTransform(p, [start, start + 0.06], [0.18, 1]);
  const isLove = w === "amor";
  return (
    <motion.span style={{ opacity }} className={isLove ? "script px-1 text-[1.25em] text-fucsia-2" : ""}>
      {w}{" "}
    </motion.span>
  );
}

// La frase grande sobre fondo de miel: cada palabra se enciende con el scroll.
export function Frase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <section ref={ref} className="relative overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#f7c64a,#e9a426_50%,#c9850e)] py-28 md:py-40">
      <div aria-hidden className="panal-light absolute inset-0" />
      <img src={img("flores-guirnalda")} alt="" aria-hidden className="absolute -left-10 top-0 w-40 opacity-90 md:w-60" />
      <img src={img("flores-guirnalda")} alt="" aria-hidden className="absolute -right-10 bottom-0 w-40 rotate-180 opacity-90 md:w-60" />
      <Bee className="right-4 top-4 md:right-[12%] md:top-[14%]" size="w-12 md:w-16" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <p className="display text-[clamp(2rem,4.8vw,4rem)] leading-[1.12] text-cafe">
          {WORDS.map((w, i) => (
            <Word key={i} w={w} i={i} p={scrollYProgress} />
          ))}
        </p>
        <p className="display-i mt-10 text-xl text-cafe/80 md:text-2xl">
          {VERSE} <span className="not-italic font-semibold">· {VERSE_REF}</span>
        </p>
      </div>
    </section>
  );
}
