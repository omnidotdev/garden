"use client";

import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";

import { getGardenStore } from "@/store";

/**
 * Hook for accessing and updating the active garden.
 */
const useGardenStore = () => {
  const store = getGardenStore();

  return useStoreWithEqualityFn(store, (state) => state, shallow);
};

export default useGardenStore;
