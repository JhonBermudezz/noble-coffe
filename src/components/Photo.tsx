import { asset } from "../lib/paths";

type PhotoProps = {
  name: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

// Imágenes optimizadas por scripts/optimize_images.py (800px y 1600px).
export function Photo({ name, alt, sizes = "(min-width: 1024px) 50vw, 100vw", priority, className = "" }: PhotoProps) {
  return (
    <img
      src={asset(`img/${name}-1600.webp`)}
      srcSet={`${asset(`img/${name}-800.webp`)} 800w, ${asset(`img/${name}-1600.webp`)} 1600w`}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`h-full w-full bg-paper-2 object-cover ${className}`}
    />
  );
}
