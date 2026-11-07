import { motion } from "motion/react";
import { SOCIAL, VERSE, VERSE_REF, WHATSAPP_LABEL, CONTACT_NAME, img, wa } from "../data";
import { Bee, Goteo } from "./Bits";

// Llamado final sobre miel y el pie de página.
export function Footer() {
  return (
    <>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_0%,#f7c64a,#e9a426_55%,#c9850e)] px-4 py-28 text-center md:py-36">
        <div aria-hidden className="panal-light absolute inset-0" />
        <img src={img("flores-ramo")} alt="" aria-hidden className="absolute -left-10 bottom-0 w-44 md:w-64" />
        <img src={img("flores-ramo")} alt="" aria-hidden className="absolute -right-10 top-0 w-40 -scale-x-100 md:w-56" />
        <Bee className="left-4 top-4 md:left-[18%] md:top-[18%]" size="w-12 md:w-16" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="display text-[clamp(2.6rem,6.5vw,5.4rem)] text-cafe">
            Haz que tu celebración se recuerde con <span className="script text-[1.15em] text-fucsia-2">amor</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-cafe/80">Cotiza tus frasquitos hoy, desde uno solo, y recibe tu prueba de diseño sin costo.</p>
          <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href={wa()} target="_blank" rel="noreferrer" className="btn-fucsia mt-9 inline-block rounded-full px-8 py-4 text-xl font-bold text-white">
            Cotizar por WhatsApp
          </motion.a>
        </div>
      </section>
      <Goteo />
      <footer className="relative bg-cafe-2 pb-10 pt-40 text-crema md:pt-56">
        <div aria-hidden className="panal-light absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-[1240px] gap-10 px-4 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-8">
          <div>
            <div className="flex items-center gap-3">
              <img src={img("logo")} alt="" className="h-16 w-16 rounded-full" />
              <span className="display text-3xl">
                Panal <span className="script text-[1.1em] text-ambar">de Amor</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-crema/75">Endulzamos tus momentos, creamos recuerdos que perduran en el corazón.</p>
            <p className="display-i mt-3 text-crema/60">
              {VERSE} · {VERSE_REF}
            </p>
            <div className="mt-5 flex gap-3">
              {[
                ["Instagram", SOCIAL.instagram],
                ["Facebook", SOCIAL.facebook],
                ["TikTok", SOCIAL.tiktok],
              ].map(([n, u]) => (
                <a key={n} href={u} target="_blank" rel="noreferrer" className="rounded-full px-4 py-2 text-sm font-bold ring-1 ring-polen/30 transition-colors hover:bg-ambar hover:text-cafe">
                  {n}
                </a>
              ))}
            </div>
          </div>
          {[
            { t: "Recordatorios", l: [["Diseña tu etiqueta", "#etiqueta"], ["Catálogo", "#catalogo"], ["Para bodas", "#catalogo"], ["Empresariales", "#catalogo"]] },
            { t: "Panal de Amor", l: [["Quiénes somos", "#nosotros"], ["Nuestra historia", "#historia"], ["Mujeres que endulzan", "#mujeres"], ["Ideas dulces", "#ideas"]] },
            { t: "Ayuda", l: [["Cómo pedir", "#como-pedir"], ["Envíos", "#envios"], ["Preguntas", "#preguntas"], ["Contacto", "#contacto"]] },
          ].map((c) => (
            <div key={c.t}>
              <p className="script text-2xl text-ambar">{c.t}</p>
              <ul className="mt-3 space-y-2">
                {c.l.map(([n, h]) => (
                  <li key={n}>
                    <a href={h} className="text-crema/80 transition-colors hover:text-ambar">
                      {n}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="relative mx-auto mt-14 max-w-[1240px] border-t border-polen/15 px-4 pt-6 text-sm text-crema/55 md:px-8">
          © {new Date().getFullYear()} Panal de Amor · {CONTACT_NAME} · WhatsApp {WHATSAPP_LABEL} · Envíos a todo Colombia
        </p>
      </footer>
    </>
  );
}
