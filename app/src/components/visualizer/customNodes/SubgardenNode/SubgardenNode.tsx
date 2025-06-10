import { Handle, Position } from "@xyflow/react";
import { ExternalLinkIcon, GitBranchIcon } from "lucide-react";

import { Badge, Button, Card } from "components/ui";

import type { NodeData } from "components/visualizer/customNodes";

interface Props {
  data: NodeData;
}

const SubgardenNode = ({ data }: Props) => {
  // check if there are any connections
  const hasTargets =
    data.targetConnections && data.targetConnections.length > 0;

  return (
    <Card className="w-[200px] border-2 shadow-lg transition-transform hover:scale-105">
      <Handle type="target" position={Position.Top} />

      <div className="flex cursor-pointer flex-col items-center gap-4 rounded-lg px-2 py-2 text-center">
        <div className="flex w-full justify-between">
          <Badge variant="outline" className="text-muted-foreground">
            v{data.version}
          </Badge>

          <Badge variant="secondary" className="text-garden hover:bg-secondary">
            Subgarden
          </Badge>
        </div>

        <div className="flex flex-col items-center gap-2 p-2">
          <GitBranchIcon size={24} className="animate-pulse" />

          <h3 className="font-bold">{data.label}</h3>

          {data.description && (
            <h4 className="line-clamp-2 text-sm">{data.description}</h4>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SubgardenNode;
