import { ReactFlowProvider } from "@xyflow/react";

import { GardenFlowInner } from "components/visualizer";

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
        />
      </div>
    </ReactFlowProvider>
  );
};

export default GardenFlow;
