import { img } from "../data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-4 border-ink bg-brown text-paper">
      <div className="mx-auto flex max-w-[1300px] flex-col items-center gap-6 px-4 pb-40 pt-14 text-center md:flex-row md:justify-between md:px-8 md:text-left">
        <img src={img("logo")} alt="Geekveria, tu nación geek" className="h-14 w-auto" />
        <p className="font-display text-2xl uppercase tracking-[0.15em] text-yellow">Club · Cómic + Manga · Café</p>
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-36" style={{ backgroundImage: `url(${img("crowd-sm")})`, backgroundRepeat: "repeat-x", backgroundSize: "auto 100%" }} />
    </footer>
  );
}
