"use client";

import { persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

import { gardens } from "@/lib/schema/garden";

import type { GardenSchema } from "@omnidotdev/garden";

/**
 * Garden state.
 */
interface GardenState {
  /** The currently active schema to be visualized. */
  activeSchema: GardenSchema;
}

/**
 * Garden actions.
 */
interface GardenActions {
  /** Set the active schema. */
  setActiveSchema: (schema: GardenSchema) => void;
  reset: () => void;
}

const initialState: GardenState = {
  activeSchema: gardens,
};

/**
 * Hook for accessing and updating the active schema.
 */
const useGardenStore = createWithEqualityFn<GardenState & GardenActions>()(
  persist(
    (set) => ({
      ...initialState,
      setActiveSchema: (schema) => set({ activeSchema: schema }),
      reset: () => set(initialState),
    }),
    { name: "garden-schema-editor-content" },
  ),
);

export default useGardenStore;
