import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Rutas relativas para que el build funcione igual en GitHub Pages, Netlify o Vercel.
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Dos páginas: el inicio y el menú completo en /menu/.
      input: {
        main: resolve(__dirname, "index.html"),
        menu: resolve(__dirname, "menu/index.html"),
      },
    },
  },
});
