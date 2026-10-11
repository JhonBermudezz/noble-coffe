import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { asset, img, projects, videos } from "../data";

const FILTERS = ["Todos", "Corrediza", "Abatible", "Garaje", "Talanquera", "Acceso"] as const;

function VideoModal({ id, title, onClose }: { id: string; title: string; onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-ink/90 p-4 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <motion.div layoutId={`video-${id}`} className="relative w-full max-w-[920px] overflow-hidden rounded-3xl bg-black" onClick={(e) => e.stopPropagation()}>
        <video src={asset(`video/${id}.mp4`)} poster={asset(`video/${id}.webp`)} className="max-h-[80vh] w-full" controls autoPlay playsInline />
        <button onClick={onClose} aria-label="Cerrar video" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-ink">
          <X size={18} />
        </button>
      </motion.div>
    </motion.div>
  );
}

// Proyectos reales: filtros con animación de reacomodo y una tira de videos que se abren en grande.
export function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Todos");
  const [video, setVideo] = useState<(typeof videos)[number] | null>(null);
  const list = projects.filter((p) => filter === "Todos" || p.kind === filter);

  return (
    <section id="proyectos" className="relative bg-mist py-24 md:py-32">
      <div aria-hidden className="blueprint-light absolute inset-0" />
      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal">Proyectos</p>
            <h2 className="mt-3 max-w-[20ch] text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">Hemos dejado huella en todo el Meta.</h2>
          </div>
          <LayoutGroup>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar proyectos">
              {FILTERS.map((f) => (
                <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} className={`relative rounded-full px-4 py-2 text-sm font-bold transition-colors ${filter === f ? "text-white" : "text-ink/70 hover:text-ink"}`}>
                  {filter === f && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <motion.div layout className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.figure
                key={p.photo}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-2xl bg-white ${i % 5 === 0 ? "row-span-2" : ""}`}
              >
                <img src={img(p.photo)} alt={p.title} loading="lazy" className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i % 5 === 0 ? "h-full min-h-[320px]" : "aspect-[4/3]"}`} />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-12 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-lime">{p.kind}</span>
                  <span className="block text-sm font-bold leading-snug md:text-base">{p.title}</span>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-20 flex items-end justify-between gap-6">
          <h3 className="text-2xl font-extrabold tracking-tight md:text-3xl">Míralas funcionando</h3>
          <p className="hidden text-steel md:block">Videos reales de nuestras instalaciones</p>
        </div>
        <div className="-mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:-mx-8 md:px-8">
          {videos.map((v) => (
            <motion.button key={v.id} layoutId={`video-${v.id}`} onClick={() => setVideo(v)} whileHover={{ y: -6 }} className="group relative w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl bg-ink text-left md:w-[300px]">
              <img src={asset(`video/${v.id}.webp`)} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover opacity-85 transition-opacity group-hover:opacity-100" />
              <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-xl transition-transform group-hover:scale-110">
                <Play size={22} fill="currentColor" />
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-4 pt-14 text-sm font-bold text-white">{v.title}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>{video && <VideoModal id={video.id} title={video.title} onClose={() => setVideo(null)} />}</AnimatePresence>
    </section>
  );
}
