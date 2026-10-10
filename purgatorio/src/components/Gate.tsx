import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { img } from "../data";
import { play, setSound } from "../sound";

const KEY = "purgatorio-gate";

export function shouldShowGate() {
  try {
    return sessionStorage.getItem(KEY) !== "1";
  } catch {
    return true;
  }
}

// Portón del castillo: dos hojas de madera con herrajes que se abren hacia adentro.
function Door({ side, open }: { side: "left" | "right"; open: boolean }) {
  const left = side === "left";
  return (
    <motion.div
      className={`absolute top-0 h-full w-1/2 ${left ? "left-0" : "right-0"}`}
      style={{ transformOrigin: left ? "left center" : "right center", transformPerspective: 1400 }}
      animate={open ? { rotateY: left ? -96 : 96, opacity: 0.6 } : { rotateY: 0 }}
      transition={{ duration: 1.8, ease: [0.6, 0, 0.2, 1] }}
    >
      <div
        className="h-full w-full"
        style={{
          background:
            "repeating-linear-gradient(90deg, #1c110d 0 4px, #4a2c1f 4px 70px, #3b2318 70px 74px), linear-gradient(180deg, #5a3626, #24140e)",
          backgroundBlendMode: "multiply",
          boxShadow: left ? "inset -18px 0 40px rgb(0 0 0 / 0.8)" : "inset 18px 0 40px rgb(0 0 0 / 0.8)",
        }}
      >
        {/* Bandas de hierro */}
        {["18%", "50%", "82%"].map((t) => (
          <div key={t} className="absolute inset-x-0 h-5 bg-gradient-to-b from-[#3d3a3a] to-[#151313]" style={{ top: t }}>
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#6d6767] shadow-[inset_-1px_-1px_0_#000]" style={{ left: `${8 + i * 16}%` }} />
            ))}
          </div>
        ))}
        {/* Aldaba */}
        <div className={`absolute top-[84%] h-14 w-14 rounded-full border-[5px] border-[#b08a3e] shadow-[0_4px_10px_rgb(0_0_0/0.7)] ${left ? "right-6" : "left-6"}`} />
      </div>
    </motion.div>
  );
}

export function Gate({ onEnter }: { onEnter: () => void }) {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);

  const enter = (withSound: boolean) => {
    setSound(withSound);
    play("gate", 0.9);
    setOpen(true);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* sin almacenamiento */
    }
    window.setTimeout(onEnter, 700);
    window.setTimeout(() => setGone(true), 1900);
  };

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div className="fixed inset-0 z-[200] overflow-hidden bg-night" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
          <Door side="left" open={open} />
          <Door side="right" open={open} />
          <motion.div
            className="absolute inset-0 grid place-items-center bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.75),transparent_65%)] px-6 text-center"
            animate={open ? { opacity: 0, scale: 1.3 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <motion.img
                src={img("logo")}
                alt="El Purgatorio"
                className="mx-auto w-44 rounded-full shadow-[0_0_80px_rgb(200_16_46/0.6)] md:w-56"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <p className="mt-6 font-script text-4xl text-bone md:text-5xl">Cruza el portón… si te atreves</p>
              <div className="mt-8 flex flex-col items-center gap-3">
                <button
                  onClick={() => enter(true)}
                  className="title border border-blood bg-blood px-8 py-4 text-2xl text-bone shadow-[0_0_40px_rgb(200_16_46/0.5)] transition-transform hover:scale-105"
                >
                  Entrar con sonido 🔊
                </button>
                <button onClick={() => enter(false)} className="text-base text-bone/60 underline underline-offset-4 hover:text-bone">
                  Entrar en silencio
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SoundToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={on ? "Silenciar el castillo" : "Activar el sonido del castillo"}
      className="fixed bottom-5 right-5 z-[90] grid h-14 w-14 place-items-center rounded-full border border-blood/70 bg-night/80 text-2xl shadow-[0_0_30px_rgb(200_16_46/0.45)] backdrop-blur transition-transform hover:scale-110"
    >
      {on ? "🔊" : "🔇"}
      {on && <span className="absolute inset-0 animate-ping rounded-full border border-blood/40" />}
    </button>
  );
}
