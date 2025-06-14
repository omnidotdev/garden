/**
 * CustomNodes.tsx
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
import type { Theme } from "../../generated/garden.types";

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
  // biome-ignore lint/suspicious/noExplicitAny: allow `any` for this use case
  [key: string]: any;
}

interface NodeProps {
  data: NodeData;
}

// Garden Node Component
const GardenNode: FC<NodeProps> = ({ data }) => {
  // check if there are any connections
  const hasTopTargets =
    data.targetConnections && data.targetConnections.length > 0;
  const hasBottomSources =
    data.sourceConnections && data.sourceConnections.length > 0;

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "var(--garden)";

  return (
    // NB: relative positioning is important for `Handle` placement because it uses `absolute` positioning internally
    <div className="relative rounded-md border-2 bg-card shadow-lg">
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

      <div
        className="flex flex-col items-center justify-center gap-2 rounded-md border-2 p-4 text-center text-foreground"
        style={{ borderColor: primaryColor }}
      >
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

// Item Node Component
const ItemNode: FC<NodeProps> = ({ data }) => {
  // check if there are any connections
  const hasTopTargets =
    data.targetConnections && data.targetConnections.length > 0;
  const hasBottomSources =
    data.sourceConnections && data.sourceConnections.length > 0;

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "var(--garden)";

  return (
    // NB: relative positioning is important for `Handle` placement because it uses `absolute` positioning internally
    <div className="relative cursor-pointer rounded-md border-2 bg-card shadow-lg transition-all hover:scale-105 hover:shadow-xl">
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

// Subgarden Node Component
const SubgardenNode: FC<NodeProps> = ({ data }) => {
  // check if there are any connections
  const hasSources =
    data.sourceConnections && data.sourceConnections.length > 0;

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "var(--garden)";
  const secondaryColor = data.theme?.secondary_color || "var(--garden)/40";

  return (
    <div
      // NB: relative positioning is important for `Handle` placement because it uses `absolute` positioning internally
      className="relative rounded-md border-2 bg-card shadow-lg transition-transform hover:scale-105 hover:border-garden/70"
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

// Supergarden Node Component
const SupergardenNode: FC<NodeProps> = ({ data }) => {
  // check if there are any connections
  const hasBottomSources =
    data.sourceConnections && data.sourceConnections.length > 0;

  // Use theme colors from garden data if available
  const primaryColor = data.theme?.primary_color || "var(--garden)";
  const secondaryColor = data.theme?.secondary_color || "var(--garden)/40";

  return (
    <div
      // NB: relative positioning is important for `Handle` placement because it uses `absolute` positioning internally
      className="relative rounded-md border-2 bg-card shadow-lg transition-transform hover:scale-105 hover:border-garden/70"
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
              backgroundColor: primaryColor,
              color: "var(--background)",
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

// Default Node Component (fallback for unknown node types)
const DefaultNode: FC<NodeProps> = ({ data }) => {
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
    // NB: relative positioning is important for `Handle` placement because it uses `absolute` positioning internally
    <div className="relative rounded-md border border-muted bg-card p-2">
      {hasTopSources && <Handle type="source" position={Position.Top} />}
      {hasBottomSources && <Handle type="source" position={Position.Bottom} />}
      {hasTopTargets && <Handle type="target" position={Position.Top} />}
      {hasBottomTargets && <Handle type="target" position={Position.Bottom} />}
      {hasLeftTargets && <Handle type="target" position={Position.Left} />}
      <div className="p-2">{data.label}</div>
    </div>
  );
};

// Export a pre-created customNodes object for direct use
export const customNodes = {
  garden: GardenNode,
  item: ItemNode,
  supergarden: SupergardenNode,
  subgarden: SubgardenNode,
  default: DefaultNode,
};
