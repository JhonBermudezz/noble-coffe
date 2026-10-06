import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { InstagramLogo } from "@phosphor-icons/react";
import { INSTAGRAM_DM } from "../data/menu";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

const notes = ["Chocolate", "Caramelo", "Frutos rojos", "Panela"];
const grinds = ["Grano", "Molido"] as const;

// Escala de acidez igual a la de la etiqueta: 2.5 de 6.
function AcidityDots() {
  return (
    <div className="flex gap-1.5" role="img" aria-label="Acidez media, 2.5 de 6">
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} className="relative size-3.5 overflow-hidden rounded-full border border-on-gold">
          {i < 2 && <span className="absolute inset-0 bg-on-gold" />}
          {i === 2 && <span className="absolute inset-y-0 left-0 w-1/2 bg-on-gold" />}
        </span>
      ))}
    </div>
  );
}

export function Bag() {
  const [grind, setGrind] = useState<(typeof grinds)[number]>("Molido");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} id="cafe" className="bg-paper-2">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-24 md:px-8 md:py-36 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="relative aspect-[4/5] overflow-hidden lg:col-span-6">
          <motion.div style={reduce ? undefined : { y: photoY }} className="absolute -inset-y-[8%] inset-x-0">
            <Photo
              name="bodegon"
              alt="Bolsa de café NOBLE junto a una Chemex, una jarra de leche, gafas y un hojaldre"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </motion.div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.95]">
              Llévate el café
              <br />a casa.
            </h2>
            <p className="mt-5 max-w-[42ch] text-muted">
              El mismo café de la barra, en bolsa de 340 g. Escoge si lo quieres en grano o molido.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div className="bg-gold p-6 text-on-gold md:p-8">
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 text-[13px] font-semibold uppercase leading-snug">
                <div>
                  <p>Café tradicional</p>
                  <div className="mt-3 flex flex-col items-start gap-1.5" role="radiogroup" aria-label="Presentación">
                    {grinds.map((g) => (
                      <button
                        key={g}
                        role="radio"
                        aria-checked={grind === g}
                        onClick={() => setGrind(g)}
                        className="flex items-center gap-2 font-medium uppercase"
                      >
                        <span className="grid size-3.5 place-items-center rounded-full border border-on-gold">
                          {grind === g && (
                            <motion.span
                              layoutId="grind-dot"
                              className="size-full rounded-full bg-on-gold"
                              transition={{ type: "spring", stiffness: 420, damping: 30 }}
                            />
                          )}
                        </span>
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p>Notas</p>
                  <ul className="mt-3 font-medium">
                    {notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p>Pitalito, Huila</p>
                  <p className="mt-1 font-medium normal-case">Variedad Castillo</p>
                  <p className="mt-1 font-medium">340 g / 12 oz</p>
                </div>
                <div>
                  <p>Acidez</p>
                  <div className="mt-3">
                    <AcidityDots />
                  </div>
                </div>
              </div>
              <p className="mt-10 font-condensed text-[clamp(4.5rem,11vw,8.5rem)] leading-[0.8]">NOBLE</p>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-8">
            <a
              href={INSTAGRAM_DM}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-ink px-6 py-3.5 font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <InstagramLogo size={18} weight="bold" />
              Pedir {grind.toLowerCase() === "grano" ? "en grano" : "molido"}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
