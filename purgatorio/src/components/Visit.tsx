import { motion } from "motion/react";
import { CITY, MAPS_URL, PLACE, img } from "../data";

// Pergamino sellado con lacre: el sello se parte en dos al aparecer.
export function Visit() {
  return (
    <section id="visita" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[760px] px-5">
        <motion.div
          className="relative px-8 py-14 text-center text-[#2a1a12] md:px-16"
          initial={{ scaleY: 0.2, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: "top",
            background: "radial-gradient(ellipse at 50% 40%, #f3e7cf, #e2cfa8 70%, #c9ad7d)",
            boxShadow: "inset 0 0 60px rgb(120 80 30 / 0.45), 0 40px 80px -30px rgb(0 0 0 / 0.9)",
            clipPath: "polygon(0 2%, 4% 0, 12% 2%, 22% 0, 35% 1.5%, 50% 0, 64% 2%, 78% 0, 90% 1.5%, 100% 0, 99% 50%, 100% 100%, 88% 98%, 74% 100%, 60% 98.5%, 46% 100%, 30% 98%, 16% 100%, 4% 98.5%, 0 100%, 1% 50%)",
          }}
        >
          <p className="font-script text-5xl">Se te espera en</p>
          <h2 className="title mt-4 text-[clamp(2.6rem,7vw,4.6rem)] text-wine">{PLACE}</h2>
          <p className="mt-2 text-2xl italic">{CITY}</p>
          <p className="mx-auto mt-6 max-w-md text-lg">Cruza el puente, sube a la torre y pide tu pecado. El castillo abre sus puertas para el café, el arte y algo más.</p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="title mt-8 inline-block bg-wine px-8 py-4 text-xl text-bone transition-transform hover:scale-105"
          >
            Cómo llegar
          </a>

          {/* Sello de lacre */}
          <div className="absolute -bottom-10 left-1/2 h-24 w-24 -translate-x-1/2">
            {[0, 1].map((half) => (
              <motion.div
                key={half}
                className="absolute inset-0 grid place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#e2324e,#8a0c20_70%)] shadow-[0_6px_14px_rgb(0_0_0/0.5)]"
                style={{ clipPath: half ? "polygon(50% 0, 100% 0, 100% 100%, 46% 100%, 54% 60%, 44% 40%)" : "polygon(0 0, 50% 0, 44% 40%, 54% 60%, 46% 100%, 0 100%)" }}
                initial={{ x: 0, rotate: 0 }}
                whileInView={{ x: half ? 10 : -10, rotate: half ? 12 : -12 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 12 }}
              >
                <img src={img("logo")} alt="" className="h-14 w-14 rounded-full opacity-80 mix-blend-multiply" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
