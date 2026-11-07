import { motion } from "motion/react";
import { img } from "../data";

// Separador: una franja de miel que gotea sobre la sección siguiente.
export function Goteo({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  // El detector va en el contenedor: una imagen recortada del todo no cuenta como visible.
  return (
    <motion.div aria-hidden className={`pointer-events-none relative z-20 h-px ${className}`} initial="hide" whileInView="show" viewport={{ once: true, margin: "0px 0px -15% 0px" }}>
      <motion.img
        src={img("miel-goteo")}
        alt=""
        className={`absolute left-0 top-0 w-full ${flip ? "-scale-x-100" : ""}`}
        variants={{ hide: { clipPath: "inset(0% 0% 100% 0%)" }, show: { clipPath: "inset(0% 0% 0% 0%)" } }}
        transition={{ duration: 1.8, ease: [0.45, 0, 0.2, 1] }}
      />
    </motion.div>
  );
}

// Abejita que vuela en un ocho suave.
export function Bee({ className = "", size = "w-14", delay = 0 }: { className?: string; size?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      animate={{ x: [0, 40, 0, -40, 0], y: [0, -24, 0, -24, 0], rotate: [0, 10, 0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <img src={img("abeja")} alt="" className={`flap ${size}`} />
    </motion.div>
  );
}

// Título de sección: cursiva fucsia arriba y serif grande abajo.
export function Heading({ kicker, title, center = false, light = false, className = "" }: { kicker: string; title: React.ReactNode; center?: boolean; light?: boolean; className?: string }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`script text-3xl md:text-4xl ${light ? "text-ambar" : "text-fucsia"}`}
      >
        {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className={`display mt-2 text-[clamp(2.6rem,6vw,4.8rem)] ${light ? "text-crema" : ""}`}
      >
        {title}
      </motion.h2>
    </div>
  );
}

export function HexIcon({ className = "", fill = "#e9a426" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 20 22" className={className} aria-hidden>
      <path d="M10 1l8.5 5v10L10 21 1.5 16V6z" fill={fill} stroke="#fff" strokeWidth="1.6" />
    </svg>
  );
}
