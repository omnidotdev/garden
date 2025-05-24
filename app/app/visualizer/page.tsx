"use client";

import { useState, useEffect } from "react";
import { GardenSpec, omniGarden } from "@/lib/schema/garden";
import Header from "@/components/header";
import GardenTabs from "@/components/garden-tabs";
import { parseAsString, useQueryState } from "nuqs";

// Create a tab state with nuqs

const LOCAL_STORAGE_KEY = "garden-schema-editor-content";

const Visualizer = () => {
  const [garden, setGarden] = useState<typeof GardenSpec.Type>(omniGarden);
  const [activeTab, setActiveTab] = useQueryState("tab", parseAsString.withDefault("visualize"));

  // Load garden from localStorage on initial render
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
        // Fallback to default garden
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <Header />

        <GardenTabs 
          garden={garden} 
          onSchemaChange={setGarden} 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </main>
  );
};

export default Visualizer;
