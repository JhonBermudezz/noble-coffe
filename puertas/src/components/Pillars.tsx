import { motion } from "motion/react";
import { pillars } from "../data";

// Las tres promesas, flotando sobre el borde inferior de la portada.
export function Pillars() {
  return (
    <section className="relative z-20 mx-auto -mt-28 max-w-[1240px] px-5 md:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-[0_30px_60px_-30px_rgb(10_27_46/0.35)]"
          >
            <div aria-hidden className="brand-gradient absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-mist text-blue transition-colors duration-300 group-hover:bg-ink group-hover:text-lime">
              <p.icon size={26} strokeWidth={1.8} />
            </div>
            <h3 className="mt-5 text-xl font-extrabold">{p.title}</h3>
            <p className="mt-2 leading-relaxed text-steel">{p.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
