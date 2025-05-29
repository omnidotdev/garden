"use client";

import {
  Background,
  ConnectionLineType,
  Controls,
  MarkerType,
  MiniMap,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  useUpdateNodeInternals,
} from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";

import { Icons } from "components/core";
import nodeTypes from "components/core/CustomNodes/CustomNodes";
import { Button, Label, Switch } from "components/ui";
import { autoLayout, gardenToFlow } from "lib/util/flow";

import type { GardenTypes } from "generated/garden.types";
import type { Edge, Node, NodeMouseHandler } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

interface Props {
  garden: GardenTypes;
  onNavigateToGarden?: (gardenName: string) => void;
}

const GardenFlowInner = ({ garden, onNavigateToGarden }: Props) => {
  const { fitView } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const [initialized, setInitialized] = useState(false);
  const [layouting, setLayouting] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1600);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [expandSubgardens, setExpandSubgardens] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  // Initialize with empty arrays to prevent undefined errors
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Update container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      const container = document.querySelector(".react-flow") as HTMLElement;
      if (container) {
        setContainerWidth(container.offsetWidth);
      }
    };

    // Initial update
    updateWidth();

    // Add resize listener
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  // Reset initialization when garden changes or expand setting changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: trigger when garden.name changes
  useEffect(() => {
    setInitialized(false);
    // Reset positions to trigger new layout when toggling expand mode
    setNodes([]);
    setEdges([]);
    if (expandSubgardens !== false) {
      setIsToggling(true);
      setTimeout(() => setIsToggling(false), 1000);
    }
  }, [garden.name, expandSubgardens, setNodes, setEdges]); // Reset when garden name or expand setting changes

  // Initialize flow when garden data and container width are available
  useEffect(() => {
    if (garden && containerWidth) {
      const { nodes: initialNodes, edges: initialEdges } = gardenToFlow(
        garden,
        containerWidth,
        { expandSubgardens },
      );

      if (!initialized && initialNodes.length > 0 && initialEdges.length > 0) {
        // Clean up handles in edges to prevent warnings
        const cleanEdges = initialEdges.map((edge) => ({
          ...edge,
          sourceHandle: null,
          targetHandle: null,
        }));

        // Apply auto layout and get optimized edges
        autoLayout(initialNodes, cleanEdges)
          .then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
            setNodes(layoutedNodes);
            // Ensure edges don't have explicit handle references
            setEdges(
              layoutedEdges.map((edge) => ({
                ...edge,
                sourceHandle: null,
                targetHandle: null,
              })),
            );

            // Update node internals after layout
            for (const node of layoutedNodes) {
              updateNodeInternals(node.id);
            }

            // Fit view after nodes are positioned
            setTimeout(() => {
              fitView({ padding: 0.2 });
              setInitialized(true);
            }, 100);
          })
          .catch((error) => {
            console.error("Layout error:", error);
            // Fallback to initial layout if auto-layout fails
            setNodes(initialNodes);
            setEdges(initialEdges);
            setInitialized(true);
          });
      }
    }
  }, [
    garden,
    containerWidth,
    initialized,
    expandSubgardens,
    setNodes,
    setEdges,
    fitView,
    updateNodeInternals,
  ]);

  // Handle layout refresh
  const onLayout = useCallback(async () => {
    if (nodes.length === 0 || edges.length === 0) return;

    setLayouting(true);

    // Clean up handles in edges to prevent warnings
    const cleanEdges = edges.map((edge) => ({
      ...edge,
      sourceHandle: null,
      targetHandle: null,
    }));

    await autoLayout(nodes, cleanEdges)
      .then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        setNodes([...layoutedNodes]);
        // Ensure edges don't have explicit handle references
        setEdges(
          layoutedEdges.map((edge) => ({
            ...edge,
            sourceHandle: null,
            targetHandle: null,
          })),
        );

        // Update node internals after layout refresh
        for (const node of layoutedNodes) {
          updateNodeInternals(node.id);
        }

        setTimeout(() => {
          fitView({ padding: 0.2 });
          setLayouting(false);
        }, 100);
      })
      .catch((error) => {
        console.error("Layout refresh error:", error);
        setLayouting(false);
      });
  }, [nodes, edges, setNodes, setEdges, fitView, updateNodeInternals]);

  // Handle node click for garden navigation
  const onNodeClick: NodeMouseHandler = useCallback(
    (event, clickedNode) => {
      if (!onNavigateToGarden) return;

      // Determine the garden name to navigate to
      let gardenName = clickedNode.data?.label as string;

      // Check if this is an expanded subgarden label
      if (clickedNode.data?.isExpandedSubgardenLabel) {
        gardenName = (clickedNode.data?.label as string).replace(
          " (Expanded)",
          "",
        );
      }

      // For all navigable node types, navigate to the garden by name
      if (
        gardenName &&
        (clickedNode.type === "supergarden" ||
          clickedNode.type === "subgarden" ||
          clickedNode.type === "garden_ref" ||
          clickedNode.data?.isExpandedSubgardenLabel)
      ) {
        // Prevent rapid multiple clicks
        event.preventDefault();
        event.stopPropagation();

        // Debounce navigation to prevent multiple rapid calls
        if (
          (window as any).lastNavigationTime &&
          Date.now() - (window as any).lastNavigationTime < 500
        ) {
          return;
        }

        (window as any).lastNavigationTime = Date.now();
        onNavigateToGarden(gardenName);
      }
    },
    [onNavigateToGarden],
  );

  // Handle node mouse enter/leave for hover effects
  const onNodeMouseEnter: NodeMouseHandler = useCallback((event, node) => {
    if (
      node.type === "supergarden" ||
      node.type === "subgarden" ||
      node.type === "garden_ref" ||
      node.data?.isExpandedSubgardenLabel
    ) {
      setHoveredNode(node.id);
      document.body.style.cursor = "pointer";
    }
  }, []);

  const onNodeMouseLeave: NodeMouseHandler = useCallback(() => {
    setHoveredNode(null);
    document.body.style.cursor = "default";
  }, []);

  return (
    <ReactFlow
      nodes={nodes.map((node) => ({
        ...node,
        style: {
          ...node.style,
          boxShadow:
            hoveredNode === node.id
              ? "0 0 10px 2px rgba(99, 102, 241, 0.7)"
              : undefined,
          cursor:
            node.type === "supergarden" ||
            node.type === "subgarden" ||
            node.type === "garden_ref" ||
            node.data?.isExpandedSubgardenLabel
              ? "pointer"
              : undefined,
          // Add visual hint for navigable nodes
          border:
            node.type === "supergarden" ||
            node.type === "subgarden" ||
            node.type === "garden_ref" ||
            node.data?.isExpandedSubgardenLabel
              ? "2px dashed rgba(99, 102, 241, 0.7)"
              : undefined,
        },
      }))}
      edges={edges.map((edge) => ({
        ...edge,
        type: "smoothstep",
        sourceHandle: null,
        targetHandle: null,
      }))}
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
      fitViewOptions={{ padding: 0.2 }}
      proOptions={{ hideAttribution: true }}
      zoomOnScroll={true}
      panOnScroll={false}
      panOnDrag={true}
      snapToGrid={true}
      snapGrid={[10, 10]}
      defaultEdgeOptions={{
        type: "smoothstep",
        animated: true,
        style: { stroke: "#999", strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed },
      }}
      connectionLineType={ConnectionLineType.SmoothStep}
    >
      <Background />
      <MiniMap nodeStrokeWidth={3} zoomable pannable />
      <div className="absolute top-4 left-4 z-10 rounded-md bg-background/80 p-3 text-sm shadow-md backdrop-blur-sm">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full border-2 border-primary border-dashed" />
            <p className="text-muted-foreground">
              Click on dashed nodes to navigate between gardens
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-3 w-3 items-center justify-center">
              <Icons.Layers className="h-3 w-3 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Use the <Icons.Layers className="mx-1 inline h-3 w-3" /> toggle to
              expand or condense subgardens
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-3 w-3 items-center justify-center">
              <Icons.Globe className="h-3 w-3 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Navigate up to supergardens or down to subgardens
            </p>
          </div>
          <div className="mt-1 text-muted-foreground text-xs italic">
            Note: Changes to garden names are reflected in navigation
          </div>
        </div>
      </div>
      {/* TODO: fix styles for dark mode */}
      <Controls />
      <Panel position="top-right" className="flex flex-col gap-2">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onLayout}
            disabled={layouting}
          >
            <Icons.RefreshCw className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => fitView({ padding: 0.2 })}
          >
            <Icons.Maximize className="h-4 w-4" />
          </Button>
        </div>

        <div
          className={`flex items-center gap-2 rounded-md bg-background/80 p-2 shadow-md backdrop-blur-sm transition-all duration-300 ${isToggling ? "animate-pulse ring ring-primary/50" : ""}`}
        >
          <Icons.Layers
            className={`h-4 w-4 ${expandSubgardens ? "text-primary" : "text-muted-foreground"}`}
          />
          <div className="flex items-center space-x-2">
            <Switch
              id="expand-subgardens"
              checked={expandSubgardens}
              onCheckedChange={(checked) => {
                setExpandSubgardens(checked);
                // Force re-layout
                setInitialized(false);
                setIsToggling(true);
                setTimeout(() => setIsToggling(false), 1000);
              }}
            />
            <Label
              htmlFor="expand-subgardens"
              className={`text-xs transition-all duration-150 ${expandSubgardens ? "font-semibold text-primary" : ""}`}
            >
              {isToggling
                ? "Processing..."
                : expandSubgardens
                  ? "Expanded"
                  : "Condensed"}
            </Label>
          </div>
        </div>
      </Panel>
    </ReactFlow>
  );
};

export default GardenFlowInner;
