import { motion } from "motion/react";
import { events, img } from "../data";

export function Events() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1300px] px-5 md:px-10">
        <p className="title text-sm tracking-[0.5em] text-blood">—Lo que pasa adentro—</p>
        <h2 className="title mt-3 text-[clamp(3rem,8vw,6.5rem)] text-bone">Más que un café</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((e, i) => (
            <motion.article
              key={e.title}
              className="group relative overflow-hidden border border-blood/30 bg-[#100a0b]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={img(e.photo)} alt={e.title} loading="lazy" className="h-full w-full object-cover grayscale-[40%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/85 to-transparent p-5 pt-16">
                <h3 className="title text-2xl text-bone">{e.title}</h3>
                <p className="italic text-bone/70">{e.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="mt-8 text-bone/55">Las fechas de cada evento se anuncian en su Instagram.</p>
      </div>
    </section>
  );
}
