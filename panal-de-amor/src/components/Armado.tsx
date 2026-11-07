import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { img } from "../data";
import { JAR_ASPECT, LABEL_POS, useLabelSize } from "./Jar";
import { Label } from "./Label";

const STAGES = [
  { n: "01", t: "Miel 100 % pura", d: "De apicultores colombianos, sin jarabes ni aditivos. Llenamos cada frasco nuevo, uno por uno." },
  { n: "02", t: "Tapa hermética", d: "La tapa dorada sella la miel y la conserva fresca hasta que llegue a tus invitados." },
  { n: "03", t: "Tela, lazo y flores", d: "Lino, un lazo de satín en el color de tu celebración y un ramito de gypsophila." },
  { n: "04", t: "Tu etiqueta", d: "Con sus nombres, la fecha y la frase que elijas. Te enviamos la prueba antes de producir." },
];

// "Así nace tu frasquito": sección fijada donde, al bajar, el frasco vacío se llena de miel,
// se tapa, se viste con tela y lazo, y al final se le pega la etiqueta.
export function Armado() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { ref: jarRef, size } = useLabelSize();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [stage, setStage] = useState(0);
  useMotionValueEvent(p, "change", (v) => setStage(v < 0.27 ? 0 : v < 0.47 ? 1 : v < 0.68 ? 2 : 3));

  // 1. La miel sube
  const fill = useTransform(p, [0.04, 0.26], [100, 6]);
  const fullClip = useTransform(fill, (v) => `inset(${v}% 0 0 0)`);
  const stream = useTransform(p, [0.02, 0.05, 0.24, 0.28], [0, 1, 1, 0]);
  const streamHeight = useTransform(fill, (v) => `calc(60vh + ${Math.max(8, v)}%)`);
  // 2. La tapa
  const lid = useTransform(p, [0.3, 0.42], [0, 1]);
  const lidY = useTransform(p, [0.3, 0.42], [-40, 0]);
  // 3. Tela y lazo: se cubre de arriba hacia abajo
  const dress = useTransform(p, [0.5, 0.64], [0, 100]);
  const dressClip = useTransform(dress, (v) => `inset(0 0 ${100 - v}% 0)`);
  // 4. La etiqueta se pega
  const label = useTransform(p, [0.72, 0.8], [0, 1]);
  const labelScale = useTransform(p, [0.72, 0.8], [1.6, 1]);
  const labelRot = useTransform(p, [0.72, 0.8], [-25, -4]);
  const glow = useTransform(p, [0.8, 0.92], [0, 1]);

  if (reduce) {
    return (
      <section className="bg-crema-2 py-20 text-center">
        <img src={img("jar-fucsia")} alt="Frasquito de miel con tela de lino y lazo fucsia" className="mx-auto w-64" />
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="Así nace tu frasquito" className="relative h-[460vh] bg-crema-2">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div aria-hidden className="panal absolute inset-0 opacity-70" />
        <motion.div aria-hidden className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ambar/50 blur-3xl md:left-[64%]" style={{ opacity: glow }} />

        <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-4 px-4 md:grid-cols-[1fr_1fr] md:gap-10 md:px-8">
          {/* Textos */}
          <div className="order-2 md:order-1">
            <p className="script hidden text-4xl text-fucsia md:block">Así nace tu frasquito</p>
            <ol className="mt-2 space-y-1 md:mt-6 md:space-y-3">
              {STAGES.map((s, i) => (
                <li key={s.n} className={`rounded-[24px] px-4 py-2.5 transition-all duration-500 md:px-6 md:py-4 ${stage === i ? "bg-white shadow-[0_20px_40px_-28px_rgb(74_42_20/0.7)]" : "opacity-40 max-md:hidden"}`}>
                  <div className="flex items-baseline gap-3">
                    <span className="display text-lg text-miel-2">{s.n}</span>
                    <h3 className="display text-2xl md:text-3xl">{s.t}</h3>
                  </div>
                  <p className={`overflow-hidden text-cafe/75 transition-all duration-500 ${stage === i ? "mt-1 max-h-24" : "max-h-0"}`}>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* El frasquito */}
          <div className="relative order-1 mx-auto w-[min(62vw,40svh)] md:order-2 md:w-[min(30vw,60svh)]">
            {/* Chorro de miel */}
            <motion.div aria-hidden className="absolute left-1/2 top-[-60vh] w-[3.5%] -translate-x-1/2 rounded-b-full bg-gradient-to-r from-miel-2 via-ambar to-miel" style={{ opacity: stream, height: streamHeight }} />
            <div ref={jarRef} className="relative" style={{ aspectRatio: JAR_ASPECT }}>
              <img src={img("jar-empty")} alt="" className="absolute inset-0 h-full w-full" />
              <motion.img src={img("jar-full")} alt="" className="absolute inset-0 h-full w-full" style={{ clipPath: fullClip }} />
              <motion.img src={img("jar-lid")} alt="" className="absolute inset-0 h-full w-full" style={{ opacity: lid, y: lidY }} />
              <motion.img src={img("jar-fucsia")} alt="Frasquito de miel con tapa, tela de lino y lazo fucsia" className="absolute inset-0 h-full w-full" style={{ clipPath: dressClip }} />
              <motion.div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ ...LABEL_POS, fontSize: size, opacity: label, scale: labelScale, rotate: labelRot }}>
                <Label names="Laura & Andrés" date="14 · 02 · 2027" phrase="Gracias por acompañarnos en este día tan especial" kind="boda" accent="#d63c7c" />
              </motion.div>
            </div>
            <motion.p style={{ opacity: glow }} className="script absolute -bottom-12 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-4xl text-fucsia md:block">
              ¡Listo para endulzar!
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
