import { Icons } from "components/core";
import { Button } from "components/ui";

import type { GardenTypes } from "generated/garden.types";

const LOCAL_STORAGE_KEY = "garden-schema-editor-content";

interface Props {
  schemaText: string;
  setSchemaText: (text: string) => void;
  setError: (error: string | null) => void;
  onSchemaChange: (schema: GardenTypes) => void;
  garden?: GardenTypes;
}

const EditorActions = ({
  schemaText,
  setSchemaText,
  setError,
  onSchemaChange,
  garden,
}: Props) => {
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
          "Invalid schema: missing required fields (name, version, or categories)",
        );
      }

      setError(null);
      onSchemaChange(parsedJson as GardenTypes);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const resetToSample = () => {
    if (!garden) return;

    const sampleText = JSON.stringify(garden, null, 2);
    setSchemaText(sampleText);
    setError(null);
    onSchemaChange(garden);
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
          <Icons.RotateCcw size={16} />
          <p className="ml-2 hidden md:flex">Reset to Sample</p>
        </Button>
      </div>

      <Button onClick={downloadSchema} variant="outline">
        <Icons.Download size={16} />

        <p className="ml-2 hidden md:flex">Download Schema</p>
      </Button>
    </div>
  );
};

export default EditorActions;
