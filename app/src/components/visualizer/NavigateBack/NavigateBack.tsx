import { Icons } from "components/core";
import { Button } from "components/ui";
import { useGardenStore } from "lib/hooks/store";

/**
 * A button component that allows users to navigate back to the previous garden in the navigation history.
 */
const NavigateBack = () => {
  const {
    breadcrumbs,
    navigationHistory,
    setActiveGarden,
    setBreadcrumbs,
    setNavigationHistory,
  } = useGardenStore();

  const handleNavigateBack = () => {
    if (navigationHistory.length > 1) {
      const previousEntry = navigationHistory[navigationHistory.length - 2];
      const previousGarden = previousEntry.garden;
      setActiveGarden(previousGarden);
      setNavigationHistory((prev) => prev.slice(0, -1));

      // Update breadcrumbs to match the garden hierarchy
      if (breadcrumbs.includes(previousGarden.name)) {
        // If the previous garden is already in breadcrumbs, truncate to that point
        const index = breadcrumbs.indexOf(previousGarden.name);
        setBreadcrumbs((prev) => prev.slice(0, index + 1));
      } else if (
        previousGarden.supergardens &&
        previousGarden.supergardens.length > 0
      ) {
        // If the previous garden has supergardens, add it to appropriate place
        const supergardenName = previousGarden.supergardens[0].name;

        if (breadcrumbs.includes(supergardenName)) {
          const supergardenIdx = breadcrumbs.indexOf(supergardenName);
          setBreadcrumbs((prev) => [
            ...prev.slice(0, supergardenIdx + 1),
            previousGarden.name,
          ]);
        } else {
          // Default case - just use the garden's name
          setBreadcrumbs(previousGarden.name);
        }
      } else {
        // Default for root gardens
        setBreadcrumbs(previousGarden.name);
      }
    }
  };

  if (navigationHistory.length <= 1) return null;

  return (
    <Button variant="secondary" size="sm" onClick={handleNavigateBack}>
      <Icons.ArrowLeft size={16} className="mr-1" />
      Back
    </Button>
  );
};

export default NavigateBack;
