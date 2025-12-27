import type { KnipConfig } from "knip";

/**
 * Knip configuration.
 * @see https://knip.dev/overview/configuration
 */
const knipConfig: KnipConfig = {
  workspaces: {
    ".": {
      ignoreDependencies: ["turbo"],
      ignoreBinaries: ["i"],
    },
    "apps/library": {
      entry: ["src/lib/garden.css"],
      project: ["src/**/*.{ts,tsx,css}"],
      ignore: ["src/generated/**"],
    },
    "apps/web": {
      project: ["src/**/*.{ts,tsx}"],
      ignoreDependencies: ["tailwindcss", "tw-animate-css"],
    },
  },
  ignoreExportsUsedInFile: true,
};

export default knipConfig;
