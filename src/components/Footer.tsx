import { motion } from "motion/react";
import { ADDRESS, INSTAGRAM } from "../data/menu";
import { ROOT } from "../lib/paths";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-4 pt-16 md:px-8 md:pt-24">
        <div className="grid items-end gap-12 md:grid-cols-12">
          {/* El elemento observado no lleva clip-path; el recorte va en el hijo. */}
          <motion.div
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.2 }}
            className="md:col-span-7"
          >
            <motion.div
              variants={{ hidden: { clipPath: "inset(100% 0% 0% 0%)" }, shown: { clipPath: "inset(0% 0% 0% 0%)" } }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Logo className="w-full max-w-[46rem]" title="Noble" />
            </motion.div>
          </motion.div>

          <div className="flex flex-col gap-6 md:col-span-4 md:col-start-9 md:items-end">
            <p className="text-lg md:text-xl">¡Somos pura #Cafelicidad!</p>
            <nav aria-label="Pie de página" className="flex gap-7 text-sm">
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                Instagram
              </a>
              <a href={`${ROOT}menu/`} className="underline-offset-4 hover:underline">
                Menú
              </a>
              <a href={`${ROOT}#top`} className="underline-offset-4 hover:underline">
                Volver arriba
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-line py-6 text-xs text-muted">
          <p>© {new Date().getFullYear()} Noble Café</p>
          <p>{ADDRESS}, Bogotá</p>
        </div>
      </div>
    </footer>
  );
}
