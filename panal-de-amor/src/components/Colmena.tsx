import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ROOT, colmena, img } from "../data";
import { Link } from "../router";
import { Goteo, HexIcon } from "./Bits";
import { FloatingHearts } from "./Hearts";
import { pauseMusic, playMusic, useMusic } from "./Musica";

const video = (name: string) => `${ROOT}video/${name}.mp4`;
const CHIPS = ["Colmena local", "Producción responsable", "En armonía con la naturaleza"];

// El video completo de la visita a la colmena, con sonido. Mientras suena, la música de fondo se pausa.
function Player({ onClose }: { onClose: () => void }) {
  const wasPlaying = useMusic();
  const resume = useRef(wasPlaying);
  useEffect(() => {
    if (resume.current) pauseMusic();
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => {
      window.removeEventListener("keydown", k);
      if (resume.current) playMusic();
    };
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-cafe-2/85 p-4 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.video
        src={video("colmena")}
        poster={img("colmena-poster")}
        controls
        autoPlay
        playsInline
        className="max-h-[86svh] rounded-[28px] shadow-2xl"
        initial={{ scale: 0.92 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      />
      <button onClick={onClose} aria-label="Cerrar video" className="btn-miel hex-flat absolute right-5 top-5 grid h-11 w-12 place-items-center text-2xl font-bold">
        ×
      </button>
    </motion.div>
  );
}

// "Dulzura que nace en la colmena": el texto de la marca con el video real de su colmena.
// as="hero" lo usa como encabezado de la página de Souvenirs.
export function Colmena({ as = "section", kicker = colmena.kicker }: { as?: "hero" | "section"; kicker?: string }) {
  const [open, setOpen] = useState(false);
  const hero = as === "hero";
  const Title = hero ? motion.h1 : motion.h2;

  return (
    <>
      <section id="colmena" className={`relative overflow-hidden bg-gradient-to-b from-crema to-polen/60 ${hero ? "pb-20 pt-32 md:pb-28 md:pt-36" : "py-24 md:py-32"}`}>
        <div aria-hidden className="panal absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_30%_50%,#000_10%,transparent_70%)]" />
        <FloatingHearts
          items={[
            { left: "4%", top: "20%", size: "h-5 w-5", color: "#f7c64a" },
            { left: "46%", top: "12%", size: "h-4 w-4", color: "#d63c7c" },
            { left: "92%", top: "80%", size: "h-6 w-6", color: "#e9a426" },
          ]}
        />
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-4 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:px-8">
          {/* El video en una celda en arco */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-[min(78vw,380px)]"
          >
            <div aria-hidden className="btn-miel absolute -inset-[10px] rounded-t-full rounded-b-[44px]" />
            <div className="relative overflow-hidden rounded-t-full rounded-b-[36px] bg-cafe shadow-[0_0_0_5px_#fff]">
              <video src={video("colmena-loop")} poster={img("colmena-poster")} autoPlay muted loop playsInline className="aspect-[478/850] w-full object-cover" aria-label="Visita a la colmena: abejas en las manos de los visitantes con traje de apicultor" />
              <button onClick={() => setOpen(true)} className="group absolute inset-x-0 bottom-0 flex items-center justify-center gap-3 bg-gradient-to-t from-cafe-2/85 to-transparent pb-6 pt-16 font-bold text-white">
                <span className="btn-fucsia grid h-14 w-14 place-items-center rounded-full transition-transform group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" aria-hidden>
                    <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
                  </svg>
                </span>
                Ver la visita completa
              </button>
            </div>
            <img src={img("panal-trozo")} alt="" aria-hidden className="absolute -bottom-10 -right-14 w-40 drop-shadow-[0_18px_18px_rgb(74_42_20/0.35)] md:-right-20 md:w-48" />
          </motion.div>

          <div>
            <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="script text-3xl text-fucsia md:text-4xl">
              {kicker}
            </motion.p>
            <Title
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`display mt-2 leading-[0.95] ${hero ? "text-[clamp(2.8rem,6.4vw,5.6rem)]" : "text-[clamp(2.6rem,6vw,4.8rem)]"}`}
            >
              Dulzura que nace en la <span className="display-i text-miel-2">colmena</span>
            </Title>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }} className="mt-6 max-w-xl text-lg leading-relaxed text-cafe/85 md:text-xl">
              {colmena.text}
            </motion.p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {CHIPS.map((c, i) => (
                <motion.li key={c} initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 220, damping: 14 }} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold shadow-[0_10px_20px_-16px_rgb(74_42_20/0.6)]">
                  <HexIcon className="h-4 w-4" />
                  {c}
                </motion.li>
              ))}
            </ul>
            {!hero && (
              <Link to="souvenirs" className="btn-fucsia mt-9 inline-block rounded-full px-7 py-4 text-lg font-bold text-white transition-transform hover:-translate-y-1">
                Ver los souvenirs
              </Link>
            )}
          </div>
        </div>
      </section>
      {hero && <Goteo />}
      <AnimatePresence>{open && <Player onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
