import { motion } from "motion/react";
import { img } from "../data";
import { Burst } from "./Burst";

const PANELS = [
  { photo: "club-art", title: "Café de verdad", text: "Latte, chai, mochis y cheesecake de Baileys.", sfx: "¡SLURP!", color: "#f2c40f", cls: "md:col-span-7 md:row-span-2", aspect: "aspect-[4/5] md:aspect-auto md:h-full", rot: -1.5 },
  { photo: "marvel", title: "Cómic + manga", text: "Distribuidor autorizado Panini Comics y Panini Manga.", sfx: "¡ZAS!", color: "#e63946", cls: "md:col-span-5", aspect: "aspect-[4/3]", rot: 2 },
  { photo: "t-sailor", title: "La tienda", text: "Camisetas, pines, Funkos y coleccionables.", sfx: "¡WOW!", color: "#2ec4f1", cls: "md:col-span-5", aspect: "aspect-[4/3]", rot: -2 },
  { photo: "squad", title: "El escuadrón del club", text: "Manga, café y la mejor banda geek de la Calle 100.", sfx: "¡HOLA!", color: "#ff5fa2", cls: "md:col-span-12", aspect: "aspect-[16/9] md:aspect-[21/8]", rot: 0.8 },
];

// Una página de cómic: cada viñeta cae de golpe al entrar en pantalla.
export function Club() {
  return (
    <section id="club" className="relative mx-auto max-w-[1300px] px-4 py-24 md:px-8 md:py-32">
      <h2 className="font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.9]">
        Así es <span className="ink-text-sm text-red">el club</span>
      </h2>

      <div className="mt-12 grid gap-6 md:grid-cols-12 md:gap-7">
        {PANELS.map((p, i) => (
          <motion.figure
            key={p.photo}
            className={`panel relative overflow-hidden bg-white ${p.cls}`}
            initial={{ opacity: 0, scale: 1.4, rotate: p.rot * 6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: p.rot }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 180, damping: 16, delay: (i % 2) * 0.1 }}
            whileHover={{ rotate: 0, scale: 1.015 }}
          >
            <div className={`${p.aspect} overflow-hidden`}>
              <img src={img(p.photo)} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <figcaption className="absolute left-4 top-4 max-w-[80%] border-[3px] border-ink bg-yellow px-3 py-2 shadow-[4px_4px_0_#2a1610]">
              <p className="font-display text-2xl uppercase leading-none md:text-3xl">{p.title}</p>
              <p className="mt-1 text-sm leading-snug">{p.text}</p>
            </figcaption>
            <motion.div
              className="absolute bottom-3 right-3"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1, rotate: 12 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.35 + i * 0.05 }}
            >
              <Burst text={p.sfx} color={p.color} className="h-24 w-24 md:h-28 md:w-28" size="text-xl md:text-2xl" />
            </motion.div>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
