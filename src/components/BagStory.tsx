import { motion, useMotionValueEvent, useScroll, type MotionValue } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { InstagramLogo } from "@phosphor-icons/react";
import { INSTAGRAM_DM } from "../data/menu";
import { AcidityDots, grinds, notes, type Grind } from "./Bag";

/*
  Historia de la bolsa contada con el scroll (sección fijada de 520vh):
  1. La bolsa completa y sus propiedades.
  2. Se rasga la parte de arriba.
  3. La bolsa se inclina y los granos caen al molino.
  4. La manivela gira y el café cae en el vaso, que se llena.
  5. Sale vapor y aparece el llamado a pedir.
  Todo se dibuja en un solo SVG y se actualiza escribiendo atributos directamente,
  sin re-render de React en cada frame.
*/

// Colores fijos del producto: la bolsa y el molino se ven igual en modo claro y oscuro.
const C = {
  bag: "#f4f1ea",
  ink: "#161614",
  gold: "#b3a468",
  metal: "#d7d4cc",
  metalDark: "#c4c1b8",
  body: "#2b2b28",
  wood: "#9b6b43",
  coffee: "#4a2c1a",
  crema: "#a0703f",
  bean: "#4b3121",
  beanLine: "#24170f",
};

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ramp = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Pose de la bolsa. La boca está 190 unidades por encima del centro (400, 520).
const BAG = { cx: 400, cy: 520, mouth: 190 };
const TILT = { dx: 165, dy: -215, rot: -128, scale: 0.75 };
const HOPPER_Y = 548;

function mouthPoint() {
  const a = (TILT.rot * Math.PI) / 180;
  const s = TILT.scale;
  const ox = 0;
  const oy = -BAG.mouth * s;
  return {
    x: BAG.cx + TILT.dx + ox * Math.cos(a) - oy * Math.sin(a),
    y: BAG.cy + TILT.dy + ox * Math.sin(a) + oy * Math.cos(a),
  };
}

// Granos con posiciones y giros fijos (determinísticos para que no salten entre renders).
const BEANS = Array.from({ length: 26 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    start: 0.45 + i * 0.0055,
    jitterStart: (r(1) - 0.5) * 26,
    targetX: 400 + (r(2) - 0.5) * 90,
    targetY: HOPPER_Y + r(3) * 18,
    rot0: r(4) * 360,
    spin: 260 + r(5) * 300,
  };
});

// Borde dentado de la parte superior de la bolsa.
const zigzag = (() => {
  let d = "M250,330 L250,272";
  for (let x = 250; x < 550; x += 12) d += ` L${x + 6},262 L${x + 12},272`;
  return d + " L550,330 Z";
})();

const STAGES = [
  { from: -1, to: 0.24 },
  { from: 0.27, to: 0.47 },
  { from: 0.5, to: 0.75 },
  { from: 0.78, to: 2 },
];

function stageOpacity(p: number, i: number) {
  const { from, to } = STAGES[i];
  return Math.min(ramp(p, from, from + 0.035), 1 - ramp(p, to - 0.035, to));
}

type Refs = Record<string, SVGElement | HTMLElement | null>;

