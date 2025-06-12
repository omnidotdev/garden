import { createStore } from "zustand";
import { gardens } from "lib/schema/garden";
import { updateBreadcrumbs, updateNavigationHistory } from "lib/util";

import type { GardenTypes } from "generated/garden.types";

export type Gardens = Record<string, GardenTypes>;

export interface NavigationEntry {
  // TODO: do we need the entire garden object here?
  garden: GardenTypes;
  timestamp: number;
}

type NavigationHistoryUpdater =
  | GardenTypes
  | ((prev: NavigationEntry[]) => NavigationEntry[]);

type BreadcrumbsUpdater = string | ((prev: string[]) => string[]);

/**
 * Garden state.
 */
export interface GardenState {
  /** The currently active garden. */
  activeGarden: GardenTypes;
  /** The history of gardens selected */
  navigationHistory: NavigationEntry[];
  /** the breadcrumbs based on garden hierarchy */
  breadcrumbs: string[];
}

/**
 * Garden actions.
 */
export interface GardenActions {
  /** Set the active garden. */
  setActiveGarden: (garden: GardenTypes) => void;
  /** Update the navigation history. */
  setNavigationHistory: (updater: NavigationHistoryUpdater) => void;
  /** Update breadcrumbs based on garden hierarchy */
  setBreadcrumbs: (update: BreadcrumbsUpdater) => void;
}

const initialGarden = Object.values(gardens)[0];

/**
 * Create a garden store.
 */
const createGardenStore = () =>
  createStore<GardenState & GardenActions>()((set) => ({
    activeGarden: initialGarden,
    navigationHistory: [
      {
        garden: initialGarden,
        timestamp: Date.now(),
      },
    ],
    breadcrumbs: [],
    setActiveGarden: (garden) => set({ activeGarden: garden }),
    setNavigationHistory: (updater) =>
      set((state) => ({
        navigationHistory: updateNavigationHistory(
          state.navigationHistory,
          updater
        ),
      })),
    setBreadcrumbs: (updater) =>
      set((state) => ({
        breadcrumbs: updateBreadcrumbs(
          state.breadcrumbs,
          state.activeGarden,
          updater
        ),
      })),
  }));

/**
 * Singleton instance of the garden store.
 */
const gardenStore = createGardenStore();

/**
 * Retrieve the singleton garden store.
 */
const getGardenStore = () => gardenStore;

export default getGardenStore;
