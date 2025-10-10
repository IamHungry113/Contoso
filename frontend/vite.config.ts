import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  esbuild: {
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    target: "es2017",
  },
  build: {
    sourcemap: true,
    minify: "esbuild",
  },
});
