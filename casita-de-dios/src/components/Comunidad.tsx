import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { img } from "../data";

const COLS: { src: string; alt: string; shape: string; speed: number }[][] = [
  [
    { src: "barista-espalda", alt: "Una de las chicas del equipo con su delantal menta frente a la vitrina", shape: "casa", speed: -60 },
    { src: "latte-trebol", alt: "Capuccino con arte de trébol en taza floreada", shape: "rounded-full aspect-square", speed: -60 },
  ],
  [
    { src: "galletas-agradece", alt: "Galletas con un corazón que dice: Agradece, agradece, agradece", shape: "arco", speed: 60 },
    { src: "granos", alt: "Granos de café cayendo sobre la mesa floreada", shape: "rounded-[30px]", speed: 60 },
  ],
  [
    { src: "caja-sonrisa", alt: "La cajera sonriendo con dos bebidas en la mano", shape: "rounded-[30px]", speed: -120 },
    { src: "galleta-mano", alt: "Galleta de Oreo con chocolate blanco", shape: "casa", speed: -120 },
  ],
  [
    { src: "barista", alt: "Una barista haciendo caras divertidas en el salón", shape: "arco", speed: 20 },
    { src: "espresso", alt: "Espresso cayendo de la máquina", shape: "rounded-full aspect-square", speed: 20 },
  ],
];

function Col({ items, p, i }: { items: (typeof COLS)[number]; p: MotionValue<number>; i: number }) {
  const y = useTransform(p, [0, 1], [0, items[0].speed]);
  const reduce = useReducedMotion();
  return (
    <motion.div style={reduce ? undefined : { y }} className={`flex flex-col gap-5 ${i % 2 ? "pt-16" : ""}`}>
      {items.map((it) => (
        <div key={it.src} className={`overflow-hidden ${it.shape} ${it.shape.includes("aspect") ? "" : "aspect-[3/4]"} shadow-[0_0_0_5px_#fff,0_20px_40px_-24px_rgb(98_42_28/0.6)]`}>
          <img src={img(it.src)} alt={it.alt} loading="lazy" className="h-full w-full object-cover" />
        </div>
      ))}
    </motion.div>
  );
}

// La pared amarilla de las frases: su comunidad en fotos con formas de la casita,
// y una frase de sus historias que se escribe sola con el scroll.
export function Comunidad() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const write = useTransform(p, [0.1, 0.45], [100, 0]);
  const clipPath = useTransform(write, (v) => `inset(-20% ${v}% -30% 0)`);

  return (
    <section ref={ref} className="relative overflow-hidden bg-vainilla py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-4 md:px-8">
        <p className="script text-3xl text-rosa-2 md:text-4xl">Gracias por ser parte de</p>
        <h2 className="display text-[clamp(3rem,8vw,6.5rem)]">nuestra comunidad</h2>
        <motion.p style={{ clipPath }} className="script mt-6 max-w-4xl text-[clamp(2.2rem,5vw,4rem)] leading-tight text-cacao">
          “Me sorprende lo feliz que puedo ser por solo ir por un café.”
        </motion.p>

        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {COLS.map((c, i) => (
            <Col key={i} items={c} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
