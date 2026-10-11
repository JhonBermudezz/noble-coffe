import { motion } from "motion/react";
import { carta, wa } from "../data";
import { Heart } from "./House";

const PERKS = ["Menú especial para celebraciones", "Decoraciones con mensaje especial", "Un espacio lleno de paz, alegría y sabor"];

// "Celebra tus momentos especiales": la página de su carta convertida en invitación bajo el toldo.
export function Celebra() {
  return (
    <section id="celebra" className="relative bg-crema py-24 md:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-4 md:grid-cols-2 md:px-8">
        <motion.div
          initial={{ opacity: 0, rotate: -6, y: 40 }}
          whileInView={{ opacity: 1, rotate: -3, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[460px]"
        >
          <div className="arco halo overflow-hidden bg-malva">
            <img src={carta("torta-durazno-entera")} alt="Torta entera de durazno y crema con una porción servida" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
          <motion.img
            src={carta("cheesecake-frutos")}
            alt=""
            loading="lazy"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 16 }}
            className="absolute -bottom-10 -right-6 aspect-square w-[42%] rounded-full object-cover shadow-[0_0_0_6px_#fff,0_0_0_12px_var(--color-chicle)] md:-right-14"
          />
          <Heart className="absolute -left-4 top-10 h-10 w-10 -rotate-12" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[34px] bg-white shadow-[0_30px_60px_-34px_rgb(98_42_28/0.5)]"
        >
          <div aria-hidden className="toldo feston h-10" />
          <div className="px-6 pb-9 pt-6 md:px-10 md:pb-12">
            <p className="script text-4xl text-rosa-2 md:text-5xl">Celebra tus</p>
            <h2 className="display text-[clamp(2.8rem,6vw,4.6rem)]">momentos especiales</h2>
            <p className="mt-5 text-lg">Preparamos cada detalle con amor para ti:</p>
            <ul className="mt-4 space-y-3">
              {PERKS.map((t) => (
                <li key={t} className="flex items-center gap-3 text-lg font-bold">
                  <Heart className="h-6 w-6 shrink-0" fill="#a6f2e3" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg">Tortas enteras de 12 porciones de todos los sabores de la carta.</p>
            <a
              href={wa("¡Hola, Casita de Dios! Quiero reservar para una celebración.")}
              target="_blank"
              rel="noreferrer"
              className="display mt-8 inline-block rounded-full bg-cacao px-7 py-4 text-xl text-crema shadow-[0_5px_0_#3a1812] transition-transform hover:-translate-y-1"
            >
              Reservar por WhatsApp
            </a>
            <p className="script mt-8 text-3xl text-cacao/80">Aquí, cada celebración es una bendición.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
