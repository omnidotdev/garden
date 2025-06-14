import { MarkerType, Position } from "@xyflow/react";
import ELK from "elkjs/lib/elk.bundled.js";
import { match } from "ts-pattern";

import type { Edge, Node } from "@xyflow/react";
import type { ElkNode } from "elkjs";
import type { GardenTypes } from "generated/garden.types";

const elk = new ELK();

const calculateNodeHeight = (node: Node): number => {
  const { width = 0, height = 0 } = node.style || {};
  if (height) return Number(height);
  if (node.type === "garden") return 100;
  return 60;
};

const NODE_TYPES = {
  GARDEN: "garden",
  ITEM: "item",
  SUPERGARDEN: "supergarden",
  SUBGARDEN: "subgarden",
};

const generateId = (type: string, name: string) =>
  `${type}-${name.replace(/\s+/g, "-").toLowerCase()}`;

const getNodePositions = (
  type: string,
): { sourcePosition?: Position; targetPosition?: Position } => {
  return match(type)
    .with(NODE_TYPES.GARDEN, () => ({
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    }))
    .with(NODE_TYPES.ITEM, () => ({
      targetPosition: Position.Top,
    }))
    .with(NODE_TYPES.SUPERGARDEN, () => ({
      sourcePosition: Position.Bottom,
    }))
    .with(NODE_TYPES.SUBGARDEN, () => ({
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    }))
    .otherwise(() => ({}));
};

// Track connections between nodes
const trackNodeConnections = (nodes: Node[], edges: Edge[]): Node[] => {
  // Initialize connection tracking objects for each node
  const nodesWithConnections = nodes.map((node) => {
    return {
      ...node,
      data: {
        ...node.data,
        sourceConnections: Array.isArray(node.data.sourceConnections)
          ? [...node.data.sourceConnections]
          : [],
        targetConnections: Array.isArray(node.data.targetConnections)
          ? [...node.data.targetConnections]
          : [],
      },
    };
  });

  // Map nodes by ID for quick lookup
  const nodeMap = new Map<string, Node>();
  nodesWithConnections.forEach((node) => nodeMap.set(node.id, node));

  // Track all connections from edges
  edges.forEach((edge) => {
    const sourceNode = nodeMap.get(edge.source);
    const targetNode = nodeMap.get(edge.target);

    if (sourceNode && Array.isArray(sourceNode.data.sourceConnections)) {
      sourceNode.data.sourceConnections = [
        ...sourceNode.data.sourceConnections,
        edge.target,
      ];
    }

    if (targetNode && Array.isArray(targetNode.data.targetConnections)) {
      targetNode.data.targetConnections = [
        ...targetNode.data.targetConnections,
        edge.source,
      ];
    }
  });

  return nodesWithConnections;
};

interface FlowOptions {
  expandSubgardens?: boolean;
  edgeType?: "default" | "straight" | "step" | "smoothstep" | "simplebezier";
  animateEdges?: boolean;
}

