import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { img, menu, price } from "../data";

const STICKER = ["bg-cream", "bg-mustard", "bg-bubble", "bg-teal", "bg-lilac"];

// Menú con pestañas en forma de mancha; cada categoría pinta la sección de su color.
export function Menu() {
  const [active, setActive] = useState(menu[0].id);
  const tab = menu.find((t) => t.id === active)!;

  return (
    <section id="menu" className="relative py-24 md:py-32">
      <motion.div
        aria-hidden
        className={`absolute inset-x-3 inset-y-6 rounded-[3rem] md:inset-x-6 ${tab.color}`}
        layout
        key={tab.id}
        initial={{ clipPath: "circle(0% at 50% 0%)" }}
        animate={{ clipPath: "circle(150% at 50% 0%)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className={tab.ink}>
            <p className="font-hand text-4xl">para acompañar</p>
            <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9]">Menú</h2>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categorías del menú">
            {menu.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={t.id === active}
                onClick={() => setActive(t.id)}
                className="relative px-5 py-3 font-display text-xl text-forest"
              >
                {t.id === active && (
                  <motion.span layoutId="menu-tab" className="blob absolute inset-0 bg-cream ring-[3px] ring-forest" transition={{ type: "spring", stiffness: 300, damping: 26 }} />
                )}
                <span className={`relative ${t.id === active ? "" : tab.ink}`}>{t.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_380px]">
          <AnimatePresence mode="wait">
            <motion.ul
              key={tab.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="divide-y-2 divide-dashed divide-forest/30 rounded-[2rem] bg-cream p-6 ring-[3px] ring-forest md:p-8"
            >
              {tab.items.map((it, i) => (
                <motion.li
                  key={it.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-2xl text-forest">{it.name}</span>
                    <span className="flex-1 border-b-2 border-dotted border-forest/30" />
                    <span className="font-display text-2xl text-terra">{price(it.price)}</span>
                  </div>
                  {it.flavors && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {it.flavors.map((f, j) => (
                        <motion.li
                          key={f}
                          whileHover={{ rotate: j % 2 ? 6 : -6, scale: 1.1 }}
                          className={`rounded-full px-3 py-1 text-sm font-semibold text-forest ring-2 ring-forest ${STICKER[(j + i) % STICKER.length]}`}
                          style={{ rotate: (j % 3) - 1 }}
                        >
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab.photo}
              initial={{ scale: 0.6, rotate: -12, opacity: 0 }}
              animate={{ scale: 1, rotate: 3, opacity: 1 }}
              exit={{ scale: 0.6, rotate: 12, opacity: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 15 }}
              className="blob mx-auto hidden aspect-square w-full max-w-[380px] overflow-hidden ring-[6px] ring-forest lg:block"
            >
              <img src={img(tab.photo)} alt="" className="h-full w-full object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
