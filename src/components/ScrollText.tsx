import { useLayoutEffect, useRef, type ElementType, type RefObject } from "react";
import { gsap, NO_REDUCED_MOTION, SplitText } from "../lib/gsap";

type ScrollTextProps = {
  children: string;
  as?: ElementType;
  className?: string;
  id?: string;
  // Elemento que dispara la animación. Por defecto, el propio texto.
  trigger?: RefObject<HTMLElement | null>;
  start?: string | (() => string);
  end?: string | (() => string);
  // Opacidad inicial de las letras antes de encenderse (0 = invisibles).
  from?: number;
};

// Cada letra aparece con el avance del scroll (scrub): al subir, el texto se vuelve a apagar.
export function ScrollText({
  children,
  as: Tag = "h2",
  className,
  id,
  trigger,
  start = "top 82%",
  end = "bottom 48%",
  from = 0.1,
}: ScrollTextProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(NO_REDUCED_MOTION, () => {
      const split = SplitText.create(el, { type: "words,chars", wordsClass: "inline-block", charsClass: "inline-block" });
      gsap.fromTo(
        split.chars,
        { opacity: from, yPercent: 35 },
        {
          opacity: 1,
          yPercent: 0,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: trigger?.current ?? el, start, end, scrub: 0.6 },
        },
      );
      return () => split.revert();
    });
    return () => mm.revert();
  }, [trigger, start, end, from]);

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
