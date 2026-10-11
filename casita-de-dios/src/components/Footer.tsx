import { img } from "../data";

// Cierre bajo el techo de flores, con el letrero encendido.
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-cacao-2 pb-10 text-crema">
      <div aria-hidden className="pointer-events-none h-[150px] overflow-hidden md:h-[230px]">
        <img src={img("guirnalda")} alt="" className="sway h-[300px] w-full object-cover object-top opacity-90 md:h-auto" />
      </div>
      <div className="relative -mt-6 px-4 text-center">
        <div className="neon-glow mx-auto w-fit">
          <img src={img("logo-casita")} alt="La Casita de Dios" loading="lazy" className="mx-auto w-[min(70vw,360px)]" />
        </div>
        <p className="script mt-6 text-4xl text-chicle md:text-5xl">Fe, café y amor</p>
        <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 font-bold">
          <a href="#carta" className="hover:text-menta">La carta</a>
          <a href="#taza" className="hover:text-menta">Un café con Dios</a>
          <a href="#cajita" className="hover:text-menta">Tu cajita</a>
          <a href="#celebra" className="hover:text-menta">Celebraciones</a>
          <a href="#visita" className="hover:text-menta">Visítanos</a>
        </nav>
        <p className="mt-10 text-sm text-crema/60">© {new Date().getFullYear()} La Casita de Dios · Cada día es un regalo de Dios para amar más.</p>
      </div>
    </footer>
  );
}
