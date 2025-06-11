"use client";

import { useEffect, useMemo, useState } from "react";
import { InfoIcon } from "lucide-react";
import Link from "next/link";

import { GardenTabs } from "components/visualizer";
import { LOCAL_STORAGE_KEY } from "lib/constants";
import { useGardenStore } from "lib/hooks/store";

import type { GardenTypes } from "generated/garden.types";
import type { Gardens } from "store";
import { Button } from "components/ui";

// make garden data globally available for subgarden expansion
declare global {
  interface Window {
    gardenData?: Gardens;
  }
}

interface Props {
  /** All available gardens */
  gardens: Gardens;
}

// TODO: Get rid of client-side code and move to server-side page. "visualizer/page.tsx"
// TODO: Check local storage logic and update where necessary

/**
 * Visualizer.
 */
const Visualizer = ({ gardens }: Props) => {
  const [showInstructions, setShowInstructions] = useState(true);

  // Make garden data available globally for subgarden expansion
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.gardenData = gardens;
    }
  }, [gardens]);

  const allGardens = useMemo(
    () => gardens as Record<string, GardenTypes>,
    [gardens]
  );

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* Header with garden selector */}
      <div className="border-b bg-card p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 w-full justify-between">
            <div className="flex gap-1 items-center">
              <h1 className="text-2xl font-bold">Garden Visualizer</h1>

              <Button
                variant="ghost"
                className="ml-2 rounded-full px-2 gap-2"
                onClick={() => setShowInstructions(!showInstructions)}
                title="Toggle instructions"
              >
                <InfoIcon className="h-5 w-5" /> Instructions
              </Button>
            </div>

            <Link
              href="/demo"
              className="ml-3 text-sm text-primary hover:text-primary/80 px-3 py-1 rounded border border-primary/20 hover:border-primary/40"
            >
              View Demo →
            </Link>
          </div>
        </div>
      </div>

      {/* Instructions panel (conditionally displayed) */}
      {showInstructions && (
        <div className="border-b bg-accent/50 p-4">
          <div className="container mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-primary">
                  Garden Visualization Instructions
                </h2>
                <div className="mt-2 space-y-2 text-sm text-foreground">
                  <p>
                    <strong>Navigation:</strong> Click on any garden, subgarden,
                    or item to navigate or view details.
                  </p>
                  <p>
                    <strong>Expand/condense subgardens:</strong> Toggle this
                    option in the controls panel to show subgardens directly
                    within the current garden view.
                  </p>
                  <p>
                    <strong>Tabs:</strong> Switch between Visualize and Edit
                    modes to view or modify your garden structure.
                  </p>
                </div>
              </div>
              <button
                className="text-primary hover:text-primary/80"
                onClick={() => setShowInstructions(false)}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <div className="container h-full mx-auto p-4">
            <div className="h-full">
              <GardenTabs gardens={allGardens} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
