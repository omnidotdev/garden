import { Handle, Position } from "@xyflow/react";

import { Icons } from "components/core";
import { Badge, Button, Card } from "components/ui";

import type { NodeData } from "components/visualizer/customNodes";

interface Props {
  data: NodeData;
}

const SupergardenNode = ({ data }: Props) => (
  <Card className="w-[200px] border-2 shadow-lg transition-transform hover:scale-105">
    <Handle type="source" position={Position.Bottom} />

    <div className="flex cursor-pointer flex-col items-center gap-4 rounded-lg px-2 py-2 text-center">
      <div className="flex w-full justify-between">
        <Badge variant="outline" className="text-muted-foreground">
          v{data.version}
        </Badge>

        <Badge variant="secondary" className="text-garden hover:bg-secondary">
          Supergarden
        </Badge>
      </div>

      <div className="flex flex-col items-center gap-2 p-2">
        <Icons.Globe size={24} className="animate-pulse" />

        <h3 className="font-bold">{data.label}</h3>

        {data.description && (
          <h4 className="line-clamp-2 text-sm">{data.description}</h4>
        )}
      </div>

      <Button
        variant="secondary"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          window.open(data.url, "_blank");
        }}
        className="w-full"
      >
        <Icons.ExternalLink size={14} className="mr-1" />
        View
      </Button>
    </div>
  </Card>
);

export default SupergardenNode;
