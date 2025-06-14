import { MarkerType, Position } from "@xyflow/react";
import { match } from "ts-pattern";

import type { Edge, Node } from "@xyflow/react";
import type { GardenTypes } from "@/generated/garden.types";

interface FlowOptions {
  expandSubgardens?: boolean;
  edgeType?: "default" | "straight" | "step" | "smoothstep" | "simplebezier";
  animateEdges?: boolean;
}

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

interface Options {
  schema: Record<string, GardenTypes>;
  garden: GardenTypes;
  width?: number;
  options?: FlowOptions;
}

export const gardenToFlow = ({
  schema,
  garden,
  width = 1600,
  options = {},
}: Options): { nodes: Node[]; edges: Edge[] } => {
  // create a shallow copy to prevent reference issues
  const gardenCopy = { ...garden };

  // Check for the required fields
  if (!gardenCopy || !gardenCopy.name) {
    return { nodes: [], edges: [] };
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
      icon: garden.icon,
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

      // If the supergarden has a defined theme, use it. Otherwise, fallback to current garden theme
      const gardenTheme =
        Object.values(schema).find((g) => g.name === supergarden.name)?.theme ??
        garden.theme;

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
          theme: gardenTheme,
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

  // Process subgardens if any
  if (garden.subgardens && Array.isArray(garden.subgardens)) {
    garden.subgardens.forEach((subgarden, index) => {
      const subgardenId = generateId(NODE_TYPES.SUBGARDEN, subgarden.name);
      const xOffset = 400 - index * 150; // Position subgardens to the right and above

      // If the subgarden has a defined theme, use it. Otherwise, fallback to current garden theme
      const gardenTheme =
        Object.values(schema).find((g) => g.name === subgarden.name)?.theme ??
        garden.theme;

      // add the subgarden node
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
          theme: gardenTheme,
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

  // Process connections to ensure nodes know about their connections
  const nodesWithConnections = trackNodeConnections(nodes, edges);

  return { nodes: nodesWithConnections, edges };
};
