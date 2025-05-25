import { GardenTypes, GardenReference } from "@/generated/garden.types";
import { Node, Edge, Position, MarkerType } from "reactflow";
import ELK from "elkjs/lib/elk.bundled.js";
import { type ElkNode } from "elkjs";

const elk = new ELK();

/**
 * Calculate node height based on content.
 */
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
  GARDEN_REF: "garden_ref",
  PARENT_GARDEN: "parent_garden",
  SUBGARDEN: "subgarden",
  EXPANDED_SUBGARDEN_LABEL: "expanded_subgarden_label",
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
    case NODE_TYPES.GARDEN_REF:
      return { sourcePosition: Position.Bottom, targetPosition: Position.Bottom };
    case NODE_TYPES.PARENT_GARDEN:
      return { sourcePosition: Position.Bottom, targetPosition: Position.Top };
    case NODE_TYPES.SUBGARDEN:
      return { sourcePosition: Position.Top, targetPosition: Position.Bottom };
    default:
      return {};
  }
};

interface FlowOptions {
  expandSubgardens?: boolean;
}

export const gardenToFlow = (
  garden: GardenTypes,
  width: number = 1600,
  options: FlowOptions = {}
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
      description: garden.description,
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

  // Process parent gardens if any
  if (garden.parent_gardens && Array.isArray(garden.parent_gardens)) {
    garden.parent_gardens.forEach((parentGarden, index) => {
      const parentId = generateId(NODE_TYPES.PARENT_GARDEN, parentGarden.name);
      const xOffset = -400 + (index * 150); // Position parent gardens to the left and above
      
      nodes.push({
        id: parentId,
        type: NODE_TYPES.PARENT_GARDEN,
        data: {
          label: parentGarden.name,
          description: parentGarden.description,
          url: parentGarden.url,
          logo: parentGarden.logo,
          version: parentGarden.version,
          icon: "Globe",
          icon_color: "hsl(var(--chart-9))",
        },
        position: { x: centerX + xOffset, y: -200 },
        ...getNodePositions(NODE_TYPES.PARENT_GARDEN),
        style: {
          background: "hsl(var(--chart-9))",
          color: "hsl(var(--chart-9-foreground))",
          borderRadius: "var(--radius)",
        },
      });

      // Create edge from parent garden to this garden
      edges.push({
        id: `${parentId}-to-${gardenId}`,
        source: parentId,
        sourceHandle: "bottom",
        target: gardenId,
        targetHandle: "top",
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
      const xOffset = 400 - (index * 150); // Position subgardens to the right and above
      
      // If expandSubgardens is true, try to incorporate the subgarden's nodes directly
      if (options.expandSubgardens && typeof window !== 'undefined' && window.gardenData) {
        try {
          // Get the actual garden data from the global store
          const subgardenData = window.gardenData[subgarden.name];
          
          if (subgardenData) {
            // Generate a flow for the subgarden with expansion disabled (to prevent infinite recursion)
            const subFlow = gardenToFlow(
              subgardenData,
              width,
              { expandSubgardens: false }
            );
            
            // Add a label node to indicate this is an expanded subgarden
            nodes.push({
              id: `${subgardenId}-label`,
              type: "default",
              data: { 
                label: `${subgarden.name} (Expanded)`,
                isExpandedSubgardenLabel: true
              },
              position: { 
                x: centerX + xOffset, 
                y: 300 + (index * 100)
              },
              style: {
                background: "hsl(var(--chart-8))",
                color: "hsl(var(--chart-8-foreground))",
                padding: "8px 12px",
                borderRadius: "var(--radius)",
                fontSize: "14px",
                fontWeight: "bold",
                border: '2px dashed hsl(var(--chart-8))',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
              }
            });
            
            // Add a background node to visually group the expanded subgarden
            nodes.push({
              id: `${subgardenId}-background`,
              type: "default",
              data: { 
                label: '',
              },
              position: { 
                x: centerX + xOffset - 200, 
                y: 350 + (index * 100)
              },
              style: {
                width: 600,
                height: 600,
                background: `hsla(var(--chart-8), 0.05)`,
                border: '2px dashed hsla(var(--chart-8), 0.3)',
                borderRadius: '16px',
                zIndex: 1,
                pointerEvents: 'none',
              }
            });

            // Connect main garden to expanded subgarden label
            edges.push({
              id: `${gardenId}-to-${subgardenId}-label`,
              source: gardenId,
              target: `${subgardenId}-label`,
              type: "smoothstep",
              animated: true,
              style: {
                stroke: "hsl(var(--chart-8))",
                strokeWidth: 2,
                strokeDasharray: "5,5",
              },
              markerEnd: { type: MarkerType.ArrowClosed },
            });
            
            // Process all nodes from the subgarden
            const processedNodes = subFlow.nodes.map(node => ({
              ...node,
              // Add the subgarden name as a prefix to the ID to avoid collisions
              id: `${subgardenId}-${node.id}`,
              data: {
                ...node.data,
                // Add a reference to the parent garden
                parentGarden: garden.name,
                // Add a flag to identify this as an expanded subgarden node
                isExpandedSubgarden: true,
                // Add the subgarden name for reference
                subgardenName: subgarden.name
              },
              // Adjust position to place the expanded subgarden in the appropriate area
              position: {
                x: node.position.x + xOffset,
                // Place them below the main garden, with extra spacing
                y: node.position.y + 400 + (index * 200)
              },
              // Add a special style to indicate these are part of a subgarden
              style: {
                ...node.style,
                opacity: 0.95,
                border: node.type === NODE_TYPES.GARDEN 
                  ? '2px solid hsl(var(--chart-8))' 
                  : '1px dashed hsl(var(--chart-8))',
                zIndex: 10, // Ensure nodes are above the background
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
              }
            }));
            
            // Process the edges to connect to the new node IDs
            const processedEdges = subFlow.edges.map(edge => ({
              ...edge,
              id: `${subgardenId}-${edge.id}`,
              source: `${subgardenId}-${edge.source}`,
              target: `${subgardenId}-${edge.target}`,
              style: {
                ...edge.style,
                stroke: edge.style?.stroke || "hsl(var(--chart-8))",
                opacity: 0.8,
              }
            }));
            
            // Add all the processed nodes and edges
            nodes.push(...processedNodes);
            edges.push(...processedEdges);
          } else {
            // Fallback to a condensed node if data isn't available
            addCondensedSubgardenNode();
          }
        } catch (error) {
          console.error(`Error expanding subgarden ${subgarden.name}:`, error);
          // Fallback to a condensed node if there's an error
          addCondensedSubgardenNode();
        }
      } else {
        // Add a condensed subgarden node when not expanding
        addCondensedSubgardenNode();
      }
      
      function addCondensedSubgardenNode() {
        nodes.push({
          id: subgardenId,
          type: NODE_TYPES.SUBGARDEN,
          data: {
            label: subgarden.name,
            description: subgarden.description,
            url: subgarden.url,
            logo: subgarden.logo,
            version: subgarden.version,
            icon: "Git",
            icon_color: "hsl(var(--chart-8))",
            expandable: true // Flag to indicate this can be expanded
          },
          position: { x: centerX + xOffset, y: -200 },
          ...getNodePositions(NODE_TYPES.SUBGARDEN),
          style: {
            background: "hsl(var(--chart-8))",
            color: "hsl(var(--chart-8-foreground))",
            borderRadius: "var(--radius)",
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        });

        // Create edge from this garden to subgarden
        edges.push({
          id: `${gardenId}-to-${subgardenId}`,
          source: gardenId,
          sourceHandle: "top",
          target: subgardenId,
          targetHandle: "bottom",
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

  /**
   * Recursively process categories.
   */
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
    
    // Process garden references in this category
    if (category.garden_refs && Array.isArray(category.garden_refs)) {
      category.garden_refs.forEach((gardenRef: any, refIndex: number) => {
        if (!gardenRef || !gardenRef.name) return;

        const refId = generateId(
          NODE_TYPES.GARDEN_REF,
          `${categoryId}-${gardenRef.name}`
        );
        // Position garden refs to the right of the category
        const refXPosition = xPosition + 250;
        const refYPosition = yPosition + (refIndex + 1) * 100;

        nodes.push({
          id: refId,
          type: NODE_TYPES.GARDEN_REF,
          data: {
            label: gardenRef.name,
            description: gardenRef.description || "",
            url: gardenRef.url,
            logo: gardenRef.logo || "",
            version: gardenRef.version || "",
            icon: "Link",
            icon_color: "hsl(var(--chart-7))",
            cta: {
              primary: {
                label: "Visit Garden",
                url: gardenRef.url || "",
              }
            },
          },
          position: {
            x: refXPosition,
            y: refYPosition,
          },
          ...getNodePositions(NODE_TYPES.GARDEN_REF),
          style: {
            background: "hsl(var(--chart-7))",
            color: "hsl(var(--chart-7-foreground))",
            borderRadius: "var(--radius)",
          },
        });

        edges.push({
          id: `${categoryId}-to-${refId}`,
          source: categoryId,
          sourceHandle: "bottom",
          target: refId,
          targetHandle: "left",
          type: "smoothstep",
          animated: true,
          style: {
            stroke: "hsl(var(--chart-7))",
            strokeWidth: 1.5,
            strokeDasharray: "5,5",
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
      style: {
        ...(edge.style || {}),
        stroke: edge.style?.stroke || "hsl(var(--muted-foreground))", 
        strokeWidth: edge.style?.strokeWidth || 1.5,
        transition: 'stroke 0.3s, stroke-width 0.3s',
      },
    }));

    return { nodes: nextNodes, edges: nextEdges };
  } catch (error) {
    console.error("Error during layout:", error);
    return { nodes, edges };
  }
};