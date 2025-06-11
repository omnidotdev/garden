"use client";

import { useState } from "react";
import Link from "next/link";
import { Garden } from "components";
import { gardens as defaultGardens } from "lib/schema/garden";

/**
 * Demo Page
 *
 * A simple demonstration of the Garden component showing a live garden
 * without additional UI elements. For the full experience with all controls,
 * visit the Visualizer page.
 */
const DemoPage = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="bg-card p-3 shadow-sm border-b">
        <div className="mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Garden Demo</h1>
            <h4 className="text-sm text-foreground/80">
              This demo represents what is rendered when using the{" "}
              <code className="mx-1 px-1 bg-muted rounded">{`<Garden />`}</code>
              component.
            </h4>
          </div>

          <Link
            href="/visualizer"
            className="text-sm text-primary hover:text-primary/80 px-3 py-1 rounded border border-primary/20 hover:border-primary/40"
          >
            Go to Full Visualizer →
          </Link>
        </div>
      </div>

      <div className="flex-1">
        <Garden
          showMinimap={false}
          showControls={false}
          schema={defaultGardens}
          initialGardenName="Omni Products"
        />
      </div>
    </div>
  );
};

export default DemoPage;