export const gardenToFlow = (
  garden: GardenTypes,
  width = 1600,
  options: FlowOptions = {},
): { nodes: Node[]; edges: Edge[] } => {
  // create a shallow copy to prevent reference issues
  const gardenCopy = { ...garden };

  // Check for the required fields
  if (!gardenCopy || !gardenCopy.name) {
    return { nodes: [], edges: [] };
  }

  // Ensure window.gardenData exists for subgarden expansion
  if (typeof window !== "undefined" && options.expandSubgardens) {
    window.gardenData = window.gardenData || {};
    window.gardenData[garden.name] = garden;
  }

  // Store the garden theme for propagation to all nodes
  const currentGardenTheme = garden.theme || null;

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const centerX = width / 2;

  const gardenId = generateId(NODE_TYPES.GARDEN, garden.name);
  nodes.push({
    id: gardenId,
    type: NODE_TYPES.GARDEN,
    data: {
      label: garden.name,
      description: garden.description,
      version: garden.version,
      theme: currentGardenTheme,
      icon_color: "var(--primary)",
      icon: "SproutIcon",
    },
    position: { x: centerX, y: 0 },
    ...getNodePositions(NODE_TYPES.GARDEN),
    style: {
      background: "var(--primary)",
      color: "var(--primary-foreground)",
      borderRadius: "var(--radius)",
    },
  });

  // Process items directly on the garden if any
  if (garden.items && Array.isArray(garden.items)) {
    garden.items.forEach((item, index) => {
      if (!item || !item.name) return;

      const itemId = generateId(
        NODE_TYPES.ITEM,
        `${gardenId}-direct-${item.name}`,
      );
      const itemYPosition = 150 + index * 80;

      nodes.push({
        id: itemId,
        type: NODE_TYPES.ITEM,
        data: {
          label: item.name,
          homepage_url: item.homepage_url || "",
          logo: item.logo || "",
          image:
            item.logo ||
            "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
          repo_url: item.repo_url || "",
          description: item.description || "",
          theme: currentGardenTheme,
          cta: {
            primary: {
              label: "Visit Website",
              url: item.homepage_url || "",
            },
            secondary: item.repo_url
              ? {
                  label: "View Code",
                  url: item.repo_url,
                }
              : undefined,
          },
        },
        position: {
          x: centerX,
          y: itemYPosition,
        },
        ...getNodePositions(NODE_TYPES.ITEM),
      });

      // Connect garden to this item
      edges.push({
        id: `${gardenId}-to-${itemId}`,
        source: gardenId,
        target: itemId,
        sourceHandle: "bottom",
        targetHandle: "top",
        type: options.edgeType || "default",
        animated: options.animateEdges !== false,
        style: {
          stroke: "var(--muted-foreground)",
          strokeWidth: 2,
        },
        markerEnd: { type: MarkerType.ArrowClosed },
        interactionWidth: 1,
      });
    });
  }

  // Process supergardens if any
  if (gardenCopy.supergardens && Array.isArray(gardenCopy.supergardens)) {
    gardenCopy.supergardens.forEach((supergarden, index) => {
      const supergardenId = generateId(
        NODE_TYPES.SUPERGARDEN,
        supergarden.name,
      );
      const xOffset = -400 + index * 150; // Position supergardens to the left and above

      nodes.push({
        id: supergardenId,
        type: NODE_TYPES.SUPERGARDEN,
        data: {
          label: supergarden.name,
          description: supergarden.description,
          url: supergarden.url,
          logo: supergarden.logo,
          version: supergarden.version,
          icon: "GlobeIcon",
          icon_color: "var(--chart-9)",
          theme: supergarden.theme || garden.theme,
        },
        position: { x: centerX + xOffset, y: -200 },
        ...getNodePositions(NODE_TYPES.SUPERGARDEN),
        style: {
          background: "var(--chart-9)",
          color: "var(--chart-9-foreground)",
          borderRadius: "var(--radius)",
        },
      });

      // Create edge from supergarden to this garden
      edges.push({
        id: `${supergardenId}-to-${gardenId}`,
        source: supergardenId,
        target: gardenId,
        sourceHandle: "bottom",
        targetHandle: "top",
        type: options.edgeType || "default",
        animated: options.animateEdges !== false,
        style: {
          stroke: "var(--chart-9)",
          strokeWidth: 2,
          strokeDasharray: "5,5",
        },
        markerEnd: { type: MarkerType.ArrowClosed },
        interactionWidth: 1,
      });
    });
  }

  /**
   * Recursively processes subgardens and their children
   */
  const processSubgardensRecursively = (
    parentGarden: GardenTypes,
    parentId: string,
    parentX: number,
    parentY: number,
    level: number = 1,
    indexInParent: number = 0,
    nodesArray: Node[],
    edgesArray: Edge[],
  ): void => {
    // Early exit if no subgardens to process
    if (
      !parentGarden.subgardens ||
      !Array.isArray(parentGarden.subgardens) ||
      parentGarden.subgardens.length === 0
    ) {
      return;
    }

    // Maximum depth to render to avoid performance issues
    if (level > 5) {
      return;
    }

    // Calculate spacing based on the number of items at this level
    const horizontalSpacing = Math.min(
      600,
      width / Math.max(1, parentGarden.subgardens.length),
    );
    const verticalOffset = 200; // Fixed vertical distance between levels
    const baseYPos = parentY + verticalOffset; // Start at a fixed offset from parent

    parentGarden.subgardens.forEach((subgarden, index) => {
      if (!subgarden || !subgarden.name) return;

      const subgardenId = generateId(
        NODE_TYPES.SUBGARDEN,
        `level-${level}-${subgarden.name}`,
      );

      // Try to get the actual garden data
      let subgardenData = window.gardenData?.[subgarden.name];
      if (!subgardenData) {
        subgardenData = {
          name: subgarden.name,
          description: subgarden.description,
          version: subgarden.version || "1.0.0",
          items: [],
          subgardens: [],
        };
      }

      // Calculate positions to create a tree-like structure
      const numSubgardens = parentGarden.subgardens?.length;
      const xSpread = numSubgardens ? horizontalSpacing * numSubgardens : 0;
      const xPos =
        parentX -
        xSpread / 2 +
        horizontalSpacing / 2 +
        index * horizontalSpacing;
      const yPos = baseYPos;

      // Add the expanded subgarden node
      const subgardenNodeId = `expanded-${subgardenId}`;
      // Use different chart colors for different levels to visually distinguish them
      const colorIndex = Math.min(12, Math.max(1, level % 12));

      nodesArray.push({
        id: subgardenNodeId,
        type: NODE_TYPES.GARDEN,
        data: {
          label: subgarden.name,
          description: subgarden.description || "",
          version: subgarden.version || "",
          theme: subgardenData.theme || parentGarden.theme,
          icon_color: `var(--chart-${colorIndex})`,
          icon: "SproutIcon",
          isExpandedSubgarden: true,
          level,
          sourceConnections: [] as string[],
          targetConnections: [] as string[],
        },
        position: {
          x: xPos,
          y: yPos,
        },
        style: {
          color: "var(--foreground)",
          borderRadius: "var(--radius)",
          fontSize: `${Math.max(12, 16 - level)}px`,
          fontWeight: "bold",
          zIndex: 1000 - level * 10,
        },
      });

      // Connect parent garden to this subgarden node
      edgesArray.push({
        id: `${parentId}-to-${subgardenNodeId}`,
        source: parentId,
        target: subgardenNodeId,
        sourceHandle: "bottom",
        targetHandle: "top",
        type: options.edgeType || "default",
        animated: options.animateEdges !== false,
        style: {
          stroke: `var(--chart-${colorIndex})`,
          strokeWidth: Math.max(1, 2 - (level - 1) * 0.2),
          strokeDasharray: "5,5",
          opacity: Math.max(0.7, 1 - (level - 1) * 0.05),
        },
        markerEnd: { type: MarkerType.ArrowClosed },
      });

      // Process items in this subgarden
      if (subgardenData.items && Array.isArray(subgardenData.items)) {
        subgardenData.items.forEach((item, itemIndex) => {
          if (!item || !item.name) return;

          const itemId = generateId(
            NODE_TYPES.ITEM,
            `${subgardenNodeId}-direct-${item.name}`,
          );
          // Distribute items with reasonable spacing
          const itemSpacing = Math.max(60, 80 - level * 5);
          const itemYPosition = yPos + 100 + itemIndex * itemSpacing;

          nodesArray.push({
            id: itemId,
            type: NODE_TYPES.ITEM,
            data: {
              label: item.name,
              homepage_url: item.homepage_url || "",
              logo: item.logo || "",
              image:
                item.logo ||
                "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
              repo_url: item.repo_url || "",
              description: item.description || "",
              theme: subgardenData.theme || parentGarden.theme,
              level: level, // Track the nesting level for styling
              sourceConnections: [] as string[],
              targetConnections: [] as string[],
              cta: {
                primary: {
                  label: "Visit Website",
                  url: item.homepage_url || "",
                },
                secondary: item.repo_url
                  ? {
                      label: "View Code",
                      url: item.repo_url,
                    }
                  : undefined,
              },
            },
            position: {
              x: xPos,
              y: itemYPosition,
            },
            ...getNodePositions(NODE_TYPES.ITEM),
          });

          edgesArray.push({
            id: `${subgardenNodeId}-to-${itemId}`,
            source: subgardenNodeId,
            target: itemId,
            sourceHandle: "bottom",
            targetHandle: "top",
            type: options.edgeType || "default",
            animated: options.animateEdges !== false,
            style: {
              stroke: "var(--muted-foreground)",
              strokeWidth: 2,
            },
            markerEnd: { type: MarkerType.ArrowClosed },
            interactionWidth: 1,
          });
        });
      }

      // Recursively process subgardens of this subgarden
      if (
        subgardenData.subgardens &&
        Array.isArray(subgardenData.subgardens) &&
        subgardenData.subgardens.length > 0
      ) {
        processSubgardensRecursively(
          subgardenData,
          subgardenNodeId,
          xPos,
          yPos,
          level + 1,
          index,
          nodesArray,
          edgesArray,
        );
      }
    });
  };

  // Process subgardens if any
  if (garden.subgardens && Array.isArray(garden.subgardens)) {
    if (options.expandSubgardens && typeof window !== "undefined") {
      try {
        // Initialize window.gardenData if it doesn't exist
        if (!window.gardenData) {
          window.gardenData = {};
        }

        // Make sure all available gardens are in window.gardenData
        // This ensures we can find all subgarden data during recursive expansion
        if (typeof window !== "undefined" && window.gardenData) {
          // We already have the garden data from the props
          // No need to do anything else here
        }

        // Process the first level of subgardens recursively
        processSubgardensRecursively(
          garden,
          gardenId,
          centerX,
          0, // Start at y=0 (top of the diagram)
          1, // Level 1 is the first level of subgardens
          0,
          nodes,
          edges,
        );
      } catch (error) {
        console.error("Error in recursive subgarden processing:", error);
      }
    } else {
      // Non-expanded mode
      garden.subgardens.forEach((subgarden, index) => {
        const subgardenId = generateId(NODE_TYPES.SUBGARDEN, subgarden.name);
        const xOffset = 400 - index * 150; // Position subgardens to the right and above

        // Try to fetch theme from actual subgarden if available
        let subgardenTheme = garden.theme;
        if (
          typeof window !== "undefined" &&
          window.gardenData &&
          window.gardenData[subgarden.name]
        ) {
          subgardenTheme =
            window.gardenData[subgarden.name].theme || garden.theme;
        }

        // Non-expanded mode, just add the subgarden node
        nodes.push({
          id: subgardenId,
          type: NODE_TYPES.SUBGARDEN,
          data: {
            label: subgarden.name,
            description: subgarden.description,
            url: subgarden.url,
            logo: subgarden.logo,
            version: subgarden.version,
            icon: "SproutIcon",
            icon_color: "var(--chart-5)",
            theme: subgardenTheme,
          },
          position: { x: centerX + xOffset, y: 200 },
          ...getNodePositions(NODE_TYPES.SUBGARDEN),
          style: {
            background: "var(--chart-5)",
            color: "var(--chart-5-foreground)",
            borderRadius: "var(--radius)",
          },
        });

        // Create edge from garden to this subgarden
        edges.push({
          id: `${gardenId}-to-${subgardenId}`,
          source: gardenId,
          target: subgardenId,
          sourceHandle: "bottom",
          targetHandle: "top",
          type: options.edgeType || "default",
          animated: options.animateEdges !== false,
          style: {
            stroke: "var(--chart-5)",
            strokeWidth: 2,
            strokeDasharray: "5,5",
          },
          markerEnd: { type: MarkerType.ArrowClosed },
          interactionWidth: 1,
        });
      });
    }
  }

  // Process connections to ensure nodes know about their connections
  const nodesWithConnections = trackNodeConnections(nodes, edges);

  return { nodes: nodesWithConnections, edges };
};

