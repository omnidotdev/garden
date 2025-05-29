import { Icons } from "components/core";
import { Button } from "components/ui";
import useSearchParams from "lib/hooks/useSearchParams";

const EditorControls = () => {
  const [{ fontSize, editorExpanded }, setSearchParams] = useSearchParams();

  return (
    <div className="mt-4 flex w-full justify-end gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setSearchParams({ fontSize: fontSize - 1 })}
      >
        <Icons.Minus size={16} />
      </Button>

      <div className="flex h-auto items-center px-1">{fontSize}</div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setSearchParams({ fontSize: fontSize + 1 })}
      >
        <Icons.Plus size={16} />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setSearchParams({ editorExpanded: !editorExpanded })}
      >
        {editorExpanded ? (
          <Icons.Minimize2 size={16} />
        ) : (
          <Icons.Expand size={16} />
        )}
      </Button>
    </div>
  );
};

export default EditorControls;
