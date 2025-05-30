import { Handle, Position } from "@xyflow/react";

import { Icons } from "components/core";
import { Button, Card } from "components/ui";

import type { NodeData } from "components/visualizer/customNodes";

interface Props {
  data: NodeData;
}

const SupergardenNode = ({ data }: Props) => (
  <Card className="w-[200px] border-2 shadow-lg">
    <Handle type="source" position={Position.Bottom} />
    <div
      className="relative flex cursor-pointer flex-col items-center border-2 border-white/70 border-dashed p-4 text-center transition-transform hover:scale-105"
      style={{
        background: "hsl(var(--chart-9))",
        color: "hsl(var(--chart-9-foreground))",
        borderRadius: "var(--radius)",
      }}
    >
      <div className="absolute top-1 right-1 rounded bg-white/30 px-1 py-0.5 font-semibold text-white text-xs">
        Supergarden
      </div>
      <Icons.Globe className="mb-2 h-6 w-6 animate-pulse" />
      <h3 className="font-medium">{data.label}</h3>
      {data.description && (
        <p className="mt-1 line-clamp-2 text-sm">{data.description}</p>
      )}
      {data.version && <span className="mt-1 text-xs">v{data.version}</span>}
      <div className="mt-3 flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            window.open(data.url, "_blank");
          }}
        >
          <Icons.ExternalLink className="mr-1 h-3 w-3" />
          View
        </Button>
      </div>
    </div>
  </Card>
);

export default SupergardenNode;
