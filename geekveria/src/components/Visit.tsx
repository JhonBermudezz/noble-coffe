import { motion } from "motion/react";
import { ADDRESS, CITY, MAPS_URL, img } from "../data";
import { Burst } from "./Burst";

export function Visit() {
  return (
    <section id="visita" className="relative overflow-hidden py-24 md:py-32">
      <div className="rays spin-slow absolute -inset-[60%] opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-4 md:px-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="ink-text font-display text-[clamp(3.2rem,9vw,7.5rem)] uppercase leading-[0.88] text-paper">
            Visita la
            <br />
            <span className="text-yellow">tienda física</span>
          </h2>
          <div className="panel mt-8 inline-block -rotate-1 bg-paper px-6 py-4">
            <p className="font-display text-3xl uppercase md:text-4xl">{ADDRESS}</p>
            <p className="text-lg">{CITY}</p>
          </div>
          <div className="mt-8">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="panel inline-block bg-red px-7 py-4 font-display text-xl uppercase tracking-wide text-white transition-transform hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Cómo llegar
            </a>
          </div>
        </div>
        <motion.div
          className="relative mx-auto w-full max-w-[420px]"
          initial={{ y: 80, rotate: 8, opacity: 0 }}
          whileInView={{ y: 0, rotate: 3, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <figure className="panel overflow-hidden bg-white">
            <img src={img("vistazo")} alt="Un vistazo a Geekveria" loading="lazy" className="w-full object-cover" />
          </figure>
          <div className="absolute -left-8 -top-8">
            <Burst text="¡TE ESPERAMOS!" color="#2ec4f1" className="h-32 w-32 md:h-36 md:w-36" size="text-lg md:text-xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
