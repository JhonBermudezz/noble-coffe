import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { img } from "../data";

const ROOMS = [
  { photo: "perro", title: "El guardián", text: "Te recibe en la puerta." },
  { photo: "terraza", title: "La terraza", text: "Entre torres de piedra y plantas." },
  { photo: "jaula", title: "La jaula", text: "Bajo luz violeta." },
  { photo: "muneca-666", title: "Las muñecas", text: "Nadie sabe de dónde vienen." },
  { photo: "neon", title: "Memento mori", text: "Recuerda que vas a morir… y pide otro café." },
  { photo: "latte-doll", title: "Tu escape diario", text: "Arte latte con compañía." },
  { photo: "fuego", title: "Las noches", text: "Fuego, música y algo más." },
  { photo: "vino", title: "El vino", text: "Tinto de la casa y caliente para el frío." },
  { photo: "calavera-taza", title: "La barra", text: "Café exótico de alta calidad." },
];

// Recorrido por el castillo: cuadros en marcos dorados que se mueven de lado con el scroll.
export function Castle() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [wide, setWide] = useState(() => window.innerWidth >= 1024);
  const pinned = wide && !reduce;

  useLayoutEffect(() => {
    const measure = () => {
      setWide(window.innerWidth >= 1024);
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 80));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  const header = (
    <div className="mx-auto mb-12 max-w-[1300px] px-5 md:px-10">
      <p className="title text-sm tracking-[0.5em] text-blood">—Recorrido—</p>
      <h2 className="title mt-3 text-[clamp(3.4rem,9vw,7.5rem)] text-bone">El castillo</h2>
    </div>
  );

  const frames = ROOMS.map((r, i) => (
    <motion.figure
      key={r.photo}
      className="w-[72vw] max-w-[340px] shrink-0 snap-center"
      animate={reduce ? undefined : { rotate: [i % 2 ? 1.5 : -1.5, i % 2 ? -1.5 : 1.5, i % 2 ? 1.5 : -1.5] }}
      transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "50% -40px" }}
    >
      {/* Cordón del cuadro */}
      <div aria-hidden className="mx-auto h-10 w-24 border-x border-t border-[#8a6a2e]/70" style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
      <div className="frame bg-night">
        <img src={img(r.photo)} alt={r.title} loading="lazy" className="aspect-[4/5] w-full object-cover" />
      </div>
      <figcaption className="mt-4 text-center">
        <p className="title text-2xl text-bone">{r.title}</p>
        <p className="italic text-bone/60">{r.text}</p>
      </figcaption>
    </motion.figure>
  ));

  if (!pinned) {
    return (
      <section id="castillo" className="py-28">
        {header}
        <div className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-6 [scrollbar-width:none]">{frames}</div>
      </section>
    );
  }

  return (
    <section id="castillo" ref={ref} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden pt-16">
        {header}
        <motion.div ref={track} style={{ x }} className="flex w-max gap-14 px-10">
          {frames}
        </motion.div>
      </div>
    </section>
  );
}
