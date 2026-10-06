import { formatPrice, type MenuItem } from "../data/menu";
import { Photo } from "./Photo";

type MenuRowProps = {
  item: MenuItem;
  fallbackPhoto: string;
  onHover: (photo: string | null) => void;
  size?: "lg" | "md";
};

// Fila del menú: nombre grande, nota y precio. En celular muestra una miniatura redonda.
export function MenuRow({ item, fallbackPhoto, onHover, size = "lg" }: MenuRowProps) {
  const photo = item.photo ?? fallbackPhoto;

  return (
    <li
      onPointerEnter={(e) => e.pointerType === "mouse" && onHover(photo)}
      onPointerLeave={() => onHover(null)}
      className="group flex items-center gap-4 border-b border-line py-4 md:py-5"
    >
      <span className="block size-12 shrink-0 overflow-hidden rounded-full md:hidden">
        <Photo name={photo} alt="" sizes="48px" />
      </span>
      <div className="min-w-0 flex-1 transition-transform duration-500 ease-out-expo md:group-hover:translate-x-3">
        <p
          className={`font-display leading-[1.05] ${
            size === "lg" ? "text-[clamp(1.6rem,3.4vw,2.75rem)]" : "text-[clamp(1.5rem,2.6vw,2.25rem)]"
          }`}
        >
          {item.name}
        </p>
        {item.note && <p className="mt-1 text-sm text-muted md:text-base">{item.note}</p>}
      </div>
      <span className="shrink-0 font-mono text-base tabular-nums md:text-lg">
        {item.price !== undefined ? formatPrice(item.price) : "En barra"}
      </span>
    </li>
  );
}
