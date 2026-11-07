import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { faqs } from "../data";
import { Heading } from "./Bits";

// Preguntas frecuentes (las de su sitio): al abrir una, la celda de miel gira y se llena.
export function Preguntas() {
  const [open, setOpen] = useState(0);
  return (
    <section id="preguntas" className="relative bg-crema py-24 md:py-32">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-4 md:grid-cols-[0.8fr_1.2fr] md:px-8">
        <div className="md:sticky md:top-28 md:self-start">
          <Heading kicker="Preguntas frecuentes" title="Resolvemos tus dudas" />
          <p className="mt-5 text-lg text-cafe/70">¿No encuentras la tuya? Escríbenos y te respondemos el mismo día.</p>
        </div>
        <ul className="space-y-3">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q} className={`overflow-hidden rounded-[26px] transition-colors duration-500 ${on ? "bg-white shadow-[0_24px_40px_-30px_rgb(74_42_20/0.7)]" : "bg-crema-2"}`}>
                <button onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="flex w-full items-center gap-4 px-5 py-5 text-left md:px-7">
                  <span className="display flex-1 text-lg md:text-xl">{f.q}</span>
                  <motion.span animate={{ rotate: on ? 90 : 0 }} className={`hex grid h-10 w-9 shrink-0 place-items-center text-xl font-bold transition-colors ${on ? "btn-miel" : "bg-polen"}`}>
                    {on ? "−" : "+"}
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.4, ease: [0.2, 0.7, 0.3, 1] }}>
                      <p className="px-5 pb-6 text-lg leading-relaxed text-cafe/80 md:px-7">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
