import { motion } from "motion/react";
import { ADDRESS, CITY, PLACE, img } from "../data";

// Cierre: foto nocturna de las almenas con la luna y el neón "Memento mori" (ilustración generada a partir del castillo real).
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night">
      <div className="relative">
      <motion.picture
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        <source media="(max-width: 767px)" srcSet={img("footer-tall")} />
        <img src={img("footer-wide")} alt="Las almenas del castillo bajo la luna llena con el neón Memento mori" loading="lazy" className="block w-full" />
      </motion.picture>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-night to-transparent" />
      </div>
      <div className="relative -mt-16 px-5 pb-10 text-center md:-mt-28 md:pb-12">
        <img src={img("logo")} alt="El Purgatorio" className="mx-auto h-16 w-16 rounded-full md:h-20 md:w-20" />
        <p className="mt-3 font-script text-4xl text-bone md:text-5xl">Arte, café y algo más</p>
        <p className="mt-4 text-sm text-bone/50">
          © {new Date().getFullYear()} El Purgatorio · {PLACE} · {ADDRESS} · {CITY}
        </p>
      </div>
    </footer>
  );
}
