import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { INSTAGRAM_DM, img } from "../data";
import { CUADRO, CUADRO_BG } from "./cuadro-data";
import { Painted } from "./Painted";
import { useDepth, usePointer } from "./parallax";

const ease = [0.16, 1, 0.3, 1] as const;

function Layer({ d, color, i, px, py }: { d: string; color: string; i: number; px: ReturnType<typeof usePointer>["x"]; py: ReturnType<typeof usePointer>["y"] }) {
  const depth = 10 + i * 8;
  const x = useDepth(px, -depth);
  const y = useDepth(py, -depth);
  return (
    <motion.g style={{ x, y }}>
      <motion.path
        d={d}
        fill={color}
        fillRule="evenodd"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease }}
        style={{ transformOrigin: "350px 240px" }}
      />
    </motion.g>
  );
}

// Inicio B: el cuadro "La Dolce Vita" del local convertido en el fondo, con sus manchas reales
// que se mueven con el mouse en capas.
export function HeroCuadro() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { x, y } = usePointer(ref);
  const mx = useDepth(x, 40);
  const my = useDepth(y, 30);

  return (
    <section ref={ref} id="top" className="relative min-h-[100dvh] overflow-hidden" style={{ background: CUADRO_BG }}>
      <svg viewBox="0 0 700 480" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        {CUADRO.map((l, i) => (
          <Layer key={l.id} d={l.d} color={l.color} i={i} px={x} py={y} />
        ))}
      </svg>

      <motion.div style={reduce ? undefined : { x: mx, y: my }} className="absolute right-[4%] top-[8%] w-[34%] max-w-[300px] md:w-[22%]">
        <motion.div initial={{ rotate: -40, scale: 0 }} animate={{ rotate: -8, scale: 1 }} transition={{ type: "spring", stiffness: 90, damping: 12, delay: 0.6 }}>
          <Painted name="monstera" color="#5b2a73" className="w-full" />
        </motion.div>
      </motion.div>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1300px] flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          className="max-w-[12ch] font-display text-[clamp(3.6rem,10vw,9.5rem)] leading-[0.9] text-cream drop-shadow-[0_3px_0_rgb(91_42_115/0.35)] [&_em]:text-mustard"
        >
          ¿Y si cambiamos de <em>plan</em>?
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a href="#kits" className="rounded-full bg-forest px-7 py-4 text-[17px] font-semibold text-cream transition-transform hover:-translate-y-0.5">
            Ver kits
          </a>
          <a
            href={INSTAGRAM_DM}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-cream px-7 py-4 text-[17px] font-semibold text-forest transition-transform hover:-translate-y-0.5"
          >
            Reservar
          </a>
          <span className="ml-2 hidden text-lg text-cream/90 md:inline">Un café con los planes más creativos de Bogotá.</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0, rotate: 20 }}
        animate={{ scale: 1, rotate: 6 }}
        transition={{ type: "spring", stiffness: 110, damping: 13, delay: 0.9 }}
        className="absolute bottom-[34%] right-[6%] hidden aspect-square w-[22%] max-w-[300px] overflow-hidden rounded-full border-[8px] border-cream md:block"
      >
        <img src={img("osito")} alt="Osito de cerámica pintado de rosado" className="h-full w-full object-cover" />
      </motion.div>
    </section>
  );
}
