import { INSTAGRAM_DM, img } from "../data";

const links = [
  { href: "#pinta", label: "Pinta" },
  { href: "#kits", label: "Kits" },
  { href: "#plan", label: "Tu plan" },
  { href: "#menu", label: "Menú" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <nav className="mx-auto flex max-w-[1300px] items-center justify-between gap-3 rounded-full bg-cream/85 py-2 pl-2 pr-2 shadow-[0_8px_30px_-14px_rgb(31_74_50/0.4)] backdrop-blur-md">
        <a href="#top" className="flex items-center gap-2" aria-label="Creaviva Café, inicio">
          <img src={img("logo")} alt="" className="h-11 w-11 rounded-full" />
          <span className="font-display text-2xl text-forest">Creaviva</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="block rounded-full px-4 py-2 text-[15px] font-medium text-forest transition-colors hover:bg-forest/10">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={INSTAGRAM_DM}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-forest px-5 py-2.5 text-[15px] font-semibold text-cream transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          Reserva
        </a>
      </nav>
    </header>
  );
}
