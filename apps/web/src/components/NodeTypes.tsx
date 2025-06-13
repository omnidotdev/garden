/**
 * NodeTypes.tsx
 *
 * This file defines all the custom node components for the Garden visualization.
 * It contains inline definitions for all node types to ensure they're properly bundled.
 */
/**
 * NodeTypes.tsx
 *
 * This file defines all the custom node components for the Garden visualization.
 * It contains inline definitions for all node types to ensure they're properly bundled.
 */
import { Handle, Position } from "@xyflow/react";
import {
  ExternalLinkIcon,
  GitBranchIcon,
  GlobeIcon,
  SproutIcon,
} from "lucide-react";

import type { FC } from "react";
import type { Theme } from "@/generated/garden.types";

// Define NodeData interface for all node types
export interface NodeData {
  label: string;
  description?: string;
  icon?: string;
  icon_color?: string;
  image?: string;
  expandable?: boolean;
  version?: string;
  url?: string;
  theme?: Theme | null;
  cta?: {
    primary: { label: string; url: string };
    secondary?: { label: string; url: string };
  };
  // connection information for determining which handles to show
  sourceConnections?: string[];
  targetConnections?: string[];
  isExpandedSubgarden?: boolean;
  // Any other properties
  [key: string]: any;
}

interface NodeProps {
  data: NodeData;
}

// Garden Node Component
export const GardenNode: React.FC<NodeProps> = ({ data }) => {
  // check if there are any connections
  const hasTopTargets =
    data.targetConnections && data.targetConnections.length > 0;
  const hasBottomSources =
    data.sourceConnections && data.sourceConnections.length > 0;
  const hasRightSources = false;

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "var(--garden)";
  // Always use foreground text color for better readability
  const textColor = "var(--foreground)";
  const textShadow = "none";

  return (
    <div className="w-[200px] rounded-md border-2 bg-card shadow-lg">
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
      {hasRightSources && (
        <Handle
          id="right"
          type="source"
          position={Position.Right}
          isConnectable={false}
        />
      )}

      <div
        className="flex flex-col items-center justify-center gap-2 rounded-md border-2 p-4 text-center"
        style={{ borderColor: primaryColor, color: textColor }}
      >
        <SproutIcon
          size={24}
          style={{
            color: primaryColor,
          }}
        />

        <h3 className="font-bold" style={{ textShadow }}>
          {data.label}
        </h3>

        {data.description && (
          <h4 className="text-sm" style={{ textShadow }}>
            {data.description}
          </h4>
        )}
      </div>
    </div>
  );
};

