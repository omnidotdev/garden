import {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import ELK from "elkjs/lib/elk.bundled.js";
import { FlowerIcon } from "lucide-react";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";

import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { cn } from "@workspace/ui/lib/utils";
import { gardenToFlow } from "../../lib/utils";
import { customNodes } from "../CustomNodes";

import type {
  ConnectionLineType,
  ControlProps,
  Edge,
  MiniMapProps,
  Node,
} from "@xyflow/react";
import type { MouseEvent, ReactNode } from "react";
import type { NodeData } from "../../../../web/src/components/NodeTypes";
import type { GardenTypes, Theme } from "../../generated/garden.types";

const elk = new ELK();

const calculateNodeHeight = (node: Node): number => {
  const { height = 0 } = node.style || {};

  if (height) return Number(height);

  if (node.type === "garden") return 100;

  return 60;
};

const autoLayoutElements = async (
  nodes: Node[],
  edges: Edge[],
  expandSubgardens: boolean,
) => {
  const graph = {
    id: "elk-root",
    layoutOptions: {
      "elk.algorithm": "mrtree",
      "elk.direction": "DOWN",
      "elk.spacing.nodeNode": expandSubgardens ? "400" : "200",
      "elk.layered.spacing.nodeNodeBetweenLayers": expandSubgardens
        ? "300"
        : "200",
      "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
    },
    children: nodes.map((node) => ({
      ...node,
      id: node.id,
      width: 250,
      height: calculateNodeHeight(node),
      layoutOptions: {
        "elk.position": node.type === "garden" ? "ROOT" : "DEFAULT",
      },
    })),
    edges: edges.map((edge) => ({
      ...edge,
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
      layoutOptions: {
        "elk.layered.edge.thickness": "2",
        "elk.edgeRouting": "ORTHOGONAL",
      },
    })),
  };

  return elk
    .layout(graph)
    .then((updatedGraph) => ({
      nodes: updatedGraph.children?.map((node) => ({
        ...node,
        position: { x: node.x, y: node.y },
      })),
      edges: updatedGraph.edges,
    }))
    .catch(() => ({
      nodes: nodes || [],
      edges: edges || [],
    }));
};

interface GardenFlowProps {
  /** Garden schema to visualize */
  schema: Record<string, GardenTypes>;
  /** Initial nodes and edges for the garden */
  initialNodes: Node[];
  /** Initial edges for the garden */
  initialEdges: Edge[];
  /** Optional class name for the container */
  className?: string;
  /** Optional flag to expand all subgardens for the current garden. Default is false. */
  expandSubgardens?: boolean;
  /** Optional flag to enable or disable controls. Default is true. */
  showControls?: boolean;
  /** Optional flag to enable or disable the minimap. Default is true. */
  showMinimap?: boolean;
  /** Optional padding for fit view. Default is 0.2. */
  fitViewPadding?: number;
  /** Optional edge type for connections. Options: 'default', 'straight', 'step', 'smoothstep', 'simplebezier'. Default is 'smoothstep'. */
  edgeType?: "default" | "straight" | "step" | "smoothstep" | "simplebezier";
  /** Optional flag to enable or disable edge animations. Default is true. */
  animateEdges?: boolean;
  /** Minimap options */
  miniMapOptions?: MiniMapProps;
  /** Controls options */
  controlOptions?: ControlProps;
}

const GardenFlow = ({
  schema,
  initialNodes,
  initialEdges,
  className,
  expandSubgardens = false,
  showControls,
  showMinimap,
  fitViewPadding,
  edgeType,
  animateEdges,
  miniMapOptions,
  controlOptions,
}: GardenFlowProps) => {
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<NodeData | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { fitView } = useReactFlow();

  const currentGarden = useMemo(
    () => nodes.find((node) => node?.type === "garden"),
    [nodes],
  );

  const onLayout = useCallback(
    async (nodes: Node[], edges: Edge[]) => {
      await autoLayoutElements(nodes, edges, expandSubgardens).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
          setNodes(layoutedNodes as Node[]);
          setEdges(layoutedEdges as Edge[]);
          fitView({ padding: fitViewPadding });
        },
      );
    },
    [nodes, edges],
  );

  const handleNodeClick = useCallback((_: MouseEvent, node: Node) => {
    if (node.type === "item") {
      setSelectedItem(node.data as unknown as NodeData);
      setIsItemDialogOpen(true);
    } else {
      if (node?.type === "garden") return;

      const garden = Object.values(schema).find(
        (g) => g.name === node.data?.label,
      );

      // TODO: discuss if we need to handle the case where `garden` is undefined. Not positive on case where that would happen when full schema is provided
      if (garden) {
        const { nodes: updatedNodes, edges: updatedEdges } = gardenToFlow({
          schema,
          garden,
          options: {
            expandSubgardens,
            edgeType,
            animateEdges,
          },
        });

        onLayout(updatedNodes, updatedEdges);
      }
    }
  }, []);

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout(initialNodes, initialEdges);
  }, []);

  return (
    <div className={cn("h-full w-full rounded-lg border", className)}>
      <ReactFlow
        className="relative"
        nodeTypes={customNodes}
        nodes={nodes.map((node) => ({
          ...node,
          className: "!bg-background",
          style: {
            ...node.style,
            cursor: node.type === "garden" ? "grab" : "pointer",
          },
        }))}
        edges={edges.map((edge) => ({
          ...edge,
          // Apply customized edge type and animation
          type: edgeType,
          animated: animateEdges,
          style: {
            strokeWidth: 2,
            stroke: "var(--muted-foreground)",
          },
          markerEnd: edge.markerEnd || { type: MarkerType.ArrowClosed },
        }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        fitView
        minZoom={0.1}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
        fitViewOptions={{ padding: fitViewPadding }}
        proOptions={{ hideAttribution: true }}
        zoomOnScroll
        panOnScroll={false}
        panOnDrag
        snapToGrid
        snapGrid={[10, 10]}
        defaultEdgeOptions={{
          type: edgeType,
          animated: animateEdges,
        }}
        connectionLineType={edgeType as ConnectionLineType}
      >
        <Background />

        {showMinimap && (
          <MiniMap
            nodeStrokeWidth={3}
            zoomable
            pannable
            {...miniMapOptions}
            className={cn("!bg-background", miniMapOptions?.className ?? "")}
            nodeColor={
              miniMapOptions?.nodeColor
                ? miniMapOptions?.nodeColor
                : "var(--foreground)"
            }
          />
        )}

        {currentGarden && (
          <Panel position="top-right">
            <div
              className="flex items-center gap-2 rounded-md border px-3 py-1.5 font-medium text-sm shadow-sm backdrop-blur-sm"
              style={{
                color:
                  (currentGarden.data?.theme as Theme)?.primary_color ??
                  undefined,
                borderColor:
                  (currentGarden.data?.theme as Theme)?.secondary_color ??
                  undefined,
              }}
            >
              <FlowerIcon className="h-4 w-4" />

              {(currentGarden.data?.label as ReactNode) ?? "Garden"}

              {(currentGarden.data?.icon as string) && (
                <span className="ml-1">
                  {currentGarden.data.icon as string}
                </span>
              )}
            </div>
          </Panel>
        )}

        {showControls && (
          <Controls
            showInteractive={false}
            {...controlOptions}
            className={cn(
              "*:!bg-background [&_svg]:!fill-foreground *:!border-muted border",
              controlOptions?.className ?? "",
            )}
          />
        )}
      </ReactFlow>

      <Dialog
        open={isItemDialogOpen}
        onOpenChange={(open) => {
          setIsItemDialogOpen(open);

          if (!open) {
            setTimeout(() => {
              setSelectedItem(null);
            }, 200);
          }
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedItem?.label}</DialogTitle>
            {selectedItem?.description && (
              <DialogDescription className="text-base">
                {selectedItem.description}
              </DialogDescription>
            )}
          </DialogHeader>

          {selectedItem?.image && (
            <div className="mt-2 aspect-video w-full overflow-hidden rounded-md">
              <img
                src={selectedItem.image}
                alt={selectedItem.label}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {selectedItem?.version && (
            <div className="mt-2 text-muted-foreground text-sm">
              Version: {selectedItem.version}
            </div>
          )}

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0">
            <div className="flex gap-2">
              {selectedItem?.cta?.primary && (
                <Button
                  variant="default"
                  onClick={() =>
                    window.open(selectedItem.cta?.primary.url, "_blank")
                  }
                >
                  {selectedItem.cta.primary.label || "View"}
                </Button>
              )}

              {selectedItem?.cta?.secondary && (
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(selectedItem.cta?.secondary?.url, "_blank")
                  }
                >
                  {selectedItem.cta.secondary.label || "Source"}
                </Button>
              )}
            </div>

            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GardenFlow;
