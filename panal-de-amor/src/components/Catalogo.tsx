import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cop, eventLabels, img, products, wa, type EventKind, type Product } from "../data";
import { Heading, HexIcon } from "./Bits";

const FILTERS: ("todos" | EventKind)[] = ["todos", "boda", "bautizo", "quince", "comunion", "empresa", "otros"];

function Cell({ p, i, onOpen }: { p: Product; i: number; onOpen: () => void }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className={`${i % 2 === 1 ? "max-md:pt-16" : ""} ${i % 3 === 1 ? "md:pt-28" : ""}`}
    >
      <button onClick={onOpen} className="group block w-full text-left" aria-label={`Ver ${p.name}`}>
        <div className="relative">
          <div aria-hidden className="hex absolute -inset-[5px] bg-gradient-to-b from-ambar to-miel-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <motion.div layoutId={`hex-${p.id}`} className="hex relative aspect-[0.88] overflow-hidden bg-polen">
            <img src={img(p.photo)} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            {/* La miel sube por la celda */}
            <div className="absolute inset-x-0 bottom-0 h-full origin-bottom scale-y-0 bg-gradient-to-t from-miel/95 via-ambar/70 to-transparent transition-transform duration-700 ease-out group-hover:scale-y-[0.55]" />
            <span className="absolute inset-x-0 bottom-[16%] text-center font-bold text-white opacity-0 transition-opacity delay-200 duration-300 group-hover:opacity-100">Ver detalle</span>
          </motion.div>
          <span className="script absolute -top-1 left-1/2 -translate-x-1/2 -rotate-3 whitespace-nowrap rounded-full bg-fucsia px-3 py-0.5 text-lg text-white shadow-[0_0_0_3px_#fff] md:text-xl">{p.tag}</span>
        </div>
        <div className="mt-4 text-center">
          <h3 className="display text-xl leading-tight md:text-2xl">{p.name}</h3>
          <p className="mt-1 text-sm text-cafe/70">
            Desde <span className="display text-lg font-bold text-miel-2">{cop(p.from)}</span>
          </p>
        </div>
      </button>
    </motion.li>
  );
}

function Detail({ p, onClose }: { p: Product; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[60] grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-cafe-2/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={p.name}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        className="relative flex max-h-[92svh] w-full max-w-4xl flex-col gap-6 overflow-y-auto rounded-[36px] bg-crema p-5 shadow-2xl md:grid md:grid-cols-2 md:p-8"
      >
        <motion.div layoutId={`hex-${p.id}`} className="hex mx-auto aspect-[0.88] w-[min(72vw,380px)] shrink-0 overflow-hidden bg-polen md:w-full">
          <img src={img(p.photo)} alt={p.name} className="h-full w-full object-cover" />
        </motion.div>
        <div className="flex flex-col justify-center">
          <p className="script text-3xl text-fucsia">{p.tag}</p>
          <h3 className="display mt-1 text-4xl md:text-5xl">{p.name}</h3>
          <p className="mt-4 text-lg leading-relaxed text-cafe/80">{p.desc}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.specs.map((s) => (
              <li key={s} className="flex items-center gap-1.5 rounded-full bg-polen px-3 py-1.5 text-sm font-semibold">
                <HexIcon className="h-3.5 w-3.5" />
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-cafe/70">
            Desde <span className="display text-3xl font-bold text-miel-2">{cop(p.from)}</span> por frasquito
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={wa(`¡Hola, Panal de Amor! Quiero cotizar el modelo "${p.name}".`)} target="_blank" rel="noreferrer" className="btn-fucsia rounded-full px-6 py-3.5 font-bold text-white">
              Cotizar este modelo
            </a>
            <a href="#etiqueta" onClick={onClose} className="rounded-full border-2 border-cafe/15 bg-white px-6 py-3 font-bold">
              Diseñar mi etiqueta
            </a>
          </div>
        </div>
        <button onClick={onClose} aria-label="Cerrar" className="btn-miel hex-flat absolute right-4 top-4 grid h-11 w-12 place-items-center text-2xl font-bold">
          ×
        </button>
      </motion.div>
    </motion.div>
  );
}

// El catálogo como un panal: cada modelo en su celda, con filtro por evento y la miel que sube al pasar el mouse.
export function Catalogo() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("todos");
  const [open, setOpen] = useState<Product | null>(null);
  const list = filter === "todos" ? products : products.filter((p) => p.events.includes(filter));

  return (
    <section id="catalogo" className="relative overflow-hidden bg-crema py-24 md:py-32">
      <div aria-hidden className="panal absolute inset-0 opacity-60 [mask-image:linear-gradient(transparent,#000_30%,#000_70%,transparent)]" />
      <div className="relative mx-auto max-w-[1180px] px-4 md:px-8">
        <Heading kicker="Elige tu modelo" title={<>Nuestro panal de frasquitos</>} center />
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-cafe/75">
          Todos se personalizan con nombres, fecha, frase y los colores de tu celebración. Puedes cotizar desde un solo frasquito.
        </p>
        <LayoutGroup>
          <div role="tablist" aria-label="Filtrar por evento" className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} className="relative rounded-full px-4 py-2.5 font-bold">
                {filter === f && <motion.span layoutId="cat-pill" className="btn-miel absolute inset-0 rounded-full" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span className="relative">{f === "todos" ? "Todos" : eventLabels[f]}</span>
              </button>
            ))}
          </div>
          <motion.ul layout className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-10">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <Cell key={p.id} p={p} i={i} onOpen={() => setOpen(p)} />
              ))}
            </AnimatePresence>
          </motion.ul>
          <AnimatePresence>{open && <Detail p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}
