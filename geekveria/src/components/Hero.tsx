import { AnimatePresence, motion, useAnimationFrame } from "motion/react";
import { useRef, useState } from "react";
import { img } from "../data";
import { shake } from "../fx";
import { Burst } from "./Burst";

const ease = [0.16, 1, 0.3, 1] as const;

// "Carga tu poder": se mantiene presionado para cargar una esfera de energía y al soltar
// sale un rayo que cruza la pantalla, con líneas de velocidad, sacudida y un ¡KA-BOOM!
function PowerUp() {
  const [charge, setCharge] = useState(0);
  const [holding, setHolding] = useState(false);
  const [blast, setBlast] = useState(0);
  const orb = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  const level = useRef(0);
  useAnimationFrame((_, delta) => {
    if (!holding) return;
    level.current = Math.min(1, level.current + delta / 900);
    setCharge(level.current);
    if (level.current >= 1) release();
  });

  const release = () => {
    if (!orb.current) return;
    const r = orb.current.getBoundingClientRect();
    setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setHolding(false);
    setBlast((b) => b + 1);
    window.setTimeout(shake, 120);
    window.setTimeout(() => {
      level.current = 0;
      setCharge(0);
    }, 900);
  };

  // Un toque basta: la carga sigue sola hasta llenarse y dispara.
  const start = () => {
    if (holding) return;
    level.current = 0;
    setCharge(0);
    setHolding(true);
  };
  return (
    <div className="relative mt-8 flex items-center gap-4">
      <button
        onPointerDown={start}
        onClick={start}
        onContextMenu={(e) => e.preventDefault()}
        className="panel relative select-none overflow-hidden bg-blue px-6 py-4 font-display text-xl uppercase tracking-wide text-ink transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none md:text-2xl"
        style={{ touchAction: "none" }}
      >
        <span className="absolute inset-y-0 left-0 bg-white/60" style={{ width: `${charge * 100}%` }} />
        <span className="relative">{holding ? "¡Cargando poder…!" : "Carga tu poder"}</span>
      </button>
      <div className="relative h-14 w-14 shrink-0">
        {/* La mascota espera junto al botón y tiembla mientras se carga el poder. */}
        <motion.img
          src={img("mascot-coffee")}
          alt=""
          className="pointer-events-none absolute -top-14 left-16 w-24 max-w-none md:-top-16 md:w-28"
          animate={holding ? { x: [0, -3, 3, -2, 2, 0], rotate: [-2, 2, -2] } : { y: [0, -6, 0] }}
          transition={holding ? { duration: 0.25, repeat: Infinity } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          ref={orb}
          className="absolute inset-0 rounded-full"
          animate={{
            scale: 0.4 + charge * 1.1,
            boxShadow: `0 0 ${10 + charge * 60}px ${4 + charge * 26}px rgb(46 196 241 / ${0.4 + charge * 0.5})`,
          }}
          transition={{ duration: 0.05 }}
          style={{ background: "radial-gradient(circle, #fff 0 30%, #9ff0ff 45%, #2ec4f1 70%)" }}
        />
      </div>

      {/* El rayo, a pantalla completa. */}
      <AnimatePresence>
        {blast > 0 && (
          <motion.div key={blast} className="pointer-events-none fixed inset-0 z-[110]" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 0.75, duration: 0.3 }}>
            <motion.div className="speed absolute -inset-[30%]" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.7] }} transition={{ duration: 0.3 }} />
            {/* La mascota entra disparando desde la izquierda y el rayo sigue desde sus manos. */}
            <motion.img
              src={img("mascot-blast")}
              alt=""
              className="absolute left-0 w-[min(46vw,360px)]"
              style={{ top: origin.y - Math.min(window.innerWidth * 0.46, 360) * 0.42 }}
              initial={{ x: "-110%", rotate: -8 }}
              animate={{ x: "-8%", rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <motion.div
              className="absolute rounded-r-full"
              style={{
                top: origin.y - 45,
                left: Math.min(window.innerWidth * 0.46, 360) * 0.86,
                height: 90,
                background: "linear-gradient(180deg, #2ec4f1 0%, #c9f6ff 30%, #fff 50%, #c9f6ff 70%, #2ec4f1 100%)",
                boxShadow: "0 0 40px 18px rgb(46 196 241 / 0.7)",
              }}
              initial={{ width: 0 }}
              animate={{ width: "100vw" }}
              transition={{ delay: 0.12, duration: 0.35, ease: "easeOut" }}
            />
            <motion.div
              className="absolute right-[4%]"
              style={{ top: origin.y - 110 }}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 8 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 12 }}
            >
              <Burst text="¡KA-BOOM!" color="#f2c40f" className="h-[220px] w-[220px]" size="text-4xl" spikes={18} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b-4 border-ink pt-[88px] md:pt-[104px]">
      <div className="rays spin-slow absolute -inset-[60%] opacity-90" aria-hidden />
      <div className="halftone absolute inset-0" aria-hidden />

      <div className="relative mx-auto grid max-w-[1300px] items-center gap-12 px-4 pb-44 pt-10 md:px-8 md:pb-56 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.p
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="panel-sm inline-block -rotate-2 bg-brown px-4 py-2 font-display text-lg uppercase tracking-[0.12em] text-yellow"
          >
            Club · Cómic + Manga · Café
          </motion.p>
          <h1 className="mt-6 font-display uppercase leading-[0.86]">
            {[
              { t: "Tu nación", c: "text-paper", s: "text-[clamp(3.6rem,10vw,8.5rem)]" },
              { t: "geek", c: "text-yellow", s: "text-[clamp(5.5rem,17vw,14rem)]" },
            ].map((l, i) => (
              <motion.span
                key={l.t}
                className={`ink-text block ${l.c} ${l.s}`}
                initial={{ scale: 2.4, opacity: 0, rotate: i ? 8 : -8 }}
                animate={{ scale: 1, opacity: 1, rotate: i ? -3 : -1 }}
                transition={{ type: "spring", stiffness: 240, damping: 15, delay: 0.2 + i * 0.18 }}
                onAnimationComplete={() => i === 1 && shake()}
              >
                {l.t}
              </motion.span>
            ))}
          </h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7, ease }} className="mt-8 flex flex-wrap gap-3">
            <a href="#menu" className="panel bg-red px-7 py-4 font-display text-xl uppercase tracking-wide text-white transition-transform hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none">
              Ver el menú
            </a>
            <a href="#tienda" className="panel bg-paper px-7 py-4 font-display text-xl uppercase tracking-wide transition-transform hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none">
              Ir a la tienda
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <PowerUp />
          </motion.div>
        </div>

        {/* Viñetas con fotos del local. */}
        <div className="relative mx-auto h-[440px] w-full max-w-[540px] md:h-[540px]">
          <motion.figure
            className="panel absolute left-0 top-0 w-[72%] rotate-[-4deg] overflow-hidden bg-white"
            initial={{ y: -300, rotate: -20 }}
            animate={{ y: 0, rotate: -4 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.5 }}
          >
            <img src={img("fachada")} alt="La entrada de Geekveria" className="aspect-square w-full object-cover" />
          </motion.figure>
          <motion.figure
            className="panel absolute bottom-0 right-0 w-[58%] rotate-[5deg] overflow-hidden bg-white"
            initial={{ x: 300, rotate: 20 }}
            animate={{ x: 0, rotate: 5 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.7 }}
          >
            <img src={img("frio")} alt="¿Frío? Pasa y tómate un café en Geekveria" className="aspect-[4/5] w-full object-cover" />
          </motion.figure>
          {/* Globo de diálogo */}
          <motion.div
            className="absolute -left-2 bottom-24 md:-left-8"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 13, delay: 1.1 }}
          >
            <div className="panel-sm relative rounded-[50%] bg-white px-7 py-5 text-center font-sfx text-2xl leading-tight md:text-3xl">
              ¡Pasa, el café
              <br />
              ya está listo!
              <svg className="absolute -bottom-5 right-10" width="34" height="26" viewBox="0 0 34 26" aria-hidden>
                <path d="M2 0 L30 0 L6 24 Z" fill="#fff" stroke="#2a1610" strokeWidth="3" strokeLinejoin="round" />
                <rect x="0" y="-4" width="34" height="5" fill="#fff" />
              </svg>
            </div>
          </motion.div>
          <motion.div
            className="absolute -right-3 -top-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 11, delay: 1.3 }}
          >
            <Burst text="¡NUEVO!" color="#ff5fa2" className="h-24 w-24 md:h-28 md:w-28" size="text-xl" />
          </motion.div>
        </div>
      </div>

      {/* La multitud geek de la marca, al pie de la portada, repetida a lo ancho. */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 md:h-48"
        style={{ backgroundImage: `url(${img("crowd-sm")})`, backgroundRepeat: "repeat-x", backgroundSize: "auto 100%", backgroundPosition: "center bottom" }}
        initial={{ y: 140 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.4 }}
      />
    </section>
  );
}
