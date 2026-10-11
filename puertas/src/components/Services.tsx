import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { WA, img, services } from "../data";

// Servicios: lista con íconos a la izquierda; la foto cambia con crossfade según el servicio activo.
export function Services() {
  const [active, setActive] = useState(services[0].id);
  const s = services.find((x) => x.id === active)!;

  return (
    <section id="servicios" className="mx-auto max-w-[1240px] px-5 py-24 md:px-8 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal">Servicios</p>
          <h2 className="mt-3 max-w-[18ch] text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">Todo tipo de acceso, automatizado.</h2>
        </div>
        <p className="max-w-md text-lg text-steel">Instalamos, programamos y reparamos equipos de cualquier marca, con repuestos originales y garantía.</p>
      </div>

      <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]">
        <ul className="divide-y divide-line border-y border-line">
          {services.map((x) => {
            const on = x.id === active;
            return (
              <li key={x.id}>
                <button
                  onMouseEnter={() => setActive(x.id)}
                  onFocus={() => setActive(x.id)}
                  onClick={() => setActive(x.id)}
                  className="group flex w-full items-center gap-5 py-5 text-left"
                >
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-all duration-300 ${on ? "brand-gradient text-white shadow-lg shadow-teal/30" : "bg-mist text-ink"}`}>
                    <x.icon size={22} strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-lg font-extrabold transition-colors md:text-xl ${on ? "text-ink" : "text-ink/70"}`}>{x.title}</span>
                    <motion.span
                      initial={false}
                      animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                      className="block overflow-hidden text-steel"
                    >
                      <span className="block pt-1">{x.text}</span>
                    </motion.span>
                  </span>
                  <ArrowUpRight size={20} className={`shrink-0 transition-all duration-300 ${on ? "text-teal" : "-translate-x-1 text-ink/25"}`} />
                </button>
                {/* En celular la foto aparece debajo del servicio abierto */}
                <AnimatePresence>
                  {on && (
                    <motion.img
                      key={x.id}
                      src={img(x.photo)}
                      alt={x.title}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 220 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-5 w-full rounded-2xl object-cover lg:hidden"
                    />
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="sticky top-28 hidden lg:block">
          <div className="relative aspect-[4/3.4] overflow-hidden rounded-[28px] bg-mist">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={s.id}
                src={img(s.photo)}
                alt={s.title}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-7 pt-24 text-white">
              <AnimatePresence mode="wait">
                <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="flex items-end justify-between gap-4">
                  <div>
                    <s.icon size={28} className="text-lime" />
                    <p className="mt-3 text-2xl font-extrabold">{s.title}</p>
                  </div>
                  <a href={WA(`Hola, quiero información sobre ${s.title.toLowerCase()}.`)} target="_blank" rel="noreferrer" className="shrink-0 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5">
                    Cotizar
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