// Item Node Component
export const ItemNode: FC<NodeProps> = ({ data }) => {
  // check if there are any connections
  const hasTopTargets =
    data.targetConnections && data.targetConnections.length > 0;
  const hasBottomSources =
    data.sourceConnections && data.sourceConnections.length > 0;

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "var(--garden)";
  const textColor = "var(--foreground)";

  return (
    <div className="w-[200px] cursor-pointer rounded-md border-2 bg-card shadow-lg transition-all hover:scale-105 hover:shadow-xl">
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
        <div className="aspect-video w-full overflow-hidden rounded-t-md">
          <img
            src={data.image}
            alt={data.label}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="px-4">
          <h3 className="font-medium" style={{ color: textColor }}>
            {data.label}
          </h3>
          {data.description && (
            <p
              className="mt-1 line-clamp-2 text-sm"
              style={{ color: textColor }}
            >
              {data.description}
            </p>
          )}
        </div>
        <div className="flex gap-2 p-4 pt-0">
          {data.cta?.primary && (
            <button
              className="w-full rounded-md px-3 py-1 font-medium text-sm hover:opacity-90"
              style={{
                backgroundColor: primaryColor,
                color: "var(--background)",
              }}
              onClick={() => window.open(data.cta?.primary.url, "_blank")}
            >
              <ExternalLinkIcon size={14} className="mr-1 inline-block" />
              {data.cta?.primary.label}
            </button>
          )}

          {data.cta?.secondary && (
            <button
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

// Subgarden Node Component
export const SubgardenNode: FC<NodeProps> = ({ data }) => {
  // check if there are any connections
  const hasSources =
    data.sourceConnections && data.sourceConnections.length > 0;

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "var(--garden)";
  const secondaryColor = data.theme?.secondary_color || "var(--garden)/40";

  // Always use foreground text color for better readability
  const textColor = "var(--foreground)";

  return (
    <div
      className="w-[200px] rounded-md border-2 bg-card shadow-lg transition-transform hover:scale-105 hover:border-garden/70"
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

      <div className="flex cursor-pointer flex-col items-center gap-4 rounded-lg px-2 py-2 text-center">
        <div className="flex w-full justify-center">
          <div
            className="rounded-md px-2 py-1 font-medium text-sm"
            style={{
              color: "var(--background)",
              backgroundColor: primaryColor,
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

          <h3
            className="font-bold"
            style={{
              color: textColor,
            }}
          >
            {data.label}
          </h3>

          {data.description && (
            <h4
              className="line-clamp-2 text-sm"
              style={{
                color: textColor,
                opacity: 0.9,
              }}
            >
              {data.description}
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

// Supergarden Node Component
export const SupergardenNode: FC<NodeProps> = ({ data }) => {
  // check if there are any connections
  const hasBottomSources =
    data.sourceConnections && data.sourceConnections.length > 0;

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "var(--garden)";
  const secondaryColor = data.theme?.secondary_color || "var(--garden)/40";

  // Always use foreground text color for better readability
  const textColor = "var(--foreground)";

  return (
    <div
      className="w-[200px] rounded-md border-2 bg-card shadow-lg transition-transform hover:scale-105 hover:border-garden/70"
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

      <div className="flex cursor-pointer flex-col items-center gap-4 rounded-lg px-2 py-2 text-center">
        <div className="flex w-full justify-center">
          <div
            className="rounded-md px-2 py-1 font-medium text-sm hover:bg-secondary/80"
            style={{
              color: "var(--background)",
              backgroundColor: primaryColor,
            }}
          >
            Supergarden
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 p-2">
          <GlobeIcon
            size={24}
            className="animate-pulse"
            style={{ color: primaryColor }}
          />

          <h3
            className="font-bold"
            style={{
              color: textColor,
            }}
          >
            {data.label}
          </h3>

          {data.description && (
            <h4
              className="line-clamp-2 text-sm"
              style={{
                color: textColor,
                opacity: 0.9,
              }}
            >
              {data.description}
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

// Default Node Component (fallback for unknown node types)
export const DefaultNode: FC<NodeProps> = ({ data }) => {
  // check if there are any connections
  const hasTopTargets = data.targetConnections?.some(
    (id) => id.includes("top") || !id.includes("position"),
  );
  const hasBottomTargets = data.targetConnections?.some((id) =>
    id.includes("bottom"),
  );
  const hasLeftTargets = data.targetConnections?.some((id) =>
    id.includes("left"),
  );
  const hasTopSources = data.sourceConnections?.some((id) =>
    id.includes("top"),
  );
  const hasBottomSources = data.sourceConnections?.some(
    (id) => id.includes("bottom") || !id.includes("position"),
  );

  return (
    <div className="rounded-md border border-muted bg-card p-2">
      {hasTopSources && <Handle type="source" position={Position.Top} />}
      {hasBottomSources && <Handle type="source" position={Position.Bottom} />}
      {hasTopTargets && <Handle type="target" position={Position.Top} />}
      {hasBottomTargets && <Handle type="target" position={Position.Bottom} />}
      {hasLeftTargets && <Handle type="target" position={Position.Left} />}
      <div className="p-2">{data.label}</div>
    </div>
  );
};

// Node Types function that returns a mapping of node types to components
function NodeTypes() {
  return {
    garden: GardenNode,
    item: ItemNode,
    supergarden: SupergardenNode,
    subgarden: SubgardenNode,
    default: DefaultNode,
  };
}

// Export a pre-created nodeTypes object for direct use
export const nodeTypes = NodeTypes();

// Default export for compatibility
export default NodeTypes;
