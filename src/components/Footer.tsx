import { motion } from "motion/react";
import { ADDRESS, INSTAGRAM } from "../data/menu";
import { ROOT } from "../lib/paths";

const letters = "NOBLE".split("");

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line bg-[#161614] text-[#ecebe6]">
      <div className="mx-auto max-w-[1400px] px-4 pt-16 md:px-8 md:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6 text-sm">
          <p className="max-w-[28ch] text-lg leading-snug md:text-xl">¡Somos pura #Cafelicidad!</p>
          <div className="flex gap-8">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">
              Instagram
            </a>
            <a href={`${ROOT}menu/`} className="hover:underline underline-offset-4">
              Menú
            </a>
            <a href="#top" className="hover:underline underline-offset-4">
              Volver arriba
            </a>
          </div>
        </div>

        <motion.p
          aria-label="NOBLE"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.07 }}
          className="mt-14 flex justify-between font-condensed text-[31vw] leading-[0.78] md:text-[29vw] xl:text-[25rem]"
        >
          {letters.map((l, i) => (
            <span key={i} className="inline-block overflow-hidden pt-[0.04em]" aria-hidden>
              <motion.span
                className="inline-block"
                variants={{ hidden: { y: "100%" }, shown: { y: "0%" } }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </motion.p>

        <div className="flex flex-wrap justify-between gap-4 border-t border-[#ecebe6]/15 py-6 text-xs text-[#ecebe6]/70">
          <p>© {new Date().getFullYear()} Noble Café. Todos los derechos reservados.</p>
          <p>{ADDRESS}, Bogotá</p>
        </div>
      </div>
    </footer>
  );
}
