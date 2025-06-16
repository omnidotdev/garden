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
  const primaryColor = data.theme?.primary_color || "var(--garden)";

  return (
    // NB: relative positioning is important for `Handle` placement because it uses `absolute` positioning internally
    <div className="relative cursor-pointer overflow-hidden rounded-md border-2 bg-card shadow-lg transition-all hover:scale-105 hover:shadow-xl">
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

      <div className="relative space-y-3">
        <div className="aspect-video w-full">
          <img
            src={data.image}
            alt={data.label}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="px-4">
          <h3 className="font-medium text-foreground">{data.label}</h3>
          {data.description && (
            <p className="mt-1 line-clamp-2 text-foreground text-sm">
              {data.description}
            </p>
          )}
        </div>
        <div className="flex gap-2 p-4 pt-0">
          {data.cta?.primary && (
            <button
              type="button"
              className="w-full cursor-pointer rounded-md px-3 py-1 font-medium text-sm hover:opacity-90"
              style={{
                backgroundColor: primaryColor,
                color: "var(--background)",
              }}
              onClick={(e) => {
                // prevent needlessly opening the item dialog
                e.stopPropagation();
                window.open(data.cta?.primary.url, "_blank");
              }}
            >
              <ExternalLinkIcon size={14} className="mr-1 inline-block" />
              {data.cta?.primary.label}
            </button>
          )}

          {data.cta?.secondary && (
            <button
              type="button"
              className="rounded-md border px-2 py-1 font-medium text-sm"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
              }}
              onClick={() => window.open(data.cta?.secondary?.url, "_blank")}
            >
              <GitBranchIcon
                className="h-4 w-4"
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
