import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Photo } from "./Photo";
import { ScrollText } from "./ScrollText";

// La foto de la Chemex se abre desde un óvalo (la forma de la marca) hasta llenar la pantalla.
// Cuando ya está abierta, el titular se enciende letra por letra con el mismo scroll.
export function Ritual() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rx = useTransform(scrollYProgress, [0, 0.5], [24, 90]);
  const ry = useTransform(scrollYProgress, [0, 0.5], [34, 90]);
  const clip = useMotionTemplate`ellipse(${rx}% ${ry}% at 50% 50%)`;
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.2, 1]);

  return (
    <section ref={ref} aria-labelledby="ritual-title" className={reduce ? "relative" : "relative h-[240vh]"}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div style={reduce ? undefined : { clipPath: clip }} className="absolute inset-0 overflow-hidden">
          <motion.div style={reduce ? undefined : { scale }} className="h-full w-full">
            <Photo name="chemex" alt="Chemex de vidrio con collar de madera" sizes="100vw" className="object-[50%_70%]" />
          </motion.div>
          <div className="absolute inset-0 bg-[#121211]/50" />
        </motion.div>

        <div className="relative mx-auto flex h-full max-w-[1100px] items-center justify-center px-4 text-center text-[#f7eee7]">
          <ScrollText
            id="ritual-title"
            trigger={ref}
            start={() => `top+=${window.innerHeight * 0.72} top`}
            end={() => `top+=${window.innerHeight * 1.28} top`}
            className="font-display text-[clamp(2.5rem,6.4vw,6rem)] leading-[0.98]"
          >
            El café se toma con tiempo.
          </ScrollText>
        </div>
      </div>
    </section>
  );
}
