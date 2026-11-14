import { motion } from "motion/react";
import { SOCIAL, VERSE, VERSE_REF, WHATSAPP_LABEL, CONTACT_NAME, img, wa } from "../data";
import { Link } from "../router";
import type { PageId } from "../data";
import { Bee, Goteo } from "./Bits";

const SOCIAL_LINKS = [
  { n: "Instagram", u: SOCIAL.instagram, d: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 2c-3.1 0-3.5 0-4.7.1-1 .1-1.6.2-1.9.3-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.1.4-.3.9-.3 1.9-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1 .2 1.6.3 1.9.2.5.4.8.8 1.2.4.4.7.6 1.2.8.4.1.9.3 1.9.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.2 1.9-.3.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.1-.4.3-.9.3-1.9.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.6-.3-1.9-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.1-.9-.3-1.9-.3-1.2-.1-1.6-.1-4.7-.1zm0 3.3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 7.4a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8zm5.7-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0z" },
  { n: "Facebook", u: SOCIAL.facebook, d: "M13.5 21.9v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.4v3.2h2.7v8h3.4z" },
  { n: "TikTok", u: SOCIAL.tiktok, d: "M16.6 2h-3.3v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .8.1V9a6.3 6.3 0 1 0 5.4 6.2V8.6a8 8 0 0 0 4.4 1.3V6.6a4.6 4.6 0 0 1-4.4-4.6z" },
];

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
      <footer className="relative bg-cafe-2 pb-10 pt-32 text-crema md:pt-40">
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
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map(({ n, u, d }) => (
                <a key={n} href={u} target="_blank" rel="noreferrer" aria-label={n} title={n} className="grid h-12 w-12 place-items-center rounded-full text-polen ring-1 ring-polen/30 transition-all hover:-translate-y-0.5 hover:bg-ambar hover:text-cafe">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          {(
            [
              { t: "Souvenirs", l: [["Todos los souvenirs", "souvenirs", ""], ["Diseña tu etiqueta", "personaliza", ""], ["Galería", "souvenirs", "galeria"], ["Para empresas", "souvenirs", "catalogo"]] },
              { t: "Panal de Amor", l: [["Quiénes somos", "nosotros", ""], ["Nuestro compromiso", "nosotros", "compromiso"], ["Nuestra colmena", "nosotros", "colmena"], ["Nuestra historia", "nosotros", "historia"], ["Mujeres que endulzan", "nosotros", "proposito"]] },
              { t: "Ayuda", l: [["Cómo pedir", "como-pedir", ""], ["Envíos", "como-pedir", "envios"], ["Preguntas", "como-pedir", "preguntas"], ["Contacto", "contacto", ""]] },
            ] as { t: string; l: [string, PageId, string][] }[]
          ).map((c) => (
            <div key={c.t}>
              <p className="script text-2xl text-ambar">{c.t}</p>
              <ul className="mt-3 space-y-2">
                {c.l.map(([n, to, hash]) => (
                  <li key={n}>
                    <Link to={to} hash={hash || undefined} className="text-crema/80 transition-colors hover:text-ambar">
                      {n}
                    </Link>
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
