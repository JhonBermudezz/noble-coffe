import { motion } from "motion/react";

// Bordes pintados entre secciones, para que el cambio de color no sea una línea recta.
// "brush": borde superior ondulado e irregular con gotitas salpicadas.
// "drips": la pintura chorrea por debajo de la sección.

const BRUSH =
  "M0 64C58 40 96 58 150 46s92-30 150-20 70 30 128 22 96-40 160-36 84 34 142 30 104-30 168-26 72 28 132 24 100-38 160-30 74 30 130 26 90-26 120-20V100H0z";

const SPLATS = [
  { x: 7, y: 18, r: 7 },
  { x: 9.5, y: 6, r: 4 },
  { x: 33, y: 10, r: 5 },
  { x: 58, y: 2, r: 8 },
  { x: 61, y: 16, r: 3.5 },
  { x: 84, y: 8, r: 6 },
  { x: 92, y: 20, r: 4 },
];

// Silueta de pintura chorreando: borde ondulado y gotas que se adelgazan con la punta redonda.
const DRIP_PATH =
  "M0 0H1440V20C1399 26 1399 14 1358 18C1358 54 1355 84 1357 91A7.4 7.4 0 1 1 1343 91C1345 84 1342 54 1342 18C1283 26 1283 14 1224 18C1224 41 1218 45 1223 57A12.9 12.9 0 1 1 1197 57C1202 45 1196 41 1196 18C1128 26 1128 14 1060 18C1060 65 1056 104 1059 113A9.2 9.2 0 1 1 1041 113C1044 104 1040 65 1040 18C982 26 982 14 925 18C925 36 917 22 923 40A18.4 18.4 0 1 1 887 40C893 22 885 36 885 18C826 26 826 14 767 18C767 51 764 79 766 86A6.4 6.4 0 1 1 754 86C756 79 753 51 753 18C704 26 704 14 655 18C655 44 649 49 654 62A13.8 13.8 0 1 1 626 62C631 49 625 44 625 18C553 26 553 14 481 18C481 74 477 122 480 132A10.1 10.1 0 1 1 460 132C463 122 459 74 459 18C406 26 406 14 352 18C352 33 343 12 350 32A20.2 20.2 0 1 1 310 32C317 12 308 33 308 18C254 26 254 14 199 18C199 59 195 94 198 102A8.3 8.3 0 1 1 182 102C185 94 181 59 181 18C134 26 134 14 87 18C87 39 80 33 86 48A15.6 15.6 0 1 1 54 48C60 33 53 39 53 18C26 12 26 26 0 20Z";

export function Edge({ color, variant, flip = false }: { color: string; variant: "brush" | "drips"; flip?: boolean }) {
  if (variant === "brush") {
    return (
      <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-full z-10 h-14 md:h-20 ${flip ? "scale-x-[-1]" : ""}`}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d={BRUSH} fill={color} />
        </svg>
        {SPLATS.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r * 2, height: s.r * 2, background: color }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 12, delay: i * 0.05 }}
          />
        ))}
      </div>
    );
  }

  // En celular se usa solo la mitad del dibujo para que las gotas no queden tan delgadas.
  return (
    <>
      {["0 0 720 150", "0 0 1440 150"].map((box, i) => (
        <motion.svg
          key={box}
          aria-hidden
          viewBox={box}
          preserveAspectRatio="none"
          className={`pointer-events-none absolute inset-x-0 top-full z-20 -mt-px w-full origin-top ${i === 0 ? "h-[80px] md:hidden" : "hidden h-[150px] md:block"}`}
          initial={{ scaleY: 0.12 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.8, ease: [0.3, 0.9, 0.4, 1] }}
        >
          <path d={DRIP_PATH} fill={color} />
        </motion.svg>
      ))}
    </>
  );
}
