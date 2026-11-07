import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { history, img } from "../data";
import { Heading } from "./Bits";

// La historia de la tradición como un viaje en sellos postales: una línea punteada se dibuja con el scroll
// de Italia y Grecia a España y de ahí a Colombia.
export function Historia() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const draw = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section ref={ref} id="historia" className="relative overflow-hidden bg-crema-2 py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <Heading kicker="Nuestra historia" title="Un detalle dulce que viajó siglos hasta tu mesa" center />
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-cafe/75">
          Regalar miel es una tradición con siglos de historia. En Panal de Amor la mantenemos viva preparando cada frasquito con dedicación.
        </p>
        <div className="relative mt-16">
          <svg viewBox="0 0 1200 260" preserveAspectRatio="none" className="absolute inset-x-0 top-16 hidden h-[260px] w-full md:block" aria-hidden>
            <motion.path d="M150 160 C 330 20, 470 20, 600 130 S 900 260, 1050 110" fill="none" stroke="#d63c7c" strokeWidth="3" strokeDasharray="10 12" strokeLinecap="round" style={{ pathLength: draw }} />
          </svg>
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
            {history.map((h, i) => (
              <motion.li
                key={h.place}
                initial={{ opacity: 0, y: 50, rotate: i % 2 ? 10 : -10, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, rotate: i === 1 ? 3 : -4, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.25, type: "spring", stiffness: 120, damping: 13 }}
                className={`flex flex-col items-center text-center ${i === 1 ? "md:mt-24" : ""}`}
              >
                <div className="group relative">
                  <img src={img(h.stamp)} alt={`Sello postal ilustrado de ${h.place}`} loading="lazy" className="w-[220px] drop-shadow-[0_18px_22px_rgb(74_42_20/0.3)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2 md:w-[250px]" />
                  <span className="script absolute -bottom-4 -right-4 grid h-14 w-14 place-items-center rounded-full bg-fucsia text-2xl text-white shadow-[0_0_0_4px_#fff]">{i + 1}</span>
                </div>
                <h3 className="display mt-8 text-3xl">{h.place}</h3>
                <p className="mt-2 max-w-xs leading-relaxed text-cafe/75">{h.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
