"use client";

import type { GardenTypes } from "@omnidotdev/garden";
import { persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { gardens } from "@/lib/schema/garden";

/**
 * Garden state.
 */
interface GardenState {
	/** The currently active garden. */
	activeGarden: GardenTypes;
}

/**
 * Garden actions.
 */
interface GardenActions {
	/** Set the active garden. */
	setActiveGarden: (garden: GardenTypes) => void;
	reset: () => void;
}

const initialState: GardenState = {
	activeGarden: gardens,
};

/**
 * Hook for accessing and updating the active garden.
 */
const useGardenStore = createWithEqualityFn<GardenState & GardenActions>()(
	persist(
		(set) => ({
			...initialState,
			setActiveGarden: (garden) => set({ activeGarden: garden }),
			reset: () => set(initialState),
		}),
		{ name: "garden-schema-editor-content" },
	),
);

export default useGardenStore;
