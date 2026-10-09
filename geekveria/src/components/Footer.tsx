import { motion } from "motion/react";
import { ADDRESS, CITY, MAPS_URL, img } from "../data";
import { Burst } from "./Burst";

const LINKS = [
  { href: "#club", label: "El club" },
  { href: "#menu", label: "Menú geek" },
  { href: "#tienda", label: "Tienda" },
  { href: "#club-geek", label: "Únete al club" },
  { href: "#visita", label: "Visítanos" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-4 border-ink bg-brown text-paper">
      <div className="halftone-light absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto grid max-w-[1300px] gap-12 px-4 pb-12 pt-16 md:grid-cols-[1.3fr_1fr_1fr] md:px-8">
        <div>
          <img src={img("logo-dark")} alt="Geekveria, tu nación geek" className="h-auto w-56 md:w-64" />
          <p className="mt-5 max-w-xs text-paper/75">Club · Cómic + Manga · Café. Distribuidor autorizado Panini.</p>
        </div>

        <nav aria-label="Secciones">
          <p className="font-display text-xl uppercase tracking-wider text-yellow">Explora</p>
          <ul className="mt-4 space-y-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group inline-flex items-center gap-2 font-semibold text-paper/90 transition-colors hover:text-yellow">
                  <span className="text-yellow transition-transform group-hover:translate-x-1">★</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-xl uppercase tracking-wider text-yellow">Tienda física</p>
          <p className="mt-4 font-display text-2xl uppercase">{ADDRESS}</p>
          <p className="text-paper/75">{CITY}</p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block border-[3px] border-ink bg-yellow px-5 py-2 font-display text-lg uppercase text-ink shadow-[4px_4px_0_#000] transition-transform hover:-translate-y-0.5"
          >
            Cómo llegar
          </a>
        </div>
      </div>

      {/* Cierre: la mascota se despide sobre la multitud geek. */}
      <div className="relative h-48 md:h-56">
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-36 border-t-4 border-ink md:h-44"
          style={{ backgroundImage: `url(${img("crowd-sm")})`, backgroundRepeat: "repeat-x", backgroundSize: "auto 100%", backgroundPosition: "center top" }}
        />
        <motion.img
          src={img("mascot-coffee")}
          alt=""
          className="absolute bottom-6 right-[6%] w-28 drop-shadow-[4px_4px_0_#2a1610] md:w-36"
          initial={{ y: 80, rotate: 10 }}
          whileInView={{ y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 160, damping: 12 }}
        />
        <motion.div
          className="absolute bottom-28 right-[calc(6%+6rem)] md:bottom-36 md:right-[calc(6%+8rem)]"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1, rotate: -8 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 11, delay: 0.3 }}
        >
          <Burst text="¡VUELVE PRONTO!" color="#f2c40f" className="h-28 w-28 md:h-32 md:w-32" size="text-base md:text-lg" />
        </motion.div>
      </div>

      <div className="relative border-t-4 border-ink bg-ink px-4 py-4 text-center text-xs text-paper/60">© {new Date().getFullYear()} Geekveria · Tu nación geek · Bogotá</div>
    </footer>
  );
}
