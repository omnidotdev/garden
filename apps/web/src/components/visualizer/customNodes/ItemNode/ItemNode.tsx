import { Handle, Position } from "@xyflow/react";
import { ExternalLinkIcon, GitBranchIcon } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";

import type { NodeData } from "components/visualizer/customNodes";

export interface Props {
  data: NodeData;
}

const ItemNode = ({ data }: Props) => {
  // check if there are any connections
  const hasTopTargets =
    data.targetConnections && data.targetConnections.length > 0;
  const hasBottomSources =
    data.sourceConnections && data.sourceConnections.length > 0;

  // Ensure text is readable in both light and dark themes
  const isDarkTheme =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "hsl(var(--garden))";
  const secondaryColor = data.theme?.secondary_color || "hsl(var(--accent)/40)";
  const textColor = "hsl(var(--foreground))";

  return (
    <Card
      className="w-[200px] cursor-pointer border-2 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      style={{
        borderColor: secondaryColor,
      }}
    >
      {hasTopTargets && (
        <Handle
          id="top"
          type="target"
          position={Position.Top}
          isConnectable={false}
        />
      )}
      {hasBottomSources && (
        <Handle
          id="bottom"
          type="source"
          position={Position.Bottom}
          isConnectable={false}
        />
      )}

      <div className="relative space-y-3">
        <div className="aspect-video w-full overflow-hidden rounded-t-md">
          <img
            src={data.image}
            alt={data.label}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="px-4">
          <h3 className="font-medium" style={{ color: textColor }}>
            {data.label}
          </h3>
          {data.description && (
            <p
              className="mt-1 line-clamp-2 text-sm"
              style={{ color: textColor }}
            >
              {data.description}
            </p>
          )}
        </div>
        <div className="flex gap-2 p-4 pt-0">
          <Button
            variant="default"
            size="sm"
            className="w-full hover:opacity-90"
            style={{
              backgroundColor: primaryColor,
              color: "hsl(var(--background))",
            }}
            onClick={() => window.open(data.cta?.primary.url, "_blank")}
          >
            <ExternalLinkIcon size={14} className="mr-1" />

            {data.cta?.primary.label}
          </Button>

          {data.cta?.secondary && (
            <Button
              variant="outline"
              size="sm"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
              }}
              onClick={() => window.open(data.cta?.secondary?.url, "_blank")}
            >
              <GitBranchIcon
                className="h-4 w-4"
                style={{
                  color: primaryColor,
                }}
              />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ItemNode;
