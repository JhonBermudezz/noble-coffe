import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { cop, img, sins, type Sin } from "../data";
import { play } from "../sound";

function Card({ sin, flipped, chosen, hidden, onFlip }: { sin: Sin; flipped: boolean; chosen: boolean; hidden: boolean; onFlip: () => void }) {
  return (
    <motion.button
      layout
      onClick={onFlip}
      aria-pressed={flipped}
      aria-label={`${sin.name}: ${flipped ? "ocultar" : "ver"} el coctel`}
      className="relative aspect-[2/3] w-[calc(50%-0.5rem)] [perspective:1200px] sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.15rem)]"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
      >
        {/* Cara: la carta ilustrada del pecado */}
        <div className={`absolute inset-0 overflow-hidden border border-[#8a6a2e] bg-night [backface-visibility:hidden] ${chosen ? "shadow-[0_0_50px_rgb(200_16_46/0.8)]" : "shadow-[0_20px_40px_-15px_rgb(0_0_0/0.9)]"}`}>
          <img src={img(hidden ? "tarot-back" : `tarot-${sin.id}`)} alt={`Carta de tarot de la ${sin.name}`} loading="lazy" className="h-full w-full object-cover" />
        </div>
        {/* Reverso: el coctel */}
        <div className="absolute inset-0 flex flex-col justify-between border border-blood bg-[linear-gradient(160deg,#1a0a0d,#0b0809_60%)] p-4 text-left [backface-visibility:hidden] [transform:rotateY(180deg)] md:p-5">
          <div>
            <p className="title text-xs tracking-[0.4em] text-blood">{sin.numeral} · {sin.spirit}</p>
            <h3 className="title mt-2 text-4xl text-bone md:text-5xl">{sin.name}</h3>
          </div>
          <p className="text-sm leading-snug text-bone/85 md:text-base">{sin.desc}</p>
          <p className="title text-3xl text-blood">{cop(sin.price)}</p>
        </div>
      </motion.div>
    </motion.button>
  );
}

// Los 7 pecados: sus cocteles como cartas de tarot que se voltean.
export function Sins() {
  const [order, setOrder] = useState(sins.map((s) => s.id));
  const [flipped, setFlipped] = useState<string[]>([]);
  const [chosen, setChosen] = useState<string | null>(null);
  const [shuffling, setShuffling] = useState(false);

  const flip = (id: string) => {
    play("shuffle", 0.5);
    setFlipped((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  };

  const confess = async () => {
    if (shuffling) return;
    setShuffling(true);
    setFlipped([]);
    setChosen(null);
    play("shuffle", 0.8);
    for (let i = 0; i < 4; i++) {
      await new Promise((r) => setTimeout(r, 260));
      setOrder((o) => [...o].sort(() => Math.random() - 0.5));
    }
    const pick = sins[Math.floor(Math.random() * sins.length)].id;
    await new Promise((r) => setTimeout(r, 400));
    setChosen(pick);
    setFlipped([pick]);
    play("laugh", 0.5);
    setShuffling(false);
  };

  const pickedSin = sins.find((s) => s.id === chosen);

  return (
    <section id="pecados" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1300px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="title text-sm tracking-[0.5em] text-blood">—Cocteles—</p>
            <h2 className="title mt-3 text-[clamp(3.4rem,9vw,7.5rem)] text-bone">Los 7 pecados</h2>
            <p className="mt-4 max-w-md text-xl text-bone/75">Toca una carta para ver su coctel. O deja que el castillo elija por ti.</p>
          </div>
          <button
            onClick={confess}
            disabled={shuffling}
            className="title border border-blood bg-blood px-7 py-4 text-xl text-bone shadow-[0_0_30px_rgb(200_16_46/0.45)] transition-transform hover:scale-105 disabled:opacity-60"
          >
            {shuffling ? "Barajando…" : "Confiesa tu pecado"}
          </button>
        </div>

        <AnimatePresence>
          {pickedSin && (
            <motion.p
              key={pickedSin.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 font-script text-4xl text-bone md:text-5xl"
            >
              Tu pecado esta noche es la <span className="text-blood">{pickedSin.name.toLowerCase()}</span>…
            </motion.p>
          )}
        </AnimatePresence>

        <LayoutGroup>
          <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6">
            {order.map((id) => {
              const sin = sins.find((s) => s.id === id)!;
              return <Card key={id} sin={sin} flipped={flipped.includes(id)} chosen={chosen === id} hidden={shuffling} onFlip={() => flip(id)} />;
            })}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
