import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { img } from "../data";
import { BreakfastBadge } from "./Breakfast";
import { Heart, House } from "./House";

const ease = [0.16, 1, 0.3, 1] as const;

// Portada: el techo de flores cuelga arriba, el titular es su frase "Un café con Dios"
// y la foto de su pared del logo va dentro de una casita.
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const houseY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const cupY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const cupR = useTransform(scrollYProgress, [0, 1], [-8, 40]);
  const cookieY = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const flowersY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} id="inicio" className="relative overflow-hidden pt-24 md:pt-28">
      <div aria-hidden className="mantel absolute inset-0 opacity-60" />
      {/* Techo de flores */}
      <motion.div aria-hidden style={reduce ? undefined : { y: flowersY }} className="pointer-events-none absolute inset-x-0 top-16 z-10 md:top-[76px]">
        <motion.div
          className="h-[120px] overflow-hidden md:h-[170px]"
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease }}
          style={{ maskImage: "linear-gradient(#000 55%, transparent)" }}
        >
          <img src={img("guirnalda")} alt="" className="sway h-[260px] w-full object-cover object-top md:h-auto" />
        </motion.div>
      </motion.div>

      <div className="relative z-20 mx-auto grid max-w-[1320px] items-center gap-12 px-4 pb-20 pt-32 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pb-28 md:pt-40 lg:pt-44">
        <div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
            <BreakfastBadge />
          </motion.div>
          <h1 className="display mt-6 text-[clamp(3.6rem,11vw,9rem)] text-cacao">
            <motion.span className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9, ease }}>
              Un café
            </motion.span>
            <motion.span
              className="script sticker -mt-1 block text-[1.15em] text-rosa-2 md:-mt-3"
              initial={{ opacity: 0, clipPath: "inset(-20% 100% -40% -5%)" }}
              animate={{ opacity: 1, clipPath: "inset(-20% -10% -40% -5%)" }}
              transition={{ delay: 0.75, duration: 1.3, ease: "easeInOut" }}
            >
              con Dios
            </motion.span>
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-6 max-w-md text-xl leading-snug">
            Un lugar donde el cielo se encuentra con el aroma del café. Fe, café y amor en cada taza.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 0.6 }} className="mt-9 flex flex-wrap gap-4">
            <a href="#carta" className="display rounded-full bg-cacao px-7 py-4 text-xl text-crema shadow-[0_5px_0_#3a1812] transition-transform hover:-translate-y-1">
              Ver la carta
            </a>
            <a href="#cajita" className="display halo rounded-full bg-white px-7 py-4 text-xl text-cacao transition-transform hover:-translate-y-1">
              Arma tu cajita
            </a>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-[460px] md:max-w-[520px]">
          <motion.div style={reduce ? undefined : { y: houseY }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 1, ease }}>
            <House src={img("latte-oso")} alt="Una clienta con un latte rosado con un osito dibujado en la espuma" className="aspect-[4/5] w-full" imgClass="object-[50%_40%]" />
          </motion.div>
          <motion.img
            src={img("taza")}
            alt="Capuccino con un corazón en la espuma, en su taza floreada"
            style={reduce ? undefined : { y: cupY, rotate: cupR }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease }}
            className="absolute -bottom-10 -left-8 w-[46%] drop-shadow-[0_20px_25px_rgb(98_42_28/0.35)] md:-left-16"
          />
          <motion.img
            src={img("galleta-nutella")}
            alt=""
            style={reduce ? undefined : { y: cookieY }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.8, ease }}
            className="absolute -right-4 top-[38%] w-[30%] rotate-12 drop-shadow-[0_16px_20px_rgb(98_42_28/0.3)] md:-right-10"
          />
          <Heart className="absolute -top-4 left-6 h-8 w-8 -rotate-12" />
          <Heart className="absolute right-12 -top-10 h-6 w-6 rotate-12" fill="#a6f2e3" />
        </div>
      </div>
    </section>
  );
}
