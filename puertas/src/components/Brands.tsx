import { asset, brands } from "../data";

export function Brands() {
  const list = [...brands, ...brands];
  return (
    <section aria-label="Marcas que manejamos" className="border-y border-line py-12">
      <p className="text-center text-sm font-bold uppercase tracking-[0.18em] text-steel">Marcas que instalamos y reparamos</p>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-14">
          {list.map((b, i) => (
            <img key={i} src={asset(`marcas/${b}.webp`)} alt={b} className="h-10 w-auto max-w-[140px] object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-12" />
          ))}
        </div>
      </div>
    </section>
  );
}
