"use client";

import { useState, useEffect } from "react";
import { ReactFlowProvider } from "@xyflow/react";

import { useGardenStore } from "lib/hooks/store";
import { GardenFlow } from "components/visualizer";
import type { Gardens } from "store";
import type { GardenTypes } from "generated/garden.types";
import cn from "lib/util/cn";

interface GardenProps {
  /** Garden schema to visualize */
  schema: Gardens;
  /** Optional initial garden name to display. Defaults to first available garden. */
  initialGardenName?: string;
  /** Optional class name for the container */
  className?: string;
  /** Optional callback function that is triggered when a garden is changed */
  onGardenChange?: (gardenName: string) => void;
  /** Optional flag to enable or disable controls. Default is true. */
  showControls?: boolean;
  /** Optional flag to enable or disable the minimap. Default is true. */
  showMinimap?: boolean;
  /** Optional flag to enable or disable auto layout on load. Default is true. */
  enableAutoLayout?: boolean;
  /** Optional flag to expand subgardens in the visualization. Default is false. */
  expandSubgardens?: boolean;
  /** Optional padding for fit view. Default is 0.2. */
  fitViewPadding?: number;
}

/**
 * Garden Component
 *
 * A wrapper component for downstream usage of the garden flow graph visualization.
 * This component provides a full garden visualization experience that can be
 * easily integrated into any application.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Garden />
 *
 * // With specific initial garden and custom styling
 * <Garden
 *   initialGardenName="Omni Products"
 *   className="h-[800px] w-full rounded-lg border shadow-lg"
 * />
 *
 * // With callbacks and customized controls
 * <Garden
 *   initialGardenName="Omni Dev Tools"
 *   onGardenChange={(gardenName) => console.log(`Navigated to: ${gardenName}`)}
 *   showMinimap={false}
 * />
 *
 * // With advanced layout options
 * <Garden
 *   expandSubgardens={true}
 *   enableAutoLayout={true}
 *   fitViewPadding={0.4}
 * />
 *
 * // With custom schema
 * <Garden
 *   schema={{
 *     "Custom Garden": {
 *       name: "Custom Garden",
 *       version: "1.0.0",
 *       items: [
 *         { name: "Item 1", homepage_url: "https://example.com" }
 *       ],
 *       subgardens: [
 *         { name: "My Subgarden", url: "https://example.com/subgarden" }
 *       ]
 *     }
 *   }}
 * />
 * ```
 *
 * Features:
 * - Interactive flow graph visualization
 * - Navigation between connected gardens
 * - Automatic layout of garden elements
 * - Responsive design that fills the container
 * - Customizable appearance and controls
 */
export const Garden = ({
  initialGardenName,
  className = "h-full w-full",
  onGardenChange,
  showControls = true,
  showMinimap = true,
  enableAutoLayout = true,
  expandSubgardens = false,
  fitViewPadding = 0.2,
  schema,
}: GardenProps) => {
  const [isReady, setIsReady] = useState(false);
  const {
    activeGarden,
    setActiveGarden,
    setBreadcrumbs,
    setNavigationHistory,
  } = useGardenStore();

  // Use the provided schema
  const gardensData = schema;

  // Initialize with the specified garden or the first garden
  useEffect(() => {
    // If initialGardenName is provided and exists in gardens, use it
    // Otherwise fall back to first garden
    const gardenNames = Object.keys(gardensData);
    let initialGarden: GardenTypes | undefined;

    if (initialGardenName && gardenNames.includes(initialGardenName)) {
      initialGarden =
        gardensData[initialGardenName as keyof typeof gardensData];
    } else {
      initialGarden = Object.values(gardensData)[0];
    }

    if (initialGarden) {
      setActiveGarden(initialGarden);
      setBreadcrumbs(initialGarden.name);
      setNavigationHistory(initialGarden);
      setIsReady(true);
    }
  }, [
    initialGardenName,
    gardensData,
    setActiveGarden,
    setBreadcrumbs,
    setNavigationHistory,
  ]);

  // Force re-initialization when expandSubgardens changes
  useEffect(() => {
    if (isReady && activeGarden) {
      // Re-initialize with the same garden to trigger re-rendering with expanded subgardens
      setIsReady(false);
      setTimeout(() => {
        setActiveGarden({ ...activeGarden });
        setIsReady(true);
      }, 0);
    }
  }, [expandSubgardens]);

  // Call the onGardenChange callback whenever the active garden changes
  useEffect(() => {
    if (isReady && activeGarden && onGardenChange) {
      onGardenChange(activeGarden.name);
    }
  }, [isReady, activeGarden, onGardenChange]);

  if (!isReady) {
    return (
      <div className="flex h-full w-full items-center justify-center overflow-hidden">
        <div className="text-lg font-medium">
          Loading garden visualization...
        </div>
      </div>
    );
  }

  return (
    <ReactFlowProvider>
      <div className={cn("h-full w-full overflow-hidden", className)}>
        <GardenFlow
          gardens={gardensData}
          showControls={showControls}
          showMinimap={showMinimap}
          enableAutoLayout={enableAutoLayout}
          expandSubgardens={expandSubgardens}
          fitViewPadding={fitViewPadding}
        />
      </div>
    </ReactFlowProvider>
  );
};

export default Garden;
