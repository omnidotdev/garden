import { Handle, Position } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";

import type { NodeProps } from "..";

const SupergardenNode = ({ data }: NodeProps) => {
  // check if there are any connections
  const hasBottomSources =
    data.sourceConnections && data.sourceConnections.length > 0;

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "var(--garden-garden)";
  const secondaryColor =
    data.theme?.secondary_color || "var(--garden-garden)/40";

  return (
    <div
      // NB: relative positioning is important for `Handle` placement because it uses `absolute` positioning internally
      className="garden:relative garden:h-full garden:rounded-md garden:border-2 garden:bg-card garden:shadow-lg garden:transition-transform garden:hover:scale-105 garden:hover:border-garden/70"
      style={{
        borderColor: secondaryColor,
      }}
    >
      {hasBottomSources && (
        <Handle
          id="bottom"
          type="source"
          position={Position.Bottom}
          isConnectable={false}
        />
      )}

      <div className="garden:flex garden:cursor-pointer garden:flex-col garden:items-center garden:gap-4 garden:rounded-lg garden:p-4 garden:text-center">
        <div className="garden:flex garden:w-full garden:justify-center">
          <div
            className="garden:rounded-md garden:px-2 garden:py-1 garden:font-medium garden:text-background garden:text-sm garden:hover:bg-secondary/80"
            style={{
              backgroundColor: primaryColor,
            }}
          >
            Supergarden
          </div>
        </div>

        <div className="garden:flex garden:flex-col garden:items-center garden:gap-2 garden:p-2">
          <GlobeIcon
            size={24}
            className="garden:animate-pulse"
            style={{ color: primaryColor }}
          />

          <h3 className="garden:font-bold garden:text-foreground">
            {data.label}
          </h3>

          {data.description && (
            <h4 className="garden:line-clamp-2 garden:text-foreground/70 garden:text-sm">
              {data.description}
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupergardenNode;
