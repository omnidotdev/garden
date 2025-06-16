import { Handle, Position } from "@xyflow/react";
import { GitBranchIcon } from "lucide-react";

import { NodeProps } from "..";

const SubgardenNode = ({ data }: NodeProps) => {
  // check if there are any connections
  const hasSources =
    data.sourceConnections && data.sourceConnections.length > 0;

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "var(--garden)";
  const secondaryColor = data.theme?.secondary_color || "var(--garden)/40";

  return (
    <div
      // NB: relative positioning is important for `Handle` placement because it uses `absolute` positioning internally
      className="relative h-full rounded-md border-2 bg-card shadow-lg transition-transform hover:scale-105 hover:border-garden/70"
      style={{
        borderColor: secondaryColor,
      }}
    >
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        isConnectable={false}
      />
      {hasSources && (
        <Handle
          id="bottom"
          type="source"
          position={Position.Bottom}
          isConnectable={false}
        />
      )}

      <div className="flex cursor-pointer flex-col items-center gap-4 rounded-lg p-4 text-center">
        <div className="flex w-full justify-center">
          <div
            className="rounded-md px-2 py-1 font-medium text-sm"
            style={{
              backgroundColor: primaryColor,
              color: "var(--background)",
            }}
          >
            Subgarden
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 p-2">
          <GitBranchIcon
            size={24}
            className="animate-pulse"
            style={{ color: primaryColor }}
          />

          <h3 className="font-bold text-foreground">{data.label}</h3>

          {data.description && (
            <h4 className="line-clamp-2 text-foreground text-sm opacity-90">
              {data.description}
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubgardenNode;