function useScene(progress: MotionValue<number>, refs: React.RefObject<Refs>) {
  const draw = (p: number) => {
    const r = refs.current!;
    const set = (key: string, attr: string, value: string | number) => r[key]?.setAttribute(attr, String(value));

    // 1. Entrada suave de la bolsa.
    const intro = ease(ramp(p, 0, 0.08));
    // 3. Inclinación hacia el molino.
    const tilt = ease(ramp(p, 0.33, 0.46));
    // Salida de la bolsa cuando ya vació los granos.
    const exit = ease(ramp(p, 0.62, 0.72));
    const scale = (0.92 + 0.08 * intro) * (1 - (1 - TILT.scale) * tilt);
    const tx = TILT.dx * tilt + 240 * exit;
    const ty = 30 * (1 - intro) + TILT.dy * tilt - 220 * exit;
    set(
      "bag",
      "transform",
      `translate(${tx} ${ty}) rotate(${TILT.rot * tilt} ${BAG.cx} ${BAG.cy}) translate(${BAG.cx} ${BAG.cy}) scale(${scale}) translate(${-BAG.cx} ${-BAG.cy})`,
    );
    set("bag", "opacity", 1 - exit);
    set("shadow", "opacity", 0.14 * (1 - tilt));

    // 2. La parte de arriba se rasga y sale volando.
    const tear = ease(ramp(p, 0.24, 0.34));
    set("top", "transform", `translate(${90 * tear} ${-300 * tear}) rotate(${45 * tear} 400 296)`);
    set("top", "opacity", 1 - ramp(p, 0.29, 0.34));
    set("mouth", "opacity", ramp(p, 0.26, 0.3));

    // Molino y vaso entran desde abajo.
    const enter = ease(ramp(p, 0.3, 0.44));
    const grind = ramp(p, 0.5, 0.78);
    const angle = grind * Math.PI * 6;
    const shake = grind > 0 && grind < 1 ? Math.sin(angle * 3) * 1.4 : 0;
    set("grinder", "transform", `translate(${shake} ${520 * (1 - enter)})`);
    set("grinder", "opacity", enter);
    set("cup", "transform", `translate(0 ${420 * (1 - enter)})`);
    set("cup", "opacity", enter);

    // Manivela: girar con scaleX simula el giro en 3D visto de lado.
    const cos = Math.cos(angle);
    set("arm", "transform", `translate(400 472) scale(${cos} 1) translate(-400 -472)`);
    set("knob", "cx", 400 + 80 * cos);
    set("knob", "rx", 8 + 3 * Math.abs(Math.sin(angle)));

    // Granos: caen desde la boca de la bolsa hasta la tolva, con gravedad.
    const m = mouthPoint();
    BEANS.forEach((b, i) => {
      const t = ramp(p, b.start, b.start + 0.065);
      const visible = t > 0 && t < 1;
      const x = m.x + b.jitterStart * 0.3 + (b.targetX - m.x) * t;
      const y = m.y + (b.targetY - m.y) * t * t;
      set(`bean${i}`, "transform", `translate(${x} ${y}) rotate(${b.rot0 + b.spin * t})`);
      set(`bean${i}`, "opacity", visible ? 1 : 0);
    });

    // 4. El vaso se llena y el chorro cae desde el molino.
    const fill = ease(ramp(p, 0.6, 0.82));
    const level = 968 - 96 * fill;
    set("liquid", "y", level);
    set("crema", "y", level);
    set("crema", "opacity", fill > 0.02 ? 1 : 0);
    const grow = ramp(p, 0.58, 0.61);
    const cut = ramp(p, 0.8, 0.84);
    const streamTop = 786 + (level - 786) * cut;
    const streamBottom = 786 + (level - 786) * grow;
    set("stream", "y", streamTop);
    set("stream", "height", Math.max(0, streamBottom - streamTop));

    // 5. Vapor.
    const steam = ramp(p, 0.83, 0.95);
    for (let i = 0; i < 3; i++) {
      const s = ramp(steam, i * 0.15, 0.7 + i * 0.15);
      set(`steam${i}`, "stroke-dashoffset", 1 - s);
      set(`steam${i}`, "opacity", s > 0 ? 0.45 : 0);
    }

    // Textos que acompañan cada etapa.
    for (let i = 0; i < STAGES.length; i++) {
      const el = r[`stage${i}`] as HTMLElement | null;
      if (!el) continue;
      const o = stageOpacity(p, i);
      el.style.opacity = String(o);
      el.style.transform = `translateY(${(1 - o) * 24}px)`;
      el.style.pointerEvents = o > 0.6 ? "auto" : "none";
      el.setAttribute("aria-hidden", o > 0.5 ? "false" : "true");
    }
  };

  useLayoutEffect(() => draw(progress.get()));
  useMotionValueEvent(progress, "change", draw);
}

