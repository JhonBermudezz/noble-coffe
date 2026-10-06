import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, MapPin } from "@phosphor-icons/react";
import { MAPS_URL } from "../data/menu";
import { Photo } from "./Photo";
import { Seal } from "./Seal";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const archY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const circleY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const sealRotate = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-12 px-4 pb-16 pt-24 md:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-12">
        <div className="lg:col-span-6 lg:pr-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.92]"
          >
            Pura
            <br />
            cafelicidad.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="mt-7 max-w-[34ch] text-lg leading-relaxed text-muted md:text-xl"
          >
            Café de Pitalito, Huila, preparado sin afán en la Calle 106. De lunes a sábado.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#menu"
              className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-ink px-6 py-3.5 font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Ver menú
              <ArrowDown size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-ink/80 px-6 py-3.5 font-medium transition-colors duration-300 hover:bg-ink hover:text-paper active:scale-[0.98]"
            >
              <MapPin size={18} weight="bold" />
              Cómo llegar
            </a>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] lg:col-span-6 lg:ml-auto lg:mr-0">
          <motion.div style={reduce ? undefined : { y: archY }} className="relative ml-auto w-[82%]">
            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 0% round 999px 999px 0px 0px)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0% round 999px 999px 0px 0px)" }}
              transition={{ duration: 1.4, delay: 0.2, ease }}
              className="aspect-[4/5] max-h-[72dvh] w-full overflow-hidden"
            >
              <motion.div
                initial={{ scale: 1.25 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, delay: 0.2, ease }}
                className="h-full w-full"
              >
                <Photo
                  name="iced-mano"
                  alt="Iced latte en vaso NOBLE sostenido por una mano con suéter azul"
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            style={reduce ? undefined : { y: circleY }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease }}
            className="absolute -bottom-6 left-0 aspect-square w-[42%] overflow-hidden rounded-full ring-[6px] ring-paper"
          >
            <Photo name="vaso-galleta" alt="Vaso de café NOBLE junto a una galleta de chocolate" sizes="240px" />
          </motion.div>

          <motion.div
            style={reduce ? undefined : { rotate: sealRotate }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 1 }}
            className="absolute -top-2 left-[8%] w-24 md:w-28"
          >
            <Seal label="Cafelicidad" className="text-[15px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
