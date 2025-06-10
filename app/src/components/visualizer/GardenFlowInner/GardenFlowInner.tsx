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
import { useCallback, useEffect, useState } from "react";

import { FloatingPanel } from "components/core";
import { GardenFlowHints } from "components/visualizer";
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
}

/**
 * Garden Flow Inner.
 */
const GardenFlowInner = ({ gardens }: Props) => {
  const { fitView } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const [initialized, setInitialized] = useState(false);
  const [layouting, setLayouting] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1600);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [expandSubgardens, setExpandSubgardens] = useState(false);

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

  // initialize flow when garden data and container width are available
  useEffect(() => {
    if (activeGarden && containerWidth) {
      const { nodes: initialNodes, edges: initialEdges } = gardenToFlow(
        activeGarden,
        containerWidth,
        { expandSubgardens }
      );

      if (!initialized && initialNodes.length > 0 && initialEdges.length > 0) {
        // apply auto layout and get optimized edges
        autoLayout(initialNodes, initialEdges)
          .then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
            setNodes(layoutedNodes);
            // set edges without overriding handles
            setEdges(layoutedEdges);

            // update node internals after layout
            for (const node of layoutedNodes) {
              updateNodeInternals(node.id);
            }

            // fit view after nodes are positioned
            setTimeout(() => {
              fitView({ padding: 0.2 });
              setInitialized(true);
            }, 100);
          })
          .catch((error) => {
            console.error("Layout error:", error);
            // fallback to initial layout if auto-layout fails
            setNodes(initialNodes);
            setEdges(initialEdges);
            setInitialized(true);
          });
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
      .then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        setNodes([...layoutedNodes]);
        // set edges without overriding handles
        setEdges(layoutedEdges);

        // update node internals after layout refresh
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

  // handle node click for garden navigation
  const onNodeClick: NodeMouseHandler = (event, clickedNode) => {
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
      // prevent rapid multiple clicks
      event.preventDefault();
      event.stopPropagation();

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

  // handle node mouse enter/leave for hover effects
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
      className="relative"
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
          // add visual hint for navigable nodes
          border:
            node.type === "supergarden" ||
            node.type === "subgarden" ||
            node.type === "garden_ref" ||
            node.data?.isExpandedSubgardenLabel
              ? "2px dashed rgba(99, 102, 241, 0.7)"
              : undefined,
        },
      }))}
      edges={edges}
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
        // style: { stroke: "#999", strokeWidth: 1.5 },
        // markerEnd: { type: MarkerType.ArrowClosed },
      }}
      connectionLineType={ConnectionLineType.SmoothStep}
    >
      <Background />

      <MiniMap
        nodeColor="hsl(var(--foreground))"
        nodeStrokeWidth={3}
        zoomable
        pannable
      />

      {/* TODO: update hints */}
      <Panel position="top-right">
        <GardenFlowHints />
      </Panel>

      <FloatingPanel
        setInitialized={setInitialized}
        onLayout={onLayout}
        expandSubgardens={expandSubgardens}
        setExpandSubgardens={setExpandSubgardens}
      />
    </ReactFlow>
  );
};

export default GardenFlowInner;
