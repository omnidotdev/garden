import { Button } from "components/ui";
import { LOCAL_STORAGE_KEY } from "lib/constants";
import { useGardenStore } from "lib/hooks/store";

import type { GardenTypes } from "generated/garden.types";
import type { Gardens } from "store";

interface Props {
  /** All available gardens */
  gardens: Gardens;
}

/**
 * Displays a list of gardens with buttons to select each garden.
 */
const GardenList = ({ gardens }: Props) => {
  const {
    activeGarden,
    setActiveGarden,
    setBreadcrumbs,
    setNavigationHistory,
  } = useGardenStore();

  const handleGardenClick = (garden: GardenTypes) => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setActiveGarden(garden);
    setNavigationHistory(garden);
    setBreadcrumbs(garden.name);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* TODO: Wrap gardens in array */}
      {Object.values(gardens).map((garden) => {
        const isActive = activeGarden?.name === garden.name;
        return (
          <Button
            key={garden.name}
            size="sm"
            variant={isActive ? "default" : "outline"}
            className={isActive ? "border-2 border-primary" : ""}
            onClick={() => handleGardenClick(garden)}
          >
            {garden.icon && garden.icon} {garden.name}
          </Button>
        );
      })}
    </div>
  );
};

export default GardenList;
