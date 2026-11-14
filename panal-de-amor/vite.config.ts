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
    // Sitio de varias páginas: cada una tiene su index.html para abrirla directo; comparten el mismo código.
    rollupOptions: {
      input: Object.fromEntries(
        [
          "", "souvenirs", "personaliza", "nosotros", "como-pedir", "ideas", "contacto",
          // Un index.html por artículo del blog, para abrirlo directo desde Google o un enlace compartido.
          "ideas/que-significa-regalar-un-frasquito-de-miel", "ideas/ideas-recordatorios-para-bodas",
          "ideas/recordatorios-para-bautizos", "ideas/recordatorios-para-quince-anos",
        ].map((p) => [p || "inicio", resolve(__dirname, p, "index.html")]),
      ),
    },
  },
});
