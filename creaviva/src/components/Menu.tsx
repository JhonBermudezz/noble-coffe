import { motion } from "motion/react";
import { img, menu, price } from "../data";
import { Painted } from "./Painted";

// La carta completa a la vista, como la hoja impresa del local: tres columnas,
// sabores en texto corrido y precios alineados.
export function Menu() {
  return (
    <section id="menu" className="relative overflow-hidden bg-[#efe6d4] py-24 md:py-32">
      <Painted name="leafy" color="#7f9a5b" className="absolute -right-6 top-10 w-32 opacity-80 md:w-44" />
      <Painted name="sprig" color="#c8643b" className="absolute -left-4 bottom-10 w-20 -rotate-12 opacity-80 md:w-28" />

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-forest/25 pb-8">
          <h2 className="font-display text-[clamp(3.2rem,8vw,7rem)] leading-[0.9] text-forest">
            La <em>carta</em>
          </h2>
          <div className="flex -space-x-5">
            {["croissant", "soda", "vaso"].map((p, i) => (
              <motion.img
                key={p}
                src={img(p)}
                alt=""
                loading="lazy"
                whileHover={{ y: -8, zIndex: 10 }}
                className="relative h-20 w-20 rounded-full border-4 border-[#efe6d4] object-cover md:h-24 md:w-24"
                style={{ zIndex: 3 - i }}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-14 md:grid-cols-3 md:gap-10">
          {menu.map((group) => (
            <div key={group.id}>
              <h3 className="font-display text-4xl italic text-terra">{group.title}</h3>
              <ul className="mt-6 space-y-5">
                {group.items.map((it) => (
                  <li key={it.name}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[17px] font-semibold text-forest">{it.name}</span>
                      <span className="shrink-0 text-[17px] font-medium tabular-nums text-forest">{price(it.price)}</span>
                    </div>
                    {it.flavors && <p className="mt-1 text-[15px] leading-snug text-forest/60">{it.flavors.join(", ")}</p>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
