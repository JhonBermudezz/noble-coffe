# Noble Café

Sitio web de Noble Café (@somos.noble). Hecho con React, Vite y Tailwind CSS v4.

Animaciones, cada librería en su zona:
- **Motion** (`motion/react`): menú con crossfade, tarjeta de detalle con elemento compartido (`layoutId`), magnificación tipo dock, píldora del menú superior, bolsa y Chemex con scroll.
- **GSAP + ScrollTrigger + SplitText**: texto que se enciende letra por letra con el scroll (`Statement`, `ScrollText`) y la galería horizontal fijada (`Moments`).
- **anime.js**: pantalla de carga (letras del logo, óvalo que se dibuja, contador).

## Desarrollo

```bash
npm install
npm run dev      # servidor local en http://localhost:5173 (menú en /menu/)
npm run build    # genera el sitio estático en dist/
```

## Editar contenido

- **Menú y precios:** `src/data/menu.ts`. Los precios van en miles (`4.5` se muestra como `4.5K`).
- **Dirección, Instagram y enlace de mapas:** también en `src/data/menu.ts`.
- **Filtrado del mes:** bloque `monthly` en `src/data/menu.ts` (título y método). El dibujo del contorno es el de la prensa francesa; para otro método (Chemex, V60) hay que cambiar el trazado en `src/components/MonthlyFilter.tsx`.
- **Horario y "Abierto ahora":** `src/data/hours.ts` (usa la hora de Bogotá).
- **Reseñas:** pega reseñas reales de Google en `src/data/reviews.ts`. Con la lista vacía la sección no aparece.
- **Foto de cada bebida (hover del menú):** campo `photo` de cada producto en `src/data/menu.ts`.
- **Logo:** `src/components/logo-data.ts` (vectorizado de la foto de la bolsa). Si llega el SVG oficial, se reemplazan los trazados de ahí.
- **Fotos:** coloca las fotos originales (`imgi_*.jpg`) en la raíz y ejecuta `npm run images`. Las versiones optimizadas quedan en `public/img/`. Para usar una foto nueva, agrégala al diccionario `NAMES` de `scripts/optimize_images.py`.

## Publicar

Al hacer merge a `main`, el workflow `.github/workflows/deploy.yml` publica el sitio en GitHub Pages.
Antes hay que activar Pages una vez en **Settings → Pages → Source: GitHub Actions**.
