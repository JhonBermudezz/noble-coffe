import { useLayoutEffect, useRef } from "react";
import { gsap, NO_REDUCED_MOTION, SplitText } from "../lib/gsap";
import { Photo } from "./Photo";

// Frase de la marca en tipografía gigante. Las letras se encienden con el scroll
// y las fotos redondas se abren al terminar cada línea.
export function Statement() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add(NO_REDUCED_MOTION, () => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-line]", section);
      const splits = lines.map((line) =>
        SplitText.create(line.querySelector("[data-words]")!, {
          type: "words,chars",
          wordsClass: "inline-block",
          charsClass: "inline-block",
        }),
      );

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 78%", end: "bottom 62%", scrub: 0.7 },
      });
      lines.forEach((line, i) => {
        const photo = line.querySelector("[data-photo]");
        tl.fromTo(
          splits[i].chars,
          { opacity: 0.1, yPercent: 40 },
          { opacity: 1, yPercent: 0, ease: "none", stagger: 0.06, duration: 1 },
          i === 0 ? 0 : ">-0.35",
        );
        if (photo) tl.fromTo(photo, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, ease: "back.out(1.6)", duration: 0.8 }, ">-0.5");
      });

      return () => splits.forEach((s) => s.revert());
    });

    return () => mm.revert();
  }, []);

  const photo = (shape: string, className = "") => (
    <span
      data-photo
      aria-hidden
      className={`inline-block aspect-square h-[0.82em] shrink-0 overflow-hidden align-[-0.08em] ${shape} ${className}`}
    >
      <Photo name={shape.includes("arch") ? "silla" : shape.includes("oval") ? "chemex" : "iced-mano"} alt="" sizes="160px" />
    </span>
  );

  return (
    <section ref={root} aria-label="Buen día, buen café, buenos momentos" className="overflow-hidden px-4 py-28 md:px-8 md:py-44">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 font-display text-[clamp(3rem,11.5vw,10.5rem)] leading-[0.95] md:gap-4">
        <div data-line className="flex items-center gap-[0.18em]">
          <span data-words>Buen día.</span>
          {photo("rounded-full")}
        </div>
        <div data-line className="flex items-center gap-[0.18em] pl-[10vw]">
          {photo("rounded-t-full arch", "!aspect-[3/4] !h-[0.9em]")}
          <span data-words>Buen café.</span>
        </div>
        <div data-line className="flex items-center gap-[0.18em] pl-[3vw]">
          <span data-words>Buenos momentos.</span>
        </div>
      </div>
    </section>
  );
}
