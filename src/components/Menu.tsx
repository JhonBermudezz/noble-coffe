import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cold, food, formatPrice, hot, type MenuGroup } from "../data/menu";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

const tabs = [
  { id: "hot", label: "Calientes", photo: "chemex-gorra", alt: "Chemex con café sostenida sobre una gorra Everyday Happiness" },
  { id: "cold", label: "Fríos", photo: "iced-latte", alt: "Iced latte en vaso NOBLE sobre una mesa redonda" },
  { id: "food", label: "Para comer", photo: "sandwich", alt: "Sándwich con chips de papa sobre papel NOBLE" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const ease = [0.16, 1, 0.3, 1] as const;

function DrinkGroups({ groups }: { groups: MenuGroup[] }) {
  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <div key={group.title} className="border-t border-line pt-5">
          <h3 className="font-mono text-sm text-muted">{group.title}</h3>
          <ul className="mt-5 grid gap-x-12 gap-y-6 sm:grid-cols-2">
            {group.items.map((item, i) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease }}
                className="group flex items-baseline justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-lg font-semibold tracking-tight transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
                    {item.name}
                  </p>
                  {item.note && <p className="mt-0.5 text-sm text-muted">{item.note}</p>}
                </div>
                {item.price !== undefined && (
                  <span className="shrink-0 font-mono text-[15px] tabular-nums">{formatPrice(item.price)}</span>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function FoodGrid() {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {food.map((item, i) => (
          <motion.li
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05, ease }}
            className="group"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {item.image ? (
                <Photo
                  name={item.image}
                  alt={item.name}
                  sizes="(min-width: 768px) 20vw, 45vw"
                  className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                />
              ) : (
                <div className="grid h-full place-items-center bg-gold text-on-gold">
                  <span className="rounded-[50%] border border-on-gold/70 px-4 py-2 text-center font-condensed text-[clamp(1.6rem,3vw,2.4rem)] uppercase leading-none transition-transform duration-500 ease-out-expo group-hover:-rotate-6">
                    {item.name}
                  </span>
                </div>
              )}
            </div>
            <p className="mt-3 font-semibold tracking-tight">{item.name}</p>
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

export function Menu() {
  const [active, setActive] = useState<TabId>("hot");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section id="menu" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-36">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Menú</p>
              <h2 className="mt-4 font-display text-[clamp(2.75rem,5.5vw,4.75rem)] leading-[0.95]">
                Pocas cosas,
                <br />
                bien hechas.
              </h2>
              <p className="mt-5 max-w-[40ch] text-muted">Precios en miles de pesos, como en el tablero del local.</p>
            </Reveal>
            <div className="relative mt-10 hidden aspect-[3/4] w-[78%] overflow-hidden rounded-full lg:block">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.photo}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease }}
                  className="absolute inset-0"
                >
                  <Photo name={current.photo} alt={current.alt} sizes="30vw" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div role="tablist" aria-label="Categorías del menú" className="inline-flex rounded-full border border-line p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active === t.id}
                aria-controls="menu-panel"
                onClick={() => setActive(t.id)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 sm:px-6 ${
                  active === t.id ? "text-paper" : "text-ink hover:text-muted"
                }`}
              >
                {active === t.id && (
                  <motion.span
                    layoutId="menu-tab"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-12 min-h-[540px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {active === "hot" && <DrinkGroups groups={hot} />}
                {active === "cold" && <DrinkGroups groups={cold} />}
                {active === "food" && <FoodGrid />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
