import { motion } from "motion/react";
import { cop, img, products } from "../data";
import { Link } from "../router";
import { Heading } from "./Bits";

const IDS = ["fucsia", "gypsophila", "quince", "bautizo"];

// En el inicio: cuatro souvenirs destacados en celdas de panal y el enlace a la página completa.
export function Destacados() {
  const list = IDS.map((id) => products.find((p) => p.id === id)!);
  return (
    <section className="relative overflow-hidden bg-crema py-24 md:py-32">
      <div aria-hidden className="panal absolute inset-0 opacity-50 [mask-image:linear-gradient(transparent,#000_30%,#000_70%,transparent)]" />
      <div className="relative mx-auto max-w-[1240px] px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading kicker="Souvenirs" title="Los más pedidos" />
          <Link to="souvenirs" className="group flex items-center gap-2 rounded-full border-2 border-cafe/15 bg-white px-6 py-3 font-bold transition-colors hover:border-miel">
            Ver todos los souvenirs <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-x-8">
          {list.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={i % 2 ? "pt-14" : ""}
            >
              <Link to="souvenirs" className="group block text-center">
                <div className="relative">
                  <div aria-hidden className="hex absolute -inset-[5px] bg-gradient-to-b from-ambar to-miel-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="hex relative aspect-[0.88] overflow-hidden bg-polen">
                    <img src={img(p.photo)} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <span className="script absolute -top-1 left-1/2 -translate-x-1/2 -rotate-3 whitespace-nowrap rounded-full bg-fucsia px-3 py-0.5 text-lg text-white shadow-[0_0_0_3px_#fff]">{p.tag}</span>
                </div>
                <h3 className="display mt-4 text-xl leading-tight md:text-2xl">{p.name}</h3>
                <p className="mt-1 text-sm text-cafe/70">
                  Desde <span className="display text-lg font-bold text-miel-2">{cop(p.from)}</span>
                </p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
