import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, MessageCircle, ShieldCheck, Star } from "lucide-react";
import { useRef } from "react";
import { WA, asset } from "../data";

const ease = [0.16, 1, 0.3, 1] as const;

// Portada: video real de una cortina enrollable. Al cargar, dos hojas se abren como un portón corredizo.
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-ink text-white">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={asset("video/hero-cortina-enrollable-poster.webp")}
        >
          <source src={asset("video/hero-cortina-enrollable.webm")} type="video/webm" />
          <source src={asset("video/hero-cortina-enrollable.mp4")} type="video/mp4" />
        </video>
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(100deg,rgb(10_27_46/0.95)_0%,rgb(10_27_46/0.8)_45%,rgb(10_27_46/0.25)_100%)]" />
      <div aria-hidden className="blueprint absolute inset-0" />

      {/* Portón que se abre al entrar */}
      {!reduce && (
        <>
          {[0, 1].map((side) => (
            <motion.div
              key={side}
              aria-hidden
              className={`absolute inset-y-0 z-20 w-1/2 bg-ink ${side ? "right-0" : "left-0"}`}
              style={{ backgroundImage: "repeating-linear-gradient(90deg, rgb(255 255 255 / 0.06) 0 2px, transparent 2px 28px)" }}
              initial={{ x: 0 }}
              animate={{ x: side ? "101%" : "-101%" }}
              transition={{ duration: 1.2, delay: 0.35, ease: [0.7, 0, 0.2, 1] }}
            >
              <div className={`absolute top-1/2 h-24 w-1.5 -translate-y-1/2 rounded-full bg-teal ${side ? "left-6" : "right-6"}`} />
            </motion.div>
          ))}
        </>
      )}

      <motion.div style={reduce ? undefined : { opacity: fade }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1240px] flex-col justify-center px-5 pb-40 pt-28 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur"
        >
          <ShieldCheck size={16} className="text-lime" /> Más de 30 años en Villavicencio y el Meta
        </motion.p>
        <h1 className="mt-6 max-w-[16ch] text-[clamp(2.6rem,6vw,5.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
          {["Puertas automáticas", "que abren seguro,", "todos los días."].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={`block ${i === 2 ? "brand-text" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 1.15 + i * 0.1, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }} className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
          Instalación, automatización y mantenimiento de puertas corredizas, abatibles, de garaje, cortinas, talanqueras y control de acceso para hogares, conjuntos y empresas.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.75, duration: 0.7, ease }} className="mt-9 flex flex-wrap gap-3">
          <a href={WA()} target="_blank" rel="noreferrer" className="brand-gradient group inline-flex items-center gap-2 rounded-full px-7 py-4 font-bold text-white shadow-xl shadow-teal/30 transition-transform hover:-translate-y-0.5">
            <MessageCircle size={18} /> Cotiza por WhatsApp
          </a>
          <a href="#proyectos" className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 font-bold text-white transition-colors hover:bg-white hover:text-ink">
            Ver proyectos <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="mt-10 flex items-center gap-3 text-sm text-white/70">
          <span className="flex text-lime">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </span>
          Distribuidores de Nice, BFT, FAAC, CAME, LiftMaster y más
        </motion.div>
      </motion.div>
    </section>
  );
}
