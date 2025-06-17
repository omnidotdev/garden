import { useGardenStore } from "lib/hooks/store";
import { DownloadIcon, RotateCcwIcon } from "lucide-react";

import { Convert } from "@omnidotdev/garden";
import { Button } from "@/components/ui/button";

import type { GardenTypes } from "@omnidotdev/garden";

interface Props {
  /** The current JSON schema text being edited. */
  schemaText: string;
  /** Function to set or clear the current error message. */
  setError: (error: string | null) => void;
}

/**
 * Editor Actions.
 */
const EditorActions = ({ schemaText, setError }: Props) => {
  const { setActiveSchema, reset } = useGardenStore();

  const validateAndApply = () => {
    try {
      // Validate schema. Will throw error if not valid.
      Convert.toGardenTypes(schemaText);

      // Keep structure and order of `schemaText`
      const parsedJson = JSON.parse(schemaText);

      setError(null);
      setActiveSchema(parsedJson as GardenTypes);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
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

        <Button onClick={() => reset()} variant="outline">
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
