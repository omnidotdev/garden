"use client";

import { Suspense } from "react";

import { Visualizer } from "@/components/visualizer";
import { gardens } from "@/lib/schema/garden";

/**
 * Garden visualizer page.
 *
 * This page provides a full-featured environment for visualizing and working with garden structures.
 * It includes the garden selector, instructions, activity log, and other UI components that enhance
 * the garden visualization experience.
 */
const VisualizerPage = () => {
  return (
    <div className="flex h-[100dvh] w-full overflow-hidden">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            Loading visualizer...
          </div>
        }
      >
        <div className="h-full w-full overflow-hidden">
          <Visualizer gardens={gardens} />
        </div>
      </Suspense>
    </div>
  );
};

export default VisualizerPage;
