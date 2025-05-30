import { Icons } from "components/core";
import { useGardenStore } from "lib/hooks/store";

import type { Gardens } from "store";

interface Props {
  /** All available gardens */
  gardens: Gardens;
}

/**
 * Breadcrumbs component to navigate through garden hierarchy.
 */
const Breadcrumbs = ({ gardens }: Props) => {
  const { breadcrumbs, setActiveGarden, setBreadcrumbs, setNavigationHistory } =
    useGardenStore();

  const handleBreadcrumbClick = (index: number) => {
    if (index < breadcrumbs.length) {
      const gardenName = breadcrumbs[index];
      const targetGarden = gardens[gardenName];

      if (targetGarden) {
        setActiveGarden(targetGarden);
        setNavigationHistory((prev) => prev.slice(0, index));
        setBreadcrumbs((prev) => prev.slice(0, index + 1));
      }
    }
  };

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 rounded-md bg-muted/40 px-3 py-1 md:space-x-2 rtl:space-x-reverse">
        {breadcrumbs.map((crumb, index) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: index used for simplicity
            key={`${crumb}-${index}`}
            className="inline-flex items-center"
          >
            {index > 0 && (
              <span className="mx-1 text-gray-400">
                <Icons.ArrowRight size={12} />
              </span>
            )}
            <button
              type="button"
              onClick={() => handleBreadcrumbClick(index)}
              className={`inline-flex items-center gap-1 font-medium text-sm transition-colors hover:text-primary ${
                index === breadcrumbs.length - 1
                  ? "rounded px-2 py-0.5 font-semibold text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <p>{index === 0 && "🏠 "}</p>
              <p>{index !== 0 && index === breadcrumbs.length - 1 && "📍 "}</p>
              <p>{crumb}</p>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
