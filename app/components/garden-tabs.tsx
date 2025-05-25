"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, BarChart } from "lucide-react";
import GardenFlow from "@/components/garden-flow";
import SchemaEditor from "@/components/schema-editor";
import { Garden } from "@/lib/schema/garden";

interface GardenTabsProps {
  garden: typeof Garden.Type;
  onSchemaChange: (schema: typeof Garden.Type) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const GardenTabs = ({
  garden,
  onSchemaChange,
  activeTab,
  onTabChange,
}: GardenTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="visualize" className="flex items-center gap-2">
          <BarChart className="h-4 w-4" />
          Visualize
        </TabsTrigger>
        <TabsTrigger value="edit" className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          Edit Schema
        </TabsTrigger>
      </TabsList>

      <TabsContent value="visualize" className="space-y-4">
        <GardenFlow garden={garden} />
      </TabsContent>

      <TabsContent value="edit">
        <SchemaEditor onSchemaChange={onSchemaChange} />
      </TabsContent>
    </Tabs>
  );
};

export default GardenTabs;
