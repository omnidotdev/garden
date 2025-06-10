import { Handle, Position } from "@xyflow/react";
import { SproutIcon } from "lucide-react";

import { Card } from "components/ui";

import type { NodeData } from "components/visualizer/customNodes";

interface Props {
  data: NodeData;
}

const GardenNode = ({ data }: Props) => {
  // check if there are any connections
  const hasTopTargets = data.targetConnections?.length > 0;
  const hasBottomSources = data.sourceConnections?.length > 0;
  const hasRightSources = false; // optional: set this based on specific connection types

  return (
    <Card className="w-[200px] border-2 shadow-lg">
      {hasTopTargets && <Handle type="target" position={Position.Top} />}
      {hasBottomSources && <Handle type="source" position={Position.Bottom} />}
      {hasRightSources && <Handle type="source" position={Position.Right} />}

      <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-primary p-4 text-center text-primary-foreground">
        <SproutIcon size={24} />

        <h3 className="font-bold">{data.label}</h3>

        <h4 className="text-sm">{data.description}</h4>
      </div>
    </Card>
  );
};

export default GardenNode;
