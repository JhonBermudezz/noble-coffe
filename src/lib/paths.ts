// Cada página HTML declara su raíz relativa (data-root) para que las rutas
// funcionen igual en GitHub Pages, en un dominio propio o en local.
export const ROOT = document.documentElement.dataset.root ?? "./";

export const asset = (path: string) => `${ROOT}${path}`;
