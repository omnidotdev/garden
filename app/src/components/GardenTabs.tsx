"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, BarChart } from "lucide-react";
import GardenFlow from "@/components/GardenFlow";
import SchemaEditor from "@/components/SchemaEditor";
import { GardenTypes } from "@/generated/garden.types";

interface GardenTabsProps {
  garden: GardenTypes;
  onSchemaChange: (schema: GardenTypes) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNavigateToGarden?: (gardenName: string) => void;
}

const GardenTabs = ({
  garden,
  onSchemaChange,
  activeTab,
  onTabChange,
  onNavigateToGarden,
}: GardenTabsProps) => (
  <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
    <TabsList className="grid w-full max-w-md grid-cols-2">
      <TabsTrigger value="visualize" className="flex items-center gap-2">
        <BarChart className="h-4 w-4" />
        Visualize Garden
      </TabsTrigger>
      <TabsTrigger value="edit" className="flex items-center gap-2">
        <Code className="h-4 w-4" />
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

export default GardenTabs;
