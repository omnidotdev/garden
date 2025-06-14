import { ReactFlowProvider } from "@xyflow/react";

import { gardenToFlow } from "../../lib/utils";
import { GardenFlow } from "../GardenFlow";

import type { ControlProps, MiniMapProps } from "@xyflow/react";
import type { GardenTypes } from "../../generated/garden.types";

import "@xyflow/react/dist/style.css";

export interface GardenProps {
  /** Garden schema to visualize */
  schema: Record<string, GardenTypes>;
  /** Optional class name for the container */
  className?: string;
  /** Optional flag to enable or disable controls. Default is true. */
  showControls?: boolean;
  /** Optional flag to enable or disable the minimap. Default is true. */
  showMinimap?: boolean;
  /** Optional padding for fit view. Default is 0.2. */
  fitViewPadding?: number;
  /** Optional edge type for connections. Options: 'default', 'straight', 'step', 'smoothstep', 'simplebezier'. Default is 'smoothstep'. */
  edgeType?: "default" | "straight" | "step" | "smoothstep" | "simplebezier";
  /** Optional flag to enable or disable edge animations. Default is true. */
  animateEdges?: boolean;
  /** Minimap options */
  miniMapOptions?: MiniMapProps;
  /** Controls options */
  controlOptions?: ControlProps;
}

const Garden = ({ schema, ...rest }: GardenProps) => {
  const { nodes: initialNodes, edges: initialEdges } = gardenToFlow({
    schema,
    // TODO: make dynamic
    garden: Object.values(schema)[0],
    options: {
      expandSubgardens: false,
      edgeType: rest.edgeType,
      animateEdges: rest.animateEdges,
    },
  });

  return (
    <ReactFlowProvider>
      <GardenFlow
        schema={schema}
        initialNodes={initialNodes}
        initialEdges={initialEdges}
        {...rest}
      />
    </ReactFlowProvider>
  );
};

export default Garden;
