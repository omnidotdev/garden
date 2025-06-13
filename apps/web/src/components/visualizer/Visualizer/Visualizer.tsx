"use client";

import { GardenTabs } from "components/visualizer";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useIsClient } from "usehooks-ts";

import { Button } from "@workspace/ui/components/button";

import type { GardenTypes } from "generated/garden.types";
import type { Gardens } from "store";

const INSTRUCTIONS_STORAGE_KEY = "garden_instructions_visible";

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
  const isClient = useIsClient();

  const [showInstructions, setShowInstructions] = useState(() => {
    // Initialize from localStorage if available, default to true
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(INSTRUCTIONS_STORAGE_KEY);
      return stored !== null ? stored === "true" : true;
    }
    return true;
  });

  // Make garden data available globally for subgarden expansion
  useEffect(() => {
    window.gardenData = gardens;
  }, [gardens]);

  const allGardens = useMemo(
    () => gardens as Record<string, GardenTypes>,
    [gardens],
  );

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header with garden selector */}
      <div className="border-b bg-card p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <h1 className="font-bold text-2xl">Garden Visualizer</h1>

              <Button
                variant="ghost"
                className="ml-2 gap-2 rounded-full px-2"
                onClick={() => {
                  const newValue = !showInstructions;
                  setShowInstructions(newValue);
                  if (typeof window !== "undefined") {
                    localStorage.setItem(
                      INSTRUCTIONS_STORAGE_KEY,
                      newValue.toString(),
                    );
                  }
                }}
                title="Toggle instructions"
              >
                <InfoIcon className="h-5 w-5" /> Instructions
              </Button>
            </div>

            <Link
              href="/demo"
              className="ml-3 rounded border border-primary/20 px-3 py-1 text-primary text-sm hover:border-primary/40 hover:text-primary/80"
            >
              View Demo →
            </Link>
          </div>
        </div>
      </div>

      {/* Instructions panel (conditionally displayed) */}
      {showInstructions && isClient && (
        <div className="border-b bg-accent/50 p-4">
          <div className="container mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-lg text-primary">
                  Garden Visualization Instructions
                </h2>
                <div className="mt-2 space-y-2 text-foreground text-sm">
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
                type="button"
                className="text-blue-500 hover:text-blue-700"
                onClick={() => {
                  setShowInstructions(false);
                  if (typeof window !== "undefined") {
                    localStorage.setItem(INSTRUCTIONS_STORAGE_KEY, "false");
                  }
                }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <div className="container mx-auto h-full p-4">
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
