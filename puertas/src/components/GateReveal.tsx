import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { img } from "../data";

// Efecto firma: al bajar, un portón corredizo se desliza con el scroll y deja ver el proyecto terminado.
export function GateReveal() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.08, 0.7], ["0%", "100%"]);
  const textOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.55, 0.8], [40, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={ref} aria-label="Portón corredizo automático" className={reduce ? "relative" : "relative h-[220vh]"}>
      <div className={reduce ? "relative h-[80vh]" : "sticky top-0 h-[100svh] overflow-hidden"}>
        <img src={img("puerta-corrediza-conjunto-residencial-villavicencio")} alt="Portón corredizo instalado en un conjunto de Villavicencio" className="absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

        {/* El portón */}
        {!reduce && (
          <motion.div aria-hidden className="absolute inset-0" style={{ x }}>
            <div className="absolute inset-0 bg-[#1d2733]" style={{ backgroundImage: "repeating-linear-gradient(90deg, #2c3a4a 0 14px, #141c25 14px 18px, #26323f 18px 64px, #141c25 64px 68px)" }} />
            <div className="absolute inset-x-0 top-[16%] h-3 bg-[#0d141c]" />
            <div className="absolute inset-x-0 bottom-[16%] h-3 bg-[#0d141c]" />
            {/* Cerradura y motor */}
            <div className="absolute left-8 top-1/2 h-28 w-3 -translate-y-1/2 rounded-full bg-teal shadow-[0_0_30px_rgb(15_179_196/0.8)]" />
            <motion.div style={{ opacity: hintOpacity }} className="absolute inset-0 grid place-items-center px-6 text-center text-white">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime">Desliza hacia abajo</p>
                <p className="mt-3 text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-tight">Ábrete, portón.</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div style={reduce ? undefined : { opacity: textOpacity, y: textY }} className="absolute inset-x-0 bottom-0 mx-auto max-w-[1240px] px-5 pb-14 text-white md:px-8 md:pb-20">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime">Proyecto destacado</p>
          <p className="mt-3 max-w-2xl text-[clamp(1.8rem,4vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight">Portón corredizo automatizado para conjunto residencial en Villavicencio.</p>
        </motion.div>
      </div>
    </section>
  );
}
