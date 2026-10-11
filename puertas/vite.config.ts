import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Rediseño de Puertas Automáticas del Llano: se compila aparte y queda en dist/puertas/,
// junto al de Noble. Las rutas son relativas, así que renombrar el repo no rompe nada.
export default defineConfig({
  root: __dirname,
  base: "./",
  publicDir: resolve(__dirname, "public"),
  plugins: [react(), tailwindcss()],
  build: {
    outDir: resolve(__dirname, "../dist/puertas"),
    emptyOutDir: true,
  },
});
