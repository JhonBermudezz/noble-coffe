import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "../data";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-mist py-24 md:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal">Preguntas frecuentes</p>
          <h2 className="mt-3 text-[clamp(2.2rem,4.5vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">Lo que nos preguntan antes de empezar.</h2>
        </div>
        <ul className="space-y-3">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q} className="overflow-hidden rounded-2xl border border-line bg-white">
                <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-lg font-bold">
                  {f.q}
                  <motion.span animate={{ rotate: on ? 45 : 0 }} className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${on ? "brand-gradient text-white" : "bg-mist"}`}>
                    <Plus size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.3 }}>
                      <p className="px-6 pb-6 leading-relaxed text-steel">{f.a}</p>
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
