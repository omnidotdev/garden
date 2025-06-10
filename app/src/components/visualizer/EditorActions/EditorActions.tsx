import { DownloadIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "components/ui";

import { LOCAL_STORAGE_KEY } from "lib/constants";
import { useGardenStore } from "lib/hooks/store";

import type { GardenTypes } from "generated/garden.types";

interface Props {
  /** The current JSON schema text being edited. */
  schemaText: string;
  /** Function to update the schema text. */
  setSchemaText: (text: string) => void;
  /** Function to set or clear the current error message. */
  setError: (error: string | null) => void;
}

/**
 * Editor Actions.
 */
const EditorActions = ({ schemaText, setSchemaText, setError }: Props) => {
  const { activeGarden, setActiveGarden } = useGardenStore();

  const validateAndApply = () => {
    try {
      const parsedJson = JSON.parse(schemaText);
      // Instead of using parse directly, we'll do a simple validation
      // by checking required fields
      if (
        !parsedJson.name ||
        !parsedJson.version ||
        !Array.isArray(parsedJson.categories)
      ) {
        throw new Error(
          "Invalid schema: missing required fields (name, version, or categories)"
        );
      }

      setError(null);
      setActiveGarden(parsedJson as GardenTypes);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const resetToSample = () => {
    if (!activeGarden) return;

    const sampleText = JSON.stringify(activeGarden, null, 2);
    setSchemaText(sampleText);
    setError(null);
    setActiveGarden(activeGarden);
    localStorage.setItem(LOCAL_STORAGE_KEY, sampleText);
  };

  const downloadSchema = () => {
    const blob = new Blob([schemaText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "garden-schema.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-2">
        <Button onClick={validateAndApply} variant="default">
          Apply Changes
        </Button>

        <Button onClick={resetToSample} variant="outline">
          <RotateCcwIcon size={16} />
          <p className="ml-2 hidden md:flex">Reset to Sample</p>
        </Button>
      </div>

      <Button onClick={downloadSchema} variant="outline">
        <DownloadIcon size={16} />

        <p className="ml-2 hidden md:flex">Download Schema</p>
      </Button>
    </div>
  );
};

export default EditorActions;
