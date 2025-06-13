"use client";

import { FlowerIcon } from "lucide-react";

import { useGardenStore } from "@/lib/hooks/store";

import type { Theme } from "generated/garden.types";

const ActiveGardenIndicator = () => {
  const { activeGarden } = useGardenStore();

  const theme: Theme | null = activeGarden?.theme || null;
  const primaryColor = theme?.primary_color || "var(--garden)";
  const secondaryColor = theme?.secondary_color || "var(--garden)/30";
  const textColor = theme?.text_color || "var(--foreground)";

  return (
    <div
      className="flex items-center gap-2 rounded-md border px-3 py-1.5 font-medium text-sm shadow-sm backdrop-blur-sm"
      style={{
        backgroundColor: `${primaryColor}10`,
        color: primaryColor,
        borderColor: secondaryColor,
      }}
    >
      <FlowerIcon className="h-4 w-4" />
      {activeGarden?.name || "Garden"}

      {activeGarden?.icon && <span className="ml-1">{activeGarden.icon}</span>}
    </div>
  );
};

export default ActiveGardenIndicator;
