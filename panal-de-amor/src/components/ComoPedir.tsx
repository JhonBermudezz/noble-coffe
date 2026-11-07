import { motion } from "motion/react";
import { img, steps } from "../data";
import { Heading } from "./Bits";

// Cómo pedir: tres tarjetitas kraft colgadas de un cordón, como las que van atadas al frasquito.
export function ComoPedir() {
  return (
    <section id="como-pedir" className="relative overflow-hidden bg-rosa/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <Heading kicker="Así de fácil" title="Tu pedido en tres pasos" center />
        <div className="relative mt-16">
          {/* El cordón */}
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="absolute inset-x-0 top-0 hidden h-20 w-full md:block" aria-hidden>
            <motion.path
              d="M0 10 Q 300 70 600 30 T 1200 10"
              fill="none"
              stroke="#8a5a2b"
              strokeWidth="3"
              strokeDasharray="1 0"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </svg>
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: -60, rotate: i % 2 ? 8 : -8 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.3 + i * 0.18, type: "spring", stiffness: 120, damping: 11 }}
                className={`flex flex-col items-center ${i === 1 ? "md:mt-10" : ""}`}
              >
                <div className="sway flex flex-col items-center" style={{ animationDelay: `${i * -1.3}s` }}>
                  <span aria-hidden className="h-10 w-[2px] bg-[#8a5a2b] md:h-14" />
                  <div className="kraft relative w-full max-w-[330px] rounded-[18px] rounded-t-[60px] px-6 pb-7 pt-10 text-center shadow-[0_24px_40px_-24px_rgb(74_42_20/0.7)]">
                    <span aria-hidden className="absolute left-1/2 top-4 h-4 w-4 -translate-x-1/2 rounded-full bg-rosa shadow-[inset_0_2px_3px_rgb(74_42_20/0.5)]" />
                    <div className="mx-auto mt-2 aspect-[1.3] w-full overflow-hidden rounded-[14px] bg-white">
                      <img src={img(s.img)} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <p className="script mt-5 text-3xl text-fucsia-2">Paso {i + 1}</p>
                    <h3 className="display mt-1 text-2xl">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-cafe/80">{s.text}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
