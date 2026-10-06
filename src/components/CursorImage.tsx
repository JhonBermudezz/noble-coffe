import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import { useEffect } from "react";
import { Photo } from "./Photo";

// Foto ovalada que sigue al cursor sobre el menú. Se inclina según la velocidad del mouse.
// Solo existe en dispositivos con puntero fino; en celular se usan miniaturas.
export function CursorImage({ photo }: { photo: string | null }) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });
  const rotate = useTransform(useVelocity(sx), [-1600, 1600], [-12, 12], { clamp: true });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy, rotate }}
      className="pointer-events-none fixed left-0 top-0 z-40 hidden [@media(hover:hover)_and_(pointer:fine)]:block"
    >
      <AnimatePresence>
        {photo && (
          <motion.div
            key={photo}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: "-50%", y: "-50%" }}
            className="absolute aspect-[4/5] w-56 overflow-hidden rounded-full shadow-[0_24px_60px_-20px_rgb(22_22_20/0.45)] xl:w-64"
          >
            <Photo name={photo} alt="" sizes="256px" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
