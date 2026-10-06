import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Photo } from "./Photo";

// La foto de la Chemex se abre desde un óvalo (la forma de la marca) hasta llenar la pantalla.
export function Ritual() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rx = useTransform(scrollYProgress, [0, 0.55], [24, 90]);
  const ry = useTransform(scrollYProgress, [0, 0.55], [34, 90]);
  const clip = useMotionTemplate`ellipse(${rx}% ${ry}% at 50% 50%)`;
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.2, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.35, 0.6], [40, 0]);

  return (
    <section ref={ref} aria-labelledby="ritual-title" className={reduce ? "relative" : "relative h-[220vh]"}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div style={reduce ? undefined : { clipPath: clip }} className="absolute inset-0 overflow-hidden">
          <motion.div style={reduce ? undefined : { scale }} className="h-full w-full">
            <Photo name="chemex" alt="Chemex de vidrio con collar de madera" sizes="100vw" className="object-[50%_70%]" />
          </motion.div>
          <div className="absolute inset-0 bg-[#121211]/45" />
        </motion.div>

        <motion.div
          style={reduce ? undefined : { opacity: textOpacity, y: textY }}
          className="relative mx-auto flex h-full max-w-[1100px] flex-col items-center justify-center px-4 text-center text-[#f4f1ea]"
        >
          <h2 id="ritual-title" className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.98]">
            El método Chemex respeta el tiempo del café.
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg text-[#f4f1ea]/85 md:text-xl">
            Un café limpio, equilibrado y hecho para disfrutarse despacio.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
