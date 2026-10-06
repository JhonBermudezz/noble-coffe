import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Clock, InstagramLogo, MapPin } from "@phosphor-icons/react";
import { ADDRESS, ADDRESS_DETAIL, INSTAGRAM_DM, MAPS_URL } from "../data/menu";
import { HOURS } from "../data/hours";
import { OpenBadge } from "./OpenBadge";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

export function Visit() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // La mesa redonda gira apenas con el scroll, como la sombra que se mueve en la tarde.
  const rotate = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  return (
    <section ref={ref} id="visitanos" className="overflow-x-clip border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-4 py-24 md:px-8 md:py-36 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <h2 className="font-display text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.95]">{ADDRESS}</h2>
            <p className="mt-3 text-lg text-muted">{ADDRESS_DETAIL}</p>
            <OpenBadge className="mt-6" />
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div className="flex gap-3">
              <Clock size={22} weight="regular" className="mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">{HOURS.label}</p>
                <p className="text-muted">{HOURS.range}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-12 flex flex-wrap gap-3">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-ink px-6 py-3.5 font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <MapPin size={18} weight="bold" />
              Cómo llegar
            </a>
            <a
              href={INSTAGRAM_DM}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-ink/80 px-6 py-3.5 font-medium transition-colors duration-300 hover:bg-ink hover:text-paper active:scale-[0.98]"
            >
              <InstagramLogo size={18} weight="bold" />
              Escríbenos
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <motion.div
            style={reduce ? undefined : { rotate }}
            className="mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-full"
          >
            <Photo
              name="mesa-sombra"
              alt="Mesa redonda blanca del local con la sombra de las plantas"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="scale-[1.15]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
