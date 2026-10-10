import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { menu } from "../data";

const NUM = ["I", "II", "III", "IV", "V", "VI"];

// El menú como grimorio: todos los capítulos uno tras otro. En computador el índice queda fijo a la
// izquierda y marca el capítulo que se está leyendo; en celular el índice es una barra fija arriba.
export function Grimoire() {
  const [active, setActive] = useState(menu[0].id);
  const chips = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id.replace("cap-", ""));
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    menu.forEach((c) => {
      const el = document.getElementById(`cap-${c.id}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // En celular, la ficha del capítulo activo se desliza a la vista.
  useEffect(() => {
    chips.current?.querySelector(`[data-chip="${active}"]`)?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const go = (id: string) => document.getElementById(`cap-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="menu" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <p className="label">—El grimorio—</p>
        <h2 className="title mt-2 text-[clamp(3.4rem,9vw,7.5rem)] text-bone">La carta</h2>

        {/* Índice fijo en celular */}
        <div ref={chips} className="sticky top-16 z-30 -mx-5 mt-8 flex gap-2 overflow-x-auto border-y border-blood/30 bg-night/95 px-5 py-3 backdrop-blur [scrollbar-width:none] md:hidden">
          {menu.map((c) => (
            <button
              key={c.id}
              data-chip={c.id}
              onClick={() => go(c.id)}
              className={`shrink-0 border px-3 py-1.5 font-[family-name:var(--font-fell)] text-lg transition-colors ${c.id === active ? "border-blood bg-blood text-bone" : "border-bone/20 text-bone/70"}`}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-10 md:mt-12 md:grid-cols-[240px_minmax(0,1fr)] md:gap-14">
          {/* Índice fijo en computador */}
          <nav aria-label="Capítulos del menú" className="hidden md:block">
            <div className="sticky top-28">
              <p className="font-script text-4xl text-bone">Capítulos</p>
              <ul className="mt-5 space-y-1 border-l border-blood/30">
                {menu.map((c, i) => (
                  <li key={c.id}>
                    <button
                      onClick={() => go(c.id)}
                      aria-current={c.id === active}
                      className={`relative flex w-full items-baseline gap-3 py-2 pl-5 text-left font-[family-name:var(--font-fell)] text-2xl transition-colors ${c.id === active ? "text-bone" : "text-bone/45 hover:text-bone/80"}`}
                    >
                      {c.id === active && <motion.span layoutId="cap-mark" className="absolute -left-px top-0 h-full w-[3px] bg-blood" />}
                      <span className="w-8 text-base italic text-blood">{NUM[i]}</span>
                      {c.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Capítulos */}
          <div className="min-w-0 space-y-16">
            {menu.map((c, i) => (
              <motion.article
                key={c.id}
                id={`cap-${c.id}`}
                className="scroll-mt-36 border border-blood/25 bg-[#100a0b] p-5 shadow-[inset_0_0_80px_rgb(122_15_31/0.2)] md:scroll-mt-28 md:p-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-center font-[family-name:var(--font-fell)] text-lg italic text-blood">Capítulo {NUM[i]}</p>
                <h3 className="title text-center text-4xl text-bone md:text-5xl">{c.title}</h3>
                <ul className="mt-8 space-y-5">
                  {c.lines.map((l) => (
                    <li key={l.name}>
                      <div className="flex items-baseline gap-3">
                        <span className="min-w-0 font-[family-name:var(--font-fell)] text-xl text-bone md:text-2xl">{l.name}</span>
                        <span className="mb-1 hidden flex-1 border-b border-dotted border-bone/25 sm:block" />
                        <span className="ml-auto shrink-0 font-[family-name:var(--font-fell)] text-lg text-blood md:text-xl">{l.price}</span>
                      </div>
                      {l.note && <p className="mt-0.5 italic text-bone/60">{l.note}</p>}
                    </li>
                  ))}
                </ul>
                {c.foot && <p className="mt-8 border-t border-blood/30 pt-4 text-base italic text-bone/55">{c.foot}</p>}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
