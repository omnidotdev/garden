import type { GardenTypes } from "generated/garden.types";
import type { NavigationEntry } from "store";

/**
 * Handles updates to navigation history.
 */
const updateNavigationHistory = (
  state: NavigationEntry[],
  input: ((prev: NavigationEntry[]) => NavigationEntry[]) | GardenTypes,
): NavigationEntry[] => {
  if (typeof input === "function") {
    return input(state);
  }

  return [...state, { garden: input, timestamp: Date.now() }];
};

export default updateNavigationHistory;
