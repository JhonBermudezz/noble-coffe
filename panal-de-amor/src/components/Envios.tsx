import { motion } from "motion/react";
import { cities, img } from "../data";
import { Heading } from "./Bits";

const FACTS = [
  { t: "2 a 5 días hábiles", d: "Según la ciudad de destino." },
  { t: "Empaque antigolpes", d: "Relleno protector especial para vidrio." },
  { t: "Guía por WhatsApp", d: "Sigues tu pedido en todo momento." },
];

// Envíos a todo Colombia: sección oscura, con las ciudades como etiquetas kraft que salen del taller.
export function Envios() {
  return (
    <section id="envios" className="relative overflow-hidden bg-cafe py-24 text-crema md:py-32">
      <div aria-hidden className="panal-light absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div>
          <Heading kicker="Envíos" title="Enviamos a todo Colombia" light />
          <p className="mt-5 max-w-xl text-lg text-crema/75">Tu pedido viaja protegido, con número de guía para seguirlo en todo momento.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {FACTS.map((f, i) => (
              <motion.li key={f.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-[24px] bg-white/5 p-5 ring-1 ring-polen/15">
                <span className="display text-xl text-ambar">{f.t}</span>
                <p className="mt-1 text-sm text-crema/70">{f.d}</p>
              </motion.li>
            ))}
          </ul>
          <ul className="mt-10 flex flex-wrap gap-2">
            {cities.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: i % 2 ? 2 : -2 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 220, damping: 14 }}
                className="kraft rounded-md px-3 py-1.5 font-bold text-cafe shadow-[0_6px_10px_-6px_rgb(0_0_0/0.6)]"
              >
                {c}
              </motion.li>
            ))}
            <li className="px-2 py-1.5 font-bold text-ambar">y más de 1.000 municipios</li>
          </ul>
        </div>
        <motion.div initial={{ opacity: 0, rotate: -6, y: 40 }} whileInView={{ opacity: 1, rotate: -3, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9 }} className="relative mx-auto w-full max-w-[440px]">
          <div className="overflow-hidden rounded-[32px] shadow-[0_0_0_8px_#f7ecd9,0_40px_60px_-30px_rgb(0_0_0/0.8)]">
            <img src={img("frasquito-corporativo")} alt="Frasquitos con tapa negra y etiqueta kraft listos para enviar" loading="lazy" className="aspect-square w-full object-cover" />
          </div>
          <span className="display absolute -right-4 -top-5 rotate-[8deg] rounded-md border-[3px] border-fucsia bg-crema px-4 py-1.5 text-xl font-bold uppercase text-fucsia">Frágil · Con amor</span>
        </motion.div>
      </div>
    </section>
  );
}
