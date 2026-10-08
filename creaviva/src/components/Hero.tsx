import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { img } from "../data";
import { Brush, Cup, Flower, Heart, Monstera, Sprig } from "./shapes";

const ease = [0.16, 1, 0.3, 1] as const;
const TRAIL = ["#f28bb0", "#f2c230", "#3fb8a6", "#ee5a24", "#b9a6e8"];

// Con el mouse se pinta sobre el inicio: la pintura se va secando (desvaneciendo) sola.
function BrushTrail({ area }: { area: React.RefObject<HTMLElement | null> }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    const el = area.current;
    if (!c || !el) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      c.width = el.clientWidth * dpr;
      c.height = el.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let last: { x: number; y: number } | null = null;
    let hue = 0;
    let raf = 0;
    let visible = true;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const p = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (last) {
        const d = Math.hypot(p.x - last.x, p.y - last.y);
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = TRAIL[Math.floor(hue) % TRAIL.length];
        ctx.lineWidth = Math.max(8, 26 - d * 0.35);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        hue += 0.04;
      }
      last = p;
    };
    const leave = () => (last = null);
    const fade = () => {
      if (visible) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,0.035)";
        ctx.fillRect(0, 0, c.width, c.height);
      }
      raf = requestAnimationFrame(fade);
    };
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);
    raf = requestAnimationFrame(fade);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [area]);

  return <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />;
}

// Pegatinas que se pueden arrastrar por el inicio y rebotan al soltarlas.
function Sticker({
  area,
  className,
  delay,
  rotate,
  children,
}: {
  area: React.RefObject<HTMLElement | null>;
  className: string;
  delay: number;
  rotate: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      drag
      dragConstraints={area}
      dragElastic={0.25}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 12 }}
      whileDrag={{ scale: 1.2, rotate: rotate + 12, cursor: "grabbing" }}
      whileHover={{ scale: 1.08 }}
      initial={{ scale: 0, rotate: rotate - 40 }}
      animate={{ scale: 1, rotate }}
      transition={{ type: "spring", stiffness: 180, damping: 11, delay }}
      className={`absolute z-20 cursor-grab touch-none drop-shadow-[0_8px_10px_rgb(31_74_50/0.25)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} id="top" className="relative overflow-hidden">
      {/* Manchas de fondo, como en las piezas de Instagram. */}
      <div aria-hidden className="blob-slow absolute -left-24 top-24 h-72 w-72 bg-mustard/70 md:h-96 md:w-96" />
      <div aria-hidden className="blob absolute -right-20 bottom-10 h-80 w-80 bg-bubble/60 md:h-[28rem] md:w-[28rem]" />
      <BrushTrail area={ref} />

      <div className="relative mx-auto grid min-h-[100dvh] max-w-[1300px] grid-cols-1 items-center gap-10 px-4 pb-20 pt-28 md:px-8 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-6">
          <h1 className="font-display text-[clamp(3.6rem,10vw,8.5rem)] leading-[0.88]">
            {[
              { w: "Pinta.", c: "text-tangerine" },
              { w: "Toma café.", c: "text-forest" },
              { w: "Repite.", c: "text-teal" },
            ].map((line, i) => (
              <motion.span
                key={line.w}
                className={`block ${line.c}`}
                initial={{ opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
              >
                {line.w}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.6, rotate: -14 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.6 }}
            className="mt-2 inline-block font-hand text-[clamp(2.2rem,4vw,3.2rem)] text-terra"
          >
            you are art ♡
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#kits" className="rounded-full bg-forest px-7 py-4 text-lg font-bold text-cream transition-transform hover:-rotate-2 hover:scale-105 active:scale-95">
              Ver kits
            </a>
            <a
              href="#pinta"
              className="rounded-full border-[3px] border-forest bg-cream px-7 py-4 text-lg font-bold text-forest transition-transform hover:rotate-2 hover:scale-105 active:scale-95"
            >
              Pinta el osito
            </a>
          </motion.div>
        </div>

        {/* Collage de fotos dentro de manchas que cambian de forma. */}
        <div className="relative mx-auto aspect-square w-full max-w-[560px] lg:col-span-6">
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.2 }}
            className="blob absolute inset-[6%_10%_14%_4%] overflow-hidden ring-[6px] ring-forest"
          >
            <img src={img("grupo")} alt="Amigas pintando cerámica en Creaviva" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 13, delay: 0.55 }}
            className="blob-slow absolute bottom-0 right-0 h-[42%] w-[42%] overflow-hidden ring-[6px] ring-cream"
          >
            <img src={img("osito")} alt="Osito de cerámica pintado de rosado" className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 13, delay: 0.7 }}
            className="absolute -left-2 bottom-[6%] h-[30%] w-[30%] overflow-hidden rounded-full ring-[6px] ring-mustard"
          >
            <img src={img("vaso")} alt="Bebida fría en vaso verde" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </div>

      {!reduce && (
        <>
          <Sticker area={ref} className="left-[74%] top-[50%] w-16 md:left-[46%] md:top-[16%] md:w-28" delay={0.9} rotate={-12}>
            <Monstera className="w-full" />
          </Sticker>
          <Sticker area={ref} className="right-[6%] top-[14%] w-16 md:w-24" delay={1} rotate={10}>
            <Flower className="w-full" color="#f28bb0" />
          </Sticker>
          <Sticker area={ref} className="bottom-[8%] left-[38%] w-20 md:w-24" delay={1.1} rotate={-6}>
            <Cup className="w-full" />
          </Sticker>
          <Sticker area={ref} className="right-[44%] top-[58%] hidden w-7 md:block" delay={1.2} rotate={30}>
            <Brush className="w-full" />
          </Sticker>
          <Sticker area={ref} className="bottom-[24%] right-[3%] w-14 md:w-16" delay={1.3} rotate={14}>
            <Heart className="w-full" />
          </Sticker>
          <Sticker area={ref} className="left-[3%] top-[18%] hidden w-10 md:block" delay={1.35} rotate={-20}>
            <Sprig className="w-full" />
          </Sticker>
        </>
      )}
    </section>
  );
}
