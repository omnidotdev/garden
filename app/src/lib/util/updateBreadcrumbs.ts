import type { GardenTypes } from "generated/garden.types";

/**
 * Handles updates to breadcrumbs based on active garden and input.
 */
const updateBreadcrumbs = (
  currentBreadcrumbs: string[],
  activeGarden: GardenTypes,
  input: ((prev: string[]) => string[]) | string,
): string[] => {
  if (typeof input === "function") {
    return input(currentBreadcrumbs);
  }

  const gardenName = input;

  if (activeGarden.supergardens && activeGarden.supergardens.length > 0) {
    const supergardenName = activeGarden.supergardens[0].name;

    if (!currentBreadcrumbs.includes(supergardenName)) {
      return [supergardenName, gardenName];
    }

    const supergardenIdx = currentBreadcrumbs.indexOf(supergardenName);
    return [...currentBreadcrumbs.slice(0, supergardenIdx + 1), gardenName];
  }

  return [gardenName];
};

export default updateBreadcrumbs;
