import { Minus, Plus, Minimize2, Expand } from "lucide-react";
import { Button } from "components/ui";
import { useSearchParams } from "lib/hooks";

/**
 * Editor Controls.
 */
const EditorControls = () => {
  const [{ fontSize, editorExpanded }, setSearchParams] = useSearchParams();

  return (
    <div className="mt-4 flex w-full justify-end gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setSearchParams({ fontSize: fontSize - 1 })}
      >
        <Minus size={16} />
      </Button>

      <div className="flex h-auto items-center px-1">{fontSize}</div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setSearchParams({ fontSize: fontSize + 1 })}
      >
        <Plus size={16} />
      </Button>

      {/* TODO: some theme provider rendering issues on close */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setSearchParams({ editorExpanded: !editorExpanded })}
      >
        {editorExpanded ? <Minimize2 size={16} /> : <Expand size={16} />}
      </Button>
    </div>
  );
};

export default EditorControls;
