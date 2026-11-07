import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { VERSE, VERSE_REF, img, labelEvents, ribbons, wa, type EventKind } from "../data";
import { Heading } from "./Bits";
import { JAR_ASPECT, LABEL_POS, useLabelSize } from "./Jar";
import { Label } from "./Label";

const COMMON = ["Que el amor sea tan dulce como la miel", "Dulce es compartir este día contigo", `${VERSE.replace(/[“”]/g, "")}. ${VERSE_REF}`];

function formatDate(v: string) {
  if (!v) return "";
  const [y, m, d] = v.split("-");
  return `${d} · ${m} · ${y}`;
}

// "Diseña tu etiqueta": se escriben los nombres, se elige el evento, la frase y el color del lazo,
// y el frasquito se actualiza en vivo. El diseño se envía por WhatsApp para cotizar.
export function Etiqueta() {
  const [kind, setKind] = useState<EventKind>("boda");
  const preset = labelEvents.find((e) => e.id === kind)!;
  const [names, setNames] = useState(preset.names);
  const [date, setDate] = useState("2027-02-14");
  const [phrase, setPhrase] = useState(preset.phrase);
  const [ribbon, setRibbon] = useState(preset.ribbon);
  const [bump, setBump] = useState(0);
  const { ref, size } = useLabelSize();
  const r = ribbons.find((x) => x.id === ribbon)!;

  const pickEvent = (k: EventKind) => {
    const e = labelEvents.find((x) => x.id === k)!;
    setKind(k);
    setNames(e.names);
    setPhrase(e.phrase);
    setRibbon(e.ribbon);
    setBump((b) => b + 1);
  };

  const phrases = [preset.phrase, ...COMMON.filter((c) => c !== preset.phrase)];
  const msg = `¡Hola, Panal de Amor! Diseñé mi etiqueta en su página y quiero cotizarla:\n• Evento: ${preset.name}\n• Nombres: ${names}\n• Fecha: ${formatDate(date) || "por definir"}\n• Frase: ${phrase}\n• Color del lazo: ${r.name}\n¿Me ayudan con la cotización?`;

  return (
    <section id="etiqueta" className="relative overflow-hidden bg-gradient-to-b from-crema to-polen/70 py-24 md:py-32">
      <img src={img("flores-ramo")} alt="" aria-hidden className="absolute -left-16 top-24 hidden w-56 -rotate-12 opacity-90 lg:block" />
      <div className="relative mx-auto max-w-[1240px] px-4 md:px-8">
        <Heading kicker="Hazlo tuyo" title={<>Diseña tu etiqueta</>} center />
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-cafe/75">Escribe los nombres, elige la frase y el color del lazo. Así se vería tu frasquito, y con un toque nos lo mandas para cotizar.</p>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Vista previa */}
          <div className="relative mx-auto w-[min(78vw,400px)]">
            <div aria-hidden className="absolute inset-x-[8%] bottom-[2%] h-[6%] rounded-[50%] bg-cafe/25 blur-md" />
            <div ref={ref} className="relative" style={{ aspectRatio: JAR_ASPECT }}>
              <AnimatePresence initial={false}>
                <motion.img
                  key={ribbon}
                  src={img(`jar-${ribbon}`)}
                  alt={`Frasquito de miel con lazo ${r.name.toLowerCase()}`}
                  className="absolute inset-0 h-full w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              <motion.div
                key={bump}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ ...LABEL_POS, fontSize: size }}
                initial={{ scale: 1.25, rotate: -14, opacity: 0 }}
                animate={{ scale: 1, rotate: -4, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
              >
                <Label names={names} date={formatDate(date)} phrase={phrase} kind={kind} accent={r.color} />
              </motion.div>
            </div>
          </div>

          {/* Controles */}
          <div className="rounded-[36px] bg-white/85 p-5 shadow-[0_30px_60px_-40px_rgb(74_42_20/0.7)] backdrop-blur md:p-8">
            <fieldset>
              <legend className="display text-xl">1. ¿Qué celebras?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {labelEvents.map((e) => (
                  <button key={e.id} type="button" onClick={() => pickEvent(e.id)} aria-pressed={kind === e.id} className="relative rounded-full px-4 py-2.5 font-bold">
                    {kind === e.id && <motion.span layoutId="ev-pill" className="btn-miel absolute inset-0 rounded-full" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                    <span className={`relative ${kind === e.id ? "" : "text-cafe/70"}`}>{e.name}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="display text-xl">2. Nombres</span>
                <input
                  value={names}
                  maxLength={26}
                  onChange={(e) => setNames(e.target.value)}
                  className="mt-2 w-full rounded-2xl border-2 border-cafe/10 bg-crema px-4 py-3 text-lg outline-none transition-colors focus:border-miel"
                  placeholder="Laura & Andrés"
                />
              </label>
              <label className="block">
                <span className="display text-xl">3. Fecha</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full rounded-2xl border-2 border-cafe/10 bg-crema px-4 py-3 text-lg outline-none transition-colors focus:border-miel" />
              </label>
            </div>

            <fieldset className="mt-7">
              <legend className="display text-xl">4. La frase</legend>
              <div className="mt-3 space-y-2">
                {phrases.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setPhrase(t)}
                    aria-pressed={phrase === t}
                    className={`block w-full rounded-2xl border-2 px-4 py-2.5 text-left transition-colors ${phrase === t ? "border-miel bg-polen/60" : "border-cafe/10 hover:border-cafe/25"}`}
                  >
                    <span className="display-i">“{t}”</span>
                  </button>
                ))}
                <input
                  maxLength={70}
                  placeholder="O escribe tu propia frase…"
                  onChange={(e) => e.target.value && setPhrase(e.target.value)}
                  className="w-full rounded-2xl border-2 border-dashed border-cafe/20 bg-transparent px-4 py-2.5 outline-none focus:border-miel"
                />
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="display text-xl">5. Color del lazo</legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {ribbons.map((x) => (
                  <button key={x.id} type="button" onClick={() => setRibbon(x.id)} aria-pressed={ribbon === x.id} aria-label={x.name} className="group flex flex-col items-center gap-1">
                    <span className="relative grid h-12 w-12 place-items-center">
                      {ribbon === x.id && <motion.span layoutId="ribbon-ring" className="absolute inset-0 rounded-full border-[3px] border-cafe" />}
                      <span className="h-9 w-9 rounded-full shadow-[inset_0_-3px_0_rgb(0_0_0/0.15),inset_0_2px_0_rgb(255_255_255/0.5)] transition-transform group-hover:scale-110" style={{ background: x.color }} />
                    </span>
                    <span className="text-xs font-semibold text-cafe/70">{x.name}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <a href={wa(msg)} target="_blank" rel="noreferrer" className="btn-fucsia mt-8 block rounded-full px-6 py-4 text-center text-lg font-bold text-white transition-transform hover:-translate-y-0.5">
              Cotizar este diseño por WhatsApp
            </a>
            <p className="mt-3 text-center text-sm text-cafe/60">Es una vista previa: nuestro equipo te envía la prueba final sin costo.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
