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
      project: ["src/**/*.{ts,tsx}"],
      // NB: Modified from the default GraphQL Codegen configuration, see: https://knip.dev/reference/plugins/graphql-codegen
      "graphql-codegen": {
        config: ["package.json", "src/lib/graphql/codegen.config.ts"],
      },
      ignore: ["panda.config.ts", "src/__mocks__/**", "src/generated/**"],
      biome: false,
    }
  }
};

export default knipConfig;
