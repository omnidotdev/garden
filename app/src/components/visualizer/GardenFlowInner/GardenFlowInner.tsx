"use client";

import {
  Background,
  ConnectionLineType,
  MarkerType,
  MiniMap,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  useUpdateNodeInternals,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";

import { ControlsPanel } from "components/core";
import { ActiveGardenIndicator, ItemDetailDialog } from "components/visualizer";
import { NodeTypes } from "components/visualizer/customNodes";
import { LOCAL_STORAGE_KEY } from "lib/constants";
import { useGardenStore } from "lib/hooks/store";
import { autoLayout, gardenToFlow } from "lib/util/flow";

import type {
  DefaultEdgeOptions,
  Edge,
  Node,
  NodeMouseHandler,
} from "@xyflow/react";
import type { Gardens } from "store";

import "@xyflow/react/dist/style.css";

const nodeTypes = NodeTypes();

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
  /** Optional edge type for connections */
  edgeType?: "default" | "straight" | "step" | "smoothstep" | "simplebezier";
  /** Optional flag to enable or disable edge animations */
  animateEdges?: boolean;
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
  edgeType = "smoothstep",
  animateEdges = true,
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

  const { activeGarden, setActiveGarden, setNavigationHistory } =
    useGardenStore();

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
      // Initialize window.gardenData to ensure subgardens can access it
      if (typeof window !== "undefined") {
        (window as any).gardenData = gardens;
      }

      const { nodes: initialNodes, edges: initialEdges } = gardenToFlow(
        activeGarden,
        containerWidth,
        { expandSubgardens, edgeType, animateEdges }
      );

      if (!initialized && initialNodes.length > 0) {
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
    gardens,
  ]);

  // handle layout refresh
  const onLayout = useCallback(async () => {
    if (nodes.length === 0) return;

    setLayouting(true);

    // Ensure window.gardenData is populated for expanded subgardens
    if (typeof window !== "undefined") {
      (window as any).gardenData = gardens;
    }

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
  }, [nodes, edges, setNodes, setEdges, fitView, updateNodeInternals, gardens]);

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

    // for all navigable node types, navigate to the garden by name
    if (
      gardenName &&
      (clickedNode.type === "supergarden" ||
        clickedNode.type === "subgarden" ||
        clickedNode.data?.isExpandedSubgarden)
    ) {
      // debounce navigation to prevent multiple rapid calls
      if (
        (window as any).lastNavigationTime &&
        Date.now() - (window as any).lastNavigationTime < 500
      ) {
        return;
      }

      (window as any).lastNavigationTime = Date.now();

      // Find the garden in the available gardens
      const garden = Object.values(gardens).find((g) => g.name === gardenName);

      // Only proceed if we found a valid garden
      if (garden) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);

        // Update the active garden
        setActiveGarden(garden);

        // Update navigation history
        setNavigationHistory(garden);
      } else {
        console.warn(
          `Garden "${gardenName}" not found in available gardens. This subgarden is referenced but not yet implemented.`
        );
        // Optionally show a notification to the user that this garden isn't available
      }
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
      node.type === "item" ||
      node.data?.isExpandedSubgarden
    ) {
      document.body.style.cursor = "pointer";
    }
  }, []);

  const onNodeMouseLeave: NodeMouseHandler = useCallback(() => {
    document.body.style.cursor = "default";
  }, []);

  // memoize default edge options
  const defaultEdgeOptions = useMemo(
    (): DefaultEdgeOptions => ({
      type: edgeType,
      animated: animateEdges,
    }),
    [edgeType, animateEdges]
  );

  // Create a safe version of edges with valid props
  const renderedEdges = edges.map((edge) => ({
    ...edge,
    // Apply customized edge type and animation
    type: edgeType,
    animated: animateEdges,
    style: {
      ...edge.style,
      strokeWidth: 2,
      stroke: "hsl(var(--muted-foreground))",
    },
    markerEnd: edge.markerEnd || { type: MarkerType.ArrowClosed },
    // Remove any props that React Flow doesn't expect on edges
    zIndex: 0,
    labelStyle: undefined,
    labelBgStyle: undefined,
    labelBgPadding: undefined,
    labelShowBg: undefined,
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
            node.type === "item" ||
            node.data?.isExpandedSubgarden
              ? "pointer"
              : "grab",
        },
      }))}
      edges={renderedEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onNodeMouseEnter={onNodeMouseEnter}
      onNodeMouseLeave={onNodeMouseLeave}
      nodeTypes={nodeTypes}
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
      zoomOnScroll
      panOnScroll={false}
      panOnDrag
      snapToGrid
      snapGrid={[10, 10]}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineType={edgeType as ConnectionLineType}
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

      <Panel position="top-right">
        <ActiveGardenIndicator />
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
