"use client";

import { useState, useEffect } from "react";
import { omniGarden } from "@/lib/schema/garden";
import { GardenTypes } from "@/generated/garden.types";
import GardenTabs from "@/components/GardenTabs";
import { parseAsString, useQueryState } from "nuqs";

const LOCAL_STORAGE_KEY = "garden-schema-editor-content";

/**
 * Garden visualizer.
 */
const Visualizer = () => {
  const [garden, setGarden] = useState<GardenTypes>(omniGarden);
  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsString.withDefault("visualize")
  );

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
            setGarden(parsedGarden);
          }
        }
      } catch (err) {
        console.error("Error loading garden from localStorage:", err);
        // fallback to default garden
      }
    }
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <GardenTabs
        garden={garden}
        onSchemaChange={setGarden}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default Visualizer;
