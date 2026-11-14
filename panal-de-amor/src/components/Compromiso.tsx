import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { compromiso, img, wa } from "../data";
import { Link } from "../router";
import { Bee, Goteo, HexIcon } from "./Bits";
import { FloatingHearts, Heart } from "./Hearts";

const ease = [0.16, 1, 0.3, 1] as const;

// Banner horizontal: paisaje andino de Boyacá con el título y el texto de la marca encima.
export function CompromisoBanner({ as = "hero" }: { as?: "hero" | "section" }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const hero = as === "hero";
  const Title = hero ? motion.h1 : motion.h2;
  return (
    <>
      <section ref={ref} className={`relative overflow-hidden ${hero ? "min-h-[88svh] pt-28" : "min-h-[78svh]"} flex items-end`}>
        <motion.img
          src={img("andes-banner")}
          alt="Paisaje de los Andes de Boyacá con colinas verdes, flores silvestres y colmenas de madera"
          className="absolute inset-0 h-[118%] w-full object-cover"
          style={reduce ? undefined : { y }}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-cafe-2/85 via-cafe-2/45 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cafe-2/70 to-transparent" />
        <div className="relative mx-auto w-full max-w-[1240px] px-4 pb-20 md:px-8 md:pb-28">
          {hero && (
            <nav aria-label="Miga de pan" className="text-sm font-semibold text-crema/70">
              <Link to="inicio" className="hover:text-ambar">
                Inicio
              </Link>
              <span className="mx-2">›</span>
              <span className="text-crema">Nosotros</span>
            </nav>
          )}
          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 inline-flex items-center gap-2 rounded-full bg-crema/15 px-4 py-2 text-sm font-bold text-polen ring-1 ring-polen/30 backdrop-blur">
            <HexIcon className="h-4 w-4" fill="#f7c64a" />
            Miel de los Andes · Paipa, Boyacá
          </motion.p>
          <Title
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="display mt-5 max-w-3xl text-[clamp(2.6rem,6.2vw,5.4rem)] leading-[0.98] text-crema [text-shadow:0_4px_30px_rgb(0_0_0/0.35)]"
          >
            La dulzura de la naturaleza, hecha con <span className="script text-[1.12em] text-ambar">amor</span>
          </Title>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }} className="mt-6 max-w-xl text-lg leading-relaxed text-crema/90 md:text-xl">
            {compromiso.banner.text}
          </motion.p>
          {!hero && (
            <Link to="nosotros" className="btn-miel mt-8 inline-block rounded-full px-7 py-4 text-lg font-bold text-cafe transition-transform hover:-translate-y-1">
              Conoce nuestro compromiso
            </Link>
          )}
        </div>
      </section>
      {hero && <Goteo />}
    </>
  );
}

