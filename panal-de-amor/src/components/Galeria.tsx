import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { gallery, img } from "../data";
import { Heading } from "./Bits";

const SHAPES = ["rounded-t-full rounded-b-[28px]", "hex", "rounded-[32px]", "rounded-full aspect-square", "rounded-t-full rounded-b-[28px]", "hex", "rounded-[32px]"];

// Galería: una mesa de recordatorios que se arrastra de lado, con fotos en las formas del panal.
export function Galeria() {
  const track = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (el) setLimit(Math.max(0, el.scrollWidth - el.parentElement!.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <section id="galeria" className="relative overflow-hidden bg-crema py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading kicker="Galería" title="Así lucen en las mesas" />
          <p className="max-w-sm text-cafe/70">Arrastra para ver más · toca una foto para verla en grande.</p>
        </div>
      </div>
      <div className="mt-12 overflow-hidden px-4 md:px-8">
        <motion.div ref={track} drag="x" dragConstraints={{ left: -limit, right: 0 }} dragElastic={0.08} className="flex w-max cursor-grab items-end gap-6 active:cursor-grabbing">
          {gallery.map((g, i) => (
            <motion.figure
              key={g.photo}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`group w-[240px] shrink-0 md:w-[300px] ${i % 2 ? "pb-14" : ""}`}
            >
              <button onClick={() => setOpen(i)} className="block w-full" aria-label={`Ver ${g.caption}`}>
                <div className={`overflow-hidden bg-polen ${SHAPES[i]} ${SHAPES[i].includes("aspect") ? "" : "aspect-[0.85]"}`}>
                  <img src={img(g.photo)} alt={g.caption} draggable={false} loading="lazy" className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              </button>
              <figcaption className="script mt-3 text-center text-2xl text-cafe/80">{g.caption}</figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-cafe-2/85 p-4 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.figure initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="max-w-3xl text-center" onClick={(e) => e.stopPropagation()}>
              <img src={img(gallery[open].photo)} alt={gallery[open].caption} className="max-h-[78svh] rounded-[28px] object-contain shadow-2xl" />
              <figcaption className="script mt-4 text-3xl text-polen">{gallery[open].caption}</figcaption>
            </motion.figure>
            <button onClick={() => setOpen(null)} aria-label="Cerrar" className="btn-miel hex-flat absolute right-5 top-5 grid h-11 w-12 place-items-center text-2xl font-bold">
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
