import { Handle, Position } from "@xyflow/react";
import { ExternalLinkIcon, GitBranchIcon } from "lucide-react";

import { Button, Card } from "components/ui";

import type { Theme } from "generated/garden.types";
import type { NodeData } from "components/visualizer/customNodes";

interface Props {
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
  const textColor = data.theme?.text_color || "hsl(var(--foreground))";
  const textShadow = isDarkTheme ? "0px 1px 1px rgba(0,0,0,0.3)" : "none";

  return (
    <Card
      className="w-[200px] border-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer hover:border-garden/60"
      style={{
        borderColor: secondaryColor,
      }}
    >
      {hasTopTargets && <Handle type="target" position={Position.Top} />}
      {hasBottomSources && <Handle type="source" position={Position.Bottom} />}

      <div className="space-y-3 relative">
        <div className="aspect-video w-full overflow-hidden rounded-t-md">
          <img
            src={data.image}
            alt={data.label}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="px-4">
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
        </div>
        <div className="flex gap-2 p-4 pt-0">
          <Button
            variant="default"
            size="sm"
            className="w-full hover:bg-opacity-90"
            style={{
              backgroundColor: primaryColor,
              color: isDarkTheme
                ? "hsl(var(--background))"
                : "hsl(var(--background))",
              textShadow,
            }}
            onClick={() => window.open(data.cta?.primary.url, "_blank")}
          >
            <ExternalLinkIcon
              size={14}
              className="mr-1"
              style={{
                filter: isDarkTheme
                  ? "drop-shadow(0px 1px 1px rgba(0,0,0,0.3))"
                  : "none",
              }}
            />

            {data.cta?.primary.label}
          </Button>

          {data.cta?.secondary && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(data.cta?.secondary?.url, "_blank")}
            >
              <GitBranchIcon
                className="h-4 w-4"
                style={{
                  filter: isDarkTheme
                    ? "drop-shadow(0px 1px 1px rgba(0,0,0,0.3))"
                    : "none",
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
