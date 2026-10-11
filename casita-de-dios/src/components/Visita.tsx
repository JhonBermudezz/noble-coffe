import { motion } from "motion/react";
import { ADDRESS, CITY, DELIVERY, HOURS, INSTAGRAM, MAPS_URL, WHATSAPP_LABEL, img, wa } from "../data";
import { House } from "./House";

// Los íconos son los de sus historias destacadas de Instagram.
const pending = <span className="italic text-cacao/50">Por confirmar</span>;

export function Visita() {
  const rows = [
    { icon: "icon-casa", label: "Dónde estamos", value: ADDRESS ? `${ADDRESS}${CITY ? `, ${CITY}` : ""}` : null, href: MAPS_URL },
    { icon: "icon-reloj", label: "Horario", value: HOURS, href: null },
    { icon: "icon-telefono", label: "WhatsApp", value: WHATSAPP_LABEL, href: wa("¡Hola, Casita de Dios!") },
    { icon: "icon-corazon", label: "Instagram", value: INSTAGRAM, href: INSTAGRAM ? `https://instagram.com/${INSTAGRAM.replace("@", "")}` : null },
    { icon: "icon-tienda", label: "Domicilios", value: DELIVERY, href: null },
  ];

  return (
    <section id="visita" className="relative bg-crema py-24 md:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-4 md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9 }} className="mx-auto w-full max-w-[420px]">
          <House src={img("mostrador-neon")} alt="El mostrador con el letrero iluminado de La Casita de Dios" className="aspect-[3/4] w-full" imgClass="object-[50%_70%]" />
        </motion.div>
        <div>
          <p className="script text-3xl text-rosa-2 md:text-4xl">Te esperamos</p>
          <h2 className="display text-[clamp(3rem,8vw,6rem)]">Ven a la casita</h2>
          <ul className="mt-8 space-y-4">
            {rows.map((r, i) => {
              const body = (
                <>
                  <img src={img(r.icon)} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover shadow-[0_0_0_3px_#fff] transition-transform duration-300 group-hover:-rotate-12" />
                  <span>
                    <span className="block text-sm font-bold uppercase text-cacao/60">{r.label}</span>
                    <span className="display text-2xl">{r.value ?? pending}</span>
                  </span>
                </>
              );
              return (
                <motion.li key={r.label} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  {r.href && r.value ? (
                    <a href={r.href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-[24px] bg-white p-3 pr-6 transition-transform hover:-translate-y-0.5">
                      {body}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 rounded-[24px] bg-white/70 p-3 pr-6">{body}</div>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
