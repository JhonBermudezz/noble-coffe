import { Photo } from "./Photo";

// Frases que la marca ya usa en sus publicaciones, intercaladas con fotos circulares.
const words = [
  { text: "Buen día", photo: "chemex" },
  { text: "Buen café", photo: "postre-frutos" },
  { text: "Buenos momentos", photo: "silla" },
  { text: "Everyday happiness", photo: "iced-mano" },
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10" aria-hidden={hidden}>
      {words.map((w) => (
        <div key={w.text} className="flex items-center gap-6 md:gap-10">
          <span className="whitespace-nowrap rounded-[50%] border border-ink/60 px-[0.55em] py-[0.12em] font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05]">
            {w.text}
          </span>
          <span className="block aspect-square w-[clamp(3rem,6vw,5.25rem)] shrink-0 overflow-hidden rounded-full">
            <Photo name={w.photo} alt="" sizes="96px" />
          </span>
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section aria-label="Buen día, buen café, buenos momentos" className="overflow-hidden border-y border-line py-8 md:py-12">
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
