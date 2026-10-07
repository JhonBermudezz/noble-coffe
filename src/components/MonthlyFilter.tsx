import { motion, useAnimationFrame, useInView, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import { monthly } from "../data/menu";

// Contorno de la prensa francesa (perilla, varilla, tapa, jarra y asa) en un lienzo de 640 x 760.
const OUTER =
  "M290 128 C290 112 272 104 272 82 C272 56 294 38 320 38 C346 38 368 56 368 82 C368 104 350 112 350 128 " +
  "V186 H470 Q492 186 492 208 V220 Q492 242 470 242 H458 V640 Q458 724 374 724 H266 Q182 724 182 640 " +
  "V568 C112 568 50 528 50 444 C50 360 112 320 182 320 V242 H170 Q148 242 148 220 V208 Q148 186 170 186 H290 Z";
// Hueco del asa.
const HOLE = "M126 388 C110 388 98 412 98 444 C98 476 110 500 126 500 C142 500 154 476 154 444 C154 412 142 388 126 388 Z";

// Estrella de picos irregulares, como la de la historia. Es determinística: no cambia entre renders.
const STAR = (() => {
  const outer = [318, 236, 300, 262, 326, 228, 306, 250, 322, 240];
  const inner = 112;
  const pts: string[] = [];
  outer.forEach((r, i) => {
    const a0 = (i / outer.length) * Math.PI * 2 - Math.PI / 2;
    const a1 = a0 + Math.PI / outer.length;
    pts.push(`${(320 + Math.cos(a0) * r).toFixed(1)},${(470 + Math.sin(a0) * r * 0.92).toFixed(1)}`);
    pts.push(`${(320 + Math.cos(a1) * inner).toFixed(1)},${(470 + Math.sin(a1) * inner).toFixed(1)}`);
  });
  return pts.join(" ");
})();

const ease = [0.16, 1, 0.3, 1] as const;

export function MonthlyFilter() {
  const root = useRef<HTMLElement>(null);
  const outerPath = useRef<SVGTextPathElement>(null);
  const holePath = useRef<SVGTextPathElement>(null);
  const phrase = useRef(400);
  const reduce = useReducedMotion();
  const inView = useInView(root, { margin: "20% 0px 20% 0px" });
  const { scrollYProgress } = useScroll({ target: root, offset: ["start end", "end start"] });

  const text = `NOBLE® ${monthly.method} `;
  const outerText = useMemo(() => text.repeat(9), [text]);
  const holeText = useMemo(() => text.repeat(4), [text]);

  // Largo real de una repetición del texto, para que el recorrido en bucle no tenga saltos.
  useEffect(() => {
    const measure = () => {
      const el = outerPath.current;
      if (el) phrase.current = el.getComputedTextLength() / 9;
    };
    measure();
    document.fonts?.ready.then(measure);
  }, [text]);

  // El texto recorre el contorno: avanza solo, despacio, y más rápido mientras se hace scroll.
  useAnimationFrame((t) => {
    if (reduce || !inView) return;
    const len = phrase.current;
    const shift = (t * 0.018 + scrollYProgress.get() * len * 3) % len;
    outerPath.current?.setAttribute("startOffset", String(-shift));
    holePath.current?.setAttribute("startOffset", String(-((len - shift) % len)));
  });

  const letters = (word: string) =>
    word.split("").map((ch, i) => (
      <motion.span
        key={i}
        className="inline-block"
        variants={{ hidden: { y: "70%", opacity: 0, rotate: -6 }, shown: { y: "0%", opacity: 1, rotate: 0 } }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: i * 0.035 }}
      >
        {ch === " " ? " " : ch}
      </motion.span>
    ));

  return (
    <section ref={root} id="filtrado" aria-labelledby="monthly-title" className="overflow-x-clip bg-mint text-ink">
      <div className="mx-auto grid max-w-[1400px] items-center gap-6 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:gap-10">
        <motion.h2
          id="monthly-title"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.4 }}
          className="font-title text-center text-[clamp(3.6rem,15vw,8.75rem)] leading-[0.86] tracking-[-0.02em] lg:col-span-6 lg:text-left"
        >
          {monthly.title.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              {letters(line)}
            </span>
          ))}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease }}
          className="lg:col-span-6"
        >
          <svg
            viewBox="0 0 640 760"
            role="img"
            aria-label={`${monthly.method.toLowerCase()}, filtrado del mes`}
            className="mx-auto block h-auto w-full max-w-[34rem]"
          >
            <defs>
              <path id="press-outer" d={OUTER} />
              <path id="press-hole" d={HOLE} />
            </defs>

            {/* La estrella gira despacio detrás del dibujo. */}
            <polygon
              points={STAR}
              className="spin-slow"
              style={{ fill: "var(--paper)", transformBox: "fill-box", transformOrigin: "center", animationDuration: "46s" }}
            />

            <g style={{ fill: "var(--ink)", fontFamily: "var(--font-sans)", fontSize: 25, letterSpacing: "0.03em" }}>
              <text>
                <textPath ref={outerPath} href="#press-outer" startOffset="0">
                  {outerText}
                </textPath>
              </text>
              <text>
                <textPath ref={holePath} href="#press-hole" startOffset="0">
                  {holeText}
                </textPath>
              </text>
              <text textAnchor="middle" fontSize="44" letterSpacing="0.01em">
                <tspan x="320" y="452">
                  NOBLE®
                </tspan>
                <tspan x="320" y="500">
                  {monthly.method.split(" ")[0]}
                </tspan>
                <tspan x="320" y="548">
                  {monthly.method.split(" ").slice(1).join(" ")}
                </tspan>
              </text>
            </g>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
