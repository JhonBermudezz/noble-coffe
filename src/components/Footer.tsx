import { motion } from "motion/react";
import { ADDRESS, INSTAGRAM } from "../data/menu";
import { ROOT } from "../lib/paths";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper text-ink">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center px-4 pb-8 pt-20 text-center md:px-8 md:pt-28">
        {/* El elemento observado no lleva clip-path; el recorte va en el hijo. */}
        <motion.div initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.3 }}>
          <motion.div
            variants={{ hidden: { clipPath: "inset(100% 0% 0% 0%)" }, shown: { clipPath: "inset(0% 0% 0% 0%)" } }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo className="w-[52vw] max-w-[17rem] md:w-[22vw] md:max-w-[19rem]" title="Noble" />
          </motion.div>
        </motion.div>

        <p className="mt-10 text-lg md:text-xl">¡Somos pura #Cafelicidad!</p>

        <nav aria-label="Pie de página" className="mt-6 flex gap-8 text-sm">
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

        <div className="mt-16 flex w-full flex-wrap justify-between gap-4 border-t border-line pt-6 text-xs text-muted">
          <p>© {new Date().getFullYear()} Noble Café</p>
          <p>{ADDRESS}, Bogotá</p>
        </div>
      </div>
    </footer>
  );
}
