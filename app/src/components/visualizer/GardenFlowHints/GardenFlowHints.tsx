"use client";

import { useState } from "react";
import {
  LightbulbOffIcon,
  LightbulbIcon,
  LayersIcon,
  GlobeIcon,
  Layers2Icon,
  FlowerIcon,
} from "lucide-react";
import { useGardenStore } from "lib/hooks/store";

import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/ui";

const GardenFlowHints = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeGarden } = useGardenStore();

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[350px] flex-col gap-2"
    >
      <div className="flex flex-col items-end gap-2">
        <div className="rounded-md bg-garden/10 px-3 py-1.5 text-sm font-medium text-garden shadow-sm backdrop-blur-sm border border-garden/30 flex items-center gap-2">
          <FlowerIcon className="h-4 w-4" />
          {activeGarden?.name || "Garden"}

          {activeGarden?.icon && (
            <span className="ml-1">{activeGarden.icon}</span>
          )}
        </div>

        <CollapsibleTrigger asChild className="z-10 ml-auto w-fit gap-2 px-4">
          <Button
            variant="outline"
            size="icon"
            className="border-garden/30 hover:border-garden/60"
          >
            {isOpen ? (
              <LightbulbOffIcon size={16} className="text-garden" />
            ) : (
              <LightbulbIcon size={16} className="text-garden" />
            )}
            <span className="sr-only">Toggle</span>

            <p>Help</p>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="flex flex-col gap-2">
        <div className="z-10 flex flex-col gap-2 rounded-md bg-background/90 p-3 text-xs shadow-md backdrop-blur-sm border border-accent/40">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2 border-garden border-dashed" />

            <p className="text-foreground/80">
              Click on dashed nodes to navigate into that garden
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-3 w-3 items-center justify-center">
              <LayersIcon className="h-3 w-3 text-garden" />
            </div>

            <p className="text-foreground/80">
              Use the <LayersIcon className="mx-1 inline h-3 w-3 text-garden" />{" "}
              / <Layers2Icon className="mx-1 inline h-3 w-3 text-garden" />{" "}
              toggle to expand or condense subgardens
            </p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default GardenFlowHints;
