import { Handle, Position } from "reactflow";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sprout } from "lucide-react";
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

export const nodeTypes = {
  garden: GardenNode,
  category: CategoryNode,
  item: ItemNode,
};
