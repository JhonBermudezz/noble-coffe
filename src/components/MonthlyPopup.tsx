import { AnimatePresence, LayoutGroup, motion, useAnimationFrame } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkle, X } from "@phosphor-icons/react";
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

const SEEN_KEY = "noble-monthly";
const AUTO_DELAY = 3500;

// El texto recorre el contorno solo, despacio; si pasas el cursor o el dedo por encima, se acelera.
function PressArt({ active }: { active: boolean }) {
  const outerPath = useRef<SVGTextPathElement>(null);
  const holePath = useRef<SVGTextPathElement>(null);
  const phrase = useRef(400);
  const offset = useRef(0);
  const boost = useRef(0);
  const last = useRef(0);

  const text = `NOBLE® ${monthly.method} `;
  const outerText = useMemo(() => text.repeat(9), [text]);
  const holeText = useMemo(() => text.repeat(4), [text]);

  // Largo real de una repetición del texto, para que el recorrido en bucle no tenga saltos.
  useEffect(() => {
    const measure = () => {
      const el = outerPath.current;
      if (el) phrase.current = el.getComputedTextLength() / 9 || 400;
    };
    const id = requestAnimationFrame(measure);
    document.fonts?.ready.then(measure);
    return () => cancelAnimationFrame(id);
  }, [text, active]);

  useAnimationFrame((t) => {
    if (!active) return;
    const dt = Math.min(48, t - last.current);
    last.current = t;
    boost.current *= 0.94;
    offset.current = (offset.current + dt * (0.02 + boost.current)) % phrase.current;
    outerPath.current?.setAttribute("startOffset", String(-offset.current));
    holePath.current?.setAttribute("startOffset", String(-((phrase.current - offset.current) % phrase.current)));
  });

  return (
    <svg
      viewBox="0 0 640 760"
      role="img"
      aria-label={`${monthly.method.toLowerCase()}, filtrado del mes`}
      onPointerMove={(e) => (boost.current = Math.min(0.35, boost.current + Math.hypot(e.movementX, e.movementY) * 0.0016))}
      className="mx-auto block h-auto max-h-[66dvh] w-full max-w-[32rem] touch-pan-y"
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
  );
}

function Title() {
  return (
    <motion.h2
      id="monthly-title"
      initial="hidden"
      animate="shown"
      className="font-title text-center text-[clamp(3rem,10vw,6.6rem)] leading-[0.86] tracking-[-0.02em] md:text-left"
    >
      {monthly.title.map((line, l) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          {line.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{ hidden: { y: "70%", opacity: 0, rotate: -6 }, shown: { y: "0%", opacity: 1, rotate: 0 } }}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.25 + l * 0.2 + i * 0.035 }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
}

// Botón flotante + popup del filtrado del mes. El botón se transforma en la tarjeta (elemento compartido).
export function MonthlyPopup({ auto = false }: { auto?: boolean }) {
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const card = useRef<HTMLDivElement>(null);

  // Abre solo una vez por visita, unos segundos después de que la página quedó lista.
  useEffect(() => {
    if (!auto || !monthly.autoOpen) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY) === "1") return;
    } catch {
      // Sin almacenamiento, simplemente se abre en cada visita.
    }
    const id = window.setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // Nada que hacer.
      }
    }, AUTO_DELAY);
    return () => window.clearTimeout(id);
  }, [auto]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    card.current?.focus({ preventScroll: true });
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previous;
      opener.current?.focus?.();
    };
  }, [open]);

  return (
    <LayoutGroup id="monthly">
      <AnimatePresence>
        {!open && (
          <motion.button
            key="pill"
            layoutId="monthly-card"
            style={{ borderRadius: 999 }}
            onClick={(e) => {
              opener.current = e.currentTarget;
              setOpen(true);
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 whitespace-nowrap bg-mint px-5 py-3 text-sm font-medium text-ink shadow-[0_10px_30px_-12px_rgb(22_22_20/0.35)] hover:-translate-y-0.5 active:scale-[0.98] md:bottom-6 md:left-6"
          >
            <Sparkle size={16} weight="fill" />
            Filtrado del mes
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[70] grid place-items-center p-3 md:p-6" role="dialog" aria-modal="true" aria-labelledby="monthly-title">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-[#161614]/45 backdrop-blur-sm"
            />

            <motion.div
              key="card"
              ref={card}
              tabIndex={-1}
              layoutId="monthly-card"
              style={{ borderRadius: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 30 }}
              className="relative max-h-[94dvh] w-[min(96vw,66rem)] overflow-y-auto overflow-x-hidden bg-mint text-ink outline-none"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="grid items-center gap-2 px-5 pb-6 pt-14 md:grid-cols-2 md:gap-6 md:px-10 md:py-10"
              >
                <Title />
                <PressArt active={open} />
              </motion.div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-paper text-ink transition-transform duration-300 hover:rotate-90 active:scale-95"
              >
                <X size={18} weight="bold" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
