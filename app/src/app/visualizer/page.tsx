import { Suspense } from "react";

import { Visualizer } from "components/visualizer";

/**
 * Garden visualizer.
 */
const VisualizerPage = () => (
  <Suspense>
    <Visualizer />
  </Suspense>
);

export default VisualizerPage;
