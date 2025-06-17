"use client";

import { Suspense } from "react";

import { Visualizer } from "@/components/visualizer";

/**
 * Garden visualizer page.
 *
 * This page provides a full-featured environment for visualizing and working with garden structures.
 * It includes the garden selector, instructions, activity log, and other UI components that enhance
 * the garden visualization experience.
 */
const VisualizerPage = () => {
	return (
		<div className="flex h-full w-full">
			<Suspense
				fallback={
					<div className="flex h-full w-full items-center justify-center">
						Loading visualizer...
					</div>
				}
			>
				<Visualizer />
			</Suspense>
		</div>
	);
};

export default VisualizerPage;
