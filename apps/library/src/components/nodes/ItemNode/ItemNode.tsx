import { Handle, Position } from "@xyflow/react";
import { ExternalLinkIcon, GitBranchIcon } from "lucide-react";

import type { NodeProps } from "..";

const ItemNode = ({ data }: NodeProps) => {
  // check if there are any connections
  const hasTopTargets =
    data.targetConnections && data.targetConnections.length > 0;
  const hasBottomSources =
    data.sourceConnections && data.sourceConnections.length > 0;

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "var(--garden-garden)";

  return (
    // NB: relative positioning is important for `Handle` placement because it uses `absolute` positioning internally
    <div className="garden:relative garden:cursor-pointer garden:overflow-hidden garden:rounded-md garden:border-2 garden:border-border garden:bg-card garden:shadow-lg garden:transition-all garden:hover:scale-105 garden:hover:shadow-xl">
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

      <div className="garden:relative garden:space-y-3">
        <div className="garden:aspect-video garden:w-full">
          <img
            src={data.image}
            alt={data.label}
            className="garden:h-full garden:w-full garden:object-cover"
          />
        </div>
        <div className="garden:px-4">
          <h3 className="garden:font-medium garden:text-foreground">
            {data.label}
          </h3>
          {data.description && (
            <p className="garden:mt-1 garden:line-clamp-2 garden:text-foreground garden:text-sm">
              {data.description}
            </p>
          )}
        </div>
        <div className="garden:flex garden:gap-2 garden:p-4 garden:pt-0">
          {data.cta?.primary && (
            <button
              type="button"
              className="garden:w-full garden:cursor-pointer garden:rounded-md garden:px-3 garden:py-1 garden:font-medium garden:text-sm garden:hover:opacity-90"
              style={{
                backgroundColor: primaryColor,
                color: "var(--garden-background)",
              }}
              onClick={(e) => {
                // prevent needlessly opening the item dialog
                e.stopPropagation();
                window.open(data.cta?.primary.url, "_blank");
              }}
            >
              <ExternalLinkIcon
                size={14}
                className="garden:mr-1 garden:inline-block"
              />
              {data.cta?.primary.label}
            </button>
          )}

          {data.cta?.secondary && (
            <button
              type="button"
              className="garden:rounded-md garden:border garden:px-2 garden:py-1 garden:font-medium garden:text-sm"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
              }}
              onClick={() => window.open(data.cta?.secondary?.url, "_blank")}
            >
              <GitBranchIcon
                className="garden:h-4 garden:w-4"
                style={{
                  color: primaryColor,
                }}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemNode;
