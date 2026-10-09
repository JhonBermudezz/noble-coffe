import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { img } from "../data";
import { shake } from "../fx";
import { Burst } from "./Burst";

const POWERS = ["Lector de manga", "Barista honorario", "Coleccionista", "Cazador de preventas", "Otaku certificado", "Fan de los cómics"];

// "Únete al club": carné de miembro que se arma en vivo con el nombre, y el boletín.
// Solo interfaz: todavía no guarda ni envía correos.
export function Community() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [power, setPower] = useState(POWERS[0]);
  const [joined, setJoined] = useState(false);
  const [number] = useState(() => String(Math.floor(1000 + Math.random() * 8999)));

  const join = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setJoined(true);
    shake();
  };

  return (
    <section id="club-geek" className="relative overflow-x-clip border-y-4 border-ink bg-violet py-24 text-paper md:py-32">
      <div className="speed absolute -inset-[40%] opacity-20" aria-hidden />
      <div className="halftone-light absolute inset-0" aria-hidden />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-4 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className="ink-text font-display text-[clamp(3.2rem,8.5vw,7rem)] uppercase leading-[0.88]">
            Únete
            <br />
            <span className="text-yellow">al club</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-paper/90">Arma tu carné de miembro y entérate primero de lanzamientos, preventas y lo nuevo del club.</p>

          <AnimatePresence mode="wait">
            {joined ? (
              <motion.div key="ok" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-8 flex items-center gap-4">
                <Burst text="¡DENTRO!" color="#f2c40f" className="h-28 w-28 shrink-0" size="text-2xl" />
                <p className="font-display text-2xl uppercase leading-tight">
                  ¡Bienvenido al club, {name || "geek"}!
                  <span className="mt-1 block font-sans text-sm normal-case text-paper/70">Vista previa: el registro se activa cuando conecten el boletín.</span>
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={join} className="mt-8 space-y-3" exit={{ opacity: 0, x: -40 }}>
                <label className="block">
                  <span className="sr-only">Tu nombre</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value.slice(0, 22))}
                    placeholder="Tu nombre de héroe"
                    className="panel-sm w-full bg-paper px-4 py-3 font-semibold text-ink placeholder:text-ink/40"
                  />
                </label>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Tu poder">
                  {POWERS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      role="radio"
                      aria-checked={power === p}
                      onClick={() => setPower(p)}
                      className={`border-[3px] border-ink px-3 py-1 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${power === p ? "bg-yellow text-ink shadow-[3px_3px_0_#2a1610]" : "bg-paper/15 text-paper"}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label className="flex-1">
                    <span className="sr-only">Tu correo</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="panel-sm w-full bg-paper px-4 py-3 font-semibold text-ink placeholder:text-ink/40"
                    />
                  </label>
                  <button type="submit" className="panel bg-red px-7 py-3 font-display text-xl uppercase tracking-wide text-white transition-transform hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none">
                    ¡Me uno!
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Carné del club, se actualiza mientras se escribe. */}
        <motion.div
          className="relative mx-auto w-full max-w-[460px]"
          initial={{ rotate: -14, y: 60, opacity: 0 }}
          whileInView={{ rotate: -4, y: 0, opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 140, damping: 14 }}
        >
          <motion.img
            src={img("mascot-wow")}
            alt=""
            className="absolute -bottom-16 -left-14 z-10 w-36 md:-left-20 md:w-44"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="panel relative aspect-[1.6] overflow-hidden bg-yellow p-5 text-ink">
            <div className="rays absolute -inset-[50%] opacity-50" aria-hidden />
            <div className="halftone absolute inset-0" aria-hidden />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <img src={img("logo")} alt="" className="h-9 w-auto md:h-11" />
                <span className="border-2 border-ink bg-paper px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider">Miembro N.º {number}</span>
              </div>
              <div className="mt-auto flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Carné del club</p>
                  <motion.p
                    key={name}
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    className="ink-text-sm truncate font-display text-4xl uppercase leading-none text-paper md:text-5xl"
                  >
                    {name || "Tu nombre"}
                  </motion.p>
                  <p className="mt-2 inline-block border-2 border-ink bg-red px-2 py-0.5 text-xs font-bold uppercase text-white">Poder: {power}</p>
                </div>
                <img src={img("emblem")} alt="" className="h-20 w-20 shrink-0 drop-shadow-[3px_3px_0_#2a1610] md:h-24 md:w-24" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
