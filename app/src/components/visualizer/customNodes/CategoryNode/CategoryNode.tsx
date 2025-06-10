import { Handle, Position } from "@xyflow/react";

import { Icons } from "components/core";
import { Card } from "components/ui";

import type { NodeData } from "components/visualizer/customNodes";

interface Props {
  data: NodeData;
}

const CategoryNode = ({ data }: Props) => {
  const Icon = Icons[data.icon];

  // check if there are any connections
  const hasTopTargets = data.targetConnections?.length > 0;
  const hasBottomSources = data.sourceConnections?.length > 0;

  return (
    <Card className="w-[200px] border-2 shadow-lg">
      {hasTopTargets && <Handle type="target" position={Position.Top} />}
      {hasBottomSources && <Handle type="source" position={Position.Bottom} />}

      <div className="p-4">
        <div
          className="flex items-center gap-3"
          style={{ color: data.icon_color }}
        >
          {Icon && <Icon className="h-5 w-5" />}

          <h3 className="font-medium">{data.label}</h3>
        </div>

        {data.description && (
          <p className="mt-1 text-muted-foreground text-sm">
            {data.description}
          </p>
        )}
      </div>
    </Card>
  );
};

export default CategoryNode;
