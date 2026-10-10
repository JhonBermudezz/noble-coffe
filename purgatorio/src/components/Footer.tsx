import { img } from "../data";

// Almenas del castillo contra la luna y "Memento mori" en neón.
export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-40">
      <div aria-hidden className="absolute left-1/2 top-6 h-40 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_40%_40%,#fff7e6,#e9dcc0_55%,#b9a98a)] shadow-[0_0_120px_40px_rgb(239_230_216/0.15)]" />
      <svg aria-hidden viewBox="0 0 1440 160" preserveAspectRatio="none" className="relative block h-28 w-full md:h-40">
        <path
          fill="#050304"
          d="M0 160V70h40V40h30v30h40V40h30v30h40V40h30v30h60V20h20V0h40v20h20v50h40V40h30v30h40V40h30v30h120V30h30V10h40v20h30v40h120V40h30v30h40V40h30v30h60V20h20V0h40v20h20v50h40V40h30v30h40V40h30v30h40V40h30v120z"
        />
      </svg>
      <div className="bg-[#050304] px-5 pb-10 pt-6 text-center">
        <p className="title neon text-[clamp(2.6rem,8vw,5.5rem)]">Memento mori</p>
        <img src={img("logo")} alt="El Purgatorio" className="mx-auto mt-8 h-24 w-24 rounded-full" />
        <p className="mt-4 font-script text-3xl text-bone/80">Arte, café y algo más</p>
        <p className="mt-8 text-sm text-bone/40">© {new Date().getFullYear()} El Purgatorio · Castillo del Mono Osorio · Bogotá</p>
      </div>
    </footer>
  );
}
