import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { articles, img, wa, type Article } from "../data";
import { Heading, HexIcon } from "./Bits";

function Reader({ a, onClose }: { a: Article; onClose: () => void }) {
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
    <motion.div className="fixed inset-0 z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-cafe-2/60 backdrop-blur-sm" onClick={onClose} />
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-label={a.title}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
        className="absolute inset-y-0 right-0 w-full max-w-2xl overflow-y-auto bg-crema shadow-2xl"
      >
        <div className="relative h-64 overflow-hidden md:h-80">
          <img src={img(a.photo)} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-crema from-10% via-crema/70 via-40% to-transparent" />
        </div>
        <div className="-mt-16 px-6 pb-16 md:px-12">
          <p className="script relative text-3xl text-fucsia">{a.tag}</p>
          <h3 className="display relative mt-1 text-4xl md:text-5xl">{a.title}</h3>
          <p className="mt-3 text-sm font-semibold text-cafe/60">
            {a.date} · {a.minutes} min de lectura
          </p>
          <p className="mt-6 text-xl leading-relaxed">{a.intro}</p>
          {a.blocks.map((b) => (
            <div key={b.h} className="mt-8">
              <h4 className="display flex items-center gap-2 text-2xl">
                <HexIcon className="h-5 w-5" />
                {b.h}
              </h4>
              {b.p && <p className="mt-2 text-lg leading-relaxed text-cafe/85">{b.p}</p>}
              {b.list && (
                <ul className="mt-3 space-y-2">
                  {b.list.map((li) => (
                    <li key={li} className="flex gap-3 text-lg text-cafe/85">
                      <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-miel" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="mt-12 rounded-[28px] bg-polen p-6 text-center">
            <p className="display text-2xl">¿Te gustaría frasquitos así para tu evento?</p>
            <a href={wa()} target="_blank" rel="noreferrer" className="btn-fucsia mt-4 inline-block rounded-full px-6 py-3.5 font-bold text-white">
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
        <button onClick={onClose} aria-label="Cerrar artículo" className="btn-miel hex-flat fixed right-5 top-5 grid h-11 w-12 place-items-center text-2xl font-bold md:absolute">
          ×
        </button>
      </motion.article>
    </motion.div>
  );
}

// Ideas dulces: los artículos del blog se leen en un panel lateral sin salir de la página.
export function Ideas() {
  const [open, setOpen] = useState<Article | null>(null);
  return (
    <section id="ideas" className="relative bg-crema-2 py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        <Heading kicker="Ideas dulces" title="Inspiración para tu celebración" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((a, i) => (
            <motion.li key={a.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <button onClick={() => setOpen(a)} className="group flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-white text-left shadow-[0_20px_40px_-32px_rgb(74_42_20/0.7)] transition-transform hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={img(a.photo)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="script text-2xl text-fucsia">{a.tag}</span>
                  <h3 className="display mt-1 text-xl leading-snug">{a.title}</h3>
                  <span className="mt-auto pt-4 text-sm font-bold text-miel-2">Leer · {a.minutes} min →</span>
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
      <AnimatePresence>{open && <Reader a={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
