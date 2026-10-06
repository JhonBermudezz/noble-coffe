import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { INSTAGRAM } from "../data/menu";
import { gsap, NO_REDUCED_MOTION } from "../lib/gsap";
import { Photo } from "./Photo";

type Shot = { name: string; alt: string; box: string };

// Formas de la marca (arco, óvalo, círculo y recto) con alturas distintas para dar ritmo.
const shots: Shot[] = [
  { name: "silla", alt: "Silla plegable blanca con un vaso NOBLE frente a un muro verde", box: "h-[58dvh] aspect-[3/4] rounded-t-full" },
  { name: "iced-latte", alt: "Café helado NOBLE sobre una mesa redonda", box: "h-[40dvh] aspect-square rounded-full self-end" },
  { name: "chemex-gorra", alt: "Persona con gorra Everyday Happiness sosteniendo una Chemex", box: "h-[64dvh] aspect-[3/4]" },
  { name: "mesa-sombra", alt: "Mesa redonda del local con la sombra de las plantas", box: "h-[50dvh] aspect-[5/4] rounded-[50%] self-start" },
  { name: "sandwich", alt: "Sándwich con chips de papa sobre papel NOBLE", box: "h-[56dvh] aspect-[4/5]" },
  { name: "cliente", alt: "Cliente con chaqueta de cuero y café para llevar entre plantas", box: "h-[62dvh] aspect-[9/16] rounded-full" },
  { name: "vaso-galleta", alt: "Vaso NOBLE con espuma junto a una galleta de chocolate", box: "h-[40dvh] aspect-square rounded-full self-end" },
  { name: "bodegon", alt: "Bolsa NOBLE junto a una Chemex, una jarra y un hojaldre", box: "h-[60dvh] aspect-[4/5] rounded-t-full" },
];

// Desplazamiento horizontal fijado (pin): la galería se mueve de lado mientras bajas.
// Con "reducir movimiento" queda como una tira que se desliza con el dedo o el mouse.
export function Moments() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = wrap.current;
    const row = track.current;
    if (!section || !row) return;
    const mm = gsap.matchMedia();

    mm.add(NO_REDUCED_MOTION, () => {
      const distance = () => Math.max(0, row.scrollWidth - window.innerWidth);
      const pan = gsap.to(row, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top", // se fija exactamente cuando la sección toca el borde superior
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Cada foto se mueve un poco más lento que su marco para dar profundidad.
      gsap.utils.toArray<HTMLElement>("[data-shot-img]", row).forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -9 },
          {
            xPercent: 9,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, containerAnimation: pan, start: "left right", end: "right left", scrub: true },
          },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={wrap} aria-label="Fotos de Noble" className="overflow-x-auto bg-paper motion-safe:overflow-hidden">
      <div ref={track} className="flex h-[100dvh] w-max items-center gap-5 px-[6vw] pt-16 md:gap-9">
        {shots.map((s) => (
          <figure key={s.name} className={`relative shrink-0 overflow-hidden ${s.box}`}>
            <div data-shot-img className="absolute -inset-x-[12%] inset-y-0">
              <Photo name={s.name} alt={s.alt} sizes="(min-width: 768px) 40vw, 80vw" />
            </div>
          </figure>
        ))}
        <a
          href={INSTAGRAM}
          target="_blank"
          rel="noreferrer"
          className="group ml-[4vw] mr-[10vw] flex shrink-0 items-center gap-3 whitespace-nowrap font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-none"
        >
          @somos.noble
          <ArrowUpRight
            weight="bold"
            className="size-[0.7em] transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </a>
      </div>
    </section>
  );
}
