import { Handle, Position } from "@xyflow/react";
import { ExternalLinkIcon, GitBranchIcon } from "lucide-react";

import { Badge, Button, Card } from "components/ui";

import type { Theme } from "generated/garden.types";
import type { NodeData } from "components/visualizer/customNodes";

export interface Props {
  data: NodeData;
}

const SubgardenNode = ({ data }: Props) => {
  // check if there are any connections
  const hasTargets =
    data.targetConnections && data.targetConnections.length > 0;

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "hsl(var(--garden))";
  const secondaryColor = data.theme?.secondary_color || "hsl(var(--garden)/40)";

  // Ensure text is readable in both light and dark themes
  const isDarkTheme =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  // Always use foreground text color for better readability
  const textColor = "hsl(var(--foreground))";

  return (
    <Card
      className="w-[200px] border-2 shadow-lg transition-transform hover:scale-105 hover:border-garden/70"
      style={{
        borderColor: secondaryColor,
      }}
    >
      <Handle type="target" position={Position.Top} />

      <div className="flex cursor-pointer flex-col items-center gap-4 rounded-lg px-2 py-2 text-center">
        <div className="flex w-full justify-center">
          <Badge
            variant="secondary"
            className="font-medium"
            style={{
              color: "hsl(var(--background))",
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
