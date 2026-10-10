import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { INSTAGRAM_DM, VILLANOS, img } from "../data";
import { play } from "../sound";

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  return {
    done: diff === 0,
    parts: [
      { label: "Días", value: Math.floor(diff / 86400000) },
      { label: "Horas", value: Math.floor(diff / 3600000) % 24 },
      { label: "Min", value: Math.floor(diff / 60000) % 60 },
      { label: "Seg", value: Math.floor(diff / 1000) % 60 },
    ],
  };
}

// Halloween: su evento real "Noche de Villanos", con cuenta regresiva.
export function Villanos() {
  const { done, parts } = useCountdown(VILLANOS);
  return (
    <section id="villanos" className="relative overflow-hidden py-28 md:py-36">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgb(123_60_255/0.25),transparent_60%),radial-gradient(ellipse_at_20%_80%,rgb(200_16_46/0.25),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="label !text-violet">31 de octubre · 6 a 9 p. m.</p>
          <h2 className="title mt-3 text-[clamp(3.4rem,9vw,7.5rem)] text-bone">
            Noche de
            <br />
            <span className="text-blood">villanos</span>
          </h2>
          <p className="mt-6 max-w-md text-xl text-bone/80">
            Halloween en el castillo con El Atelier Encantado: taller de arte con artista profesional internacional, proyección de película, postre temático y bebida, disfraces, juegos y premios. Cupos limitados con reserva.
          </p>

          <div className="mt-10 grid max-w-md grid-cols-4 gap-3">
            {parts.map((p) => (
              <div key={p.label} className="border border-blood/50 bg-night/70 py-3 text-center shadow-[0_0_24px_rgb(200_16_46/0.25)]">
                <motion.p key={p.value} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="title text-4xl text-bone md:text-5xl">
                  {String(p.value).padStart(2, "0")}
                </motion.p>
                <p className="title mt-1 text-xs  text-bone/50">{p.label}</p>
              </div>
            ))}
          </div>
          {done && <p className="title mt-4 text-2xl text-blood">¡Esta noche es la noche!</p>}
          <a
            href={INSTAGRAM_DM}
            target="_blank"
            rel="noreferrer"
            className="title mt-8 inline-block border border-blood bg-blood px-8 py-4 text-2xl text-bone shadow-[0_0_30px_rgb(200_16_46/0.45)] transition-transform hover:scale-105"
          >
            Reservar por DM
          </a>
        </div>

        <motion.figure
          className="relative mx-auto w-full max-w-[420px]"
          initial={{ opacity: 0, rotate: -6, y: 60 }}
          whileInView={{ opacity: 1, rotate: -2, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          onViewportEnter={() => play("laugh", 0.6)}
          whileHover={{ rotate: 1, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <div className="frame">
            <img src={img("villanos-2")} alt="Afiche de la Noche de Villanos en El Purgatorio" loading="lazy" className="w-full" />
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
