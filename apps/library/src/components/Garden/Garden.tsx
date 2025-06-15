import { ReactFlowProvider } from "@xyflow/react";

import { gardenToFlow } from "../../lib/utils";
import { GardenFlow } from "../GardenFlow";

import type { ControlProps, MiniMapProps } from "@xyflow/react";
import type { GardenTypes } from "../../generated/garden.types";

import "@xyflow/react/dist/style.css";

export interface GardenProps {
  /** Garden schema to visualize */
  schema: Record<string, GardenTypes>;
  /** Optional initial garden name to display. Defaults to first available garden. */
  initialGardenName?: string;
  /** Optional class name for the container */
  className?: string;
  /** Optional flag to expand all subgardens for the current garden. Default is false. */
  expandSubgardens?: boolean;
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

const Garden = ({
  schema,
  initialGardenName,
  expandSubgardens = false,
  showControls = true,
  showMinimap = true,
  fitViewPadding = 0.2,
  edgeType = "smoothstep",
  animateEdges = true,
  ...rest
}: GardenProps) => {
  const initialGarden =
    Object.values(schema).find((garden) => garden.name === initialGardenName) ??
    Object.values(schema)[0];

  const { nodes: initialNodes, edges: initialEdges } = gardenToFlow({
    schema,
    garden: initialGarden,
    options: {
      expandSubgardens,
      edgeType,
      animateEdges,
    },
  });

  return (
    <ReactFlowProvider>
      <GardenFlow
        schema={schema}
        initialNodes={initialNodes}
        initialEdges={initialEdges}
        showControls={showControls}
        showMinimap={showMinimap}
        fitViewPadding={fitViewPadding}
        edgeType={edgeType}
        animateEdges={animateEdges}
        expandSubgardens={expandSubgardens}
        {...rest}
      />
    </ReactFlowProvider>
  );
};

export default Garden;
