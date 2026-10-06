import { motion } from "motion/react";
import { food } from "../data/menu";
import { Photo } from "./Photo";

const ease = [0.16, 1, 0.3, 1] as const;

export function FoodGrid() {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {food.map((item, i) => (
          <motion.li
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease }}
            className="group"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {item.image ? (
                <Photo
                  name={item.image}
                  alt={item.name}
                  sizes="(min-width: 768px) 30vw, 45vw"
                  className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                />
              ) : (
                <div className="grid h-full place-items-center bg-gold text-on-gold">
                  <span className="rounded-[50%] border border-on-gold/70 px-4 py-2 text-center font-condensed text-[clamp(1.6rem,3vw,2.6rem)] uppercase leading-none transition-transform duration-500 ease-out-expo group-hover:-rotate-6">
                    {item.name}
                  </span>
                </div>
              )}
            </div>
            <p className="mt-3 font-semibold tracking-tight md:text-lg">{item.name}</p>
            <p className="text-sm text-muted">{item.note}</p>
          </motion.li>
        ))}
      </ul>
      <p className="mt-8 max-w-[52ch] text-sm text-muted">
        La vitrina cambia según el día. Pregunta en barra por lo que hay y sus precios.
      </p>
    </div>
  );
}
