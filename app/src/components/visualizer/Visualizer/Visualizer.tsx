"use client";

import { useEffect, useMemo } from "react";

import { GardenNavigation, GardenTabs } from "components/visualizer";
import { LOCAL_STORAGE_KEY } from "lib/constants";
import { useGardenStore } from "lib/hooks/store";

import type { GardenTypes } from "generated/garden.types";
import type { Gardens } from "store";

// Make garden data globally available for subgarden expansion
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
  const { setActiveGarden } = useGardenStore();

  // load garden from local storage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedSchema = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedSchema) {
          const parsedGarden = JSON.parse(savedSchema);
          if (
            parsedGarden?.name &&
            parsedGarden?.version &&
            Array.isArray(parsedGarden?.categories)
          ) {
            setActiveGarden(parsedGarden);
          }
        }
      } catch (err) {
        console.error("Error loading garden from localStorage:", err);
        // fallback to default garden
      }
    }
  }, [setActiveGarden]);

  const allGardens = useMemo(
    () => gardens as Record<string, GardenTypes>,
    [gardens],
  );

  return (
    <div className="container mx-auto p-4">
      <GardenNavigation gardens={allGardens} />
      <GardenTabs gardens={allGardens} />
    </div>
  );
};

export default Visualizer;
