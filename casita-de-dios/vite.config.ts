import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Quinto sitio de la serie: se compila aparte y queda en dist/casita-de-dios/.
// Los archivos que sube el dueño viven en fotos/ y no se publican; solo public/.
export default defineConfig({
  root: __dirname,
  base: "./",
  publicDir: resolve(__dirname, "public"),
  plugins: [react(), tailwindcss()],
  build: {
    outDir: resolve(__dirname, "../dist/casita-de-dios"),
    emptyOutDir: true,
  },
});
