"use client";

import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

import { gardens } from "@/lib/schema/garden";

import type { GardenTypes } from "@omnidotdev/garden";

interface NavigationEntry {
  // TODO: do we need the entire garden object here?
  garden: GardenTypes;
  timestamp: number;
}

type NavigationHistoryUpdater =
  | GardenTypes
  | ((prev: NavigationEntry[]) => NavigationEntry[]);

/**
 * Garden state.
 */
interface GardenState {
  /** The currently active garden. */
  activeGarden: GardenTypes;
  /** The history of gardens selected */
  navigationHistory: NavigationEntry[];
}

/**
 * Garden actions.
 */
interface GardenActions {
  /** Set the active garden. */
  setActiveGarden: (garden: GardenTypes) => void;
  /** Update the navigation history. */
  setNavigationHistory: (updater: NavigationHistoryUpdater) => void;
}

const initialState: GardenState = {
  activeGarden: Object.values(gardens)[0],
  navigationHistory: [],
};

const updateNavigationHistory = (
  state: NavigationEntry[],
  input: ((prev: NavigationEntry[]) => NavigationEntry[]) | GardenTypes,
): NavigationEntry[] => {
  if (typeof input === "function") {
    return input(state);
  }

  return [...state, { garden: input, timestamp: Date.now() }];
};

/**
 * Hook for accessing and updating the active garden.
 */
const useGardenStore = createWithEqualityFn<GardenState & GardenActions>(
  (set) => ({
    ...initialState,
    setActiveGarden: (garden) => set({ activeGarden: garden }),
    setNavigationHistory: (updater) =>
      set((state) => ({
        navigationHistory: updateNavigationHistory(
          state.navigationHistory,
          updater,
        ),
      })),
  }),
  shallow,
);

export default useGardenStore;
