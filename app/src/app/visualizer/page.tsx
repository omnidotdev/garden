import { Suspense } from "react";

import { Visualizer } from "components/visualizer";

/**
 * Garden visualizer.
 */
const VisualizerPage = () => (
  <Suspense fallback={<div>Loading visualizer...</div>}>
    <Visualizer />
  </Suspense>
);

export default VisualizerPage;
