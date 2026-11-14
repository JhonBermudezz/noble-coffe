import { motion } from "motion/react";
import { articles, img, wa, type Article } from "../data";
import { Link } from "../router";
import { Goteo, Heading, HexIcon } from "./Bits";
import { FloatingHearts } from "./Hearts";

function Card({ a, i, big = false }: { a: Article; i: number; big?: boolean }) {
  return (
    <motion.li initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className={big ? "md:col-span-2 md:row-span-2" : ""}>
      <Link to="ideas" sub={a.slug} className="group flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-white text-left shadow-[0_20px_40px_-32px_rgb(74_42_20/0.7)] transition-transform hover:-translate-y-1">
        <div className={`overflow-hidden ${big ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <img src={img(a.photo)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        </div>
        <div className={`flex flex-1 flex-col ${big ? "p-7 md:p-9" : "p-5"}`}>
          <span className="script text-2xl text-fucsia">{a.tag}</span>
          <h3 className={`display mt-1 leading-snug ${big ? "text-3xl md:text-4xl" : "text-xl"}`}>{a.title}</h3>
          {big && <p className="mt-3 text-lg leading-relaxed text-cafe/75">{a.intro}</p>}
          <span className="mt-auto pt-4 text-sm font-bold text-miel-2">
            {a.date} · {a.minutes} min de lectura →
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

// El blog: índice de artículos. Cada uno tiene su propia página (ideas/<slug>/).
export function Ideas({ bare = false }: { bare?: boolean }) {
  return (
    <section id="ideas" className="relative bg-crema-2 py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-4 md:px-8">
        {!bare && <Heading kicker="Ideas dulces" title="Inspiración para tu celebración" />}
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {articles.map((a, i) => (
            <Card key={a.id} a={a} i={i} big={i === 0} />
          ))}
        </ul>
      </div>
    </section>
  );
}

// Página de un artículo: portada con la foto, el texto, una tarjeta para cotizar y "Sigue leyendo".
export function Articulo({ slug }: { slug: string }) {
  const a = articles.find((x) => x.slug === slug) ?? articles[0];
  const others = articles.filter((x) => x.slug !== a.slug);
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-crema to-polen/60 pb-16 pt-32 md:pb-20 md:pt-40">
        <div aria-hidden className="panal absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,#000_10%,transparent_70%)]" />
        <FloatingHearts items={[{ left: "6%", top: "28%", size: "h-5 w-5", color: "#f7c64a" }, { left: "50%", top: "16%", size: "h-4 w-4", color: "#d63c7c" }]} />
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-8">
          <div>
            <nav aria-label="Miga de pan" className="text-sm font-semibold text-cafe/60">
              <Link to="inicio" className="hover:text-fucsia">
                Inicio
              </Link>
              <span className="mx-2">›</span>
              <Link to="ideas" className="hover:text-fucsia">
                Ideas
              </Link>
              <span className="mx-2">›</span>
              <span className="text-cafe">{a.tag}</span>
            </nav>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="script mt-6 text-3xl text-fucsia md:text-4xl">
              {a.tag}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="display mt-2 text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.98]">
              {a.title}
            </motion.h1>
            <p className="mt-5 text-sm font-semibold text-cafe/60">
              {a.date} · {a.minutes} min de lectura · Por Panal de Amor
            </p>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.92, rotate: 3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="relative mx-auto w-full max-w-[420px]">
            <div aria-hidden className="hex btn-miel absolute -inset-[12px]" />
            <img src={img(a.photo)} alt={a.title} className="hex relative aspect-[0.88] w-full object-cover" />
          </motion.div>
        </div>
      </section>
      <Goteo />

      <section className="relative bg-crema pb-24 pt-28 md:pb-32 md:pt-36">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-4 md:grid-cols-[1fr_320px] md:px-8">
          <article className="min-w-0">
            <p className="text-xl leading-relaxed md:text-2xl md:leading-relaxed">{a.intro}</p>
            {a.blocks.map((b) => (
              <motion.div key={b.h} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="mt-10">
                <h2 className="display flex items-center gap-3 text-2xl md:text-3xl">
                  <HexIcon className="h-6 w-6 shrink-0" />
                  {b.h}
                </h2>
                {b.p && <p className="mt-3 text-lg leading-relaxed text-cafe/85">{b.p}</p>}
                {b.list && (
                  <ul className="mt-4 space-y-3">
                    {b.list.map((li) => (
                      <li key={li} className="flex gap-3 text-lg text-cafe/85">
                        <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-miel" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </article>
          <aside className="md:sticky md:top-28 md:self-start">
            <div className="rounded-[30px] bg-polen p-7 text-center shadow-[0_24px_40px_-34px_rgb(74_42_20/0.7)]">
              <img src={img("jar-fucsia")} alt="" className="mx-auto w-28" />
              <p className="display mt-3 text-2xl">¿Te gustaría frasquitos así para tu evento?</p>
              <p className="mt-2 text-cafe/75">Escríbenos por WhatsApp y te ayudamos a crear el tuyo.</p>
              <a href={wa(`¡Hola, Panal de Amor! Leí "${a.title}" y quiero cotizar.`)} target="_blank" rel="noreferrer" className="btn-fucsia mt-5 block rounded-full px-5 py-3.5 font-bold text-white">
                Cotizar por WhatsApp
              </a>
              <Link to="personaliza" className="mt-3 block rounded-full bg-white px-5 py-3 font-bold">
                Diseñar mi etiqueta
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-crema-2 py-20 md:py-24">
        <div className="mx-auto max-w-[1240px] px-4 md:px-8">
          <Heading kicker="Sigue leyendo" title="Más ideas dulces" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {others.map((o, i) => (
              <Card key={o.id} a={o} i={i} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
