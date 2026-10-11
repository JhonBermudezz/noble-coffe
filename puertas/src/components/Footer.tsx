import { EMAIL, PHONE, asset, services } from "../data";

export function Footer() {
  return (
    <footer className="bg-[#06111e] text-white/70">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr] md:px-8">
        <div>
          <img src={asset("img/logo-cubo.png")} alt="Puertas Automáticas del Llano" className="h-14 w-auto" />
          <p className="mt-4 max-w-xs">Instalación, automatización y mantenimiento de puertas automáticas en Villavicencio y el Meta.</p>
        </div>
        <div>
          <p className="font-bold text-white">Servicios</p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <a href="#servicios" className="hover:text-white">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold text-white">Contacto</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{PHONE}</li>
            <li>{EMAIL}</li>
            <li>Villavicencio, Meta, Colombia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6 text-center text-xs text-white/40">© {new Date().getFullYear()} Puertas Automáticas del Llano</div>
    </footer>
  );
}
