import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { globbySync } from "globby";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
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
      // TODO: configure properly. Maybe use peer dependencies?
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "tailwindcss",
        /^@radix-ui/,
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
      ],
      output: {
        entryFileNames: "[name].js",
        format: "es",
        preserveModules: true,
        preserveModulesRoot: "src",
        exports: "named",
        banner: `'use client';`,
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    dts({
      entryRoot: "src",
      staticImport: true,
    }),
  ],
});
