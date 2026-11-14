import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { galleryAll, img, wa, type Shot } from "../data";

const CATS = ["Todas", "Frasquitos", "Eventos", "Colmena", "Taller"] as const;
type Cat = (typeof CATS)[number];

// Vista ampliada: flechas, teclado (← → Esc) y deslizar con el dedo.
function Lightbox({ list, index, onClose, onMove }: { list: Shot[]; index: number; onClose: () => void; onMove: (d: number) => void }) {
  const s = list[index];
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [onClose, onMove]);

  return (
    <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-cafe-2/90 p-4 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <AnimatePresence mode="wait">
        <motion.figure
          key={s.photo}
          className="max-w-4xl text-center"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, i) => (i.offset.x < -60 ? onMove(1) : i.offset.x > 60 ? onMove(-1) : null)}
        >
          <img src={img(s.photo)} alt={s.caption} draggable={false} className="max-h-[76svh] rounded-[28px] object-contain shadow-2xl" />
          <figcaption className="mt-4">
            <span className="script text-3xl text-polen">{s.caption}</span>
            <span className="mt-1 block text-sm text-crema/60">
              {index + 1} de {list.length}
            </span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
      {[
        { d: -1, label: "Anterior", cls: "left-3 md:left-8", path: "M15 5l-7 7 7 7" },
        { d: 1, label: "Siguiente", cls: "right-3 md:right-8", path: "M9 5l7 7-7 7" },
      ].map((b) => (
        <button
          key={b.label}
          aria-label={b.label}
          onClick={(e) => {
            e.stopPropagation();
            onMove(b.d);
          }}
          className={`btn-miel absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-cafe ${b.cls}`}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d={b.path} />
          </svg>
        </button>
      ))}
      <button onClick={onClose} aria-label="Cerrar" className="btn-miel hex-flat absolute right-5 top-5 grid h-11 w-12 place-items-center text-2xl font-bold">
        ×
      </button>
    </motion.div>
  );
}

// Página Galería: todas las fotos en mosaico, con filtro por categoría y vista ampliada.
export function GaleriaPage() {
  const [cat, setCat] = useState<Cat>("Todas");
  const [open, setOpen] = useState<number | null>(null);
  const list = cat === "Todas" ? galleryAll : galleryAll.filter((s) => s.cat === cat);
  const move = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);

  return (
    <section className="relative bg-crema pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <LayoutGroup>
          <div role="tablist" aria-label="Filtrar galería" className="flex flex-wrap justify-center gap-2">
            {CATS.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className="relative rounded-full px-5 py-2.5 font-bold">
                {cat === c && <motion.span layoutId="gal-pill" className="btn-miel absolute inset-0 rounded-full" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
          <motion.ul layout className="mt-10 columns-2 gap-4 md:columns-3 md:gap-6">
            <AnimatePresence mode="popLayout">
              {list.map((s, i) => (
                <motion.li
                  key={s.photo}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-4 break-inside-avoid md:mb-6"
                >
                  <button onClick={() => setOpen(i)} className="group relative block w-full overflow-hidden rounded-[24px] bg-polen text-left" aria-label={`Ver ${s.caption}`}>
                    <img src={img(s.photo)} alt={s.caption} loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-cafe-2/80 to-transparent p-4 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                      <span className="script block text-2xl text-polen">{s.caption}</span>
                      <span className="text-xs font-bold uppercase text-crema/70">{s.cat}</span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
        <div className="mt-14 rounded-[32px] bg-polen p-8 text-center md:p-10">
          <p className="display text-3xl md:text-4xl">¿Quieres unos así para tu celebración?</p>
          <a href={wa("¡Hola, Panal de Amor! Vi la galería y quiero cotizar frasquitos.")} target="_blank" rel="noreferrer" className="btn-fucsia mt-6 inline-block rounded-full px-7 py-4 text-lg font-bold text-white">
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
      <AnimatePresence>{open !== null && <Lightbox list={list} index={open} onClose={() => setOpen(null)} onMove={move} />}</AnimatePresence>
    </section>
  );
}
