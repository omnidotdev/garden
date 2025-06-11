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
import type { Theme } from "generated/garden.types";

const GardenFlowHints = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeGarden } = useGardenStore();

  // Extract theme colors with fallbacks
  const theme: Theme | null = activeGarden?.theme || null;
  const primaryColor = theme?.primary_color || "hsl(var(--garden))";
  const secondaryColor = theme?.secondary_color || "hsl(var(--garden)/30)";
  const textColor = theme?.text_color || "hsl(var(--foreground))";

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[350px] flex-col gap-2"
    >
      <div className="flex flex-col items-end gap-2">
        <div
          className="rounded-md px-3 py-1.5 text-sm font-medium shadow-sm backdrop-blur-sm border flex items-center gap-2"
          style={{
            backgroundColor: `${primaryColor}10`,
            color: primaryColor,
            borderColor: secondaryColor,
          }}
        >
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
            className="hover:border-opacity-60"
            style={{
              borderColor: `${primaryColor}30`,
            }}
          >
            {isOpen ? (
              <LightbulbOffIcon size={16} style={{ color: primaryColor }} />
            ) : (
              <LightbulbIcon size={16} style={{ color: primaryColor }} />
            )}
            <span className="sr-only">Toggle</span>

            <p>Help</p>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="flex flex-col gap-2">
        <div
          className="z-10 flex flex-col gap-2 rounded-md bg-background/90 p-3 text-xs shadow-md backdrop-blur-sm border"
          style={{ borderColor: secondaryColor }}
        >
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full border-2 border-dashed"
              style={{ borderColor: primaryColor }}
            />

            <p style={{ color: textColor }}>
              Click on dashed nodes to navigate into that garden
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-3 w-3 items-center justify-center">
              <LayersIcon className="h-3 w-3" style={{ color: primaryColor }} />
            </div>

            <p style={{ color: textColor }}>
              Use the{" "}
              <LayersIcon
                className="mx-1 inline h-3 w-3"
                style={{ color: primaryColor }}
              />{" "}
              /{" "}
              <Layers2Icon
                className="mx-1 inline h-3 w-3"
                style={{ color: primaryColor }}
              />{" "}
              toggle to expand or condense subgardens
            </p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default GardenFlowHints;
