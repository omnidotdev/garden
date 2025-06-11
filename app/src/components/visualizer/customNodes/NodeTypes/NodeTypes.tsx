import { Handle, Position } from "@xyflow/react";

import {
  CategoryNode,
  GardenRefNode,
  GardenNode,
  ItemNode,
  SubgardenNode,
  SupergardenNode,
} from "components/visualizer/customNodes";
import type { Theme } from "generated/garden.types";

export interface NodeData {
  label: string;
  description?: string;
  icon: string;
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
}

const NodeTypes = () => ({
  garden: GardenNode,
  category: CategoryNode,
  item: ItemNode,
  garden_ref: GardenRefNode,
  supergarden: SupergardenNode,
  subgarden: SubgardenNode,
  default: ({ data }: { data: NodeData }) => {
    // check if there are any connections
    const hasTopTargets = data.targetConnections?.some(
      (id) => id.includes("top") || !id.includes("position")
    );
    const hasBottomTargets = data.targetConnections?.some((id) =>
      id.includes("bottom")
    );
    const hasLeftTargets = data.targetConnections?.some((id) =>
      id.includes("left")
    );
    const hasTopSources = data.sourceConnections?.some((id) =>
      id.includes("top")
    );
    const hasBottomSources = data.sourceConnections?.some(
      (id) => id.includes("bottom") || !id.includes("position")
    );

    return (
      <>
        {hasTopSources && <Handle type="source" position={Position.Top} />}
        {hasBottomSources && (
          <Handle type="source" position={Position.Bottom} />
        )}
        {hasTopTargets && <Handle type="target" position={Position.Top} />}
        {hasBottomTargets && (
          <Handle type="target" position={Position.Bottom} />
        )}
        {hasLeftTargets && <Handle type="target" position={Position.Left} />}
        <div className="p-2">{data.label}</div>
      </>
    );
  },
});

export default NodeTypes;
