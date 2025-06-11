import { Handle, Position } from "@xyflow/react";
import { SproutIcon } from "lucide-react";

import { Card } from "components/ui";

import type { Theme } from "generated/garden.types";
import type { NodeData } from "components/visualizer/customNodes";

interface Props {
  data: NodeData;
}

const GardenNode = ({ data }: Props) => {
  // check if there are any connections
  const hasTopTargets =
    data.targetConnections && data.targetConnections.length > 0;
  const hasBottomSources =
    data.sourceConnections && data.sourceConnections.length > 0;
  // optional: set this based on specific connection types
  const hasRightSources = false;

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "hsl(var(--garden))";
  const isDarkTheme =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");
  // Always use foreground text color for better readability
  const textColor = "hsl(var(--foreground))";
  const borderColor = data.theme?.secondary_color || "hsl(var(--garden)/40)";
  const textShadow = "none";

  return (
    <Card
      className="w-[200px] border-2 shadow-lg"
      style={{ borderColor: borderColor }}
    >
      {hasTopTargets && <Handle type="target" position={Position.Top} />}
      {hasBottomSources && <Handle type="source" position={Position.Bottom} />}
      {hasRightSources && <Handle type="source" position={Position.Right} />}

      <div
        className="flex flex-col items-center justify-center gap-2 rounded-md border-2 p-4 text-center"
        style={{ borderColor: primaryColor, color: textColor }}
      >
        <SproutIcon
          size={24}
          style={{
            color: primaryColor,
          }}
        />

        <h3 className="font-bold" style={{ textShadow }}>
          {data.label}
        </h3>

        <h4 className="text-sm" style={{ textShadow }}>
          {data.description}
        </h4>
      </div>
    </Card>
  );
};

export default GardenNode;
