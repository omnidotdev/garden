import { Handle, Position } from "reactflow";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sprout, Globe, GitBranch, Link, Layers } from "lucide-react";
import { Icons } from "@/components/ui/icons";

const BaseNode = ({
  data,
  children,
}: {
  data: any;
  children: React.ReactNode;
}) => <Card className="w-[200px] border-2 shadow-lg">{children}</Card>;

export const GardenNode = ({ data }: { data: any }) => {
  return (
    <BaseNode data={data}>
      <div className="flex flex-col items-center justify-center gap-2 p-4 bg-primary text-primary-foreground rounded-md text-center">
        <Sprout className="h-8 w-8" />
        <h2 className="text-2xl font-semibold">{data.label}</h2>

        <h4>{data.description}</h4>
      </div>
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </BaseNode>
  );
};

export const CategoryNode = ({ data }: { data: any }) => {
  const Icon = Icons[data.icon];
  return (
    <BaseNode data={data}>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ visibility: "visible" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ visibility: "visible" }}
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
          <p className="text-sm text-muted-foreground mt-1">
            {data.description}
          </p>
        )}
      </div>
    </BaseNode>
  );
};

export const SubcategoryNode = ({ data }: { data: any }) => {
  const Icon = Icons[data.icon];
  return (
    <BaseNode data={data}>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ visibility: "visible" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ visibility: "visible" }}
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
          <p className="text-sm text-muted-foreground mt-1">
            {data.description}
          </p>
        )}
      </div>
    </BaseNode>
  );
};

export const ItemNode = ({ data }: { data: any }) => {
  return (
    <BaseNode data={data}>
      <div className="space-y-3">
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={data.image}
            alt={data.label}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-4">
          <h3 className="font-medium">{data.label}</h3>
          {data.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {data.description}
            </p>
          )}
        </div>
        <div className="p-4 pt-0 flex gap-2">
          <Button
            variant="default"
            size="sm"
            className="w-full"
            onClick={() => window.open(data.cta.primary.url, "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
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
      <Handle type="target" position={Position.Top} id="top" />
    </BaseNode>
  );
};

export const GardenRefNode = ({ data }: { data: any }) => {
  return (
    <BaseNode data={data}>
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom"
        style={{ visibility: "visible" }}
      />
      <div className="p-4 flex flex-col items-center text-center relative hover:bg-primary-foreground/10 transition-colors cursor-pointer rounded-md border-2 border-dashed border-primary/50">
        <div className="absolute top-1 right-1 bg-primary/20 text-primary px-1 py-0.5 rounded text-xs font-semibold">
          Navigate
        </div>
        <Link className="h-6 w-6 mb-2" style={{ color: data.icon_color }} />
        <h3 className="font-medium">{data.label}</h3>
        {data.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {data.description}
          </p>
        )}
        {data.version && (
          <span className="text-xs text-muted-foreground mt-1">v{data.version}</span>
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
            <ExternalLink className="h-3 w-3 mr-1" />
            View
          </Button>
        </div>
      </div>
      <Handle type="target" position={Position.Left} id="left" />
    </BaseNode>
  );
};

export const ParentGardenNode = ({ data }: { data: any }) => {
  return (
    <BaseNode data={data}>
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ visibility: "visible" }}
      />
      <div className="p-4 flex flex-col items-center text-center relative transition-transform hover:scale-105 cursor-pointer border-2 border-dashed border-white/70" 
           style={{ background: "hsl(var(--chart-9))", color: "hsl(var(--chart-9-foreground))", borderRadius: "var(--radius)" }}>
        <div className="absolute top-1 right-1 bg-white/30 text-white px-1 py-0.5 rounded text-xs font-semibold">
          Navigate Up
        </div>
        <Globe className="h-6 w-6 mb-2 animate-pulse" />
        <h3 className="font-medium">{data.label}</h3>
        {data.description && (
          <p className="text-sm mt-1 line-clamp-2">
            {data.description}
          </p>
        )}
        {data.version && (
          <span className="text-xs mt-1">v{data.version}</span>
        )}
        <div className="mt-3 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              window.open(data.url, "_blank");
            }}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            View
          </Button>
        </div>
      </div>
    </BaseNode>
  );
};

export const SubgardenNode = ({ data }: { data: any }) => {
  return (
    <BaseNode data={data}>
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom"
        style={{ visibility: "visible" }}
      />
      <div className="p-4 flex flex-col items-center text-center relative transition-transform hover:scale-105 cursor-pointer" 
           style={{ background: "hsl(var(--chart-8))", color: "hsl(var(--chart-8-foreground))", borderRadius: "var(--radius)" }}>
        <div className="absolute top-1 right-1 bg-white/30 text-white px-1 py-0.5 rounded text-xs font-semibold">
          Navigate Down
        </div>
        {data.expandable && (
          <div className="absolute top-1 left-1 bg-white/30 text-white px-1 py-0.5 rounded text-xs font-semibold flex items-center">
            <Layers className="h-3 w-3 mr-1" />
            Expandable
          </div>
        )}
        <GitBranch className="h-6 w-6 mb-2 animate-pulse" />
        <h3 className="font-medium">{data.label}</h3>
        {data.description && (
          <p className="text-sm mt-1 line-clamp-2">
            {data.description}
          </p>
        )}
        {data.version && (
          <span className="text-xs mt-1">v{data.version}</span>
        )}
        <div className="mt-3 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              window.open(data.url, "_blank");
            }}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            View
          </Button>
        </div>
      </div>
    </BaseNode>
  );
};

export const nodeTypes = {
  garden: GardenNode,
  category: CategoryNode,
  item: ItemNode,
  garden_ref: GardenRefNode,
  parent_garden: ParentGardenNode,
  subgarden: SubgardenNode,
  default: ({ data }: { data: any }) => (
    <div className="p-2">{data.label}</div>
  ),
};

// Helper to get garden nodes
export const getGardenByName = (name: string, allGardens: Record<string, any>) => {
  return Object.values(allGardens).find((garden: any) => garden.name === name);
};

// Direction helpers for navigation
export const DIRECTION = {
  UP: "up",
  DOWN: "down",
  SIDE: "side",
};
