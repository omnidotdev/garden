import DefaultNode from "./DefaultNode/DefaultNode";
import GardenNode from "./GardenNode/GardenNode";
import SproutNode from "./SproutNode/SproutNode";
import SubgardenNode from "./SubgardenNode/SubgardenNode";
import SupergardenNode from "./SupergardenNode/SupergardenNode";

import type { Theme } from "../../generated/garden.types";

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

export interface NodeProps {
  data: NodeData;
}

export const customNodes = {
  garden: GardenNode,
  sprout: SproutNode,
  supergarden: SupergardenNode,
  subgarden: SubgardenNode,
  default: DefaultNode,
};
