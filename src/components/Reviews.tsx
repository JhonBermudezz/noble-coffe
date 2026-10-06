import { Star } from "@phosphor-icons/react";
import { reviews } from "../data/reviews";
import { Reveal } from "./Reveal";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={16} weight={i < rating ? "fill" : "regular"} />
      ))}
    </div>
  );
}

// Solo aparece cuando hay reseñas reales cargadas en src/data/reviews.ts.
export function Reviews() {
  if (reviews.length === 0) return null;
  const [main, ...rest] = reviews;

  return (
    <section aria-labelledby="reviews-title" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <h2 id="reviews-title" className="sr-only">
        Reseñas de clientes en Google
      </h2>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <figure>
            <Stars rating={main.rating} />
            <blockquote className="mt-6 font-display text-[clamp(1.9rem,3.6vw,3.25rem)] leading-[1.08]">
              “{main.quote}”
            </blockquote>
            <figcaption className="mt-6 text-muted">{main.author}, en Google</figcaption>
          </figure>
        </Reveal>
        <div className="space-y-10 lg:col-span-4 lg:col-start-9 lg:pt-4">
          {rest.map((r, i) => (
            <Reveal key={r.author} delay={0.1 * (i + 1)}>
              <figure className="border-t border-line pt-6">
                <Stars rating={r.rating} />
                <blockquote className="mt-4 text-lg leading-snug">“{r.quote}”</blockquote>
                <figcaption className="mt-3 text-sm text-muted">{r.author}, en Google</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
