"use client";

import { BarChartIcon, CodeIcon } from "lucide-react";
import { useIsClient } from "usehooks-ts";

import { Garden } from "@omnidotdev/garden";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchemaEditor } from "@/components/visualizer";
import { useSearchParams } from "@/lib/hooks";
import { useGardenStore } from "@/lib/hooks/store";

/**
 * Garden Tabs.
 */
const GardenTabs = () => {
  const isClient = useIsClient();

  const { activeSchema } = useGardenStore();

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
        <div className="flex h-full w-full items-center justify-center">
          {isClient ? (
            <Garden schema={activeSchema} />
          ) : (
            "Loading visualizer..."
          )}
        </div>
      </TabsContent>

      <TabsContent value="edit" className="mt-6">
        <SchemaEditor />
      </TabsContent>
    </Tabs>
  );
};

export default GardenTabs;
