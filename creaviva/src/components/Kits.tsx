import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { img, kits, price, type Kit } from "../data";

function KitCard({ kit }: { kit: Kit }) {
  const light = kit.color === "bg-mustard";
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`flex w-[78vw] max-w-[320px] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] ${kit.color} ${kit.text}`}
    >
      <div className="aspect-[4/3.2] overflow-hidden">
        <img src={img(kit.photo)} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-4xl leading-none">
          Kit <span className="italic">{kit.name}</span>
        </h3>
        <p className={`mt-3 text-[15px] leading-snug ${light ? "text-forest/70" : "opacity-80"}`}>{kit.includes.join(" · ")}</p>
        <p className="mt-auto pt-6 text-2xl font-semibold tabular-nums">${price(kit.price)}</p>
      </div>
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
    <div className="mx-auto mb-10 flex max-w-[1300px] flex-wrap items-end justify-between gap-4 px-5 md:px-8">
      <h2 className="font-display text-[clamp(3.2rem,8vw,7rem)] leading-[0.9] text-forest">
        Elige tu <em>kit</em>
      </h2>
      <p className="max-w-[16rem] text-[15px] leading-snug text-forest/70">Todos incluyen pinceles, pinturas y delantal.</p>
    </div>
  );

  if (!pinned) {
    return (
      <section id="kits" className="py-24">
        {header}
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 pt-4 [scrollbar-width:none]">
          {kits.map((k) => (
            <KitCard key={k.id} kit={k} />
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
          {kits.map((k) => (
            <KitCard key={k.id} kit={k} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
