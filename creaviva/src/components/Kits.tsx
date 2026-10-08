import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { img, kits, price, type Kit } from "../data";
import { Flower } from "./shapes";

const SHAPES = ["rounded-t-full", "blob", "rounded-full", "rounded-[2.5rem]"];

function KitCard({ kit, i }: { kit: Kit; i: number }) {
  return (
    <motion.article
      whileHover={{ rotate: i % 2 ? 2 : -2, y: -10 }}
      transition={{ type: "spring", stiffness: 260, damping: 15 }}
      className={`relative flex w-[78vw] max-w-[330px] shrink-0 snap-center flex-col rounded-[2rem] p-5 ring-[3px] ring-forest ${kit.color} ${kit.text}`}
      style={{ rotate: i % 2 ? 1.5 : -1.5 }}
    >
      <div className={`aspect-[4/3.4] overflow-hidden ring-[3px] ring-forest ${SHAPES[i % SHAPES.length]}`}>
        <img src={img(kit.photo)} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <p className="mt-5 font-hand text-3xl leading-none">kit</p>
      <h3 className="font-display text-5xl leading-[0.95]">{kit.name}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {kit.includes.map((x) => (
          <li key={x} className="rounded-full bg-cream/90 px-3 py-1 text-sm font-semibold text-forest">
            {x}
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-6 font-display text-4xl">${price(kit.price)}</p>
      <Flower className="absolute -right-4 -top-4 w-14" color="#f6efe2" center={i % 2 ? "#ee5a24" : "#3fb8a6"} petals={6} />
    </motion.article>
  );
}

// Kits: en computador la fila se desliza de lado con el scroll; en celular se desliza con el dedo.
export function Kits() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [wide, setWide] = useState(() => window.innerWidth >= 1024);
  const pinned = wide && !reduce;

  useLayoutEffect(() => {
    const measure = () => {
      setWide(window.innerWidth >= 1024);
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 64));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const header = (
    <div className="mx-auto mb-10 flex max-w-[1300px] flex-wrap items-end justify-between gap-4 px-4 md:px-8">
      <div>
        <p className="font-hand text-4xl text-terra">elige tu</p>
        <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-forest">Kits</h2>
      </div>
      <p className="max-w-xs rounded-[1.5rem] bg-forest px-5 py-3 text-cream">Todos incluyen pinceles, pinturas y delantal.</p>
    </div>
  );

  if (!pinned) {
    return (
      <section id="kits" className="py-24">
        {header}
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 pt-4 [scrollbar-width:none]">
          {kits.map((k, i) => (
            <KitCard key={k.id} kit={k} i={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="kits" ref={ref} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden">
        {header}
        <motion.div ref={track} style={{ x }} className="flex w-max gap-8 px-8 py-4">
          {kits.map((k, i) => (
            <KitCard key={k.id} kit={k} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
