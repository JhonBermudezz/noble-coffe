import { motion } from "motion/react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Share2 } from "lucide-react";
import { CITY, EMAIL, FACEBOOK, HOURS, PHONE, PHONE_RAW, WA, asset } from "../data";

const ITEMS = [
  { icon: Phone, label: "Llámanos", value: PHONE, href: `tel:+${PHONE_RAW}` },
  { icon: Mail, label: "Escríbenos", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: Clock, label: "Horario", value: HOURS },
  { icon: MapPin, label: "Ubicación", value: CITY },
];

export function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-ink text-white">
      <video className="absolute inset-0 h-full w-full object-cover opacity-25" autoPlay muted loop playsInline poster={asset("video/hero-cortina-enrollable-poster.webp")}>
        <source src={asset("video/hero-cortina-enrollable.webm")} type="video/webm" />
      </video>
      <div aria-hidden className="blueprint absolute inset-0" />
      <div className="relative mx-auto max-w-[1240px] px-5 py-24 md:px-8 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime">Contáctanos</p>
          <h2 className="mt-3 text-[clamp(2.4rem,5.5vw,4.4rem)] font-extrabold leading-[1.03] tracking-[-0.03em]">
            Abre la puerta a la <span className="brand-text">comodidad.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-white/70">Cuéntanos qué puerta tienes o necesitas y te enviamos una cotización sin compromiso.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={WA()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-wa px-7 py-4 font-bold text-white shadow-xl shadow-wa/30 transition-transform hover:-translate-y-0.5">
              <MessageCircle size={18} /> Escribir por WhatsApp
            </a>
            <a href={`tel:+${PHONE_RAW}`} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 font-bold transition-colors hover:bg-white hover:text-ink">
              <Phone size={18} /> Llamar ahora
            </a>
          </div>
        </motion.div>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it) => {
            const body = (
              <>
                <it.icon size={22} className="text-teal" strokeWidth={1.8} />
                <p className="mt-4 text-sm text-white/55">{it.label}</p>
                <p className="mt-1 break-words font-bold">{it.value}</p>
              </>
            );
            return it.href ? (
              <a key={it.label} href={it.href} className="rounded-2xl border border-white/12 bg-white/5 p-6 backdrop-blur transition-colors hover:border-teal/60">
                {body}
              </a>
            ) : (
              <div key={it.label} className="rounded-2xl border border-white/12 bg-white/5 p-6 backdrop-blur">
                {body}
              </div>
            );
          })}
        </div>
        <a href={FACEBOOK} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-white/70 hover:text-white">
          <Share2 size={18} /> Síguenos en Facebook
        </a>
      </div>
    </section>
  );
}
