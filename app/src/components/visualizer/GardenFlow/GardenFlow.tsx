"use client";

import {
  Background,
  MarkerType,
  MiniMap,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  useUpdateNodeInternals,
} from "@xyflow/react";
import { useEffect, useMemo, useState } from "react";

import { ControlsPanel } from "@/components/core";
import { NodeTypes } from "@/components/NodeTypes";
import {
  ActiveGardenIndicator,
  ItemDetailDialog,
} from "@/components/visualizer";
import { LOCAL_STORAGE_KEY } from "@/lib/constants";
import { useGardenStore } from "@/lib/hooks/store";
import { autoLayout, gardenToFlow } from "@/lib/util/flow";

import type {
  ConnectionLineType,
  Edge,
  Node,
  NodeMouseHandler,
} from "@xyflow/react";
import type { NodeData } from "@/components/visualizer/customNodes";
import type { Gardens } from "@/store";

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
  /** Optional callback function that is triggered when a garden is changed */
  onGardenChange?: (gardenName: string) => void;
}

/**
 * Garden Flow.
 */
const GardenFlow = ({
  gardens,
  showControls = true,
  showMinimap = true,
  enableAutoLayout = true,
  expandSubgardens: initialExpandSubgardens = false,
  fitViewPadding = 0.2,
  edgeType = "smoothstep",
  animateEdges = true,
  onGardenChange,
}: Props) => {
  const { fitView } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const [expandSubgardens, setExpandSubgardens] = useState(
    initialExpandSubgardens,
  );
  const [selectedItem, setSelectedItem] = useState<NodeData | null>(null);

  // initialize with empty arrays to prevent undefined errors
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const defaultEdgeOptions = useMemo(
    () => ({
      type: edgeType,
      animated: animateEdges,
    }),
    [edgeType, animateEdges],
  );

  const { activeGarden, setActiveGarden, setNavigationHistory } =
    useGardenStore();

  // initialize flow when garden data is available
  useEffect(() => {
    if (activeGarden) {
      // Initialize window.gardenData to ensure subgardens can access it
      window.gardenData = gardens;

      const { nodes: initialNodes, edges: initialEdges } = gardenToFlow(
        activeGarden,
        undefined,
        { expandSubgardens, edgeType, animateEdges },
      );

      if (initialNodes.length > 0) {
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
                }, 100);
              },
            )
            .catch((error: unknown) => {
              console.error("Layout error:", error);
              // fallback to initial layout if auto-layout fails
              setNodes(initialNodes);
              setEdges(initialEdges);
            });
        } else {
          // Skip auto layout if disabled
          setNodes(initialNodes);
          setEdges(initialEdges);
          setTimeout(() => {
            fitView({ padding: fitViewPadding });
          }, 100);
        }
      }
    }
  }, [
    activeGarden,
    expandSubgardens,
    setNodes,
    setEdges,
    fitView,
    updateNodeInternals,
    gardens,
    edgeType,
    enableAutoLayout,
    fitViewPadding,
    animateEdges,
  ]);

  // handle node click for garden navigation and item details
  const onNodeClick: NodeMouseHandler = (_event, clickedNode) => {
    // Show item details dialog for item nodes
    if (clickedNode.type === "item") {
      setSelectedItem(clickedNode.data as unknown as NodeData);
      return;
    }

    // For navigable nodes, handle garden navigation
    // determine the garden name to navigate to
    const gardenName = clickedNode.data?.label as string;

    // for all navigable node types, navigate to the garden by name
    if (gardenName && clickedNode?.type !== "garden") {
      // Find the garden in the available gardens
      const garden = Object.values(gardens).find((g) => g.name === gardenName);

      // Only proceed if we found a valid garden
      if (garden) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);

        // Update the active garden
        setActiveGarden(garden);

        // reset positions to trigger new layout when toggling expand mode
        setNodes([]);
        setEdges([]);

        // Update navigation history
        setNavigationHistory(garden);

        // trigger optional callback
        onGardenChange?.(garden.name);
      } else {
        console.warn(
          `Garden "${gardenName}" not found in available gardens. This subgarden is referenced but not yet implemented.`,
        );
        // Optionally show a notification to the user that this garden isn't available
      }
    }
  };

  return (
    <ReactFlow
      className="relative"
      nodes={nodes.map((node) => ({
        ...node,
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
      }))}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      fitView
      minZoom={0.1}
      maxZoom={1.5}
      defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
      attributionPosition="bottom-right"
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
        />
      )}

      <Panel position="top-right">
        <ActiveGardenIndicator />
      </Panel>

      {showControls && (
        <ControlsPanel
          expandSubgardens={expandSubgardens}
          setExpandSubgardens={(value) => {
            setExpandSubgardens(value);
            // Force reset when expand setting changes from UI
            setNodes([]);
            setEdges([]);
          }}
        />
      )}

      <ItemDetailDialog
        item={selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      />
    </ReactFlow>
  );
};

export default GardenFlow;
