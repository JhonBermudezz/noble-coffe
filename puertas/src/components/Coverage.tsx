import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { coverage, img } from "../data";

// Cobertura: el mapa del Meta con un pulso sobre Villavicencio y la lista de municipios.
export function Coverage() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div aria-hidden className="blueprint absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-[420px]">
          <img src={img("mapa-meta-colombia")} alt="Mapa de Colombia con el departamento del Meta resaltado" loading="lazy" className="w-full opacity-90" />
          {/* Pulso aproximado sobre el Meta */}
          <span className="absolute left-[44%] top-[53%]">
            <span className="absolute -inset-6 animate-ping rounded-full bg-lime/40" />
            <span className="relative block h-4 w-4 rounded-full bg-lime shadow-[0_0_20px_#a8cf38]" />
          </span>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime">Cobertura</p>
          <h2 className="mt-3 text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">Desde Villavicencio para todo el Meta.</h2>
          <p className="mt-5 max-w-lg text-lg text-white/70">Y proyectos en otras regiones de Colombia.</p>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {coverage.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${i === 0 ? "border-lime/60 bg-lime/10 text-lime" : "border-white/15 bg-white/5"}`}
              >
                <MapPin size={16} className={i === 0 ? "text-lime" : "text-teal"} /> {c}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
