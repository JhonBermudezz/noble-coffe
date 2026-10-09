import { AnimatePresence, motion } from "motion/react";
import { useState, type MouseEvent } from "react";
import { INSTAGRAM_DM } from "../data";
import { Bear, PARTS, type Fills, type Part } from "./Bear";
import { Drift } from "./Drift";
import { Edge } from "./Edge";
import { Painted } from "./Painted";

const PALETTE = [
  { name: "Rosa chicle", hex: "#f28bb0" },
  { name: "Mostaza", hex: "#f2c230" },
  { name: "Turquesa", hex: "#3fb8a6" },
  { name: "Mandarina", hex: "#ee5a24" },
  { name: "Lila", hex: "#b9a6e8" },
  { name: "Verde hoja", hex: "#7f9a5b" },
  { name: "Terracota", hex: "#c8643b" },
  { name: "Cielo", hex: "#8ec5e8" },
];

type Splat = { id: number; x: number; y: number; color: string };

// La cerámica interactiva: se elige un color y se pinta el osito parte por parte.
export function PaintBear() {
  const [color, setColor] = useState(PALETTE[0].hex);
  const [fills, setFills] = useState<Fills>({});
  const [splats, setSplats] = useState<Splat[]>([]);
  const done = PARTS.every((p) => fills[p]);

  const paint = (part: Part, e: MouseEvent<SVGElement>) => {
    setFills((f) => ({ ...f, [part]: color }));
    const svg = e.currentTarget.ownerSVGElement!;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    const s = { id: Date.now(), x: p.x, y: p.y, color };
    setSplats((list) => [...list.slice(-5), s]);
  };

  const surprise = () => {
    const f: Fills = {};
    PARTS.forEach((p) => (f[p] = PALETTE[Math.floor(Math.random() * PALETTE.length)].hex));
    setFills(f);
  };

  return (
    <section id="pinta" className="relative bg-forest py-24 text-cream md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Drift className="absolute -right-16 -top-10 w-72 md:w-96" rotate={40} y={-80}>
          <Painted name="monstera" color="#2a5c40" className="w-full rotate-12" />
        </Drift>
      </div>
      <Edge color="#1f4a32" variant="brush" />
      <Edge color="#1f4a32" variant="drips" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-4 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-[clamp(3.2rem,7.5vw,6.5rem)] leading-[0.92] [&_em]:text-mustard">
            Tu momento <em>creativo</em>
          </h2>
          <p className="mt-6 max-w-sm text-lg text-cream/80">Elige un color y toca el osito. En el local es igual, pero con pinceles de verdad.</p>

          <div className="mt-8 flex flex-wrap gap-3" role="radiogroup" aria-label="Colores">
            {PALETTE.map((p) => (
              <motion.button
                key={p.hex}
                role="radio"
                aria-checked={color === p.hex}
                aria-label={p.name}
                onClick={() => setColor(p.hex)}
                whileHover={{ scale: 1.15, rotate: -8 }}
                whileTap={{ scale: 0.9 }}
                animate={{ y: color === p.hex ? -8 : 0 }}
                className="h-11 w-11 rounded-full"
                style={{ background: p.hex, boxShadow: color === p.hex ? "0 0 0 4px #f6efe2" : "none" }}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={surprise} className="rounded-full bg-mustard px-6 py-3 font-bold text-forest transition-transform hover:-rotate-2 hover:scale-105">
              Sorpréndeme
            </button>
            <button
              onClick={() => setFills({})}
              className="rounded-full border-[3px] border-cream px-6 py-3 font-bold transition-transform hover:rotate-2 hover:scale-105"
            >
              Borrar
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[460px]">
                    <motion.div whileHover={{ rotate: -2 }} className="relative">
            <Bear fills={fills} onPaint={paint} className="w-full drop-shadow-[0_20px_30px_rgb(0_0_0/0.3)]">
              <AnimatePresence>
                {splats.map((s) => (
                  <motion.g key={s.id} initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.8 }} pointerEvents="none">
                    {Array.from({ length: 6 }, (_, i) => {
                      const a = (i / 6) * Math.PI * 2 + s.id;
                      return (
                        <motion.circle
                          key={i}
                          r={4 + (i % 3) * 2}
                          fill={s.color}
                          initial={{ cx: s.x, cy: s.y }}
                          animate={{ cx: s.x + Math.cos(a) * 34, cy: s.y + Math.sin(a) * 34 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                      );
                    })}
                  </motion.g>
                ))}
              </AnimatePresence>
            </Bear>
          </motion.div>

          <AnimatePresence>
            {done && (
              <motion.a
                href={INSTAGRAM_DM}
                target="_blank"
                rel="noreferrer"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: -8 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="absolute -top-4 right-0 grid h-32 w-32 place-items-center rounded-full bg-tangerine p-3 text-center font-display text-xl leading-tight text-cream shadow-xl md:h-36 md:w-36"
              >
                ¡Obra maestra! Ven a pintarla
              </motion.a>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
