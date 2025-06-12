import { Handle, Position } from "@xyflow/react";
import { ExternalLinkIcon, LinkIcon } from "lucide-react";

import { Button, Card } from "components/ui";

import type { Theme } from "generated/garden.types";
import type { NodeData } from "components/visualizer/customNodes";

export interface Props {
  data: NodeData;
}

const GardenRefNode = ({ data }: Props) => {
  // check if there are any connections
  const hasTopTargets =
    data.targetConnections && data.targetConnections.length > 0;
  const hasLeftTargets =
    data.targetConnections && data.targetConnections.length > 0;

  // Ensure text is readable in both light and dark themes
  const isDarkTheme =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "hsl(var(--garden))";
  const secondaryColor = data.theme?.secondary_color || "hsl(var(--garden)/40)";
  const textColor = data.theme?.text_color || "hsl(var(--foreground))";
  const iconColor =
    data.icon_color || data.theme?.primary_color || "hsl(var(--garden))";
  const textShadow = isDarkTheme ? "0px 1px 1px rgba(0,0,0,0.3)" : "none";

  return (
    <Card
      className="w-[200px] border-2 shadow-lg hover:border-garden/70"
      style={{
        borderColor: secondaryColor,
      }}
    >
      {hasTopTargets && <Handle type="target" position={Position.Top} />}
      {hasLeftTargets && <Handle type="target" position={Position.Left} />}

      <div
        className="relative flex cursor-pointer flex-col items-center rounded-md border-2 border-dashed p-4 text-center transition-colors hover:bg-accent/50"
        style={{ borderColor: `${primaryColor}80` }}
      >
        <div
          className="absolute top-1 right-1 rounded px-1 py-0.5 font-semibold text-xs"
          style={{
            color: isDarkTheme ? "hsl(var(--background))" : primaryColor,
            backgroundColor: isDarkTheme ? primaryColor : `${primaryColor}20`,
            textShadow,
          }}
        >
          Navigate
        </div>
        <LinkIcon
          className="mb-2 h-6 w-6"
          style={{
            color: iconColor,
            filter: isDarkTheme
              ? "drop-shadow(0px 1px 1px rgba(0,0,0,0.3))"
              : "none",
          }}
        />
        <h3 className="font-medium" style={{ color: textColor, textShadow }}>
          {data.label}
        </h3>
        {data.description && (
          <p
            className="mt-1 line-clamp-2 text-sm"
            style={{ color: textColor, textShadow }}
          >
            {data.description}
          </p>
        )}
        {data.version && (
          <span
            className="mt-1 text-xs"
            style={{ color: textColor, textShadow }}
          >
            v{data.version}
          </span>
        )}
        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-garden/50 hover:border-garden/90 hover:bg-garden/10"
            style={{
              borderColor: `${primaryColor}80`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(data.url, "_blank");
            }}
          >
            <ExternalLinkIcon
              className="mr-1 h-3 w-3"
              style={{
                filter: isDarkTheme
                  ? "drop-shadow(0px 1px 1px rgba(0,0,0,0.3))"
                  : "none",
              }}
            />
            View
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GardenRefNode;
