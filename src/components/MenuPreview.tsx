import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { featured } from "../data/menu";
import { ROOT } from "../lib/paths";
import { CursorImage } from "./CursorImage";
import { MagnifyList, MagnifyRow } from "./menu/MagnifyList";
import { MenuSelectionProvider } from "./menu/selection";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

// Adelanto del menú en el inicio. La carta completa vive en /menu.
export function MenuPreview() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <MenuSelectionProvider>
      <section id="menu" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-36">
        <CursorImage photo={hovered} />
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <h2 className="font-display text-[clamp(2.75rem,5.5vw,4.75rem)] leading-[0.95]">
                  Pocas cosas,
                  <br />
                  bien hechas.
                </h2>
              </Reveal>
              <div className="relative mt-10 hidden aspect-[3/4] w-[70%] overflow-hidden rounded-full lg:block">
                <Photo name="chemex-gorra" alt="Chemex con café sostenida sobre una gorra Everyday Happiness" sizes="30vw" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <MagnifyList className="border-t border-line">
              {featured.map((item) => (
                <MagnifyRow key={item.name} item={{ id: `home-${item.name}`, ...item }} onHover={setHovered} />
              ))}
            </MagnifyList>
            <a
              href={`${ROOT}menu/`}
              className="group mt-10 inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-ink px-7 py-4 text-lg font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Ver menú completo
              <ArrowRight size={20} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
    </MenuSelectionProvider>
  );
}
