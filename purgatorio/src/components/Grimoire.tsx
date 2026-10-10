import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { menu } from "../data";
import { play } from "../sound";

// El menú como un grimorio: índice de capítulos a la izquierda y la página que gira a la derecha.
export function Grimoire() {
  const [active, setActive] = useState(menu[0].id);
  const chapter = menu.find((c) => c.id === active)!;

  const open = (id: string) => {
    if (id === active) return;
    play("shuffle", 0.4);
    setActive(id);
  };

  return (
    <section id="menu" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <p className="title text-sm tracking-[0.5em] text-blood">—El grimorio—</p>
        <h2 className="title mt-3 text-[clamp(3.4rem,9vw,7.5rem)] text-bone">La carta</h2>

        <div className="mt-12 grid overflow-hidden border border-blood/40 bg-[#100a0b] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9),inset_0_0_80px_rgb(122_15_31/0.25)] md:grid-cols-[280px_1fr] [perspective:1800px]">
          {/* Índice */}
          <nav aria-label="Capítulos del menú" className="border-b border-blood/30 p-5 md:border-b-0 md:border-r md:p-8">
            <p className="font-script text-3xl text-bone/80">Capítulos</p>
            <ul className="mt-4 flex gap-2 overflow-x-auto [scrollbar-width:none] md:block md:space-y-1">
              {menu.map((c, i) => (
                <li key={c.id} className="shrink-0">
                  <button
                    onClick={() => open(c.id)}
                    aria-current={c.id === active}
                    className={`title flex w-full items-baseline gap-3 whitespace-nowrap px-3 py-2 text-left text-xl transition-colors md:text-2xl ${c.id === active ? "bg-blood text-bone" : "text-bone/60 hover:text-bone"}`}
                  >
                    <span className="text-sm opacity-60">{["I", "II", "III", "IV", "V", "VI"][i]}</span>
                    {c.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Página */}
          <div className="relative min-h-[520px] p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={chapter.id}
                initial={{ rotateY: -80, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 70, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.6, 0, 0.3, 1] }}
                style={{ transformOrigin: "left center" }}
              >
                <h3 className="title text-center text-4xl text-blood md:text-5xl">—{chapter.title}—</h3>
                <ul className="mt-8 space-y-5">
                  {chapter.lines.map((l) => (
                    <li key={l.name}>
                      <div className="flex items-baseline gap-3">
                        <span className="title text-xl text-bone md:text-2xl">{l.name}</span>
                        <span className="mb-1 flex-1 border-b border-dotted border-bone/25" />
                        <span className="title whitespace-nowrap text-xl text-blood md:text-2xl">{l.price}</span>
                      </div>
                      {l.note && <p className="mt-0.5 italic text-bone/60">{l.note}</p>}
                    </li>
                  ))}
                </ul>
                {chapter.foot && <p className="mt-8 border-t border-blood/30 pt-4 text-base italic text-bone/55">{chapter.foot}</p>}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
