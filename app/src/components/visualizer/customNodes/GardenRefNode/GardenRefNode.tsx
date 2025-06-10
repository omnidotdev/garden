import { Handle, Position } from "@xyflow/react";

import { Icons } from "components/core";
import { Button, Card } from "components/ui";

import type { NodeData } from "components/visualizer/customNodes";

interface Props {
  data: NodeData;
}

const GardenRefNode = ({ data }: Props) => {
  // check if there are any connections
  const hasTopTargets = data.targetConnections?.length > 0;
  const hasLeftTargets = data.targetConnections?.some((id) =>
    id.includes("category")
  );

  return (
    <Card className="w-[200px] border-2 shadow-lg">
      {hasTopTargets && <Handle type="target" position={Position.Top} />}
      {hasLeftTargets && <Handle type="target" position={Position.Left} />}

      <div className="relative flex cursor-pointer flex-col items-center rounded-md border-2 border-primary/50 border-dashed p-4 text-center transition-colors hover:bg-primary-foreground/10">
        <div className="absolute top-1 right-1 rounded bg-primary/20 px-1 py-0.5 font-semibold text-primary text-xs">
          Navigate
        </div>
        <Icons.Link
          className="mb-2 h-6 w-6"
          style={{ color: data.icon_color }}
        />
        <h3 className="font-medium">{data.label}</h3>
        {data.description && (
          <p className="mt-1 line-clamp-2 text-muted-foreground text-sm">
            {data.description}
          </p>
        )}
        {data.version && (
          <span className="mt-1 text-muted-foreground text-xs">
            v{data.version}
          </span>
        )}
        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              window.open(data.url, "_blank");
            }}
          >
            <Icons.ExternalLink className="mr-1 h-3 w-3" />
            View
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GardenRefNode;
