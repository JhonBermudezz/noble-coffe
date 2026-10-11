import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { BOX_SIZE, COOKIE_PRICE, cookies, cop, img, wa } from "../data";

// Zona interior de la foto de la caja (en %), donde caben las galletas en 3 x 2.
const INSIDE = { left: 10, right: 6, top: 17, bottom: 14 };

// "Arma tu cajita": se eligen galletas, caen dentro de la caja rosada y se pide por WhatsApp.
export function Cajita() {
  const [box, setBox] = useState<{ key: number; id: string }[]>([]);
  const [seq, setSeq] = useState(0);
  const full = box.length >= BOX_SIZE;

  const add = (id: string) => {
    if (full) return;
    setBox((b) => [...b, { key: seq, id }]);
    setSeq((s) => s + 1);
  };
  const remove = (key: number) => setBox((b) => b.filter((c) => c.key !== key));
  const surprise = () => {
    const free = BOX_SIZE - box.length;
    const picks = Array.from({ length: free }, (_, i) => ({ key: seq + i, id: cookies[Math.floor(Math.random() * cookies.length)].id }));
    setBox((b) => [...b, ...picks]);
    setSeq((s) => s + free);
  };

  const counts = cookies.map((c) => ({ ...c, n: box.filter((b) => b.id === c.id).length })).filter((c) => c.n > 0);
  const total = COOKIE_PRICE ? COOKIE_PRICE * box.length : null;
  const msg = `¡Hola, Casita de Dios! Quiero una cajita de galletas: ${counts.map((c) => `${c.n} ${c.name}`).join(", ")}. ¿Me confirman el valor y cuándo la puedo recoger?`;

  return (
    <section id="cajita" className="relative overflow-hidden bg-gradient-to-b from-[#fbe3ee] to-chicle py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-4 md:px-8">
        <div className="max-w-3xl">
          <p className="script text-3xl text-rosa-2 md:text-4xl">Esta es tu señal para regalarle una cajita a esa personita especial</p>
          <h2 className="display mt-3 text-[clamp(3.2rem,8vw,6.5rem)]">Arma tu cajita</h2>
        </div>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* La caja */}
          <div>
            <div className="relative">
              <img src={img("cajita")} alt="Caja rosada de galletas abierta" className="w-full drop-shadow-[0_30px_30px_rgb(98_42_28/0.25)]" />
              <ul
                className="absolute grid grid-cols-3 grid-rows-2 gap-[2%]"
                style={{ left: `${INSIDE.left}%`, right: `${INSIDE.right}%`, top: `${INSIDE.top}%`, bottom: `${INSIDE.bottom}%` }}
              >
                {Array.from({ length: BOX_SIZE }, (_, i) => {
                  const c = box[i];
                  return (
                    <li key={i} className="relative grid place-items-center">
                      <AnimatePresence>
                        {c && (
                          <motion.button
                            key={c.key}
                            onClick={() => remove(c.key)}
                            aria-label={`Quitar galleta de ${cookies.find((k) => k.id === c.id)?.name}`}
                            initial={{ y: -260, scale: 1.4, rotate: -40, opacity: 0 }}
                            animate={{ y: 0, scale: 1, rotate: (c.key * 37) % 30 - 15, opacity: 1 }}
                            exit={{ y: -80, scale: 0.6, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                            className="absolute inset-0 grid place-items-center"
                          >
                            <img src={img(`galleta-${c.id}`)} alt="" className="h-full max-h-full w-auto object-contain drop-shadow-[0_8px_8px_rgb(98_42_28/0.35)]" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
              <AnimatePresence>
                {full && (
                  <motion.p
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: -8 }}
                    exit={{ scale: 0 }}
                    className="script absolute -top-6 right-2 rounded-full bg-menta px-5 py-2 text-3xl shadow-[0_0_0_4px_#fff] md:right-8"
                  >
                    ¡Lista para regalar!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[30px] bg-white p-5 md:p-6">
              <div>
                <p className="display text-2xl">
                  {box.length} de {BOX_SIZE} galletas
                </p>
                <p className="text-sm text-cacao/70">{total !== null ? `${cop(total)} · precio de referencia de la carta` : "Precio por confirmar"}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {box.length > 0 && (
                  <button onClick={() => setBox([])} className="rounded-full px-4 py-3 font-bold underline decoration-2 underline-offset-4">
                    Vaciar
                  </button>
                )}
                {!full && (
                  <button onClick={surprise} className="display halo rounded-full bg-white px-5 py-3 text-lg">
                    Sorpréndeme
                  </button>
                )}
                <a
                  href={box.length ? wa(msg) : undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!box.length}
                  className={`display rounded-full px-5 py-3 text-lg transition-transform ${box.length ? "bg-cacao text-crema shadow-[0_5px_0_#3a1812] hover:-translate-y-0.5" : "pointer-events-none bg-cacao/20 text-cacao/50"}`}
                >
                  Pedir mi cajita
                </a>
              </div>
            </div>
          </div>

          {/* Los sabores */}
          <div>
            <p className="display text-2xl">Toca un sabor para ponerlo en la caja</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {cookies.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => add(c.id)}
                    disabled={full}
                    className="group flex w-full items-center gap-3 rounded-[22px] bg-white/80 p-2.5 text-left transition-all hover:bg-white disabled:opacity-50 sm:flex-col sm:text-center lg:flex-row lg:text-left"
                  >
                    <img src={img(`galleta-${c.id}`)} alt="" className="h-16 w-16 shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 md:h-20 md:w-20" />
                    <span className="font-bold leading-tight">{c.name}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-cacao/70">Pregunta por los sabores nuevos: cada mes crean propuestas distintas.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
