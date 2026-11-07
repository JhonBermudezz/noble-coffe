import { motion } from "motion/react";
import { about, img, values } from "../data";
import { Bee } from "./Bits";

// Quiénes somos: misión y visión como dos etiquetas grandes de frasquito, y los valores como celdas de panal.
export function Nosotros() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-crema py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <div className="grid items-end gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="script text-3xl text-fucsia md:text-4xl">Quiénes somos</p>
            <h2 className="display mt-2 text-[clamp(2.4rem,5.6vw,4.6rem)]">
              Endulzamos tus momentos, creamos recuerdos que <span className="display-i text-miel-2">perduran</span> en el corazón
            </h2>
          </div>
          <div className="relative hidden justify-end md:flex">
            <img src={img("logo")} alt="Logo de Panal de Amor" loading="lazy" className="w-56 rounded-full shadow-[0_0_0_6px_#fff,0_0_0_10px_var(--color-miel)]" />
            <Bee className="-left-4 top-0" />
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            { t: "Misión", d: about.mission },
            { t: "Visión", d: about.vision },
          ].map((c, i) => (
            <motion.article
              key={c.t}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="relative rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,#fffdf8,#fbf1dd)] p-8 shadow-[0_0_0_3px_#fff,0_0_0_6px_var(--color-miel),0_30px_50px_-36px_rgb(74_42_20/0.7)] md:p-10"
            >
              <div aria-hidden className="pointer-events-none absolute inset-3 rounded-[32px] border border-dashed border-miel-2/50" />
              <p className="script text-4xl text-fucsia">{c.t}</p>
              <p className="mt-3 text-lg leading-relaxed text-cafe/85">{c.d}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {about.pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-[28px] bg-white p-7"
            >
              <h3 className="display text-2xl">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-cafe/75">{p.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="script text-3xl text-fucsia">Nuestros valores</p>
          <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-x-2 gap-y-1">
            {values.map((v, i) => (
              <motion.li
                key={v}
                initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 200, damping: 14 }}
                className={`hex grid aspect-[0.88] w-[132px] place-items-center p-4 text-center md:w-[150px] ${i % 2 ? "mt-[54px] md:mt-[64px]" : ""} ${v === "Fe en Dios" ? "btn-fucsia text-white" : i % 3 === 0 ? "btn-miel" : "bg-polen"}`}
              >
                <span className="display text-[0.95rem] leading-tight md:text-base">{v}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
