import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { INSTAGRAM_DM, img, kits, price } from "../data";
import { Painted } from "./Painted";

type Q = { q: string; options: { id: string; label: string; color: string }[] };

const QUESTIONS: Q[] = [
  {
    q: "¿Con quién vienes?",
    options: [
      { id: "pareja", label: "Mi pareja", color: "hover:bg-bubble" },
      { id: "amigos", label: "Amigos", color: "hover:bg-mustard" },
      { id: "cumple", label: "Un cumpleaños", color: "hover:bg-lilac" },
      { id: "solo", label: "Yo solito", color: "hover:bg-teal" },
    ],
  },
  {
    q: "¿Qué te provoca?",
    options: [
      { id: "ceramica", label: "Pintar cerámica", color: "hover:bg-tangerine" },
      { id: "velas", label: "Hacer velas", color: "hover:bg-mustard" },
      { id: "tote", label: "Una tote bag", color: "hover:bg-bubble" },
      { id: "plantas", label: "Sembrar una planta", color: "hover:bg-moss" },
    ],
  },
  {
    q: "¿Y de comer?",
    options: [
      { id: "cafe", label: "Solo un café", color: "hover:bg-terra" },
      { id: "comer", label: "Bebida y algo rico", color: "hover:bg-teal" },
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
    <section id="plan" className="relative overflow-hidden py-24 md:py-32">
      <Painted name="dots" color="#f28bb0" className="absolute left-[4%] top-16 hidden w-32 md:block" />
      <div className="relative mx-auto max-w-[900px] px-4 text-center md:px-8">
        <h2 className="font-display text-[clamp(3.2rem,7.5vw,6.5rem)] leading-[0.92] text-forest">
          ¿Qué plan <em>armamos</em>?
        </h2>

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
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.94 }}
                      className={`rounded-[24px] bg-[#efe6d4] px-4 py-7 font-display text-2xl text-forest transition-colors md:text-3xl hover:text-forest ${o.color}`}
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
                          className="absolute block h-3 w-3 rounded-full"
                          style={{ background: CONFETTI[i % CONFETTI.length] }}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                          animate={{ x: Math.cos(a) * d, y: Math.sin(a) * d + 80, opacity: 0, scale: 1.4 }}
                          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                      );
                    })}
                  </div>
                  <div className={`mx-auto flex max-w-[640px] flex-col items-center gap-6 rounded-[28px] p-6 md:flex-row md:text-left ${kit.color} ${kit.text}`}>
                    <img src={img(kit.photo)} alt="" className="h-40 w-40 shrink-0 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-80">Tu plan</p>
                      <h3 className="mt-1 font-display text-6xl leading-none">
                        Kit <span className="italic">{kit.name}</span>
                      </h3>
                      <p className="mt-2">{kit.includes.join(" · ")}</p>
                      <p className="mt-2 text-2xl font-semibold tabular-nums">${price(kit.price)}</p>
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
