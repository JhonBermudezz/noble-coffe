import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { INSTAGRAM_DM, img, kits, price } from "../data";

type Q = { q: string; options: { id: string; label: string; color: string }[] };

const QUESTIONS: Q[] = [
  {
    q: "¿Con quién vienes?",
    options: [
      { id: "pareja", label: "Mi pareja", color: "bg-bubble" },
      { id: "amigos", label: "Amigos", color: "bg-mustard" },
      { id: "cumple", label: "Un cumpleaños", color: "bg-lilac" },
      { id: "solo", label: "Yo solito", color: "bg-teal" },
    ],
  },
  {
    q: "¿Qué te provoca?",
    options: [
      { id: "ceramica", label: "Pintar cerámica", color: "bg-tangerine" },
      { id: "velas", label: "Hacer velas", color: "bg-mustard" },
      { id: "tote", label: "Una tote bag", color: "bg-bubble" },
      { id: "plantas", label: "Sembrar una planta", color: "bg-moss" },
    ],
  },
  {
    q: "¿Y de comer?",
    options: [
      { id: "cafe", label: "Solo un café", color: "bg-terra" },
      { id: "comer", label: "Bebida y algo rico", color: "bg-teal" },
    ],
  },
];

function pick(a: string[]) {
  const [who, what, food] = a;
  if (what === "velas") return "enciende";
  if (what === "tote") return "expresa";
  if (what === "plantas") return "siembra";
  if (food === "cafe") return "escencia";
  if (who === "pareja") return "florece";
  if (who === "solo") return "inspira";
  return "crea";
}

const CONFETTI = ["#f28bb0", "#f2c230", "#3fb8a6", "#ee5a24", "#b9a6e8", "#7f9a5b"];

// "Arma tu plan": tres toques y recomienda un kit.
export function PlanQuiz() {
  const [answers, setAnswers] = useState<string[]>([]);
  const step = answers.length;
  const finished = step === QUESTIONS.length;
  const kit = finished ? kits.find((k) => k.id === pick(answers))! : null;

  return (
    <section id="plan" className="relative overflow-hidden bg-lilac/50 py-24 md:py-32">
      <div aria-hidden className="blob absolute -left-16 top-10 h-64 w-64 bg-mustard/60" />
      <div className="relative mx-auto max-w-[900px] px-4 text-center md:px-8">
        <p className="font-hand text-4xl text-terra">en 3 toques</p>
        <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-forest">Arma tu plan</h2>

        <div className="mt-4 flex justify-center gap-2" aria-hidden>
          {QUESTIONS.map((_, i) => (
            <span key={i} className={`h-3 w-10 rounded-full transition-colors ${i < step ? "bg-forest" : "bg-forest/20"}`} />
          ))}
        </div>

        <div className="relative mt-10 min-h-[340px]">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 80, rotate: 3 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: -80, rotate: -3 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="font-display text-4xl text-forest md:text-5xl">{QUESTIONS[step].q}</h3>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {QUESTIONS[step].options.map((o, i) => (
                    <motion.button
                      key={o.id}
                      onClick={() => setAnswers((a) => [...a, o.id])}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 14, delay: i * 0.06 }}
                      whileHover={{ scale: 1.05, rotate: i % 2 ? 2 : -2 }}
                      whileTap={{ scale: 0.94 }}
                      className={`rounded-[2rem] px-4 py-8 font-display text-2xl text-forest ring-[3px] ring-forest md:text-3xl ${o.color}`}
                    >
                      {o.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              kit && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 160, damping: 14 }}
                  className="relative"
                >
                  {/* Confeti de pintura. */}
                  <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3">
                    {Array.from({ length: 28 }, (_, i) => {
                      const a = (i / 28) * Math.PI * 2;
                      const d = 160 + (i % 5) * 40;
                      return (
                        <motion.span
                          key={i}
                          className="blob absolute block h-4 w-4"
                          style={{ background: CONFETTI[i % CONFETTI.length] }}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                          animate={{ x: Math.cos(a) * d, y: Math.sin(a) * d + 80, opacity: 0, scale: 1.4 }}
                          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                      );
                    })}
                  </div>
                  <div className={`mx-auto flex max-w-[640px] flex-col items-center gap-6 rounded-[2.5rem] p-6 ring-[3px] ring-forest md:flex-row md:text-left ${kit.color} ${kit.text}`}>
                    <img src={img(kit.photo)} alt="" className="blob h-40 w-40 shrink-0 object-cover ring-[3px] ring-forest" />
                    <div>
                      <p className="font-hand text-3xl">tu plan es el kit</p>
                      <h3 className="font-display text-6xl leading-none">{kit.name}</h3>
                      <p className="mt-2">{kit.includes.join(" · ")}</p>
                      <p className="mt-2 font-display text-3xl">${price(kit.price)}</p>
                    </div>
                  </div>
                  {answers[0] === "cumple" && <p className="mt-6 text-lg text-forest">¿Es un cumpleaños? Escríbenos y armamos la celebración.</p>}
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a href={INSTAGRAM_DM} target="_blank" rel="noreferrer" className="rounded-full bg-forest px-7 py-4 text-lg font-bold text-cream transition-transform hover:-rotate-2 hover:scale-105">
                      Reservar este plan
                    </a>
                    <button onClick={() => setAnswers([])} className="rounded-full border-[3px] border-forest px-7 py-4 text-lg font-bold text-forest transition-transform hover:rotate-2 hover:scale-105">
                      Otra vez
                    </button>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
