import path from "path";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";

export default defineConfig({
  //base: "https://plataformadev.mbrplay.com.br/microfront/alt/",
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  plugins: [react(), mkcert()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});