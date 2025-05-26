import { Handle, Position } from "@xyflow/react";
import {
  ExternalLink,
  GitBranch,
  Globe,
  Layers,
  Link,
  Sprout,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

const BaseNode = ({
  data,
  children,
}: {
  data: any;
  children: React.ReactNode;
}) => <Card className="w-[200px] border-2 shadow-lg">{children}</Card>;

const GardenNode = ({ data }: { data: any }) => (
  <BaseNode data={data}>
    <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-primary p-4 text-center text-primary-foreground">
      <Sprout className="h-8 w-8" />
      <h2 className="font-semibold text-2xl">{data.label}</h2>

      <h4>{data.description}</h4>
    </div>
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
  </BaseNode>
);

const CategoryNode = ({ data }: { data: any }) => {
  const Icon = Icons[data.icon];

  return (
    <BaseNode data={data}>
      <Handle
        type="target"
        position={Position.Top}
      />
      <Handle
        type="source"
        position={Position.Bottom}
      />
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
    </BaseNode>
  );
};

const ItemNode = ({ data }: { data: any }) => (
  <BaseNode data={data}>
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
          onClick={() => window.open(data.cta.primary.url, "_blank")}
        >
          <ExternalLink className="mr-1 h-4 w-4" />
          {data.cta.primary.label}
        </Button>
        {data.cta.secondary && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(data.cta.secondary.url, "_blank")}
          >
            <Icons.Git className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
  </BaseNode>
);

const GardenRefNode = ({ data }: { data: any }) => (
  <BaseNode data={data}>
    <Handle
      type="target"
      position={Position.Top}
    />
    <Handle
      type="target"
      position={Position.Left}
    />
    <div className="relative flex cursor-pointer flex-col items-center rounded-md border-2 border-primary/50 border-dashed p-4 text-center transition-colors hover:bg-primary-foreground/10">
      <div className="absolute top-1 right-1 rounded bg-primary/20 px-1 py-0.5 font-semibold text-primary text-xs">
        Navigate
      </div>
      <Link className="mb-2 h-6 w-6" style={{ color: data.icon_color }} />
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
          <ExternalLink className="mr-1 h-3 w-3" />
          View
        </Button>
      </div>
    </div>
  </BaseNode>
);

const SupergardenNode = ({ data }: { data: any }) => (
  <BaseNode data={data}>
    <Handle
      type="source"
      position={Position.Bottom}
    />
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
      <Globe className="mb-2 h-6 w-6 animate-pulse" />
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
          <ExternalLink className="mr-1 h-3 w-3" />
          View
        </Button>
      </div>
    </div>
  </BaseNode>
);

const SubgardenNode = ({ data }: { data: any }) => (
  <BaseNode data={data}>
    <Handle
      type="target"
      position={Position.Bottom}
    />
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
          <Layers className="mr-1 h-3 w-3" />
          Expandable
        </div>
      )}
      <GitBranch className="mb-2 h-6 w-6 animate-pulse" />
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
          <ExternalLink className="mr-1 h-3 w-3" />
          View
        </Button>
      </div>
    </div>
  </BaseNode>
);

export const nodeTypes = {
  garden: GardenNode,
  category: CategoryNode,
  item: ItemNode,
  garden_ref: GardenRefNode,
  supergarden: SupergardenNode,
  subgarden: SubgardenNode,
  default: ({ data }: { data: any }) => (
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
