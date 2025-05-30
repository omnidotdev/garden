import { Suspense } from "react";

import { Visualizer } from "components/visualizer";
import { gardens } from "lib/schema/garden";

/**
 * Garden visualizer.
 */
const VisualizerPage = () => {
  return (
    <Suspense>
      <Visualizer gardens={gardens} />
    </Suspense>
  );
};

export default VisualizerPage;
