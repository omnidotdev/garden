import type { KnipConfig } from "knip";

/**
 * Knip configuration.
 * @see https://knip.dev/overview/configuration
 */
const knipConfig: KnipConfig = {
  ignoreDependencies: ["@biomejs/biome"],
  ignore: ["apps/**", "services/**"],
};

export default knipConfig;
