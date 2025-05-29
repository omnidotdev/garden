import { Plus, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import useSearchParams from "@/lib/hooks/useSearchParams";

const EditorControls = () => {
  const [{ fontSize }, setSearchParams] = useSearchParams();

  return (
    <div className="flex items-center gap-2">
      <Button
        type="submit"
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={() => setSearchParams({ fontSize: fontSize - 1 })}
      >
        <Minus size={16} />
      </Button>

      <div>{fontSize}</div>

      <Button
        type="submit"
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={() => setSearchParams({ fontSize: fontSize + 1 })}
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};

export default EditorControls;
