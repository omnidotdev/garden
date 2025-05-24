import { GardenSpec } from "../schema/garden";
import { Node, Edge, Position, MarkerType } from "reactflow";
import ELK from "elkjs/lib/elk.bundled.js";
import { type ElkNode } from "elkjs";

const elk = new ELK();

// Helper function to calculate node height based on content
const calculateNodeHeight = (node: any): number => {
  if (node.type === NODE_TYPES.ITEM) {
    return 180; // Items have fixed height
  }
  if (node.data?.description) {
    return 120; // Nodes with description are taller
  }
  return 80; // Default height
};

export const NODE_TYPES = {
  GARDEN: "garden",
  CATEGORY: "category",
  ITEM: "item",
};

const generateId = (type: string, name: string): string => {
  return `${type}-${name.toLowerCase().replace(/\s+/g, "-")}`;
};

const getNodePositions = (
  type: string
): { sourcePosition?: Position; targetPosition?: Position } => {
  switch (type) {
    case NODE_TYPES.GARDEN:
      return {
        sourcePosition: Position.Bottom,
        targetPosition: Position.Bottom,
      };
    case NODE_TYPES.CATEGORY:
      return { targetPosition: Position.Top, sourcePosition: Position.Bottom };

    case NODE_TYPES.ITEM:
      return { targetPosition: Position.Top };
    default:
      return {};
  }
};

export const gardenToFlow = (
  garden: typeof GardenSpec.Type,
  width: number = 1600
): { nodes: Node[]; edges: Edge[] } => {
  if (!garden || !garden.categories) {
    return { nodes: [], edges: [] };
  }

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const centerX = width / 2;

  const gardenId = generateId(NODE_TYPES.GARDEN, garden.name);
  nodes.push({
    id: gardenId,
    type: NODE_TYPES.GARDEN,
    data: {
      label: garden.name,
      version: garden.version,
      theme: garden.theme,
      icon_color: "hsl(var(--primary))",
      icon: "Sprout",
    },
    position: { x: centerX, y: 0 },
    ...getNodePositions(NODE_TYPES.GARDEN),
    style: {
      background: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
      borderRadius: "var(--radius)",
    },
  });

  // Function to recursively process categories
  const processCategory = (
    category: any,
    parentId: string,
    depth: number = 0,
    indexInParent: number = 0,
    xPosition: number = centerX
  ) => {
    if (!category || !category.name) return;

    const categoryId = generateId(
      NODE_TYPES.CATEGORY,
      `${parentId}-${category.name}`
    );

    const yPosition = 200 + depth * 200 + indexInParent * 150;

    // Get appropriate icon based on category name
    const getCategoryIcon = (name: string) => {
      const lowerName = name.toLowerCase();
      if (lowerName.includes("productivity")) return "Zap";
      if (lowerName.includes("development") || lowerName.includes("code"))
        return "Code";
      if (lowerName.includes("communication") || lowerName.includes("message"))
        return "MessageSquare";
      if (lowerName.includes("design") || lowerName.includes("ui"))
        return "Palette";
      if (lowerName.includes("task")) return "CheckSquare";
      if (lowerName.includes("note")) return "FileText";
      if (lowerName.includes("version")) return "Git";
      if (lowerName.includes("video")) return "Video";
      if (lowerName.includes("graphics") || lowerName.includes("image"))
        return "Image";
      return "Folder";
    };

    nodes.push({
      id: categoryId,
      type: NODE_TYPES.CATEGORY,
      data: {
        label: category.name,
        description: category.description,
        icon_color: category.icon_color,
        icon: getCategoryIcon(category.name),
      },
      position: { x: xPosition, y: yPosition },
      ...getNodePositions(NODE_TYPES.CATEGORY),
    });

    // Create edge from parent to this category
    edges.push({
      id: `${parentId}-to-${categoryId}`,
      source: parentId,
      sourceHandle: "bottom",
      target: categoryId,
      targetHandle: "top",
      type: "smoothstep",
      animated: true,
      style: {
        stroke: "hsl(var(--muted-foreground))",
        strokeWidth: depth === 0 ? 2 : 1.5,
      },
      markerEnd: { type: MarkerType.ArrowClosed },
      interactionWidth: 1,
    });

    // Process items in this category
    if (category.items && Array.isArray(category.items)) {
      category.items.forEach((item: any, itemIndex: number) => {
        if (!item || !item.name) return;

        const itemId = generateId(
          NODE_TYPES.ITEM,
          `${categoryId}-${item.name}`
        );
        const itemYPosition = yPosition + (itemIndex + 1) * 100;

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
            x: xPosition,
            y: itemYPosition,
          },
          ...getNodePositions(NODE_TYPES.ITEM),
        });

        edges.push({
          id: `${categoryId}-to-${itemId}`,
          source: categoryId,
          sourceHandle: "bottom",
          target: itemId,
          targetHandle: "top",
          type: "smoothstep",
          animated: true,
          style: {
            stroke: "hsl(var(--muted-foreground))",
            strokeWidth: 1.5,
          },
          markerEnd: { type: MarkerType.ArrowClosed },
          interactionWidth: 1,
        });
      });
    }

    // Recursively process nested categories
    if (category.categories && Array.isArray(category.categories)) {
      category.categories.forEach(
        (subcategory: any, subcategoryIndex: number) => {
          processCategory(
            subcategory,
            categoryId,
            depth + 1,
            subcategoryIndex,
            xPosition + (subcategoryIndex % 2 === 0 ? -150 : 150) // Alternately offset to avoid overlap
          );
        }
      );
    }
  };

  // Start processing the top-level categories
  garden.categories.forEach((category, categoryIndex) => {
    processCategory(category, gardenId, 0, categoryIndex);
  });

  return { nodes, edges };
};

export const autoLayout = async (
  nodes: Node[],
  edges: Edge[]
): Promise<{ nodes: Node[]; edges: Edge[] }> => {
  if (!nodes?.length || !edges?.length) {
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
          "elk.position": node.type === NODE_TYPES.GARDEN ? "ROOT" : "DEFAULT",
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

    // Update edges with the new node positions
    const nextEdges = edges.map((edge) => ({
      ...edge,
      style: { stroke: "hsl(var(--muted-foreground))", strokeWidth: 1.5 },
    }));

    return { nodes: nextNodes, edges: nextEdges };
  } catch (error) {
    console.error("Error during layout:", error);
    return { nodes, edges };
  }
};
