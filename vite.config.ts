import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/pdfjs-dist/build/pdf.worker.mjs",
          dest: ".",
        },
      ],
    }),
  ],
  base: "/", // jangan dikasih ./, karena akan error
  define: {
    "process.env": {},
  },
  build: {
    chunkSizeWarningLimit: 1000, // Setel ke 1000 kB (1 MB)
    rollupOptions: {
      output: {
        manualChunks: {
          pdfjs: ["pdfjs-dist"],
        },
      },
    },
  },
});
