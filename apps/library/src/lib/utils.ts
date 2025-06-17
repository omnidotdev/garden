import { MarkerType, Position } from "@xyflow/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { match } from "ts-pattern";

import type { Edge, Node } from "@xyflow/react";
import type { ClassValue } from "clsx";
import type { GardenTypes } from "../generated/garden.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FlowOptions {
  expandSubgardens?: boolean;
  edgeType?: "default" | "straight" | "step" | "smoothstep" | "simplebezier";
  animateEdges?: boolean;
}

const NODE_TYPES = {
  GARDEN: "garden",
  SPROUT: "sprout",
  SUPERGARDEN: "supergarden",
  SUBGARDEN: "subgarden",
};

const generateId = (type: string, name: string, prefix?: string) => {
  const cleanName = name
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
  const baseId = prefix ? `${prefix}-${cleanName}` : cleanName;
  return `${type}-${baseId}`;
};

// Helper function to find a garden by name in the schema
export const findGardenByName = (
  schema: GardenTypes,
  name: string,
): GardenTypes | null => {
  // Check if this is the garden we're looking for
  if (schema.name === name) {
    return schema;
  }

  // Search in subgardens recursively
  if (schema.subgardens && Array.isArray(schema.subgardens)) {
    for (const subgarden of schema.subgardens) {
      const found = findGardenByName(subgarden as GardenTypes, name);

      if (found) {
        return found;
      }
    }
  }

  return null;
};

