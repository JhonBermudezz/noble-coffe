import { motion } from "motion/react";
import { benefits, img } from "../data";

// Por qué regalar miel: cinco celdas de panal que se encajan una a una.
export function Beneficios() {
  return (
    <section className="relative bg-crema-2 pb-24 pt-36 md:pb-32 md:pt-48">
      <div className="mx-auto max-w-[1320px] px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="script text-3xl text-fucsia md:text-4xl">Beneficios de regalar miel</p>
          <h2 className="display mt-2 text-[clamp(2.4rem,5.5vw,4.4rem)]">Un detalle pequeño que dice mucho</h2>
        </div>
        <ul className="mt-14 flex flex-wrap justify-center gap-x-4 gap-y-2 md:mt-20">
          {benefits.map((b, i) => (
            <motion.li
              key={b.title}
              initial={{ opacity: 0, y: 60, rotate: -12, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 140, damping: 15 }}
              className={`group relative w-[calc(50%-0.5rem)] sm:w-[230px] ${i % 2 ? "md:mt-24" : ""}`}
            >
              <div className="hex relative aspect-[0.88] bg-gradient-to-b from-white to-polen p-[3px] transition-transform duration-500 group-hover:-translate-y-2">
                <div className="hex flex h-full flex-col items-center justify-center bg-white px-4 text-center sm:px-6">
                  <img src={img(b.icon)} alt="" className="h-14 w-14 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-8deg] sm:h-20 sm:w-20 md:h-24 md:w-24" />
                  <h3 className="display mt-2 text-base leading-tight sm:text-lg md:text-xl">{b.title}</h3>
                  <p className="mt-1.5 hidden text-sm leading-snug text-cafe/70 sm:block">{b.text}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
