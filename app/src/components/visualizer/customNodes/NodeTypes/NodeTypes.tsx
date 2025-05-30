import { Handle, Position } from "@xyflow/react";

import {
  CategoryNode,
  GardenRefNode,
  GardenNode,
  ItemNode,
  SubgardenNode,
  SupergardenNode,
} from "components/visualizer/customNodes";

import type { Icons } from "components/core";

export interface NodeData {
  label: string;
  description?: string;
  icon: keyof typeof Icons;
  icon_color?: string;
  image?: string;
  expandable?: boolean;
  version?: string;
  url?: string;
  cta?: {
    primary: { label: string; url: string };
    secondary?: { label: string; url: string };
  };
}

const NodeTypes = () => ({
  garden: GardenNode,
  category: CategoryNode,
  item: ItemNode,
  garden_ref: GardenRefNode,
  supergarden: SupergardenNode,
  subgarden: SubgardenNode,
  default: ({ data }: { data: NodeData }) => (
    <>
      <Handle type="source" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Bottom} />
      <Handle type="target" position={Position.Left} />
      <div className="p-2">{data.label}</div>
    </>
  ),
});

export default NodeTypes;
