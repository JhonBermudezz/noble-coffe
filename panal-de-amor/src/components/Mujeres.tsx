import { motion } from "motion/react";
import { img, wa, women } from "../data";
import { Heading, HexIcon } from "./Bits";

// Mujeres que endulzan: el programa para mamás cabeza de familia.
export function Mujeres() {
  return (
    <section id="mujeres" className="relative overflow-hidden bg-rosa/70 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-4 md:grid-cols-2 md:px-8">
        <div className="order-2 md:order-1">
          <Heading kicker="Mujeres que endulzan" title="Buscamos mamás cabeza de familia para crecer juntas" />
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-cafe/80">
            En Panal de Amor creemos en el poder de las mujeres. Por eso abrimos espacio para mamás cabeza de familia que quieran generar ingresos desde su casa, sin descuidar a sus hijos.
          </p>
          <ul className="mt-8 space-y-4">
            {women.map((w, i) => (
              <motion.li key={w.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4">
                <HexIcon className="mt-1 h-7 w-7 shrink-0" fill="#d63c7c" />
                <span>
                  <span className="display block text-xl">{w.title}</span>
                  <span className="text-cafe/75">{w.text}</span>
                </span>
              </motion.li>
            ))}
          </ul>
          <a href={wa("¡Hola, Panal de Amor! Quiero postularme al programa Mujeres que endulzan.")} target="_blank" rel="noreferrer" className="btn-fucsia mt-9 inline-block rounded-full px-7 py-4 text-lg font-bold text-white transition-transform hover:-translate-y-1">
            Quiero postularme
          </a>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: 3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 mx-auto w-full max-w-[480px] md:order-2"
        >
          <div className="overflow-hidden rounded-t-full rounded-b-[40px] shadow-[0_0_0_8px_#fff,0_40px_60px_-30px_rgb(74_42_20/0.6)]">
            <img src={img("mujeres-cabeza-de-familia")} alt="Mamá preparando frasquitos de miel en la mesa de su casa junto a su hija" loading="lazy" className="aspect-[0.8] w-full object-cover object-[40%_50%]" />
          </div>
          <img src={img("flores-ramo")} alt="" aria-hidden className="absolute -left-12 -top-6 w-40 -rotate-12" />
          <img src={img("flores-guirnalda")} alt="" aria-hidden className="absolute -bottom-10 -right-8 w-32" />
        </motion.div>
      </div>
    </section>
  );
}
