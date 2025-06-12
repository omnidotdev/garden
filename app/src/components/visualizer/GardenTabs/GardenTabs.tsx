"use client";

import { BarChartIcon, CodeIcon } from "lucide-react";

import { Garden } from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { SchemaEditor } from "@/components/visualizer";
import { useSearchParams } from "@/lib/hooks";

import type { Gardens } from "@/store";

interface Props {
  /** All available gardens */
  gardens: Gardens;
  /** Optional flag to expand subgardens in the visualization */
  expandSubgardens?: boolean;
}

/**
 * Garden Tabs.
 */
const GardenTabs = ({ gardens, expandSubgardens = false }: Props) => {
  const [{ activeTab }, setSearchParams] = useSearchParams();

  return (
    <Tabs
      value={activeTab}
      onValueChange={() =>
        setSearchParams({
          activeTab: activeTab === "visualize" ? "edit" : "visualize",
        })
      }
      className="flex h-full flex-col"
    >
      <TabsList className="grid w-full grid-cols-2 md:max-w-md">
        <TabsTrigger value="visualize" className="flex items-center gap-2">
          <BarChartIcon size={16} />
          Visualize Garden
        </TabsTrigger>

        <TabsTrigger value="edit" className="flex items-center gap-2">
          <CodeIcon size={16} />
          Edit Garden
        </TabsTrigger>
      </TabsList>

      <TabsContent value="visualize" className="mt-6 flex-1">
        <div className="h-full w-full">
          <Garden
            schema={gardens}
            expandSubgardens={expandSubgardens}
            className="h-full w-full"
          />
        </div>
      </TabsContent>

      <TabsContent value="edit" className="mt-6">
        <SchemaEditor />
      </TabsContent>
    </Tabs>
  );
};

export default GardenTabs;
