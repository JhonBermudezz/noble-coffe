import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { img, phrases } from "../data";

// La superficie del café dentro de la foto de la taza (en % de la imagen de 900 x 748).
const FOAM = { cx: 47.3, cy: 47, d: 46.6, ratio: 900 / 748 };
const FULL = Math.PI * 2 * 1.4; // vueltas necesarias para revelar el mensaje

// "Un café con Dios": se revuelve el café con el dedo o el mouse y la espuma
// se vuelve un mensaje, con las frases que la casita publica en sus historias.
export function Taza() {
  const foam = useRef<HTMLDivElement>(null);
  const angle = useMotionValue(0);
  const turns = useMotionValue(0);
  const progress = useTransform(turns, [0, FULL], [0, 1], { clamp: true });
  const swirl = useTransform(progress, [0, 0.15, 0.85, 1], [0, 0.9, 0.9, 0]);
  const cover = useTransform(progress, [0, 0.7], [0, 1]);
  const [index, setIndex] = useState(-1);
  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState(false);
  const last = useRef<number | null>(null);
  // Después de revelar, el mismo arrastre ya no cuenta: hay que soltar y volver a revolver.
  const locked = useRef(false);
  const busy = useRef(false);

  const reveal = () => {
    locked.current = true;
    setShown(true);
    setIndex((i) => (i + 1) % phrases.length);
  };

  // Al volver a revolver, el mensaje se disuelve y empieza otro.
  const restart = () => {
    locked.current = false;
    setShown(false);
    turns.set(0);
  };

  const add = (d: number) => {
    if (locked.current || busy.current) return;
    angle.set(angle.get() + d);
    turns.set(turns.get() + Math.abs(d));
    if (turns.get() >= FULL) reveal();
  };

  const at = (e: React.PointerEvent) => {
    const r = foam.current!.getBoundingClientRect();
    return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2));
  };

  const onDown = (e: React.PointerEvent) => {
    if (busy.current) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (locked.current) restart();
    last.current = at(e);
  };
  const onMove = (e: React.PointerEvent) => {
    if (last.current === null) return;
    const a = at(e);
    let d = a - last.current;
    if (d > Math.PI) d -= Math.PI * 2;
    if (d < -Math.PI) d += Math.PI * 2;
    last.current = a;
    if (Math.abs(d) < 0.6) add(d);
  };
  const onUp = () => (last.current = null);

  // Revolver por la persona (teclado, o si no quiere arrastrar).
  const auto = () => {
    if (busy.current) return;
    if (locked.current || shown) restart();
    busy.current = true;
    const from = angle.get();
    const start = turns.get();
    animate(0, FULL, {
      duration: 1.6,
      ease: "easeInOut",
      onUpdate: (v) => {
        angle.set(from + v);
        turns.set(start + v);
      },
      onComplete: () => {
        busy.current = false;
        reveal();
      },
    });
  };

  const phrase = index >= 0 ? phrases[index] : "";
  const share = async () => {
    const text = `“${phrase}” · La Casita de Dios`;
    try {
      if (navigator.share) await navigator.share({ text });
      else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      /* la persona canceló */
    }
  };

  const rotate = useTransform(angle, (a) => (a * 180) / Math.PI);

  return (
    <section id="taza" className="relative overflow-hidden bg-gradient-to-b from-malva to-[#ecdbe6] py-24 md:py-32">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-4 md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <div>
          <p className="script text-3xl text-rosa-2 md:text-4xl">Tu mensaje del día</p>
          <h2 className="display mt-2 text-[clamp(3rem,7vw,6rem)]">Revuelve tu café</h2>
          <p className="mt-5 max-w-md text-lg">
            Dale vueltas al café con el dedo o con el mouse, en círculos sobre la espuma. Cuando la espuma se asiente, te deja un mensaje para hoy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={auto} className="display rounded-full bg-cacao px-6 py-3.5 text-lg text-crema shadow-[0_5px_0_#3a1812] transition-transform hover:-translate-y-0.5">
              {shown ? "Otro mensaje" : "Revolver por mí"}
            </button>
            {shown && (
              <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={share} className="display halo rounded-full bg-white px-6 py-3.5 text-lg">
                {copied ? "¡Copiado!" : "Compartir"}
              </motion.button>
            )}
          </div>
          <p className="sr-only" aria-live="polite">
            {shown ? phrase : ""}
          </p>
        </div>

        <div className="relative mx-auto w-[88%] max-w-[620px] select-none md:w-full">
          <img src={img("taza")} alt="Capuccino en una taza de porcelana floreada, vista desde arriba" draggable={false} className="w-full drop-shadow-[0_30px_40px_rgb(98_42_28/0.3)]" />
          <div
            ref={foam}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            className="@container absolute cursor-grab touch-none overflow-hidden rounded-full active:cursor-grabbing"
            style={{
              left: `${FOAM.cx - FOAM.d / 2}%`,
              width: `${FOAM.d}%`,
              top: `${FOAM.cy - (FOAM.d * FOAM.ratio) / 2}%`,
              height: `${FOAM.d * FOAM.ratio}%`,
            }}
          >
            {/* La espuma que cubre el corazón a medida que se revuelve */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: cover, background: "radial-gradient(circle, #f8ecd6 0%, #f0dbb8 45%, #e2bf8f 72%, rgb(200 147 92 / 0.55) 88%, transparent 100%)" }}
            />
            {/* El remolino */}
            <motion.div
              className="absolute -inset-[10%]"
              style={{
                rotate,
                opacity: swirl,
                background: "conic-gradient(from 0deg, transparent 0 8%, rgb(255 246 230 / 0.85) 12%, transparent 18% 33%, rgb(140 86 44 / 0.45) 38%, transparent 44% 58%, rgb(255 246 230 / 0.8) 63%, transparent 69% 83%, rgb(140 86 44 / 0.4) 88%, transparent 94%)",
                maskImage: "radial-gradient(circle, transparent 8%, #000 30%, #000 70%, transparent 74%)",
              }}
            />
            {/* El mensaje */}
            <motion.p
              key={index}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
              animate={shown ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.9, filter: "blur(6px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`script absolute inset-[14%] flex items-center justify-center text-center leading-[1.05] text-cacao ${phrase.length > 34 ? "text-[10.5cqw]" : phrase.length > 22 ? "text-[12.5cqw]" : "text-[16cqw]"}`}
            >
              {phrase}
            </motion.p>
          </div>
          <motion.p
            aria-hidden
            animate={{ opacity: shown ? 0 : 1 }}
            className="display pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-base shadow-[0_0_0_3px_var(--color-menta)]"
          >
            ↻ Revuelve aquí
          </motion.p>
        </div>
      </div>
    </section>
  );
}
