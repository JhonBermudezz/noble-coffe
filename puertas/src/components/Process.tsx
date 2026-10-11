import { motion, useScroll, useTransform } from "motion/react";
import { CalendarCheck, Headset, Ruler, Wrench } from "lucide-react";
import { useRef } from "react";
import { steps } from "../data";

const ICONS = [Headset, Ruler, Wrench, CalendarCheck];

// Cómo trabajamos: línea de tiempo que se llena con el scroll.
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="proceso" className="mx-auto max-w-[1240px] px-5 py-24 md:px-8 md:py-32">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal">Cómo trabajamos</p>
      <h2 className="mt-3 max-w-[20ch] text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">De la primera llamada a la puerta funcionando.</h2>

      <div ref={ref} className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
        {/* Línea */}
        <div aria-hidden className="absolute left-6 top-6 h-[calc(100%-3rem)] w-0.5 bg-line md:left-0 md:top-6 md:h-0.5 md:w-full">
          <motion.div className="brand-gradient h-full w-full origin-top md:origin-left" style={{ scaleY: fill, scaleX: fill }} />
        </div>
        {steps.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative flex gap-5 md:block"
            >
              <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line bg-white text-blue shadow-sm">
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <div className="md:mt-6">
                <p className="text-sm font-bold text-teal">Paso {i + 1}</p>
                <h3 className="mt-1 text-xl font-extrabold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-steel">{s.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
