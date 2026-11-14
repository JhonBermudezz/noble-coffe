import { motion } from "motion/react";
import { img, type PageId } from "../data";
import { Link } from "../router";
import { Bee, Goteo } from "./Bits";
import { FloatingHearts } from "./Hearts";

// Encabezado de las páginas internas: miga de pan, la palabra clave en la cursiva de "Amor" y el título grande.
export function PageHero({ kicker, title, intro, current }: { kicker: string; title: React.ReactNode; intro?: string; current: string; id?: PageId }) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-crema to-polen/60 pb-20 pt-32 md:pb-24 md:pt-40">
        <div aria-hidden className="panal absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,#000_10%,transparent_70%)]" />
        <FloatingHearts
          items={[
            { left: "8%", top: "30%", size: "h-5 w-5", color: "#f7c64a" },
            { left: "56%", top: "22%", size: "h-4 w-4", color: "#d63c7c" },
            { left: "88%", top: "70%", size: "h-6 w-6", color: "#e9a426" },
            { left: "40%", top: "84%", size: "h-4 w-4", color: "#f4a6c4" },
          ]}
        />
        <img src={img("flores-ramo")} alt="" aria-hidden className="absolute -right-10 top-16 hidden w-64 rotate-12 opacity-90 md:block" />
        <Bee className="right-[22%] top-[34%] hidden md:block" size="w-16" />
        <div className="relative mx-auto max-w-[1240px] px-4 md:px-8">
          <nav aria-label="Miga de pan" className="text-sm font-semibold text-cafe/60">
            <Link to="inicio" className="hover:text-fucsia">
              Inicio
            </Link>
            <span className="mx-2">›</span>
            <span className="text-cafe">{current}</span>
          </nav>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="script mt-6 text-3xl text-fucsia md:text-4xl">
            {kicker}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="display mt-2 max-w-4xl text-[clamp(2.8rem,6.4vw,5.6rem)] leading-[0.95]"
          >
            {title}
          </motion.h1>
          {intro && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="mt-6 max-w-2xl text-lg leading-relaxed text-cafe/80 md:text-xl">
              {intro}
            </motion.p>
          )}
        </div>
      </section>
      <Goteo />
    </>
  );
}
