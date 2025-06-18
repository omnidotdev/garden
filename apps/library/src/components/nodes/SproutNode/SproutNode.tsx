import { Handle, Position } from "@xyflow/react";
import { ExternalLinkIcon, GitBranchIcon } from "lucide-react";

import type { NodeProps } from "..";

const SproutNode = ({ data }: NodeProps) => {
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

      <div className="garden:relative">
        <img
          src={data.image}
          alt={data.label}
          className="garden:h-28 garden:w-full garden:object-contain garden:p-5"
        />
        <div className="garden:bg-muted/60 garden:pt-4 garden:dark:bg-muted/20">
          <div className="garden:px-4">
            <h3 className="garden:font-medium garden:text-foreground">
              {data.label}
            </h3>
            {data.description && (
              <p className="garden:mt-0.5 garden:line-clamp-2 garden:text-foreground/70 garden:text-sm">
                {data.description}
              </p>
            )}
          </div>
          <div className="garden:flex garden:gap-2 garden:p-4">
            {data.cta?.primary && (
              <button
                type="button"
                className="garden:flex garden:w-full garden:cursor-pointer garden:items-center garden:justify-center garden:rounded-md garden:px-3 garden:py-1 garden:font-medium garden:text-background garden:text-sm garden:hover:opacity-90"
                style={{
                  backgroundColor: primaryColor,
                }}
                onClick={(e) => {
                  // prevent needlessly opening the dialog
                  e.stopPropagation();
                  window.open(data.cta?.primary.url, "_blank");
                }}
              >
                <ExternalLinkIcon size={14} className="garden:mr-1" />
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
    </div>
  );
};

export default SproutNode;
