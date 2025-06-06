"use client";

import { Breadcrumbs, GardenList, NavigateBack } from "components/visualizer";
import { useGardenStore } from "lib/hooks/store";

import type { Gardens } from "store";

interface Props {
  /** All available gardens */
  gardens: Gardens;
}

/**
 * Garden Navigation component for visualizer.
 */
const GardenNavigation = ({ gardens }: Props) => {
  const { activeGarden } = useGardenStore();

  return (
    <div className="relative z-0 flex flex-col gap-8 rounded-md border bg-background p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <NavigateBack />

          <h1 className="font-bold text-2xl">{activeGarden.name}</h1>
        </div>

        <Breadcrumbs gardens={gardens} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-muted-foreground text-sm">
          Select a garden to view:
        </div>

        <GardenList gardens={gardens} />
      </div>

      <div className="absolute right-3 bottom-2 text-muted-foreground text-sm">
        {activeGarden.version && `v${activeGarden.version}`}
      </div>
    </div>
  );
};

export default GardenNavigation;
