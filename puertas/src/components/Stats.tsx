import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { brands, coverage, img, services } from "../data";

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {v}
      {suffix}
    </span>
  );
}

const STATS = [
  { to: 30, prefix: "+", label: "Años de experiencia" },
  { to: coverage.length, label: "Municipios del Meta" },
  { to: brands.length, label: "Marcas que manejamos" },
  { to: services.length, label: "Líneas de servicio" },
];

// "¿Por qué elegirnos?": foto de la valla real y cifras animadas sobre fondo azul de plano técnico.
export function Stats() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div aria-hidden className="blueprint absolute inset-0" />
      <div aria-hidden className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-teal/20 blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime">¿Por qué elegirnos?</p>
          <h2 className="mt-3 text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Pioneros en el Meta, <span className="brand-text">desde hace más de 30 años.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
            Soluciones seguras y eficientes que combinan funcionalidad y estilo. Un equipo técnico que conoce cada motor, cada marca y cada tipo de puerta.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
            {STATS.map((s) => (
              <div key={s.label} className="border-l-2 border-teal pl-5">
                <p className="text-5xl font-extrabold tracking-tight md:text-6xl">
                  <Counter to={s.to} prefix={s.prefix} />
                </p>
                <p className="mt-2 text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <motion.figure
          initial={{ clipPath: "inset(0 0 100% 0 round 28px)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0 round 28px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[28px]"
        >
          <img src={img("valla-puertas-automaticas-del-llano")} alt="Valla de Puertas Automáticas del Llano en el Meta" loading="lazy" className="aspect-square w-full object-cover" />
        </motion.figure>
      </div>
    </section>
  );
}
