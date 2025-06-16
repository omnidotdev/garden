"use client";

import Link from "next/link";

import { Garden } from "@omnidotdev/garden";
import { gardens as defaultGardens } from "@/lib/schema/garden";

/**
 * Demo Page
 *
 * A simple demonstration of the Garden component showing a live garden
 * without additional UI elements. For the full experience with all controls,
 * visit the Visualizer page.
 */
const DemoPage = () => (
  <div className="flex h-full w-full flex-col">
    <div className="border-b bg-card p-3 shadow-sm">
      <div className="mx-auto flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-xl">Garden Demo</h1>
          <h4 className="text-foreground/80 text-sm">
            This demo represents what is rendered when using the{" "}
            <code className="mx-1 rounded bg-muted px-1">{`<Garden />`}</code>
            component.
          </h4>
        </div>

        <Link
          href="/visualizer"
          className="rounded border border-primary/20 px-3 py-1 text-primary text-sm hover:border-primary/40 hover:text-primary/80"
        >
          Go to Full Visualizer →
        </Link>
      </div>
    </div>

    <div className="m-12 flex-1">
      <Garden
        schema={defaultGardens}
        initialGardenName="Omni Products"
        showMinimap={false}
        showControls={false}
      />
    </div>
  </div>
);

export default DemoPage;
