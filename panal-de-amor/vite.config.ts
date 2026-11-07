import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Sexto sitio de la serie: se compila aparte y queda en dist/panal-de-amor/.
// Fotos tomadas de la carpeta img del repo panal-de-amor e ilustraciones generadas.
export default defineConfig({
  root: __dirname,
  base: "./",
  publicDir: resolve(__dirname, "public"),
  plugins: [react(), tailwindcss()],
  build: {
    outDir: resolve(__dirname, "../dist/panal-de-amor"),
    emptyOutDir: true,
  },
});
