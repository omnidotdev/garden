import { Handle, Position } from "@xyflow/react";
import { ExternalLinkIcon, LinkIcon } from "lucide-react";

import { Button, Card } from "components/ui";

import type { NodeData } from "components/visualizer/customNodes";

interface Props {
  data: NodeData;
}

const GardenRefNode = ({ data }: Props) => {
  // check if there are any connections
  const hasTopTargets =
    data.targetConnections && data.targetConnections.length > 0;
  const hasLeftTargets =
    data.targetConnections &&
    data.targetConnections.some((id) => id.includes("category"));

  return (
    <Card className="w-[200px] border-2 border-garden/40 shadow-lg hover:border-garden/70">
      {hasTopTargets && <Handle type="target" position={Position.Top} />}
      {hasLeftTargets && <Handle type="target" position={Position.Left} />}

      <div className="relative flex cursor-pointer flex-col items-center rounded-md border-2 border-garden/50 border-dashed p-4 text-center transition-colors hover:bg-accent/50">
        <div className="absolute top-1 right-1 rounded bg-garden/20 px-1 py-0.5 font-semibold text-garden text-xs">
          Navigate
        </div>
        <LinkIcon
          className="mb-2 h-6 w-6 text-garden"
          style={{ color: data.icon_color || "hsl(var(--garden))" }}
        />
        <h3 className="font-medium">{data.label}</h3>
        {data.description && (
          <p className="mt-1 line-clamp-2 text-foreground/70 text-sm">
            {data.description}
          </p>
        )}
        {data.version && (
          <span className="mt-1 text-foreground/60 text-xs">
            v{data.version}
          </span>
        )}
        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-garden/50 hover:border-garden/90 hover:bg-garden/10"
            onClick={(e) => {
              e.stopPropagation();
              window.open(data.url, "_blank");
            }}
          >
            <ExternalLinkIcon className="mr-1 h-3 w-3" />
            View
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GardenRefNode;
