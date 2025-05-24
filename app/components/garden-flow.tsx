"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  useReactFlow,
  useUpdateNodeInternals,
  MiniMap,
  ConnectionLineType,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { GardenSpec } from "@/lib/schema/garden";
import { gardenToFlow, autoLayout } from "@/lib/util/flow";
import { nodeTypes } from "@/components/ui/custom-nodes";
import { Button } from "@/components/ui/button";
import { Maximize, RefreshCw } from "lucide-react";

interface GardenFlowProps {
  garden: typeof GardenSpec.Type;
}

const GardenFlowInner = ({ garden }: GardenFlowProps) => {
  const { fitView } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const [initialized, setInitialized] = useState(false);
  const [layouting, setLayouting] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1600);

  // Initialize with empty arrays to prevent undefined errors
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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

  // Initialize flow when garden data and container width are available
  useEffect(() => {
    if (garden && containerWidth) {
      const { nodes: initialNodes, edges: initialEdges } = gardenToFlow(
        garden,
        containerWidth
      );

      if (!initialized && initialNodes.length > 0 && initialEdges.length > 0) {
        // Apply auto layout and get optimized edges
        autoLayout(initialNodes, initialEdges)
          .then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
            setNodes(layoutedNodes);
            setEdges(layoutedEdges);
            // Update node internals after layout
            layoutedNodes.forEach((node) => updateNodeInternals(node.id));

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
  }, [garden, containerWidth, initialized, setNodes, setEdges, fitView]);

  // Handle layout refresh
  const onLayout = useCallback(() => {
    if (nodes.length === 0 || edges.length === 0) return;

    setLayouting(true);

    autoLayout(nodes, edges)
      .then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        setNodes([...layoutedNodes]);
        setEdges([...layoutedEdges]);
        // Update node internals after layout refresh
        layoutedNodes.forEach((node) => updateNodeInternals(node.id));

        setTimeout(() => {
          fitView({ padding: 0.2 });
          setLayouting(false);
        }, 100);
      })
      .catch((error) => {
        console.error("Layout refresh error:", error);
        setLayouting(false);
      });
  }, [nodes, edges, setNodes, setEdges, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
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
        pathOptions: {
          offset: 10,
        },
      }}
    >
      <Background />
      <MiniMap nodeStrokeWidth={3} zoomable pannable />
      <Controls />
      <Panel position="top-right">
        <Button
          variant="outline"
          size="icon"
          onClick={onLayout}
          disabled={layouting}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => fitView({ padding: 0.2 })}
          className="ml-2"
        >
          <Maximize className="h-4 w-4" />
        </Button>
      </Panel>
    </ReactFlow>
  );
};

// Wrap with provider to avoid context issues
const GardenFlow = (props: GardenFlowProps) => {
  return (
    <ReactFlowProvider>
      <div className="w-full h-[800px] border rounded-lg overflow-hidden">
        <GardenFlowInner {...props} />
      </div>
    </ReactFlowProvider>
  );
};

export default GardenFlow;
