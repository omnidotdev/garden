import { ReactFlowProvider } from "@xyflow/react";

import { Convert } from "../../generated/garden.types";
import { findGardenByName, gardenToFlow } from "../../lib/utils";
import { GardenFlow } from "../GardenFlow";

import type { GardenSchema } from "../../generated/garden.types";
import type { GardenVisualizationProps } from "../../lib/types/garden.types";

import "../../lib/garden.css";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export interface GardenProps extends GardenVisualizationProps {
  /** Garden schema to visualize. */
  schema: JsonValue | GardenSchema;
  /** Initial garden name to display. Defaults to first available garden. */
  initialGardenName?: string;
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
  const convertedSchema = Convert.toGardenSchema(JSON.stringify(schema));

  const initialGarden = initialGardenName
    ? findGardenByName(convertedSchema, initialGardenName)
    : convertedSchema;

  const { nodes: initialNodes, edges: initialEdges } = gardenToFlow({
    schema: convertedSchema,
    garden: initialGarden!,
    options: {
      expandSubgardens,
      edgeType,
      animateEdges,
    },
  });

  return (
    <ReactFlowProvider>
      <GardenFlow
        schema={convertedSchema}
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
