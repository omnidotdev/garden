"use client";

import type { GardenTypes } from "@omnidotdev/garden";
import { shallow } from "zustand/shallow";
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
const useGardenStore = createWithEqualityFn<GardenState & GardenActions>(
	(set) => ({
		...initialState,
		setActiveGarden: (garden) => set({ activeGarden: garden }),
		reset: () => set(initialState),
	}),
	shallow,
);

export default useGardenStore;
