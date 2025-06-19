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
  const primaryColor = data.theme?.primary_color || "var(--garden-garden)";

  return (
    // NB: relative positioning is important for `Handle` placement because it uses `absolute` positioning internally
    <div
      className="garden:relative garden:flex garden:h-full garden:items-center garden:justify-center garden:rounded-md garden:border-2 garden:bg-card garden:text-center garden:shadow-lg"
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

      <div className="garden:flex garden:flex-col garden:items-center garden:justify-center garden:gap-2 garden:rounded-md garden:p-4 garden:text-center garden:text-foreground">
        <SproutIcon
          size={24}
          style={{
            color: primaryColor,
          }}
        />

        <h3 className="garden:font-bold">{data.label}</h3>

        {data.description && (
          <h4 className="garden:text-foreground/70 garden:text-sm">
            {data.description}
          </h4>
        )}
      </div>
    </div>
  );
};

export default GardenNode;
