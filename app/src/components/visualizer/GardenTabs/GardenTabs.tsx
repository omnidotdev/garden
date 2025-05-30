"use client";

import { GardenFlow, SchemaEditor } from "components/visualizer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui";

import { Icons } from "components/core";
import { useSearchParams } from "lib/hooks";

import type { Gardens } from "store";

interface Props {
  /** All available gardens */
  gardens: Gardens;
}

/**
 * Garden Tabs.
 */
const GardenTabs = ({ gardens }: Props) => {
  const [{ activeTab }, setSearchParams] = useSearchParams();

  return (
    <Tabs
      value={activeTab}
      onValueChange={() =>
        setSearchParams({
          activeTab: activeTab === "visualize" ? "edit" : "visualize",
        })
      }
      className="mt-6 space-y-6"
    >
      <TabsList className="grid w-full grid-cols-2 md:max-w-md">
        <TabsTrigger value="visualize" className="flex items-center gap-2">
          <Icons.BarChart size={16} />
          Visualize Garden
        </TabsTrigger>

        <TabsTrigger value="edit" className="flex items-center gap-2">
          <Icons.Code size={16} />
          Edit Garden
        </TabsTrigger>
      </TabsList>

      <TabsContent value="visualize">
        <GardenFlow gardens={gardens} />
      </TabsContent>

      <TabsContent value="edit">
        <SchemaEditor />
      </TabsContent>
    </Tabs>
  );
};

export default GardenTabs;
