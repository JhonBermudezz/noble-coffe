import { motion } from "motion/react";
import { useState } from "react";
import { CONTACT_NAME, HOURS, WHATSAPP_LABEL, img, wa } from "../data";
import { Heading } from "./Bits";

const TYPES = ["Boda", "Bautizo", "Primera comunión", "Quince años", "Cumpleaños", "Baby shower", "Grado", "Evento empresarial", "Regalo individual", "Otro"];

const field = "mt-2 w-full rounded-2xl border-2 border-cafe/10 bg-crema px-4 py-3 text-lg outline-none transition-colors focus:border-miel";

// Contacto: el formulario arma el mensaje y lo abre en WhatsApp.
export function Contacto() {
  const [f, setF] = useState({ name: "", phone: "", type: "", qty: "", date: "", city: "", msg: "" });
  const [tried, setTried] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const ok = f.name.trim() && f.type;

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!ok) return;
    const lines = [
      `¡Hola, Panal de Amor! Soy ${f.name}.`,
      `Quiero cotizar frasquitos para: ${f.type}.`,
      f.qty && `Cantidad aproximada: ${f.qty}`,
      f.date && `Fecha del evento: ${f.date}`,
      f.city && `Ciudad de envío: ${f.city}`,
      f.phone && `Mi celular: ${f.phone}`,
      f.msg && `\n${f.msg}`,
    ].filter(Boolean);
    window.open(wa(lines.join("\n")), "_blank", "noopener");
  };

  return (
    <section id="contacto" className="relative overflow-hidden bg-rosa/60 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-4 md:grid-cols-[0.85fr_1.15fr] md:px-8">
        <div>
          <Heading kicker="Contacto" title="Cuéntanos de tu evento" />
          <p className="mt-5 text-lg text-cafe/75">Llena el formulario y te llevamos a WhatsApp con tu solicitud lista. Te atiende {CONTACT_NAME} de lunes a sábado.</p>
          <div className="mt-8 space-y-3">
            <a href={wa()} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-[24px] bg-white p-4 transition-transform hover:-translate-y-0.5">
              <img src={img("logo")} alt="" className="h-14 w-14 rounded-full" />
              <span>
                <span className="display block text-2xl">{WHATSAPP_LABEL}</span>
                <span className="text-cafe/70">{CONTACT_NAME} · WhatsApp y llamadas</span>
              </span>
            </a>
            <div className="rounded-[24px] bg-white/70 p-4">
              <span className="display block text-xl">{HOURS}</span>
              <span className="text-cafe/70">Envíos a todo Colombia desde nuestro taller.</span>
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={send}
          noValidate
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative rounded-[36px] bg-white p-6 shadow-[0_30px_60px_-40px_rgb(74_42_20/0.7)] md:p-9"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="font-bold">Nombre *</span>
              <input value={f.name} onChange={set("name")} className={`${field} ${tried && !f.name.trim() ? "border-fucsia" : ""}`} autoComplete="name" />
              {tried && !f.name.trim() && <span className="mt-1 block text-sm text-fucsia-2">Escribe tu nombre.</span>}
            </label>
            <label className="block">
              <span className="font-bold">Celular</span>
              <input value={f.phone} onChange={set("phone")} inputMode="tel" className={field} autoComplete="tel" />
            </label>
            <label className="block">
              <span className="font-bold">Tipo de evento *</span>
              <select value={f.type} onChange={set("type")} className={`${field} ${tried && !f.type ? "border-fucsia" : ""}`}>
                <option value="">Selecciona</option>
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              {tried && !f.type && <span className="mt-1 block text-sm text-fucsia-2">Elige el tipo de evento.</span>}
            </label>
            <label className="block">
              <span className="font-bold">Cantidad aproximada</span>
              <input value={f.qty} onChange={set("qty")} inputMode="numeric" className={field} />
            </label>
            <label className="block">
              <span className="font-bold">Fecha del evento</span>
              <input type="date" value={f.date} onChange={set("date")} className={field} />
            </label>
            <label className="block">
              <span className="font-bold">Ciudad de envío</span>
              <input value={f.city} onChange={set("city")} className={field} />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="font-bold">Mensaje</span>
            <textarea value={f.msg} onChange={set("msg")} rows={4} className={field} placeholder="Colores, frase, ideas…" />
          </label>
          <button type="submit" className="btn-fucsia mt-6 w-full rounded-full px-6 py-4 text-lg font-bold text-white transition-transform hover:-translate-y-0.5">
            Enviar por WhatsApp
          </button>
          <p className="mt-3 text-center text-sm text-cafe/60">Usamos tus datos solo para responder tu cotización.</p>
        </motion.form>
      </div>
    </section>
  );
}
