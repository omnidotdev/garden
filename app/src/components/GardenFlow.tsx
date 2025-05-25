"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
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
  NodeMouseHandler,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { GardenTypes } from "@/generated/garden.types";
import { gardenToFlow, autoLayout } from "@/lib/util/flow";
import { nodeTypes } from "@/components/ui/custom-nodes";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Maximize, RefreshCw, Layers, Globe } from "lucide-react";

interface GardenFlowProps {
  garden: GardenTypes;
  onNavigateToGarden?: (gardenName: string) => void;
}

const GardenFlowInner = ({ garden, onNavigateToGarden }: GardenFlowProps) => {
  const { fitView } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const [initialized, setInitialized] = useState(false);
  const [layouting, setLayouting] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1600);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [expandSubgardens, setExpandSubgardens] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

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

  // Reset initialization when garden changes or expand setting changes
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
        { expandSubgardens }
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
  
  // Handle node click for garden navigation
  const onNodeClick: NodeMouseHandler = useCallback((event, clickedNode) => {
    if (!onNavigateToGarden) return;
    
    // Determine the garden name to navigate to
    let gardenName = clickedNode.data?.label;
    
    // Check if this is an expanded subgarden label
    if (clickedNode.data?.isExpandedSubgardenLabel) {
      gardenName = clickedNode.data?.label.replace(' (Expanded)', '');
    }
    
    // For all navigable node types, navigate to the garden by name
    if (gardenName && (
      clickedNode.type === 'supergarden' || 
      clickedNode.type === 'subgarden' || 
      clickedNode.type === 'garden_ref' ||
      clickedNode.data?.isExpandedSubgardenLabel
    )) {
      // Prevent rapid multiple clicks
      event.preventDefault();
      event.stopPropagation();
      
      // Debounce navigation to prevent multiple rapid calls
      if ((window as any).lastNavigationTime && 
          Date.now() - (window as any).lastNavigationTime < 500) {
        return;
      }
      
      (window as any).lastNavigationTime = Date.now();
      onNavigateToGarden(gardenName);
    }
  }, [onNavigateToGarden]);
  
  // Handle node mouse enter/leave for hover effects
  const onNodeMouseEnter: NodeMouseHandler = useCallback((event, node) => {
    if (node.type === 'supergarden' || node.type === 'subgarden' || node.type === 'garden_ref' || node.data?.isExpandedSubgardenLabel) {
      setHoveredNode(node.id);
      document.body.style.cursor = 'pointer';
    }
  }, []);
  
  const onNodeMouseLeave: NodeMouseHandler = useCallback(() => {
    setHoveredNode(null);
    document.body.style.cursor = 'default';
  }, []);

  return (
    <ReactFlow
      nodes={nodes.map(node => ({
        ...node,
        style: {
          ...node.style,
          boxShadow: hoveredNode === node.id ? '0 0 10px 2px rgba(99, 102, 241, 0.7)' : undefined,
          cursor: (node.type === 'supergarden' || node.type === 'subgarden' || node.type === 'garden_ref' || node.data?.isExpandedSubgardenLabel) ? 'pointer' : undefined,
          // Add visual hint for navigable nodes
          border: (node.type === 'supergarden' || node.type === 'subgarden' || node.type === 'garden_ref' || node.data?.isExpandedSubgardenLabel) 
            ? '2px dashed rgba(99, 102, 241, 0.7)' 
            : undefined,
        }
      }))}
      edges={edges}
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
        markerEnd: { type: MarkerType.ArrowClosed }
      }}
    >
      <Background />
      <MiniMap nodeStrokeWidth={3} zoomable pannable />
      <Controls />
      <Panel position="top-right" className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
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
          >
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
        
        <div className={`bg-background/80 backdrop-blur-sm p-2 rounded-md shadow-md flex items-center gap-2 transition-all duration-300 ${isToggling ? "animate-pulse ring ring-primary/50" : ""}`}>
          <Layers className={`h-4 w-4 ${expandSubgardens ? "text-primary" : "text-muted-foreground"}`} />
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
            <Label htmlFor="expand-subgardens" className={`text-xs transition-all duration-150 ${expandSubgardens ? "font-semibold text-primary" : ""}`}>
              {isToggling ? "Processing..." : expandSubgardens ? "Expanded" : "Condensed"}
            </Label>
          </div>
        </div>
      </Panel>
    </ReactFlow>
  );
};

// Wrap with provider to avoid context issues
const GardenFlow = (props: GardenFlowProps) => (
  <ReactFlowProvider>
    <div className="w-full h-[800px] border rounded-lg overflow-hidden">
      <GardenFlowInner {...props} />
      {props.onNavigateToGarden && (
        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-3 rounded-md shadow-md text-sm z-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-dashed border-primary rounded-full"></div>
              <p className="text-muted-foreground">Click on dashed nodes to navigate between gardens</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 flex items-center justify-center">
                <Layers className="h-3 w-3 text-primary" />
              </div>
              <p className="text-muted-foreground">Use the <Layers className="h-3 w-3 inline mx-1" /> toggle to expand or condense subgardens</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 flex items-center justify-center">
                <Globe className="h-3 w-3 text-primary" />
              </div>
              <p className="text-muted-foreground">Navigate up to supergardens or down to subgardens</p>
            </div>
            <div className="mt-1 text-xs text-muted-foreground italic">
              Note: Changes to garden names are reflected in navigation
            </div>
          </div>
        </div>
      )}
    </div>
  </ReactFlowProvider>
);

export default GardenFlow;
