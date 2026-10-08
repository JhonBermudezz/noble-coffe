import { INSTAGRAM, INSTAGRAM_DM, img } from "../data";
import { Drift } from "./Drift";
import { Painted } from "./Painted";

// Cierre. La dirección y el horario se agregan cuando estén confirmados.
export function Visit() {
  return (
    <section id="visita" className="relative overflow-hidden bg-terra py-24 text-cream md:py-32">
      <Drift className="absolute -bottom-10 -left-12 w-56 md:-left-36 md:w-80" rotate={30} y={-60}>
        <Painted name="monstera" color="#1f4a32" className="w-full" />
      </Drift>
      <Drift className="absolute -right-10 -top-10 w-40 md:w-56" rotate={160} y={40}>
        <Painted name="flower" color="#f2c230" className="w-full" />
      </Drift>

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="font-display text-[clamp(2.8rem,6.4vw,5.6rem)] leading-[0.95] [&_em]:text-mustard">
            Tu terapia cuesta menos que una sesión de <em>psicología</em>.
          </h2>
          <p className="mt-6 max-w-md text-lg text-cream/85">Pinta cerámica, desconéctate un rato y disfruta el proceso.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={INSTAGRAM_DM} target="_blank" rel="noreferrer" className="rounded-full bg-cream px-7 py-4 text-[17px] font-semibold text-forest transition-transform hover:-translate-y-0.5">
              Reserva tu mesa
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="rounded-full px-7 py-4 text-[17px] font-semibold underline decoration-cream/50 underline-offset-4 hover:decoration-cream">
              @creaviva_cafe
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img src={img("dolce-vita")} alt="Cuadro La Dolce Vita pintado en el local" loading="lazy" className="aspect-[3/4] w-full rounded-[20px] object-cover" />
          <img src={img("coffee-time")} alt="Cuadro Coffee Time sobre la pared verde" loading="lazy" className="mt-12 aspect-[3/4] w-full rounded-[20px] object-cover" />
        </div>
      </div>
    </section>
  );
}