// Nuestro compromiso con la vida y la naturaleza.
export function Vida() {
  const v = compromiso.vida;
  return (
    <section id="compromiso" className="relative overflow-hidden bg-crema pb-24 pt-32 md:pb-32 md:pt-40">
      <div aria-hidden className="panal absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_80%_40%,#000_10%,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-4 md:grid-cols-2 md:px-8">
        <div>
          <p className="script text-3xl text-fucsia md:text-4xl">Cuidar la vida</p>
          <h2 className="display mt-2 text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[0.98]">{v.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-cafe/85 md:text-xl">{v.text}</p>
          <blockquote className="mt-8 rounded-[28px] border-l-4 border-miel bg-polen/60 p-6">
            <p className="display-i text-xl leading-snug text-cafe md:text-2xl">{v.note}</p>
          </blockquote>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease }} className="relative mx-auto w-full max-w-[540px]">
          <div aria-hidden className="hex btn-miel absolute -inset-[12px]" />
          <img src={img("abejas-flores")} alt="Abejas trabajando entre flores silvestres" loading="lazy" className="hex relative aspect-[0.88] w-full object-cover" />
          <Bee className="-left-6 top-[12%]" size="w-16" />
        </motion.div>
      </div>
      <ul className="relative mx-auto mt-16 grid max-w-[1240px] gap-5 px-4 md:grid-cols-3 md:px-8">
        {v.pillars.map((p, i) => (
          <motion.li
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7, ease }}
            className="group rounded-[30px] bg-white p-7 shadow-[0_24px_40px_-34px_rgb(74_42_20/0.7)]"
          >
            <span className="hex btn-miel display grid h-14 w-12 place-items-center text-xl text-cafe transition-transform duration-500 group-hover:rotate-[30deg]">{i + 1}</span>
            <h3 className="display mt-4 text-2xl">{p.title}</h3>
            <p className="mt-2 leading-relaxed text-cafe/75">{p.text}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

// Hecho a mano, con propósito y corazón.
export function Manos() {
  const m = compromiso.manos;
  return (
    <section id="proposito" className="relative overflow-hidden bg-crema-2 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-4 md:grid-cols-[1.05fr_0.95fr] md:px-8">
        <div className="relative mx-auto grid w-full max-w-[560px] grid-cols-[1.2fr_0.8fr] items-end gap-4">
          <motion.img
            src={img("manos-frasquitos")}
            alt="Manos amarrando un lazo de satín a un frasquito de miel en un taller casero"
            loading="lazy"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="aspect-[0.8] w-full rounded-t-full rounded-b-[32px] object-cover shadow-[0_0_0_6px_#fff,0_30px_50px_-30px_rgb(74_42_20/0.7)]"
          />
          <motion.img
            src={img("mujeres-cabeza-de-familia")}
            alt="Mamá preparando frasquitos de miel en casa junto a su hija"
            loading="lazy"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8, ease }}
            className="mb-10 aspect-square w-full rounded-full object-cover shadow-[0_0_0_6px_#fff,0_30px_50px_-30px_rgb(74_42_20/0.7)]"
          />
          <Heart className="absolute -top-3 right-[30%] h-8 w-8 -rotate-12" color="#d63c7c" />
        </div>
        <div>
          <p className="script text-3xl text-fucsia md:text-4xl">Propósito</p>
          <h2 className="display mt-2 text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[0.98]">
            Hecho a mano, con propósito y <span className="script text-[1.1em] text-fucsia">corazón</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-cafe/85 md:text-xl">{m.text}</p>
          <p className="mt-4 text-lg leading-relaxed text-cafe/85 md:text-xl">{m.social}</p>
          <div className="mt-8 rounded-[28px] bg-white/80 p-6">
            <p className="script text-3xl text-fucsia">Mujeres que endulzan</p>
            <p className="mt-2 text-cafe/80">¿Eres mamá cabeza de familia y quieres trabajar desde casa? Te acompañamos con el curso de manipulación de alimentos y aprendes el oficio paso a paso.</p>
            <a href={wa("¡Hola, Panal de Amor! Quiero postularme al programa Mujeres que endulzan.")} target="_blank" rel="noreferrer" className="btn-fucsia mt-5 inline-block rounded-full px-6 py-3.5 font-bold text-white transition-transform hover:-translate-y-0.5">
              Quiero postularme
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Elegir un detalle también es elegir lo que apoyamos.
export function Eleccion() {
  const e = compromiso.eleccion;
  return (
    <section className="relative overflow-hidden bg-cafe py-24 text-crema md:py-32">
      <div aria-hidden className="panal-light absolute inset-0" />
      <img src={img("miel-panales")} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="relative mx-auto max-w-[1240px] px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="script text-3xl text-ambar md:text-4xl">Lo que representamos</p>
          <h2 className="display mt-2 text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[0.98]">{e.title}</h2>
          <p className="mt-6 text-lg text-crema/80 md:text-xl">{e.text}</p>
        </div>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {e.items.map((it, i) => (
            <motion.li
              key={it.title}
              initial={{ opacity: 0, y: 40, rotate: i === 1 ? 0 : i ? 4 : -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 130, damping: 15 }}
              className="flex flex-col items-center text-center"
            >
              <div className="hex grid aspect-[0.88] w-40 place-items-center bg-gradient-to-b from-crema to-polen">
                <img src={img(["ico-corazon", "ico-hoja", "ico-trebol"][i])} alt="" className="h-24 w-24 transition-transform duration-500 hover:scale-110" />
              </div>
              <h3 className="display mt-6 text-2xl text-polen">{it.title}</h3>
              <p className="mt-2 max-w-xs text-crema/75">{it.text}</p>
            </motion.li>
          ))}
        </ul>
        <div className="mt-16 text-center">
          <p className="script text-4xl text-ambar md:text-5xl">{compromiso.firma}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="souvenirs" className="btn-miel rounded-full px-7 py-4 text-lg font-bold text-cafe transition-transform hover:-translate-y-1">
              Ver los souvenirs
            </Link>
            <Link to="personaliza" className="rounded-full px-7 py-4 text-lg font-bold text-crema ring-2 ring-polen/40 transition-colors hover:bg-crema/10">
              Diseñar mi etiqueta
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Una galería de los momentos de la miel: paisaje, abejas, panales y manos.
export function Mosaico() {
  const fotos = [
    { src: "andes-banner", alt: "Paisaje andino de Boyacá", cls: "col-span-2 aspect-[16/9]" },
    { src: "abejas-flores", alt: "Abejas entre flores", cls: "aspect-square md:aspect-[8/9]" },
    { src: "miel-panales", alt: "Miel natural y panales", cls: "aspect-square md:aspect-[8/9]" },
    { src: "manos-frasquitos", alt: "Manos elaborando frasquitos", cls: "col-span-2 aspect-[16/9]" },
  ];
  return (
    <section className="relative bg-crema py-20 md:py-28">
      <FloatingHearts items={[{ left: "6%", top: "10%", size: "h-5 w-5", color: "#f7c64a" }, { left: "92%", top: "88%", size: "h-6 w-6", color: "#d63c7c" }]} />
      <ul className="mx-auto grid max-w-[1240px] grid-cols-2 gap-4 px-4 md:grid-cols-3 md:px-8">
        {fotos.map((f, i) => (
          <motion.li key={f.src + i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.7, ease }} className={`group overflow-hidden rounded-[28px] ${f.cls}`}>
            <img src={img(f.src)} alt={f.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
