import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ADDITIONS, cop, img, menu } from "../data";
import { useCart } from "./cart";

// El menú como tomos de manga en abanico: se elige un tomo y abajo aparece su página.
export function MenuGeek() {
  const [active, setActive] = useState(menu[0].id);
  const { add } = useCart();
  const section = menu.find((s) => s.id === active)!;

  return (
    <section id="menu" className="relative overflow-x-clip border-y-4 border-ink bg-brown py-24 text-paper md:py-32">
      <div className="halftone-light absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1300px] px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.9]">
            Menú <span className="ink-text-sm text-yellow">geek</span>
          </h2>
          <p className="max-w-xs text-paper/80">Elige un tomo, agrega a tu pedido y recógelo en barra.</p>
        </div>

        {/* Tomos en abanico */}
        <div className="mt-12 flex snap-x gap-4 overflow-x-auto px-2 pb-6 pt-8 [scrollbar-width:none] lg:justify-center lg:gap-3 lg:overflow-visible">
          {menu.map((s, i) => {
            const on = s.id === active;
            const mid = (menu.length - 1) / 2;
            return (
              <motion.button
                key={s.id}
                onClick={() => setActive(s.id)}
                aria-pressed={on}
                className="panel relative h-56 w-40 shrink-0 snap-center overflow-hidden text-left md:h-64 md:w-44 xl:h-72 xl:w-48"
                style={{ background: s.color, zIndex: on ? 10 : 5 - Math.abs(i - mid) }}
                animate={{ y: on ? -26 : 0, rotate: on ? 0 : (i - mid) * 3, scale: on ? 1.06 : 1 }}
                whileHover={{ y: -22, rotate: 0, scale: 1.08, zIndex: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="speed absolute -inset-[40%] opacity-20" aria-hidden />
                <div className="halftone absolute inset-0" aria-hidden />
                <div className="relative flex items-center justify-between border-b-[3px] border-ink bg-ink px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-paper">
                  <span>Vol. {String(i + 1).padStart(2, "0")}</span>
                  <span>Geekveria</span>
                </div>
                <img src={img(s.icon)} alt="" className="relative mx-auto mt-2 h-24 w-24 object-contain drop-shadow-[3px_3px_0_#2a1610] md:h-28 md:w-28" />
                <p className="absolute right-2 top-10 rotate-12 font-sfx text-2xl text-white [-webkit-text-stroke:2px_#2a1610] [paint-order:stroke_fill] md:text-3xl">{s.sfx}</p>
                <p className="absolute inset-x-3 bottom-3 font-display text-2xl uppercase leading-[0.95] text-ink md:text-3xl">{s.title}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Página del tomo elegido */}
        <AnimatePresence mode="wait">
          <motion.div
            key={section.id}
            initial={{ opacity: 0, rotateY: -70, x: -40 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            exit={{ opacity: 0, rotateY: 60, x: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 1200, transformOrigin: "left center" }}
            className="panel mt-6 grid gap-0 bg-paper text-ink md:grid-cols-[1fr_280px]"
          >
            <ul className="divide-y-2 divide-dashed divide-ink/25 p-5 md:p-8">
              {section.items.map((it) => (
                <li key={it.id} className="flex items-center gap-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{it.name}</p>
                    {it.note && <p className="text-sm leading-snug text-ink/60">{it.note}</p>}
                  </div>
                  <span className="font-display text-2xl">{cop(it.price)}</span>
                  <motion.button
                    whileTap={{ scale: 0.8, rotate: -15 }}
                    onClick={() => add({ id: it.id, name: it.name, price: it.price })}
                    aria-label={`Agregar ${it.name} al pedido`}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-[3px] border-ink font-display text-2xl shadow-[3px_3px_0_#2a1610] transition-transform hover:-translate-y-0.5"
                    style={{ background: section.color }}
                  >
                    +
                  </motion.button>
                </li>
              ))}
            </ul>
            <aside className="relative hidden border-l-4 border-ink md:block" style={{ background: section.color }}>
              <div className="halftone absolute inset-0" aria-hidden />
              {/* Se queda fija al costado mientras se baja por la lista. */}
              <img src={img("ww")} alt="" className="sticky top-28 mx-auto max-h-[calc(100vh-8rem)] w-auto py-6" />
            </aside>
          </motion.div>
        </AnimatePresence>
        <p className="mt-6 text-sm text-paper/70">Adiciones: {ADDITIONS.map((a) => `${a.name} ${cop(a.price)}`).join(" · ")}</p>
      </div>
    </section>
  );
}
