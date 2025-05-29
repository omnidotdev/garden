"use client";

import { GardenFlow, SchemaEditor } from "components/visualizer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui";

import { Icons } from "components/core";
import useSearchParams from "lib/hooks/useSearchParams";

import type { GardenTypes } from "generated/garden.types";

interface Props {
  garden: GardenTypes;
  onSchemaChange: (schema: GardenTypes) => void;
  onNavigateToGarden?: (gardenName: string) => void;
}

/**
 * Garden Tabs.
 */
const GardenTabs = ({ garden, onSchemaChange, onNavigateToGarden }: Props) => {
  const [{ activeTab }, setSearchParams] = useSearchParams();

  return (
    <Tabs
      value={activeTab}
      onValueChange={() =>
        setSearchParams({
          activeTab: activeTab === "visualize" ? "edit" : "visualize",
        })
      }
      className="space-y-6"
    >
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="visualize" className="flex items-center gap-2">
          <Icons.BarChart className="h-4 w-4" />
          Visualize Garden
        </TabsTrigger>
        <TabsTrigger value="edit" className="flex items-center gap-2">
          <Icons.Code className="h-4 w-4" />
          Edit Garden
        </TabsTrigger>
      </TabsList>

      <TabsContent value="visualize" className="space-y-4">
        <GardenFlow garden={garden} onNavigateToGarden={onNavigateToGarden} />
      </TabsContent>

      <TabsContent value="edit">
        <SchemaEditor garden={garden} onSchemaChange={onSchemaChange} />
      </TabsContent>
    </Tabs>
  );
};

export default GardenTabs;
