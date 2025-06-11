"use client";

import {
  Background,
  ConnectionLineType,
  MiniMap,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  useUpdateNodeInternals,
} from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";

import { ControlsPanel } from "components/core";
import { GardenFlowHints, ItemDetailDialog } from "components/visualizer";
import { NodeTypes } from "components/visualizer/customNodes";
import { LOCAL_STORAGE_KEY } from "lib/constants";
import { useGardenStore } from "lib/hooks/store";
import { autoLayout, gardenToFlow } from "lib/util/flow";

import type { Edge, Node, NodeMouseHandler } from "@xyflow/react";
import type { Gardens } from "store";

import "@xyflow/react/dist/style.css";

interface Props {
  /** All available gardens */
  gardens: Gardens;
  /** Optional flag to show controls */
  showControls?: boolean;
  /** Optional flag to show minimap */
  showMinimap?: boolean;
  /** Optional flag to enable or disable auto layout on load */
  enableAutoLayout?: boolean;
  /** Optional flag to expand subgardens in the visualization */
  expandSubgardens?: boolean;
  /** Optional padding for fit view */
  fitViewPadding?: number;
}

/**
 * Garden Flow Inner.
 */
const GardenFlowInner = ({
  gardens,
  showControls = true,
  showMinimap = true,
  enableAutoLayout = true,
  expandSubgardens: initialExpandSubgardens = false,
  fitViewPadding = 0.2,
}: Props) => {
  const { fitView } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const [initialized, setInitialized] = useState(false);
  const [layouting, setLayouting] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1600);
  const [expandSubgardens, setExpandSubgardens] = useState(
    initialExpandSubgardens
  );
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // initialize with empty arrays to prevent undefined errors
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const {
    activeGarden,
    setActiveGarden,
    setBreadcrumbs,
    setNavigationHistory,
  } = useGardenStore();

  // update container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      const container = document.querySelector(".react-flow") as HTMLElement;
      if (container) {
        setContainerWidth(container.offsetWidth);
      }
    };

    // initial update
    updateWidth();

    // add resize listener
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  // reset initialization when garden changes or expand setting changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: trigger when garden.name changes
  useEffect(() => {
    setInitialized(false);
    // reset positions to trigger new layout when toggling expand mode
    setNodes([]);
    setEdges([]);
  }, [activeGarden.name, expandSubgardens, setNodes, setEdges]); // Reset when garden name or expand setting changes

  // Update expandSubgardens when prop changes
  useEffect(() => {
    if (initialExpandSubgardens !== expandSubgardens) {
      setExpandSubgardens(initialExpandSubgardens);
      // Force reset when expand setting changes from props
      setInitialized(false);
      setNodes([]);
      setEdges([]);
    }
  }, [initialExpandSubgardens, setNodes, setEdges]);

  // initialize flow when garden data and container width are available
  useEffect(() => {
    if (activeGarden && containerWidth) {
      const { nodes: initialNodes, edges: initialEdges } = gardenToFlow(
        activeGarden,
        containerWidth,
        { expandSubgardens }
      );

      if (!initialized && initialNodes.length > 0 && initialEdges.length > 0) {
        if (enableAutoLayout) {
          // apply auto layout and get optimized edges
          autoLayout(initialNodes, initialEdges)
            .then(
              ({
                nodes: layoutedNodes,
                edges: layoutedEdges,
              }: {
                nodes: Node[];
                edges: Edge[];
              }) => {
                setNodes(layoutedNodes);
                // set edges without overriding handles
                setEdges(layoutedEdges);

                // update node internals after layout
                for (const node of layoutedNodes) {
                  updateNodeInternals(node.id);
                }

                // fit view after nodes are positioned
                setTimeout(() => {
                  fitView({ padding: fitViewPadding });
                  setInitialized(true);
                }, 100);
              }
            )
            .catch((error: unknown) => {
              console.error("Layout error:", error);
              // fallback to initial layout if auto-layout fails
              setNodes(initialNodes);
              setEdges(initialEdges);
              setInitialized(true);
            });
        } else {
          // Skip auto layout if disabled
          setNodes(initialNodes);
          setEdges(initialEdges);
          setTimeout(() => {
            fitView({ padding: fitViewPadding });
            setInitialized(true);
          }, 100);
        }
      }
    }
  }, [
    activeGarden,
    containerWidth,
    initialized,
    expandSubgardens,
    setNodes,
    setEdges,
    fitView,
    updateNodeInternals,
  ]);

  // handle layout refresh
  const onLayout = useCallback(async () => {
    if (nodes.length === 0 || edges.length === 0) return;

    setLayouting(true);

    await autoLayout(nodes, edges)
      .then(
        ({
          nodes: layoutedNodes,
          edges: layoutedEdges,
        }: {
          nodes: Node[];
          edges: Edge[];
        }) => {
          setNodes([...layoutedNodes]);
          // set edges without overriding handles
          setEdges(layoutedEdges);

          // update node internals after layout refresh
          for (const node of layoutedNodes) {
            updateNodeInternals(node.id);
          }

          setTimeout(() => {
            fitView({ padding: fitViewPadding });
            setLayouting(false);
          }, 100);
        }
      )
      .catch((error: unknown) => {
        console.error("Layout refresh error:", error);
        setLayouting(false);
      });
  }, [nodes, edges, setNodes, setEdges, fitView, updateNodeInternals]);

  // handle node click for garden navigation and item details
  const onNodeClick: NodeMouseHandler = (event, clickedNode) => {
    // prevent rapid multiple clicks
    event.preventDefault();
    event.stopPropagation();

    // Show item details dialog for item nodes
    if (clickedNode.type === "item") {
      setSelectedItem(clickedNode.data);
      setIsDialogOpen(true);
      return;
    }

    // For navigable nodes, handle garden navigation
    // determine the garden name to navigate to
    let gardenName = clickedNode.data?.label as string;

    // check if this is an expanded subgarden label
    if (clickedNode.data?.isExpandedSubgardenLabel) {
      gardenName = (clickedNode.data?.label as string).replace(
        " (Expanded)",
        ""
      );
    }

    // for all navigable node types, navigate to the garden by name
    if (
      gardenName &&
      (clickedNode.type === "supergarden" ||
        clickedNode.type === "subgarden" ||
        clickedNode.type === "garden_ref" ||
        clickedNode.data?.isExpandedSubgardenLabel)
    ) {
      // debounce navigation to prevent multiple rapid calls
      if (
        (window as any).lastNavigationTime &&
        Date.now() - (window as any).lastNavigationTime < 500
      ) {
        return;
      }

      (window as any).lastNavigationTime = Date.now();
      // onNavigateToGarden(gardenName);

      const garden = Object.values(gardens).find((g) => g.name === gardenName);

      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setActiveGarden(garden!);
      setNavigationHistory(garden!);
      setBreadcrumbs(gardenName);
    }
  };

  // Close dialog handler
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  // handle node mouse enter/leave for hover effects
  const onNodeMouseEnter: NodeMouseHandler = useCallback((_event, node) => {
    if (
      node.type === "supergarden" ||
      node.type === "subgarden" ||
      node.type === "garden_ref" ||
      node.type === "item" ||
      node.data?.isExpandedSubgardenLabel
    ) {
      document.body.style.cursor = "pointer";
    }
  }, []);

  const onNodeMouseLeave: NodeMouseHandler = useCallback(() => {
    document.body.style.cursor = "default";
  }, []);

  const renderedEdges = edges.map((edge) => ({
    ...edge,
    // TODO toggle this via settings
    // type: "default",
    animated: true,
    style: {
      ...edge.style,
      strokeWidth: 2,
      stroke: "hsl(var(--muted-foreground))",
    },
  }));

  return (
    <ReactFlow
      className="relative"
      nodes={nodes.map((node) => ({
        ...node,
        style: {
          ...node.style,
          cursor:
            node.type === "supergarden" ||
            node.type === "subgarden" ||
            node.type === "garden_ref" ||
            node.type === "item" ||
            node.data?.isExpandedSubgardenLabel
              ? "pointer"
              : "grab",
          // add visual hint for navigable nodes
          border:
            node.type === "supergarden" ||
            node.type === "subgarden" ||
            node.type === "garden_ref" ||
            node.data?.isExpandedSubgardenLabel
              ? "2px dashed hsl(var(--garden) / 0.7)"
              : undefined,
        },
      }))}
      edges={renderedEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onNodeMouseEnter={onNodeMouseEnter}
      onNodeMouseLeave={onNodeMouseLeave}
      // TODO: check on this implementation
      nodeTypes={NodeTypes()}
      fitView
      minZoom={0.1}
      maxZoom={1.5}
      defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
      attributionPosition="bottom-right"
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={!layouting}
      fitViewOptions={{ padding: fitViewPadding }}
      proOptions={{ hideAttribution: true }}
      zoomOnScroll={true}
      panOnScroll={false}
      panOnDrag={true}
      snapToGrid={true}
      snapGrid={[10, 10]}
      defaultEdgeOptions={{
        type: "smoothstep",
        animated: true,
      }}
      connectionLineType={ConnectionLineType.SmoothStep}
    >
      <Background />

      {showMinimap && (
        <MiniMap
          nodeColor="hsl(var(--foreground))"
          nodeStrokeWidth={3}
          zoomable
          pannable
          className="!bg-background"
        />
      )}

      {/* TODO: update hints */}
      <Panel position="top-right">
        <GardenFlowHints />
      </Panel>

      {showControls && (
        <ControlsPanel
          setInitialized={setInitialized}
          onLayout={onLayout}
          expandSubgardens={expandSubgardens}
          setExpandSubgardens={(value) => {
            setExpandSubgardens(value);
            // Force reset when expand setting changes from UI
            setInitialized(false);
            setNodes([]);
            setEdges([]);
          }}
        />
      )}

      <ItemDetailDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        item={selectedItem}
      />
    </ReactFlow>
  );
};

export default GardenFlowInner;
