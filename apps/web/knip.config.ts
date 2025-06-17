import type { KnipConfig } from "knip";

/**
 * Knip configuration.
 * @see https://knip.dev/overview/configuration
 */
const knipConfig: KnipConfig = {
  rules: {
    binaries: "off",
  },
  // NB: files are reported as unused if they are in the set of project files, but not in the set of files resolved from the entry files. See: https://knip.dev/guides/configuring-project-files
  project: ["src/**/*.{ts,tsx}"],
  // TODO: figure out how to remove these ignore patterns
  ignoreDependencies: [
    "@omnidotdev/garden",
    "tailwindcss",
    "tw-animate-css",
    "react-dom",
    "@types/react-dom",
  ],
};

export default knipConfig;
