import { $, build as bunBuild } from "bun";
import path from "path";
import fs from "fs";

const clean = (buildPath: string) => {
  if (fs.existsSync(buildPath)) {
    console.log(`Cleaning ${buildPath}...`);
    fs.rmSync(buildPath, { recursive: true, force: true });
  }
  fs.mkdirSync(buildPath, { recursive: true });
  console.log(`Created clean directory at ${buildPath}`);
};

const bundle = async () => {
  const buildDir = "build";

  clean(buildDir);

  try {
    await bunBuild({
      entrypoints: [path.join("src/components/index.ts")],
      outdir: buildDir,
      splitting: false,
      external: [
        "react",
        "react-dom",
        "@xyflow/react",
        "zustand",
        "zustand/shallow",
        "zustand/traditional",
        "lucide-react",
        "tailwind-merge",
        "clsx",
        "elkjs",
        "@radix-ui/*",
        "next",
        "next-themes",
        "class-variance-authority",
        "recharts",
        "ts-pattern",
      ],
      minify: true,
      naming: {
        entry: "index.js",
      },
    });

    console.log("Garden component bundled successfully! ✅");
  } catch (error) {
    console.error("Error bundling Garden component:", error);
    process.exit(1);
  }
};

/**
 * Operations after bundling.
 */
const postflight = async () => {
  console.log("📘 Generating type declarations...");
  // TODO remove `tsup` dependency, should be able to use a Bun plugin or `tsc` directly (https://linear.app/omnidev/issue/OMNI-242/use-isolated-declarations-for-type-output-and-remove-tsup)
  await $`bun tsup src/components/index.ts --dts-only --tsconfig tsconfig.build.json --format esm --out-dir build`;
  console.log("📘 Type declarations generated.\n");

  console.log("🧶 Publishing local package...");
  await $`bun knit push`;
  console.log("🧶 Publishing local package complete.");
};

/**
 * Build the library.
 */
const build = async () => {
  await bundle();
  await postflight();
};

build();
