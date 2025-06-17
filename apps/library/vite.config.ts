import tailwindcss from "@tailwindcss/postcss";
import { globbySync } from "globby";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  build: {
    outDir: "build",
    target: "esnext",
    minify: false,
    sourcemap: true,
    lib: {
      entry: globbySync(["src/index.ts"]),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        entryFileNames: "[name].js",
        format: "es",
        preserveModules: true,
        preserveModulesRoot: "src",
        exports: "named",
        globals: {
          tailwindcss: "tailwindcss",
        },
      },
    },
  },
  plugins: [
    libInjectCss(),
    dts({
      entryRoot: "src",
      staticImport: true,
    }),
  ],
});
