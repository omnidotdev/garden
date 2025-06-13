import { ReactFlowProvider } from "@xyflow/react";

import { GardenFlowInner } from "@/components/visualizer";

import type { Gardens } from "store";

interface Props {
  /** All available gardens */
  gardens: Gardens;
  /** Optional flag to show controls */
  showControls?: boolean;
  /** Optional flag to show minimap */
  showMinimap?: boolean;
  /** Optional flag to enable or disable auto layout on load. Default is true. */
  enableAutoLayout?: boolean;
  /** Optional flag to expand subgardens in the visualization. Default is false. */
  expandSubgardens?: boolean;
  /** Optional padding for fit view. Default is 0.2. */
  fitViewPadding?: number;
  /** Optional edge type for connections. Options: 'default', 'straight', 'step', 'smoothstep', 'simplebezier'. Default is 'smoothstep'. */
  edgeType?: "default" | "straight" | "step" | "smoothstep" | "simplebezier";
  /** Optional flag to enable or disable edge animations. Default is true. */
  animateEdges?: boolean;
}

/**
 * Garden Flow.
 */
const GardenFlow = ({
  gardens,
  showControls = true,
  showMinimap = true,
  enableAutoLayout = true,
  expandSubgardens = false,
  fitViewPadding = 0.2,
  edgeType = "smoothstep",
  animateEdges = true,
}: Props) => {
  return (
    <ReactFlowProvider>
      <div className="h-full w-full overflow-hidden rounded-lg border">
        <GardenFlowInner
          gardens={gardens}
          showControls={showControls}
          showMinimap={showMinimap}
          enableAutoLayout={enableAutoLayout}
          expandSubgardens={expandSubgardens}
          fitViewPadding={fitViewPadding}
          edgeType={edgeType}
          animateEdges={animateEdges}
        />
      </div>
    </ReactFlowProvider>
  );
};

export default GardenFlow;
