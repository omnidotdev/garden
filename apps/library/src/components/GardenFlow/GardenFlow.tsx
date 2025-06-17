import {
  Background,
  ControlButton,
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
import { FlowerIcon, Layers2Icon, LayersIcon } from "lucide-react";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";

import { cn, findGardenByName, gardenToFlow } from "../../lib/utils";
import { customNodes } from "../nodes";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import type {
  ConnectionLineType,
  ControlProps,
  Edge,
  MiniMapProps,
  Node,
} from "@xyflow/react";
import type { MouseEvent, ReactNode } from "react";
import type { GardenTypes, Theme } from "../../generated/garden.types";
import type { NodeData } from "../nodes";

const elk = new ELK();

const calculateNodeHeight = (node: Node): number => {
  if (node.type === "garden") return 150;

  return 200;
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
  schema: GardenTypes;
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
  const [isSubgardensExpanded, setIsSubgardensExpanded] =
    useState(expandSubgardens);
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
    async (nodes: Node[], edges: Edge[], isSubgardensExpanded: boolean) => {
      await autoLayoutElements(nodes, edges, isSubgardensExpanded).then(
        ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
          setNodes(layoutedNodes as Node[]);
          setEdges(layoutedEdges as Edge[]);
          fitView({ padding: fitViewPadding });
        },
      );
    },
    [fitViewPadding, setEdges, setNodes, fitView],
  );

  const handleNodeClick = useCallback(
    (_: MouseEvent, node: Node) => {
      if (node.type === "item") {
        setSelectedItem(node.data as unknown as NodeData);
        setIsItemDialogOpen(true);
      } else {
        if (node?.type === "garden") return;

        setIsSubgardensExpanded(expandSubgardens);

        const garden = findGardenByName(schema, node.data?.label as string);

        if (garden) {
          const { nodes: updatedNodes, edges: updatedEdges } = gardenToFlow({
            schema,
            garden,
            options: {
              expandSubgardens: isSubgardensExpanded,
              edgeType,
              animateEdges,
            },
          });

          onLayout(updatedNodes, updatedEdges, isSubgardensExpanded);
        }
      }
    },
    [
      edgeType,
      expandSubgardens,
      isSubgardensExpanded,
      onLayout,
      schema,
      animateEdges,
    ],
  );

  const handleToggleExpandedSubgardens = (expand: boolean) => {
    setIsSubgardensExpanded(expand);

    const garden = findGardenByName(
      schema,
      currentGarden?.data?.label as string,
    );

    if (!garden) return;

    const { nodes: updatedNodes, edges: updatedEdges } = gardenToFlow({
      schema,
      garden,
      options: {
        expandSubgardens: expand,
        edgeType,
        animateEdges,
      },
    });

    onLayout(updatedNodes, updatedEdges, expand);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: only run once on mount
  useLayoutEffect(() => {
    onLayout(initialNodes, initialEdges, expandSubgardens);
  }, []);

  return (
    <div
      className={cn(
        "garden:h-full garden:w-full garden:rounded-lg garden:border garden:border-border",
        className,
      )}
    >
      <ReactFlow
        className="garden:relative"
        nodeTypes={customNodes}
        nodes={nodes.map((node) => ({
          ...node,
          className: "!garden:bg-background",
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
            stroke: "var(--garden-ring)",
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
          <MiniMap nodeStrokeWidth={3} zoomable pannable {...miniMapOptions} />
        )}

        {currentGarden && (
          <Panel position="top-right">
            <div
              className="garden:flex garden:items-center garden:gap-2 garden:rounded-md garden:border garden:px-3 garden:py-1.5 garden:font-medium garden:text-sm garden:shadow-sm garden:backdrop-blur-sm"
              style={{
                color:
                  (currentGarden.data?.theme as Theme)?.primary_color ??
                  undefined,
                borderColor:
                  (currentGarden.data?.theme as Theme)?.secondary_color ??
                  undefined,
              }}
            >
              <FlowerIcon className="garden:h-4 garden:w-4" />

              {(currentGarden.data?.label as ReactNode) ?? "Garden"}

              {(currentGarden.data?.icon as string) && (
                <span className="garden:ml-1">
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
              "garden:border garden:border-border",
              controlOptions?.className ?? "",
            )}
          >
            <ControlButton
              title={
                isSubgardensExpanded
                  ? "Collapse Subgardens"
                  : "Expand Subgardens"
              }
              aria-label={
                isSubgardensExpanded
                  ? "Collapse Subgardens"
                  : "Expand Subgardens"
              }
              onClick={() =>
                isSubgardensExpanded
                  ? handleToggleExpandedSubgardens(false)
                  : handleToggleExpandedSubgardens(true)
              }
            >
              {isSubgardensExpanded ? <LayersIcon /> : <Layers2Icon />}
            </ControlButton>
          </Controls>
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
        <DialogContent className="garden:sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="garden:text-xl">
              {selectedItem?.label}
            </DialogTitle>
            {selectedItem?.description && (
              <DialogDescription className="garden:text-base">
                {selectedItem.description}
              </DialogDescription>
            )}
          </DialogHeader>

          {selectedItem?.image && (
            <div className="garden:mt-2 garden:aspect-video garden:w-full garden:overflow-hidden garden:rounded-md">
              <img
                src={selectedItem.image}
                alt={selectedItem.label}
                className="garden:h-full garden:w-full garden:object-cover"
              />
            </div>
          )}

          {selectedItem?.version && (
            <div className="garden:mt-2 garden:text-muted-foreground garden:text-sm">
              Version: {selectedItem.version}
            </div>
          )}

          <DialogFooter className="garden:flex garden:flex-col garden:gap-2 garden:sm:flex-row garden:sm:justify-between garden:sm:gap-0">
            <div className="garden:flex garden:gap-2">
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
