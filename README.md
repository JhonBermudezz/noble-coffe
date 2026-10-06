# Noble Café

Sitio web de Noble Café (@somos.noble). Hecho con React, Vite, Tailwind CSS v4 y Motion.

## Desarrollo

```bash
npm install
npm run dev      # servidor local en http://localhost:5173
npm run build    # genera el sitio estático en dist/
```

## Editar contenido

- **Menú y precios:** `src/data/menu.ts`. Los precios van en miles (`4.5` se muestra como `4.5K`).
- **Dirección, Instagram y enlace de mapas:** también en `src/data/menu.ts`.
- **Fotos:** coloca las fotos originales (`imgi_*.jpg`) en la raíz y ejecuta `npm run images`. Las versiones optimizadas quedan en `public/img/`. Para usar una foto nueva, agrégala al diccionario `NAMES` de `scripts/optimize_images.py`.

## Publicar

Al hacer merge a `main`, el workflow `.github/workflows/deploy.yml` publica el sitio en GitHub Pages.
Antes hay que activar Pages una vez en **Settings → Pages → Source: GitHub Actions**.