/**
 * Automatically layout nodes and edges using ELK
 */
export const autoLayout = async (
  nodes: Node[],
  edges: Edge[],
): Promise<{ nodes: Node[]; edges: Edge[] }> => {
  if (!nodes?.length) {
    return { nodes: nodes || [], edges: edges || [] };
  }

  try {
    const graph = {
      id: "elk-root",
      layoutOptions: {
        "elk.algorithm": "mrtree",
        "elk.direction": "DOWN",
        "elk.spacing.nodeNode": "200",
        "elk.layered.spacing.nodeNodeBetweenLayers": "200",
        "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
      },
      children: nodes.map((node) => ({
        id: node.id,
        width: 250,
        height: calculateNodeHeight(node),
        layoutOptions: {
          "elk.position": node.type === "garden" ? "ROOT" : "DEFAULT",
        },
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target],
        layoutOptions: {
          "elk.layered.edge.thickness": "2",
          "elk.edgeRouting": "ORTHOGONAL",
        },
      })),
    };

    // Layout the graph
    const root = await elk.layout(graph);
    const layoutNodes = new Map<string, ElkNode>();

    for (const node of root.children ?? []) {
      if (node) {
        layoutNodes.set(node.id, node);
      }
    }

    // Update positions while preserving node properties
    const nextNodes = nodes.map((node) => {
      const elkNode = layoutNodes.get(node.id);
      if (
        !elkNode ||
        typeof elkNode.x !== "number" ||
        typeof elkNode.y !== "number"
      ) {
        return node;
      }

      const position = { x: elkNode.x, y: elkNode.y };
      const nodePositions = getNodePositions(node.type as string);

      // Preserve the original node type and connection points
      return {
        ...node,
        position,
        ...nodePositions,
        data: {
          ...node.data,
          sourcePosition: nodePositions.sourcePosition,
          targetPosition: nodePositions.targetPosition,
        },
      };
    });

    // make sure edges have correct settings
    const nextEdges = edges.map((edge) => {
      // preserve original edge properties
      return {
        ...edge,
        type: edge.type || "step", // Ensure we have a type
        animated: edge.animated !== false, // Default to animated
        markerEnd: edge.markerEnd || { type: MarkerType.ArrowClosed },
        zIndex: 0, // Ensure edges are behind nodes
        style: {
          ...(edge.style || {}),
          stroke: edge.style?.stroke || "var(--muted-foreground)",
          strokeWidth: edge.style?.strokeWidth || 2,
          transition: "stroke 0.3s, stroke-width 0.3s",
        },
        interactionWidth: edge.interactionWidth || 1,
      };
    });

    return { nodes: nextNodes, edges: nextEdges };
  } catch (error) {
    console.error("Error during layout:", error);
    return { nodes, edges };
  }
};
