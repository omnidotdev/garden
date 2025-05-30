import { ReactFlowProvider } from "@xyflow/react";

import { GardenFlowInner } from "components/visualizer";

import type { Gardens } from "store";

interface Props {
  /** All available gardens */
  gardens: Gardens;
}

/**
 * Garden Flow.
 */
const GardenFlow = ({ gardens }: Props) => {
  return (
    <ReactFlowProvider>
      <div className="h-[800px] w-full overflow-hidden rounded-lg border">
        <GardenFlowInner gardens={gardens} />
      </div>
    </ReactFlowProvider>
  );
};

export default GardenFlow;
