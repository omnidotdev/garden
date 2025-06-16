import { Handle, Position } from "@xyflow/react";
import { SproutIcon } from "lucide-react";

import type { NodeProps } from "..";

const GardenNode = ({ data }: NodeProps) => {
  // check if there are any connections
  const hasTopTargets =
    data.targetConnections && data.targetConnections.length > 0;
  const hasBottomSources =
    data.sourceConnections && data.sourceConnections.length > 0;

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "var(--garden)";

  return (
    // NB: relative positioning is important for `Handle` placement because it uses `absolute` positioning internally
    <div
      className="relative flex h-full items-center justify-center rounded-md border-2 bg-card text-center shadow-lg"
      style={{ borderColor: primaryColor }}
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

      <div className="flex flex-col items-center justify-center gap-2 rounded-md p-4 text-center text-foreground">
        <SproutIcon
          size={24}
          style={{
            color: primaryColor,
          }}
        />

        <h3 className="font-bold">{data.label}</h3>

        {data.description && <h4 className="text-sm">{data.description}</h4>}
      </div>
    </div>
  );
};

export default GardenNode;
