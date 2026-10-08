import { motion } from "motion/react";
import { INSTAGRAM, INSTAGRAM_DM, img } from "../data";
import { Monstera } from "./shapes";

// Visítanos. La dirección y el horario se agregan cuando estén confirmados.
export function Visit() {
  return (
    <section id="visita" className="relative overflow-hidden bg-tangerine py-24 text-cream md:py-32">
      <div aria-hidden className="blob absolute -right-24 -top-24 h-96 w-96 bg-bubble" />
      <div aria-hidden className="blob-slow absolute -bottom-32 left-1/4 h-80 w-80 bg-mustard" />
      <Monstera className="absolute -left-10 bottom-0 w-56 opacity-90 md:w-72" color="#1f4a32" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-4 md:px-8 lg:grid-cols-2">
        <div>
          <p className="font-hand text-4xl text-forest">te esperamos</p>
          <h2 className="font-display text-[clamp(3.2rem,8vw,7rem)] leading-[0.88]">
            Ven a
            <br />
            pintar.
          </h2>
          <p className="mt-6 max-w-sm text-xl">Un café con los planes más creativos de Bogotá.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <motion.a
              href={INSTAGRAM_DM}
              target="_blank"
              rel="noreferrer"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full bg-forest px-8 py-4 text-lg font-bold text-cream"
            >
              Reserva tu mesa
            </motion.a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="rounded-full border-[3px] border-cream px-8 py-4 text-lg font-bold transition-transform hover:rotate-2 hover:scale-105">
              @creaviva_cafe
            </a>
          </div>
        </div>

        <div className="relative mx-auto h-[440px] w-full max-w-[460px]">
          <motion.figure
            initial={{ rotate: -14, y: 60, opacity: 0 }}
            whileInView={{ rotate: -7, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 14 }}
            className="absolute left-0 top-0 w-[62%] bg-cream p-2.5 pb-10 shadow-2xl"
          >
            <img src={img("dolce-vita")} alt="Cuadro La Dolce Vita pintado en el local" loading="lazy" className="aspect-[3/4] w-full object-cover" />
          </motion.figure>
          <motion.figure
            initial={{ rotate: 18, y: 80, opacity: 0 }}
            whileInView={{ rotate: 8, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 14, delay: 0.15 }}
            className="absolute bottom-0 right-0 w-[52%] bg-cream p-2.5 pb-10 shadow-2xl"
          >
            <img src={img("coffee-time")} alt="Cuadro Coffee Time sobre la pared verde" loading="lazy" className="aspect-[3/4] w-full object-cover" />
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
