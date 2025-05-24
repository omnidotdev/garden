"use client";

import { useState } from "react";
import { GardenSpec, omniGarden } from "@/lib/schema/garden";
import Header from "@/components/header";
import GardenTabs from "@/components/garden-tabs";

const Visualizer = () => {
  const [garden, setGarden] = useState<typeof GardenSpec.Type>(omniGarden);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <Header />

        <GardenTabs garden={garden} onSchemaChange={setGarden} />
      </div>
    </main>
  );
};

export default Visualizer;
