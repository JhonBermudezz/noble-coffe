import { motion } from "motion/react";
import { INSTAGRAM, img } from "../data";

export function Footer() {
  return (
    <footer className="bg-forest px-4 py-16 text-center text-cream">
      <motion.img
        src={img("logo")}
        alt="Creaviva Café"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto h-28 w-28 rounded-full ring-4 ring-mustard"
      />
      <p className="mx-auto mt-8 max-w-md font-display text-3xl leading-tight">
        Tu terapia cuesta menos que una sesión de <span className="font-hand text-mustard">psicología</span>.
      </p>
      <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="mt-6 inline-block text-lg underline decoration-wavy decoration-bubble underline-offset-8">
        @creaviva_cafe
      </a>
      <p className="mt-10 text-sm text-cream/60">Café · Arte · Plantas · Experiencias</p>
    </footer>
  );
}
