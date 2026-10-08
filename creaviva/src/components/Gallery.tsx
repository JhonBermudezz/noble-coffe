import { motion } from "motion/react";
import { useRef, useState } from "react";
import { gallery, img } from "../data";

// Polaroids pegadas en la pared que se pueden mover y lanzar.
export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  // La última foto que se toca queda encima de las demás, también después de soltarla.
  const [order, setOrder] = useState<number[]>(() => gallery.map((_, i) => i));
  const toFront = (i: number) => setOrder((o) => [...o.filter((x) => x !== i), i]);
  // Posiciones en computador [left, top] y en celular dos columnas.
  const spots = [
    [2, 4], [26, 14], [52, 2], [74, 12],
    [6, 50], [30, 56], [55, 48], [76, 58],
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-32" aria-labelledby="art-title">
      <div className="mx-auto max-w-[1300px] px-4 text-center md:px-8">
        <h2 id="art-title" className="font-display text-[clamp(3.2rem,7.5vw,6.5rem)] leading-[0.92] text-forest">
          WTF es quedarse en <em>casa</em>.
        </h2>
        <p className="mt-3 text-lg text-forest/70">Arrastra las fotos.</p>
      </div>

      <div ref={ref} className="relative mx-auto mt-10 h-[860px] max-w-[1300px] md:h-[720px]">
        {gallery.map((g, i) => (
          <motion.figure
            key={g.name}
            drag
            dragConstraints={ref}
            dragElastic={0.2}
            dragTransition={{ power: 0.25, timeConstant: 220, bounceStiffness: 300, bounceDamping: 20 }}
            onPointerDown={() => toFront(i)}
            whileDrag={{ scale: 1.08, rotate: 0 }}
            whileHover={{ scale: 1.04 }}
            initial={{ opacity: 0, y: 80, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: (i % 2 ? 1 : -1) * (3 + (i % 3) * 3) }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: (i % 4) * 0.08 }}
            className={`absolute w-[44%] cursor-grab touch-none bg-white p-2.5 pb-10 shadow-[0_18px_30px_-12px_rgb(31_74_50/0.45)] md:w-[22%] left-[var(--ml)] top-[var(--mt)] md:left-[var(--l)] md:top-[var(--t)]`}
            style={{ zIndex: 10 + order.indexOf(i), ["--l" as string]: `${spots[i][0]}%`, ["--t" as string]: `${spots[i][1]}%`, ["--ml" as string]: `${(i % 2) * 50 + 3}%`, ["--mt" as string]: `${Math.floor(i / 2) * 24}%` }}
          >
            <div aria-hidden className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-[-4deg] bg-mustard/80" />
            <img src={img(g.name)} alt={g.alt} draggable={false} loading="lazy" className="aspect-square w-full object-cover" />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
