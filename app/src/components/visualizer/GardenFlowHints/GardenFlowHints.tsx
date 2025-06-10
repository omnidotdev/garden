"use client";

import { useState } from "react";
import {
  LightbulbOffIcon,
  LightbulbIcon,
  LayersIcon,
  GlobeIcon,
  Layers2Icon,
} from "lucide-react";

import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/ui";

const GardenFlowHints = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[350px] flex-col gap-2"
    >
      <CollapsibleTrigger asChild className="z-10 ml-auto w-fit gap-2 px-4">
        <Button variant="outline" size="icon">
          {isOpen ? (
            <LightbulbOffIcon size={16} />
          ) : (
            <LightbulbIcon size={16} />
          )}
          <span className="sr-only">Toggle</span>

          <p>Help</p>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="flex flex-col gap-2">
        <div className="z-10 flex flex-col gap-2 rounded-md bg-background/80 p-3 text-xs shadow-md backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2 border-primary border-dashed" />

            <p className="text-muted-foreground">
              Click on dashed nodes to navigate into that garden
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-3 w-3 items-center justify-center">
              <LayersIcon className="h-3 w-3 text-primary" />
            </div>

            <p className="text-muted-foreground">
              Use the <LayersIcon className="mx-1 inline h-3 w-3" /> /{" "}
              <Layers2Icon className="mx-1 inline h-3 w-3" /> toggle to expand
              or condense subgardens
            </p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default GardenFlowHints;
