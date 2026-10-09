import { motion } from "motion/react";
import { COMBO, img } from "../data";
import { Burst } from "./Burst";
import { useCart } from "./cart";

// "Recomendado del club": el Combo Verde con un rayo enorme.
export function Combo() {
  const { add } = useCart();
  return (
    <section className="relative mx-auto max-w-[1100px] px-4 py-24 md:px-8">
      <motion.div
        className="panel relative grid items-center gap-8 overflow-hidden bg-mint p-6 md:grid-cols-[1fr_auto] md:p-10"
        initial={{ rotate: -6, scale: 0.85, opacity: 0 }}
        whileInView={{ rotate: -1, scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 160, damping: 14 }}
      >
        <div className="speed absolute -inset-[40%] opacity-25" aria-hidden />
        <div className="relative">
          <p className="panel-sm inline-block bg-ink px-3 py-1 font-display text-lg uppercase tracking-wider text-yellow">Recomendado del club</p>
          <h2 className="ink-text mt-4 font-display text-[clamp(3.4rem,9vw,7rem)] uppercase leading-[0.9] text-paper">{COMBO.name}</h2>
          <ul className="mt-4 space-y-1 text-lg font-semibold">
            {COMBO.includes.map((x) => (
              <li key={x}>★ {x}</li>
            ))}
          </ul>
          <button
            onClick={() => add({ id: COMBO.id, name: COMBO.name, price: COMBO.price })}
            className="panel mt-6 bg-red px-7 py-4 font-display text-xl uppercase tracking-wide text-white transition-transform hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Agregar al pedido
          </button>
        </div>
        <div className="relative mx-auto">
          {/* Rayo */}
          <svg viewBox="0 0 160 260" className="h-64 w-auto drop-shadow-[8px_8px_0_#2a1610] md:h-80" aria-hidden>
            <path d="M96 4 18 150h52l-24 106L144 98H90L120 4z" fill="#fff" stroke="#2a1610" strokeWidth="6" strokeLinejoin="round" />
          </svg>
          <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2">
            <Burst text="$13 mil" color="#f2c40f" className="h-36 w-36" size="text-4xl" spikes={12} />
          </div>
          <img src={img("emblem")} alt="" className="absolute -bottom-2 -left-10 w-20 rotate-[-12deg] drop-shadow-[4px_4px_0_#2a1610]" />
        </div>
      </motion.div>
    </section>
  );
}