const getNodePositions = (
  type: string,
): { sourcePosition?: Position; targetPosition?: Position } => {
  return match(type)
    .with(NODE_TYPES.GARDEN, () => ({
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    }))
    .with(NODE_TYPES.SPROUT, () => ({
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

interface RecursiveSubgardenOptions {
  schema: GardenTypes;
  parent: GardenTypes;
  parentId: string;
  parentX: number;
  parentY: number;
  width: number;
  nodes: Node[];
  edges: Edge[];
  options?: FlowOptions;
  level?: number;
}

const processSubgarensRecursively = ({
  schema,
  parent,
  parentId,
  parentX,
  parentY,
  width,
  nodes,
  edges,
  options = {},
  level = 1,
}: RecursiveSubgardenOptions) => {
  if (!parent.subgardens?.length) return;

  // Calculate spacing based on the number of items at this level
  const horizontalSpacing = Math.min(
    600,
    width / Math.max(1, parent.subgardens.length),
  );
  const verticalOffset = 200; // Fixed vertical distance between levels
  const baseYPos = parentY + verticalOffset; // Start at a fixed offset from parent

  for (const subgarden of parent.subgardens) {
    const subgardenId = generateId(
      NODE_TYPES.SUBGARDEN,
      subgarden.name,
      `${parentId}-level-${level}`,
    );

    const currentGarden = findGardenByName(schema, subgarden.name);

    // If the subgarden has a defined theme, use it. Otherwise, fallback to current parent theme
    const gardenTheme = currentGarden?.theme ?? parent.theme;

    // Calculate positions to create a tree-like structure
    const numSubgardens = parent.subgardens.length;
    const xSpread = numSubgardens ? horizontalSpacing * numSubgardens : 0;
    const xPos =
      parentX -
      xSpread / 2 +
      horizontalSpacing / 2 +
      parent.subgardens.indexOf(subgarden) * horizontalSpacing;
    const yPos = baseYPos;

    nodes.push({
      id: subgardenId,
      type: NODE_TYPES.SUBGARDEN,
      data: {
        label: subgarden.name,
        description: subgarden.description,
        version: subgarden.version,
        theme: gardenTheme,
        level,
        sourceConnections: [],
        targetConnections: [],
      },
      position: {
        x: xPos,
        y: yPos,
      },
      style: {
        background: gardenTheme?.primary_color ?? undefined,
      },
    });

    // Connect parent garden to this subgarden node
    edges.push({
      id: `${parentId}-to-${subgardenId}`,
      source: parentId,
      target: subgardenId,
      sourceHandle: "bottom",
      targetHandle: "top",
      type: options.edgeType || "default",
      animated: options.animateEdges !== false,
      markerEnd: { type: MarkerType.ArrowClosed },
    });

    if (currentGarden?.items?.length) {
      for (const item of currentGarden.items) {
        if (!item || !item.name) {
          console.warn(
            "Skipping invalid item in subgarden:",
            subgarden.name,
            item,
          );
          continue;
        }

        const itemId = generateId(
          NODE_TYPES.SPROUT,
          item.name,
          `${subgardenId}-item`,
        );

        // Distribute items with reasonable spacing
        const itemSpacing = Math.max(60, 80 - level * 5);
        const itemYPosition =
          yPos + 100 + currentGarden.items.indexOf(item) * itemSpacing;

        nodes.push({
          id: itemId,
          type: NODE_TYPES.SPROUT,
          data: {
            label: item.name,
            homepage_url: item.homepage_url,
            logo: item.logo,
            image: item.logo,
            repo_url: item.repo_url,
            description: item.description,
            theme: gardenTheme,
            level: level, // Track the nesting level for styling
            sourceConnections: [],
            targetConnections: [],
            cta: {
              primary: {
                label: "Visit Website",
                url: item.homepage_url,
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
          ...getNodePositions(NODE_TYPES.SPROUT),
        });

        edges.push({
          id: `${subgardenId}-to-${itemId}`,
          source: subgardenId,
          target: itemId,
          sourceHandle: "bottom",
          targetHandle: "top",
          type: options.edgeType || "default",
          animated: options.animateEdges !== false,
          style: {
            stroke: "var(--garden-muted-foreground)",
            strokeWidth: 2,
          },
          markerEnd: { type: MarkerType.ArrowClosed },
          interactionWidth: 1,
        });
      }
    }

    if (currentGarden?.subgardens?.length) {
      processSubgarensRecursively({
        schema,
        parent: currentGarden,
        parentId: subgardenId,
        parentX: xPos,
        parentY: yPos,
        width,
        nodes,
        edges,
        options,
        level: level + 1,
      });
    }
  }
};

interface GardenToFlowOptions {
  schema: GardenTypes;
  garden: GardenTypes;
  width?: number;
  options?: FlowOptions;
}

export const gardenToFlow = ({
  schema,
  garden,
  width = 1600,
  options = {},
}: GardenToFlowOptions): { nodes: Node[]; edges: Edge[] } => {
  // Validate inputs
  if (!schema || typeof schema !== "object") {
    console.error("Invalid schema provided to gardenToFlow:", schema);
    return { nodes: [], edges: [] };
  }

  if (!garden || !garden.name) {
    console.error("Invalid garden provided to gardenToFlow:", garden);
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
      icon_color: "var(--garden-primary)",
      icon: garden.icon,
    },
    position: { x: centerX, y: 0 },
    ...getNodePositions(NODE_TYPES.GARDEN),
    style: {
      background: currentGardenTheme?.primary_color ?? undefined,
      color: "var(--garden-primary-foreground)",
      borderRadius: "var(--garden-radius)",
    },
  });

  // Process items directly on the garden if any
  if (garden.items && Array.isArray(garden.items)) {
    garden.items.forEach((item, index) => {
      if (!item || !item.name) {
        console.warn("Skipping invalid item at index", index, ":", item);
        return;
      }

      const itemId = generateId(
        NODE_TYPES.SPROUT,
        item.name,
        `${gardenId}-direct`,
      );
      const itemYPosition = 150 + index * 80;

      nodes.push({
        id: itemId,
        type: NODE_TYPES.SPROUT,
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
        ...getNodePositions(NODE_TYPES.SPROUT),
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
          stroke: "var(--garden-muted-foreground)",
          strokeWidth: 2,
        },
        markerEnd: { type: MarkerType.ArrowClosed },
        interactionWidth: 1,
      });
    });
  }

  // Process supergardens if any
  if (garden.supergardens && Array.isArray(garden.supergardens)) {
    garden.supergardens.forEach((supergarden, index) => {
      const supergardenId = generateId(
        NODE_TYPES.SUPERGARDEN,
        supergarden.name,
        `${gardenId}-super`,
      );
      const xOffset = -400 + index * 150; // Position supergardens to the left and above

      // If the supergarden has a defined theme, use it. Otherwise, fallback to current garden theme
      const gardenTheme =
        findGardenByName(schema, supergarden.name)?.theme ?? garden.theme;

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
          icon_color: "var(--garden-chart-9)",
          theme: gardenTheme,
        },
        position: { x: centerX + xOffset, y: -200 },
        ...getNodePositions(NODE_TYPES.SUPERGARDEN),
        style: {
          background: gardenTheme?.primary_color ?? undefined,
          color: "var(--garden-chart-9-foreground)",
          borderRadius: "var(--garden-radius)",
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
          stroke: "var(--garden-chart-9)",
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
    if (options.expandSubgardens) {
      processSubgarensRecursively({
        schema,
        parent: garden,
        parentId: gardenId,
        parentX: centerX,
        parentY: 0,
        width,
        nodes,
        edges,
        options,
      });
    } else {
      garden.subgardens.forEach((subgarden, index) => {
        const subgardenId = generateId(
          NODE_TYPES.SUBGARDEN,
          subgarden.name,
          `${gardenId}-sub`,
        );
        const xOffset = 400 - index * 150; // Position subgardens to the right and above

        const currentGarden = findGardenByName(schema, subgarden.name);

        // If the subgarden has a defined theme, use it. Otherwise, fallback to current garden theme
        const gardenTheme = currentGarden?.theme ?? garden.theme;

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
            icon_color: "var(--garden-chart-5)",
            theme: gardenTheme,
          },
          position: { x: centerX + xOffset, y: 200 },
          ...getNodePositions(NODE_TYPES.SUBGARDEN),
          style: {
            background: gardenTheme?.primary_color ?? undefined,
            color: "var(--garden-chart-5-foreground)",
            borderRadius: "var(--garden-radius)",
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
            stroke: "var(--garden-chart-5)",
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
