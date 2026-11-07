import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { img, wa } from "../data";
import { Bee, HexIcon } from "./Bits";

const ease = [0.16, 1, 0.3, 1] as const;

// Sello redondo que gira con un texto alrededor.
function Seal() {
  const text = "MIEL 100 % PURA · HECHO A MANO · CON AMOR · ";
  return (
    <div className="relative grid h-32 w-32 place-items-center rounded-full bg-crema shadow-[0_0_0_3px_var(--color-miel),0_18px_30px_-14px_rgb(74_42_20/0.6)] md:h-36 md:w-36">
      <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <path id="seal-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-cafe" style={{ fontSize: 8.6, fontWeight: 700, letterSpacing: 1.1 }}>
          <textPath href="#seal-circle">{text}</textPath>
        </text>
      </svg>
      <img src={img("abeja")} alt="" className="flap w-12" />
    </div>
  );
}

// Portada: el titular con "amor" en la cursiva del logo, y la foto del frasquito dentro de una celda de panal
// con un trozo de panal que gotea, flores y la abejita volando.
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const hexY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const combY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const flowersY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const flowersR = useTransform(scrollYProgress, [0, 1], [0, 14]);

  return (
    <section ref={ref} id="inicio" className="relative overflow-hidden pb-28 pt-28 md:pb-40 md:pt-32">
      <div aria-hidden className="panal absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,#000_10%,transparent_65%)]" />
      <div aria-hidden className="absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-polen/70 blur-3xl" />
      <div aria-hidden className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-rosa blur-3xl" />

      <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 px-4 md:grid-cols-[1.08fr_0.92fr] md:px-8">
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="script text-3xl text-fucsia md:text-4xl">
            Endulzamos tus momentos más especiales
          </motion.p>
          <h1 className="display mt-4 text-[clamp(3.3rem,8.4vw,7.6rem)]">
            <motion.span className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.9, ease }}>
              Frasquitos
            </motion.span>
            <motion.span className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease }}>
              de miel <span className="display-i text-miel-2">hechos</span>
            </motion.span>
            <motion.span className="mt-1 flex items-baseline gap-4" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.9, ease }}>
              <span className="display-i">con</span>
              <motion.span
                className="script text-[1.25em] text-fucsia [text-shadow:0_4px_0_#fbe3ec]"
                initial={{ clipPath: "inset(-30% 100% -40% -5%)" }}
                animate={{ clipPath: "inset(-30% -10% -40% -5%)" }}
                transition={{ delay: 0.9, duration: 1.1, ease: "easeInOut" }}
              >
                amor
              </motion.span>
            </motion.span>
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }} className="mt-7 max-w-lg text-lg leading-relaxed text-cafe/85 md:text-xl">
            Recordatorios para bodas, bautizos, quince años, baby showers, grados y eventos empresariales. Miel 100 % pura, etiqueta con tus nombres y colores, y envío a cualquier rincón de Colombia.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15, duration: 0.6 }} className="mt-9 flex flex-wrap items-center gap-4">
            <a href={wa()} target="_blank" rel="noreferrer" className="btn-fucsia rounded-full px-7 py-4 text-lg font-bold text-white transition-transform hover:-translate-y-1">
              Cotizar por WhatsApp
            </a>
            <a href="#etiqueta" className="group flex items-center gap-2 rounded-full border-2 border-cafe/15 bg-white/70 px-6 py-[14px] text-lg font-bold backdrop-blur transition-colors hover:border-miel">
              <HexIcon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" />
              Diseña tu etiqueta
            </a>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-6 text-cafe/70">
            <strong className="text-cafe">Cotiza desde un solo frasquito.</strong> Sin pedido mínimo.
          </motion.p>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <motion.img
            src={img("flores-ramo")}
            alt=""
            aria-hidden
            style={reduce ? undefined : { y: flowersY, rotate: flowersR }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1, ease }}
            className="absolute -right-10 -top-14 w-[48%] md:-right-16"
          />
          <motion.div style={reduce ? undefined : { y: hexY }} initial={{ opacity: 0, scale: 0.85, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.3, duration: 1.1, ease }} className="relative">
            <div aria-hidden className="hex btn-miel absolute -inset-[14px]" />
            <div aria-hidden className="hex absolute -inset-[6px] bg-crema" />
            <img src={img("frasquito-mano-flores")} alt="Mano sosteniendo un frasquito de miel con gypsophila, cucharita de madera y etiqueta con iniciales" className="hex relative aspect-[0.88] w-full object-cover object-[50%_40%]" />
          </motion.div>
          <motion.img
            src={img("panal-trozo")}
            alt=""
            aria-hidden
            style={reduce ? undefined : { y: combY }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1, ease }}
            className="absolute -bottom-12 -left-10 w-[52%] drop-shadow-[0_24px_24px_rgb(74_42_20/0.35)] md:-left-24"
          />
          <motion.div initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, type: "spring", stiffness: 180, damping: 14 }} className="absolute -right-2 bottom-[18%] md:-right-10">
            <Seal />
          </motion.div>
          <Bee className="-left-4 top-[8%]" size="w-16" />
        </div>
      </div>
    </section>
  );
}
