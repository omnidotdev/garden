import type { KnipConfig } from "knip";

/**
 * Knip configuration.
 * @see https://knip.dev/overview/configuration
 */
const knipConfig: KnipConfig = {
  workspaces: {
    "apps/web": {
      // NB: Modified from the default Next.js configuration, see: https://knip.dev/reference/plugins/next
      entry: [
        "src/app/**/{error,layout,loading,not-found,page,template,default,route}.{ts,tsx}",
      ],
      // NB: files are reported as unused if they are in the set of project files, but not in the set of files resolved from the entry files. See: https://knip.dev/guides/configuring-project-files
      project: ["src/**/*.{ts,tsx}", "!src/scripts/**"],
      ignore: ["src/generated/**"],
      // TODO: re-enabled. Broken currently with biome v2 and updated extends pattern
      biome: false,
    }
  }
};

export default knipConfig;
