import { Handle, Position } from "@xyflow/react";
import { GitBranchIcon } from "lucide-react";

import { Badge } from "@workspace/ui/components/badge";
import { Card } from "@workspace/ui/components/card";

import type { NodeData } from "components/visualizer/customNodes";

export interface Props {
  data: NodeData;
}

const SubgardenNode = ({ data }: Props) => {
  // check if there are any connections
  const hasTargets =
    data.targetConnections && data.targetConnections.length > 0;
  const hasSources =
    data.sourceConnections && data.sourceConnections.length > 0;

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "var(--garden)";
  const secondaryColor = data.theme?.secondary_color || "var(--garden)/40";

  // Ensure text is readable in both light and dark themes
  const isDarkTheme =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  // Always use foreground text color for better readability
  const textColor = "var(--foreground)";

  return (
    <Card
      className="w-[200px] border-2 shadow-lg transition-transform hover:scale-105 hover:border-garden/70"
      style={{
        borderColor: secondaryColor,
      }}
    >
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        isConnectable={false}
      />
      {hasSources && (
        <Handle
          id="bottom"
          type="source"
          position={Position.Bottom}
          isConnectable={false}
        />
      )}

      <div className="flex cursor-pointer flex-col items-center gap-4 rounded-lg px-2 py-2 text-center">
        <div className="flex w-full justify-center">
          <Badge
            variant="secondary"
            className="font-medium"
            style={{
              color: "var(--background)",
              backgroundColor: primaryColor,
            }}
          >
            Subgarden
          </Badge>
        </div>

        <div className="flex flex-col items-center gap-2 p-2">
          <GitBranchIcon
            size={24}
            className="animate-pulse"
            style={{ color: primaryColor }}
          />

          <h3
            className="font-bold"
            style={{
              color: textColor,
            }}
          >
            {data.label}
          </h3>

          {data.description && (
            <h4
              className="line-clamp-2 text-sm"
              style={{
                color: textColor,
                opacity: 0.9,
              }}
            >
              {data.description}
            </h4>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SubgardenNode;
