import { motion } from "motion/react";
import { gallery, img } from "../data";

// Fotos de la gente en el local, en columnas de alturas distintas.
export function Gallery() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="art-title">
      <div className="mx-auto max-w-[1300px] px-5 md:px-8">
        <h2 id="art-title" className="max-w-3xl font-display text-[clamp(3.2rem,7.5vw,6.5rem)] leading-[0.92] text-forest">
          WTF es quedarse en <em>casa</em>.
        </h2>

        <div className="mt-12 columns-2 gap-3 md:columns-4 md:gap-4">
          {gallery.map((g, i) => (
            <motion.figure
              key={g.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.06 }}
              className="mb-3 overflow-hidden rounded-[20px] md:mb-4"
            >
              <img
                src={img(g.name)}
                alt={g.alt}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 hover:scale-[1.04] ${i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"}`}
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
