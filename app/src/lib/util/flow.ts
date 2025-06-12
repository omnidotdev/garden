import { MarkerType, Position } from "@xyflow/react";
import ELK from "elkjs/lib/elk.bundled.js";
import { match } from "ts-pattern";

import type { GardenTypes } from "generated/garden.types";
import type { Edge, Node } from "@xyflow/react";
import type { ElkNode } from "elkjs";

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
  type: string
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
      targetPosition: Position.Bottom,
    }))
    .otherwise(() => ({}));
};

interface FlowOptions {
  expandSubgardens?: boolean;
}

export const gardenToFlow = (
  garden: GardenTypes,
  width = 1600,
  options: FlowOptions = {}
): { nodes: Node[]; edges: Edge[] } => {
  // create a shallow copy to prevent reference issues
  const gardenCopy = { ...garden };

  // Check for the required fields
  if (!gardenCopy || !gardenCopy.name) {
    return { nodes: [], edges: [] };
  }

  // Ensure window.gardenData exists for subgarden expansion
  if (typeof window !== "undefined" && options.expandSubgardens) {
    (window as any).gardenData = (window as any).gardenData || {};
    (window as any).gardenData[garden.name] = garden;
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
      icon_color: "hsl(var(--primary))",
      icon: "SproutIcon",
    },
    position: { x: centerX, y: 0 },
    ...getNodePositions(NODE_TYPES.GARDEN),
    style: {
      background: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
      borderRadius: "var(--radius)",
    },
  });

  // Process items directly on the garden if any
  if (garden.items && Array.isArray(garden.items)) {
    garden.items.forEach((item: any, index: number) => {
      if (!item || !item.name) return;

      const itemId = generateId(
        NODE_TYPES.ITEM,
        `${gardenId}-direct-${item.name}`
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
        type: "smoothstep",
        animated: true,
        style: {
          stroke: "hsl(var(--muted-foreground))",
          strokeWidth: 2,
        },
        markerEnd: { type: MarkerType.ArrowClosed },
        interactionWidth: 1,
      });
    });
  }

  // Process supergardens if any
  if (gardenCopy.supergardens && Array.isArray(gardenCopy.supergardens)) {
    gardenCopy.supergardens.forEach((supergarden: any, index: number) => {
      const supergardenId = generateId(
        NODE_TYPES.SUPERGARDEN,
        supergarden.name
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
          icon_color: "hsl(var(--chart-9))",
          theme: supergarden.theme || garden.theme,
        },
        position: { x: centerX + xOffset, y: -200 },
        ...getNodePositions(NODE_TYPES.SUPERGARDEN),
        style: {
          background: "hsl(var(--chart-9))",
          color: "hsl(var(--chart-9-foreground))",
          borderRadius: "var(--radius)",
        },
      });

      // Create edge from supergarden to this garden
      edges.push({
        id: `${supergardenId}-to-${gardenId}`,
        source: supergardenId,
        target: gardenId,
        type: "smoothstep",
        animated: true,
        style: {
          stroke: "hsl(var(--chart-9))",
          strokeWidth: 2,
          strokeDasharray: "5,5",
        },
        markerEnd: { type: MarkerType.ArrowClosed },
        interactionWidth: 1,
      });
    });
  }

  // Process subgardens if any
  if (garden.subgardens && Array.isArray(garden.subgardens)) {
    garden.subgardens.forEach((subgarden, index) => {
      const subgardenId = generateId(NODE_TYPES.SUBGARDEN, subgarden.name);
      const xOffset = 400 - index * 150; // Position subgardens to the right and above

      // Try to fetch theme from actual subgarden if available
      let subgardenTheme = garden.theme;
      if (
        typeof window !== "undefined" &&
        (window as any).gardenData &&
        (window as any).gardenData[subgarden.name]
      ) {
        subgardenTheme =
          (window as any).gardenData[subgarden.name].theme || garden.theme;
      }

      // If expandSubgardens is true, integrate the subgarden directly
      if (options.expandSubgardens && typeof window !== "undefined") {
        try {
          // Initialize window.gardenData if it doesn't exist
          if (!(window as any).gardenData) {
            (window as any).gardenData = {};
          }

          // Try to get the subgarden data from the global store
          let subgardenData = (window as any).gardenData[subgarden.name];

          // If subgarden data doesn't exist in the global store, create a basic structure
          if (!subgardenData) {
            subgardenData = {
              name: subgarden.name,
              description: subgarden.description,
              version: subgarden.version || "1.0.0",
              items: [],
              subgardens: [],
            };
            (window as any).gardenData[subgarden.name] = subgardenData;
          }

          // Always process a subgarden in expanded mode
          // calculate horizontal position to prevent overlapping
          const horizontalSpacing = Math.min(
            600,
            width / (garden.subgardens?.length || 1)
          );
          const xPos =
            centerX -
            ((garden.subgardens?.length || 1) * horizontalSpacing) / 2 +
            index * horizontalSpacing;

          // Add the expanded subgarden node
          const subgardenNodeId = `expanded-${subgardenId}`;
          nodes.push({
            id: subgardenNodeId,
            type: NODE_TYPES.GARDEN,
            data: {
              label: subgarden.name,
              description: subgarden.description,
              version: subgarden.version,
              theme: subgardenTheme,
              icon_color: "hsl(var(--chart-8))",
              icon: "SproutIcon",
              isExpandedSubgarden: true,
            },
            position: {
              x: xPos,
              y: 500,
            },
            style: {
              background: "hsla(var(--chart-8), 0.1)",
              color: "hsl(var(--foreground))",
              borderRadius: "var(--radius)",
              border: "2px dashed hsl(var(--chart-8))",
              padding: "10px",
              fontSize: "14px",
              fontWeight: "bold",
            },
          });

          // Connect main garden to subgarden node
          edges.push({
            id: `${gardenId}-to-${subgardenNodeId}`,
            source: gardenId,
            target: subgardenNodeId,
            type: "smoothstep",
            animated: true,
            style: {
              stroke: "hsl(var(--chart-8))",
              strokeWidth: 2,
              strokeDasharray: "5,5",
            },
            markerEnd: { type: MarkerType.ArrowClosed },
          });

          // Process items directly on the subgarden
          if (subgardenData.items && Array.isArray(subgardenData.items)) {
            subgardenData.items.forEach((item: any, itemIndex: number) => {
              if (!item || !item.name) return;

              const itemId = generateId(
                NODE_TYPES.ITEM,
                `${subgardenNodeId}-direct-${item.name}`
              );
              // Use a more reliable spacing mechanism to prevent overlap
              const itemYPosition = 600 + (itemIndex + 1) * 100;

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
                  theme: subgardenTheme,
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

              edges.push({
                id: `${subgardenNodeId}-to-${itemId}`,
                source: subgardenNodeId,
                target: itemId,
                type: "smoothstep",
                animated: true,
                style: {
                  stroke: "hsl(var(--muted-foreground))",
                  strokeWidth: 2,
                },
                markerEnd: { type: MarkerType.ArrowClosed },
                interactionWidth: 1,
              });
            });
          }
        } catch (error) {
          console.error("Error expanding subgarden:", error);
        }
      } else {
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
            icon_color: "hsl(var(--chart-8))",
            theme: subgardenTheme,
          },
          position: { x: centerX + xOffset, y: 200 },
          ...getNodePositions(NODE_TYPES.SUBGARDEN),
          style: {
            background: "hsl(var(--chart-8))",
            color: "hsl(var(--chart-8-foreground))",
            borderRadius: "var(--radius)",
          },
        });

        // Create edge from garden to this subgarden
        edges.push({
          id: `${gardenId}-to-${subgardenId}`,
          source: gardenId,
          target: subgardenId,
          type: "smoothstep",
          animated: true,
          style: {
            stroke: "hsl(var(--chart-8))",
            strokeWidth: 2,
            strokeDasharray: "5,5",
          },
          markerEnd: { type: MarkerType.ArrowClosed },
          interactionWidth: 1,
        });
      }
    });
  }

  // No additional processing needed

  return { nodes, edges };
};

/**
 * Automatically layout nodes and edges using ELK
 */
export const autoLayout = async (
  nodes: Node[],
  edges: Edge[]
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

    // Make sure edges have correct settings
    const nextEdges = edges.map((edge) => {
      // Preserve original edge properties (especially type, source, target)
      return {
        ...edge,
        type: edge.type || "smoothstep", // Ensure we have a type
        animated: edge.animated !== false, // Default to animated
        markerEnd: edge.markerEnd || { type: MarkerType.ArrowClosed },
        zIndex: 0, // Ensure edges are behind nodes
        style: {
          ...(edge.style || {}),
          stroke: edge.style?.stroke || "hsl(var(--muted-foreground))",
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
