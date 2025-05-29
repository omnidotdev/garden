import { ReactFlowProvider } from "@xyflow/react";
import GardenFlowInner from "../GardenFlowInner/GardenFlowInner";

import type { GardenTypes } from "generated/garden.types";

interface Props {
  garden: GardenTypes;
  onNavigateToGarden?: (gardenName: string) => void;
}

// Wrap with provider to avoid context issues
const GardenFlow = ({ garden, onNavigateToGarden }: Props) => {
  return (
    <ReactFlowProvider>
      <div className="h-[800px] w-full overflow-hidden rounded-lg border">
        <GardenFlowInner
          garden={garden}
          onNavigateToGarden={onNavigateToGarden}
        />
      </div>
    </ReactFlowProvider>
  );
};

export default GardenFlow;