function Stage({ index, refs, children }: { index: number; refs: React.RefObject<Refs>; children: React.ReactNode }) {
  return (
    <div
      ref={(el) => {
        refs.current![`stage${index}`] = el;
      }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-0 will-change-transform"
    >
      {children}
    </div>
  );
}

export function BagStory() {
  const section = useRef<HTMLElement>(null);
  const refs = useRef<Refs>({});
  const [grind, setGrind] = useState<Grind>("Molido");
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  useScene(scrollYProgress, refs);

  const bind = (key: string) => (el: SVGElement | null) => {
    refs.current[key] = el;
  };

  return (
    <section ref={section} id="cafe" aria-label="Café para llevar a casa" className="relative h-[520vh] bg-paper-2">
      <div className="sticky top-0 grid h-[100dvh] grid-rows-[1fr_auto] overflow-hidden lg:grid-cols-12 lg:grid-rows-1">
        {/* Textos por etapa */}
        <div className="relative order-2 mx-auto h-[38dvh] w-full max-w-[1400px] px-4 md:px-8 lg:order-1 lg:col-span-5 lg:h-full lg:pl-[max(2rem,calc((100vw_-_1400px)/2_+_2rem))] lg:pr-0">
          <div className="relative h-full">
          <Stage index={0} refs={refs}>
            <h2 className="font-display text-[clamp(2.25rem,4.6vw,4rem)] leading-[0.95]">Café de Pitalito, Huila.</h2>
            <dl className="mt-6 grid max-w-[30rem] grid-cols-2 gap-x-6 gap-y-4 text-sm md:mt-8 md:text-base">
              <div>
                <dt className="text-muted">Variedad</dt>
                <dd className="font-semibold">Castillo</dd>
              </div>
              <div>
                <dt className="text-muted">Presentación</dt>
                <dd className="font-semibold">340 g / 12 oz</dd>
              </div>
              <div>
                <dt className="text-muted">Notas</dt>
                <dd className="font-semibold">{notes.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-muted">Acidez media</dt>
                <dd className="mt-1.5">
                  <AcidityDots tone="ink" />
                </dd>
              </div>
            </dl>
          </Stage>

          <Stage index={1} refs={refs}>
            <h2 className="font-display text-[clamp(2.25rem,4.6vw,4rem)] leading-[0.95]">En grano o molido.</h2>
          </Stage>

          <Stage index={2} refs={refs}>
            <h2 className="font-display text-[clamp(2.25rem,4.6vw,4rem)] leading-[0.95]">Del molino a la taza.</h2>
          </Stage>

          <Stage index={3} refs={refs}>
            <h2 className="font-display text-[clamp(2.25rem,4.6vw,4rem)] leading-[0.95]">Llévate el café a casa.</h2>
            <div className="mt-6 inline-flex rounded-full border border-line p-1" role="radiogroup" aria-label="Presentación">
              {grinds.map((g) => (
                <button
                  key={g}
                  role="radio"
                  aria-checked={grind === g}
                  onClick={() => setGrind(g)}
                  className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${grind === g ? "text-paper" : ""}`}
                >
                  {grind === g && (
                    <motion.span
                      layoutId="story-grind"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{g}</span>
                </button>
              ))}
            </div>
            <div className="mt-6">
              <a
                href={INSTAGRAM_DM}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-ink px-6 py-3.5 font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <InstagramLogo size={18} weight="bold" />
                Pedir {grind === "Grano" ? "en grano" : "molido"}
              </a>
            </div>
          </Stage>
          </div>
        </div>

        {/* Escena */}
        <div className="relative order-1 min-h-0 pt-16 lg:order-2 lg:col-span-7 lg:pt-0">
          <svg
            viewBox="0 100 800 930"
            preserveAspectRatio="xMidYMid meet"
            className="h-full w-full"
            role="img"
            aria-label="Bolsa de café NOBLE que se abre, vierte los granos en un molino y llena un vaso de café"
          >
            <defs>
              <linearGradient id="bag-shade" x1="0" x2="1">
                <stop offset="0" stopColor="#000" stopOpacity="0.09" />
                <stop offset="0.18" stopColor="#000" stopOpacity="0" />
                <stop offset="0.82" stopColor="#000" stopOpacity="0" />
                <stop offset="1" stopColor="#000" stopOpacity="0.07" />
              </linearGradient>
              <clipPath id="cup-clip">
                <path d="M328,860 L472,860 L461,971 Q460,978 452,978 L348,978 Q340,978 339,971 Z" />
              </clipPath>
              <clipPath id="half-dot">
                <rect x="447" y="560" width="5" height="12" />
              </clipPath>
            </defs>

            <ellipse ref={bind("shadow")} cx="400" cy="768" rx="160" ry="14" fill="#000" opacity="0.14" />

            {/* Vaso */}
            <g ref={bind("cup")} opacity="0">
              <g clipPath="url(#cup-clip)">
                <rect ref={bind("liquid")} x="320" y="968" width="160" height="200" fill={C.coffee} />
                <rect ref={bind("crema")} x="320" y="968" width="160" height="7" fill={C.crema} opacity="0" />
              </g>
              <path
                d="M326,858 L474,858 L462,972 Q461,980 452,980 L348,980 Q339,980 338,972 Z"
                fill="#ffffff"
                fillOpacity="0.18"
                stroke={C.ink}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path d="M343,872 L353,962" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round" />
              <text
                x="400"
                y="944"
                textAnchor="middle"
                fontSize="46"
                fontWeight="900"
                style={{ fontStretch: "62%" }}
                textLength="104"
                lengthAdjust="spacingAndGlyphs"
                fill={C.bag}
                fillOpacity="0.92"
              >
                NOBLE
              </text>
              {[0, 1, 2].map((i) => (
                <path
                  key={i}
                  ref={bind(`steam${i}`)}
                  d={[
                    "M378,846 C366,822 392,806 378,780",
                    "M400,846 C388,818 414,800 400,770",
                    "M422,846 C410,822 436,806 422,780",
                  ][i]}
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0"
                  className="text-ink"
                />
              ))}
            </g>

            {/* Chorro de café */}
            <rect ref={bind("stream")} x="397" y="786" width="6" height="0" rx="3" fill={C.coffee} />

            {/* Molino manual */}
            <g ref={bind("grinder")} opacity="0">
              <rect x="396" y="472" width="8" height="48" fill={C.body} />
              <rect ref={bind("arm")} x="400" y="467" width="80" height="10" rx="5" fill={C.body} />
              <ellipse ref={bind("knob")} cx="480" cy="458" rx="8" ry="14" fill={C.wood} stroke={C.ink} strokeWidth="1.5" />
              <path d="M322,524 L478,524 L452,600 L348,600 Z" fill={C.metal} stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
              <rect x="316" y="516" width="168" height="12" rx="6" fill={C.metalDark} stroke={C.ink} strokeWidth="2" />
              <rect x="344" y="598" width="112" height="172" rx="10" fill={C.body} />
              <rect x="344" y="652" width="112" height="24" fill={C.gold} />
              <text
                x="400"
                y="671"
                textAnchor="middle"
                fontSize="20"
                fontWeight="900"
                style={{ fontStretch: "62%" }}
                fill={C.ink}
              >
                NOBLE
              </text>
              <path d="M382,770 L418,770 L409,788 L391,788 Z" fill={C.body} />
            </g>

            {/* Granos */}
            {BEANS.map((_, i) => (
              <g key={i} ref={bind(`bean${i}`)} opacity="0">
                <ellipse rx="8" ry="11" fill={C.bean} />
                <path d="M0,-9 C4,-3 -4,3 0,9" stroke={C.beanLine} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </g>
            ))}

            {/* Bolsa */}
            <g ref={bind("bag")}>
              <path
                d="M250,330 L250,722 Q250,750 278,750 L522,750 Q550,750 550,722 L550,330 Z"
                fill={C.bag}
                stroke={C.ink}
                strokeOpacity="0.28"
                strokeWidth="2"
              />
              <path d="M250,330 L250,722 Q250,750 278,750 L522,750 Q550,750 550,722 L550,330 Z" fill="url(#bag-shade)" />
              <ellipse ref={bind("mouth")} cx="400" cy="331" rx="148" ry="9" fill="#2a1d14" opacity="0" />
              <line x1="262" y1="352" x2="538" y2="352" stroke={C.ink} strokeOpacity="0.3" strokeDasharray="6 5" strokeWidth="2" />
              <line x1="262" y1="361" x2="538" y2="361" stroke={C.ink} strokeOpacity="0.12" strokeWidth="2" />
              <circle cx="400" cy="400" r="15" fill="none" stroke={C.ink} strokeOpacity="0.28" strokeWidth="2" />
              {[
                [394, 394],
                [406, 394],
                [394, 406],
                [406, 406],
              ].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill={C.ink} fillOpacity="0.4" />
              ))}

              {/* Etiqueta dorada, como la bolsa real */}
              <rect x="274" y="448" width="252" height="262" fill={C.gold} />
              <g fill={C.ink} fontSize="11" fontWeight="700" style={{ letterSpacing: "0.02em" }}>
                <text x="290" y="474">CAFÉ TRADICIONAL</text>
                <circle cx="294" cy="488" r="4" fill="none" stroke={C.ink} strokeWidth="1.2" />
                <text x="303" y="492" fontWeight="500">GRANO</text>
                <circle cx="294" cy="504" r="4" />
                <text x="303" y="508" fontWeight="500">MOLIDO</text>
                <text x="420" y="474">NOTAS</text>
                <g fontWeight="500" fontSize="10">
                  <text x="420" y="492">CHOCOLATE</text>
                  <text x="420" y="506">CARAMELO</text>
                  <text x="420" y="520">FRUTOS ROJOS</text>
                  <text x="420" y="534">PANELA</text>
                </g>
                <text x="290" y="560">PITALITO, HUILA.</text>
                <text x="290" y="576" fontWeight="500" fontSize="10">340 G.   12 OZ.</text>
                <text x="420" y="556">ACIDEZ</text>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <circle
                    key={i}
                    cx={426 + i * 13}
                    cy="566"
                    r="5"
                    fill={i < 2 ? C.ink : "none"}
                    stroke={C.ink}
                    strokeWidth="1.2"
                  />
                ))}
                <circle cx="452" cy="566" r="5" clipPath="url(#half-dot)" />
              </g>
              <text
                x="284"
                y="694"
                fontSize="120"
                fontWeight="900"
                style={{ fontStretch: "62%" }}
                textLength="226"
                lengthAdjust="spacingAndGlyphs"
                fill={C.ink}
              >
                NOBLE
              </text>
              <text x="512" y="606" fontSize="11" fontWeight="700" fill={C.ink}>
                ®
              </text>

              {/* Parte superior que se rasga */}
              <g ref={bind("top")}>
                <path d={zigzag} fill={C.bag} stroke={C.ink} strokeOpacity="0.28" strokeWidth="2" strokeLinejoin="round" />
                <path d={zigzag} fill="url(#bag-shade)" />
                <line x1="262" y1="300" x2="538" y2="300" stroke={C.ink} strokeOpacity="0.14" strokeWidth="6" />
                <path d="M250,322 L262,328 L250,334" fill="none" stroke={C.ink} strokeOpacity="0.4" strokeWidth="1.5" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
