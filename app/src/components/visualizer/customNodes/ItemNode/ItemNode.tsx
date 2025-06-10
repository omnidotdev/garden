import { Handle, Position } from "@xyflow/react";
import { ExternalLinkIcon, GitBranchIcon } from "lucide-react";

import { Button, Card } from "components/ui";

import type { NodeData } from "components/visualizer/customNodes";

interface Props {
  data: NodeData;
}

const ItemNode = ({ data }: Props) => {
  // check if there are any connections
  const hasTopTargets = data.targetConnections?.length > 0;
  const hasBottomSources = data.sourceConnections?.length > 0;

  return (
    <Card className="w-[200px] border-2 shadow-lg">
      {hasTopTargets && <Handle type="target" position={Position.Top} />}
      {hasBottomSources && <Handle type="source" position={Position.Bottom} />}

      <div className="space-y-3">
        <div className="aspect-video w-full overflow-hidden rounded-t-md">
          <img
            src={data.image}
            alt={data.label}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="px-4">
          <h3 className="font-medium">{data.label}</h3>
          {data.description && (
            <p className="mt-1 line-clamp-2 text-muted-foreground text-sm">
              {data.description}
            </p>
          )}
        </div>
        <div className="flex gap-2 p-4 pt-0">
          <Button
            variant="default"
            size="sm"
            className="w-full"
            onClick={() => window.open(data.cta?.primary.url, "_blank")}
          >
            <ExternalLinkIcon size={14} className="mr-1" />

            {data.cta?.primary.label}
          </Button>

          {data.cta?.secondary && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(data.cta?.secondary?.url, "_blank")}
            >
              <GitBranchIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ItemNode;
