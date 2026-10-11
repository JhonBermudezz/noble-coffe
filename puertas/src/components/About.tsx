import { motion } from "motion/react";
import { Award, Cpu, HeartHandshake } from "lucide-react";
import { img } from "../data";

const VALUES = [
  { icon: Cpu, text: "Experto en electrónica: diagnóstico preciso de fallas eléctricas, electrónicas y mecánicas." },
  { icon: Award, text: "Equipos de marcas reconocidas y trabajo con garantía." },
  { icon: HeartHandshake, text: "Atención cercana: respondemos con eficacia y profesionalismo." },
];

export function About() {
  return (
    <section id="nosotros" className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1fr_1.1fr]">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <img src={img("carlos-guarama-talanquera-villavicencio")} alt="Carlos Javier Guarama Otero junto a una talanquera instalada" loading="lazy" className="aspect-[4/3.6] w-full rounded-[28px] object-cover" />
        <div className="absolute -bottom-6 right-6 rounded-2xl border border-line bg-white px-6 py-4 shadow-xl">
          <p className="text-4xl font-extrabold tracking-tight">
            <span className="brand-text">+30</span>
          </p>
          <p className="text-sm font-semibold text-steel">años de oficio</p>
        </div>
      </motion.div>
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal">Nosotros</p>
        <h2 className="mt-3 text-[clamp(2.2rem,4.5vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">Carlos Javier Guarama Otero</h2>
        <p className="mt-1 font-semibold text-steel">Fundador · Técnico experto en electrónica</p>
        <blockquote className="mt-6 border-l-4 border-teal pl-5 text-lg leading-relaxed text-ink/85">
          “Mi principal objetivo es proporcionar un servicio técnico eficiente que permita detectar y solucionar cualquier falla. Me enorgullece brindar soluciones confiables y de alta calidad a mis clientes.”
        </blockquote>
        <ul className="mt-8 space-y-4">
          {VALUES.map((v) => (
            <li key={v.text} className="flex gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mist text-blue">
                <v.icon size={20} strokeWidth={1.8} />
              </span>
              <span className="pt-2 text-steel">{v.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
