import { Handle, Position } from "@xyflow/react";

import { Icons } from "components/core";
import { Card } from "components/ui";

import type { NodeData } from "components/visualizer/customNodes";

interface Props {
  data: NodeData;
}

const GardenNode = ({ data }: Props) => {
  return (
    <Card className="w-[200px] border-2 shadow-lg">
      <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-primary p-4 text-center text-primary-foreground">
        <Icons.Sprout className="h-8 w-8" />
        <h2 className="font-semibold text-2xl">{data.label}</h2>

        <h4>{data.description}</h4>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
};

export default GardenNode;
