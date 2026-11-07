import { motion } from "motion/react";
import { img, quality } from "../data";
import { Heading } from "./Bits";

// Estándares de calidad: la foto en un hexágono acostado y cada promesa numerada en una celda de miel.
export function Calidad() {
  return (
    <section className="relative overflow-hidden bg-crema py-24 md:py-32">
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-4 md:grid-cols-[0.95fr_1.05fr] md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <div aria-hidden className="hex-flat btn-miel absolute -inset-[12px]" />
          <img src={img("calidad-miel-pura")} alt="Manos con guantes sirviendo miel pura en frasquitos de vidrio" loading="lazy" className="hex-flat relative aspect-[1.15] w-full object-cover" />
          <div className="absolute -bottom-8 left-1/2 grid h-28 w-28 -translate-x-1/2 place-items-center rounded-full bg-cafe text-center shadow-[0_0_0_5px_var(--color-crema),0_0_0_8px_var(--color-miel)]">
            <span className="display text-sm leading-tight text-polen">
              Calidad
              <br />
              <span className="script text-2xl text-ambar">garantizada</span>
            </span>
          </div>
        </motion.div>
        <div>
          <Heading kicker="Estándares de calidad" title="Dulzura que puedes regalar con confianza" />
          <p className="mt-5 max-w-xl text-lg text-cafe/75">Cuidamos cada etapa para que tus invitados reciban un detalle tan seguro como hermoso.</p>
          <ul className="mt-8 space-y-3">
            {quality.map((q, i) => (
              <motion.li
                key={q.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group flex items-center gap-4 rounded-[22px] bg-white p-3 pr-5 shadow-[0_14px_30px_-24px_rgb(74_42_20/0.6)] transition-transform hover:translate-x-1"
              >
                <span className="hex btn-miel display grid h-14 w-12 shrink-0 place-items-center text-xl text-cafe transition-transform duration-500 group-hover:rotate-[30deg]">{i + 1}</span>
                <span>
                  <span className="display block text-lg">{q.title}</span>
                  <span className="text-cafe/70">{q.text}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
