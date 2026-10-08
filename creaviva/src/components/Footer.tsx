import { INSTAGRAM, img } from "../data";

export function Footer() {
  return (
    <footer className="bg-forest px-5 py-14 text-cream">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <img src={img("logo")} alt="Creaviva Café" className="h-20 w-20 rounded-full" />
        <p className="text-sm tracking-[0.2em] text-cream/70 uppercase">Café · Arte · Plantas · Experiencias</p>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="font-display text-2xl italic hover:text-mustard">
          @creaviva_cafe
        </a>
      </div>
    </footer>
  );
}
