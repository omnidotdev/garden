import { Handle, Position } from "@xyflow/react";

import { Icons } from "components/core";
import { Button, Card } from "components/ui";

interface NodeData {
  label: string;
  description?: string;
  icon: keyof typeof Icons;
  icon_color?: string;
  image?: string;
  expandable?: boolean;
  version?: string;
  url?: string;
  cta?: {
    primary: { label: string; url: string };
    secondary?: { label: string; url: string };
  };
}

const GardenNode = ({ data }: { data: NodeData }) => (
  <Card className="w-[200px] border-2 shadow-lg">
    <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-primary p-4 text-center text-primary-foreground">
      <Icons.Sprout className="h-8 w-8" />
      <h2 className="font-semibold text-2xl">{data.label}</h2>

      <h4>{data.description}</h4>
    </div>
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
  </Card>
);

const CategoryNode = ({ data }: { data: NodeData }) => {
  const Icon = Icons[data.icon];

  return (
    <Card className="w-[200px] border-2 shadow-lg">
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="p-4">
        <div
          className="flex items-center gap-3"
          style={{ color: data.icon_color }}
        >
          {Icon && <Icon className="h-5 w-5" />}
          <h3 className="font-medium">{data.label}</h3>
        </div>
        {data.description && (
          <p className="mt-1 text-muted-foreground text-sm">
            {data.description}
          </p>
        )}
      </div>
    </Card>
  );
};

const ItemNode = ({ data }: { data: NodeData }) => (
  <Card className="w-[200px] border-2 shadow-lg">
    <div className="space-y-3">
      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
        <img
          src={data.image}
          alt={data.label}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="px-4">
        <h3 className="font-medium">{data.label}</h3>
        {data.description && (
          <p className="mt-1 line-clamp-2 text-muted-foreground text-sm">
            {data.description}
          </p>
        )}
      </div>
      <div className="flex gap-2 p-4 pt-0">
        <Button
          variant="default"
          size="sm"
          className="w-full"
          onClick={() => window.open(data.cta?.primary.url, "_blank")}
        >
          <Icons.ExternalLink className="mr-1 h-4 w-4" />
          {data.cta?.primary.label}
        </Button>

        {data.cta?.secondary && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(data.cta?.secondary?.url, "_blank")}
          >
            <Icons.Git className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
  </Card>
);

const GardenRefNode = ({ data }: { data: NodeData }) => (
  <Card className="w-[200px] border-2 shadow-lg">
    <Handle type="target" position={Position.Top} />
    <Handle type="target" position={Position.Left} />
    <div className="relative flex cursor-pointer flex-col items-center rounded-md border-2 border-primary/50 border-dashed p-4 text-center transition-colors hover:bg-primary-foreground/10">
      <div className="absolute top-1 right-1 rounded bg-primary/20 px-1 py-0.5 font-semibold text-primary text-xs">
        Navigate
      </div>
      <Icons.Link className="mb-2 h-6 w-6" style={{ color: data.icon_color }} />
      <h3 className="font-medium">{data.label}</h3>
      {data.description && (
        <p className="mt-1 line-clamp-2 text-muted-foreground text-sm">
          {data.description}
        </p>
      )}
      {data.version && (
        <span className="mt-1 text-muted-foreground text-xs">
          v{data.version}
        </span>
      )}
      <div className="mt-3 flex gap-2">
        <Button
          variant="outline"
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

const SupergardenNode = ({ data }: { data: NodeData }) => (
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

const SubgardenNode = ({ data }: { data: NodeData }) => (
  <Card className="w-[200px] border-2 shadow-lg">
    <Handle type="target" position={Position.Bottom} />
    <div
      className="relative flex cursor-pointer flex-col items-center p-4 text-center transition-transform hover:scale-105"
      style={{
        background: "hsl(var(--chart-8))",
        color: "hsl(var(--chart-8-foreground))",
        borderRadius: "var(--radius)",
      }}
    >
      <div className="absolute top-1 right-1 rounded bg-white/30 px-1 py-0.5 font-semibold text-white text-xs">
        Navigate Down
      </div>
      {data.expandable && (
        <div className="absolute top-1 left-1 flex items-center rounded bg-white/30 px-1 py-0.5 font-semibold text-white text-xs">
          <Icons.Layers className="mr-1 h-3 w-3" />
          Expandable
        </div>
      )}
      <Icons.GitBranch className="mb-2 h-6 w-6 animate-pulse" />
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

export const nodeTypes = {
  garden: GardenNode,
  category: CategoryNode,
  item: ItemNode,
  garden_ref: GardenRefNode,
  supergarden: SupergardenNode,
  subgarden: SubgardenNode,
  default: ({ data }: { data: NodeData }) => (
    <>
      <Handle type="source" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Bottom} />
      <Handle type="target" position={Position.Left} />
      <div className="p-2">{data.label}</div>
    </>
  ),
};

export default nodeTypes;
