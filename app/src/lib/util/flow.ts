import { MarkerType, Position } from "@xyflow/react";
import ELK from "elkjs/lib/elk.bundled.js";
import { match } from "ts-pattern";

import type { GardenTypes, Theme } from "generated/garden.types";
import type { Edge, Node } from "@xyflow/react";
import type { ElkNode } from "elkjs";

const elk = new ELK();

const calculateNodeHeight = (node: Node): number => {
  const { width = 0, height = 0 } = node.style || {};
  if (height) return Number(height);
  if (node.type === "garden") return 100;
  if (node.type === "category") return 80;
  return 60;
};

const NODE_TYPES = {
  GARDEN: "garden",
  CATEGORY: "category",
  ITEM: "item",
  GARDEN_REF: "garden_ref",
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
    .with(NODE_TYPES.CATEGORY, () => ({
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    }))
    .with(NODE_TYPES.ITEM, () => ({
      targetPosition: Position.Top,
    }))
    .with(NODE_TYPES.GARDEN_REF, () => ({
      targetPosition: Position.Left,
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

  if (!gardenCopy || !gardenCopy.categories) {
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

  // First, if we're expanding subgardens, add a section title
  let expandedSectionAdded = false;

  // Process subgardens if any
  if (garden.subgardens && Array.isArray(garden.subgardens)) {
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

      // If expandSubgardens is true, integrate the subgarden categories directly
      if (
        options.expandSubgardens &&
        typeof window !== "undefined" &&
        window.gardenData
      ) {
        try {
          // Get the actual garden data from the global store
          const subgardenData = window.gardenData[subgarden.name];

          if (
            subgardenData &&
            Array.isArray(subgardenData.categories) &&
            subgardenData.categories.length > 0
          ) {
            // calculate horizontal position to prevent overlapping
            const horizontalSpacing = Math.min(
              600,
              width / (garden.subgardens?.length || 1)
            );
            const xPos =
              centerX -
              ((garden.subgardens?.length || 1) * horizontalSpacing) / 2 +
              index * horizontalSpacing;

            // Add the subgarden node that will contain categories
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

            // Process each category in the subgarden and add it to the flow
            if (Array.isArray(subgardenData.categories)) {
              subgardenData.categories.forEach((category, catIndex) => {
                // Use the category's name directly if possible to prevent duplicate IDs
                const categoryId = generateId(
                  NODE_TYPES.CATEGORY,
                  `${subgardenNodeId}-${category.name}`
                );

                // Calculate vertical position
                const yPosition = 600 + catIndex * 150;

                // Get appropriate icon based on category name
                const lowerName = category.name.toLowerCase();
                let iconName = "FolderIcon";
                if (lowerName.includes("productivity")) iconName = "ZapIcon";
                if (
                  lowerName.includes("development") ||
                  lowerName.includes("code")
                )
                  iconName = "CodeIcon";
                if (
                  lowerName.includes("communication") ||
                  lowerName.includes("message")
                )
                  iconName = "MessageSquareIcon";
                if (lowerName.includes("design") || lowerName.includes("ui"))
                  iconName = "PaletteIcon";
                if (lowerName.includes("task")) iconName = "CheckSquareIcon";
                if (lowerName.includes("note")) iconName = "FileTextIcon";
                if (lowerName.includes("version")) iconName = "GitIcon";
                if (lowerName.includes("video")) iconName = "VideoIcon";
                if (
                  lowerName.includes("graphics") ||
                  lowerName.includes("image")
                )
                  iconName = "ImageIcon";

                nodes.push({
                  id: categoryId,
                  type: NODE_TYPES.CATEGORY,
                  data: {
                    label: category.name,
                    description: category.description,
                    icon_color: category.icon_color,
                    icon: iconName,
                    theme: subgardenTheme,
                  },
                  position: { x: xPos, y: yPosition },
                  ...getNodePositions(NODE_TYPES.CATEGORY),
                  style: {
                    background: "transparent",
                    color: "hsl(var(--foreground))",
                    borderRadius: "var(--radius)",
                  },
                });

                // Connect subgarden to this category
                edges.push({
                  id: `${subgardenNodeId}-to-${categoryId}`,
                  source: subgardenNodeId,
                  target: categoryId,
                  type: "smoothstep",
                  animated: true,
                  style: {
                    stroke: "hsl(var(--muted-foreground))",
                    strokeWidth: 2,
                  },
                  markerEnd: { type: MarkerType.ArrowClosed },
                  interactionWidth: 1,
                });

                // Process items in this category
                if (category.items && Array.isArray(category.items)) {
                  category.items.forEach((item, itemIndex) => {
                    if (!item || !item.name) return;

                    const itemId = generateId(
                      NODE_TYPES.ITEM,
                      `${categoryId}-${item.name}`
                    );
                    const itemYPosition = yPosition + (itemIndex + 1) * 80;

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
                      id: `${categoryId}-to-${itemId}`,
                      source: categoryId,
                      target: itemId,
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

                // Process garden references
                if (
                  category.garden_refs &&
                  Array.isArray(category.garden_refs)
                ) {
                  category.garden_refs.forEach((gardenRef, refIndex) => {
                    if (!gardenRef || !gardenRef.name) return;

                    const refId = generateId(
                      NODE_TYPES.GARDEN_REF,
                      `${categoryId}-${gardenRef.name}`
                    );
                    // Position garden refs to the right of the category
                    const refXPosition = xPos + 250;
                    const refYPosition = yPosition + (refIndex + 1) * 100;

                    nodes.push({
                      id: refId,
                      type: NODE_TYPES.GARDEN_REF,
                      data: {
                        theme: subgardenTheme,
                        label: gardenRef.name,
                        description: gardenRef.description || "",
                        url: gardenRef.url,
                        version: gardenRef.version,
                        logo: gardenRef.logo || "",
                        icon_color: "hsl(var(--chart-10))",
                      },
                      position: { x: refXPosition, y: refYPosition },
                      ...getNodePositions(NODE_TYPES.GARDEN_REF),
                    });

                    edges.push({
                      id: `${categoryId}-to-${refId}`,
                      source: categoryId,
                      target: refId,
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

                // Process subcategories recursively
                if (category.categories && Array.isArray(category.categories)) {
                  processNestedCategories(
                    category.categories,
                    categoryId,
                    1,
                    xPos,
                    subgardenTheme,
                    nodes,
                    edges
                  );
                }
              });
            }
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
        // Add the condensed node if we're not in expanded mode
        nodes.push({
          id: subgardenId,
          type: NODE_TYPES.SUBGARDEN,
          data: {
            label: subgarden.name,
            description: subgarden.description,
            url: subgarden.url,
            version: subgarden.version,
            logo: subgarden.logo,
            icon: "GitBranchIcon",
            icon_color: "hsl(var(--chart-8))",
            theme: subgardenTheme || null,
            expandable: true, // Flag to indicate this can be expanded
          },
          position: { x: centerX + xOffset, y: -200 },
          ...getNodePositions(NODE_TYPES.SUBGARDEN),
          style: {
            background: "transparent",
            color: "hsl(var(--foreground))",
            borderRadius: "var(--radius)",
            border: "2px solid hsl(var(--chart-8))",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          },
        });

        // Create edge from this garden to subgarden
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

  // Process all main garden categories
  garden.categories.forEach((category, index) => {
    if (category && category.name) {
      const categoryId = generateId(
        NODE_TYPES.CATEGORY,
        `${gardenId}-${category.name}`
      );

      const yPosition = 200 + index * 150;

      // get appropriate icon based on category name
      const lowerName = category.name.toLowerCase();
      let iconName = "FolderIcon";
      if (lowerName.includes("productivity")) iconName = "ZapIcon";
      if (lowerName.includes("development") || lowerName.includes("code"))
        iconName = "CodeIcon";
      if (lowerName.includes("communication") || lowerName.includes("message"))
        iconName = "MessageSquareIcon";
      if (lowerName.includes("design") || lowerName.includes("ui"))
        iconName = "PaletteIcon";
      if (lowerName.includes("task")) iconName = "CheckSquareIcon";
      if (lowerName.includes("note")) iconName = "FileTextIcon";
      if (lowerName.includes("version")) iconName = "GitIcon";
      if (lowerName.includes("video")) iconName = "VideoIcon";
      if (lowerName.includes("graphics") || lowerName.includes("image"))
        iconName = "ImageIcon";

      nodes.push({
        id: categoryId,
        type: NODE_TYPES.CATEGORY,
        data: {
          label: category.name,
          description: category.description,
          icon_color: category.icon_color,
          icon: iconName,
          theme: currentGardenTheme,
        },
        position: { x: centerX, y: yPosition },
        ...getNodePositions(NODE_TYPES.CATEGORY),
      });

      // Create edge from garden to this category
      edges.push({
        id: `${gardenId}-to-${categoryId}`,
        source: gardenId,
        target: categoryId,
        type: "smoothstep",
        animated: true,
        style: {
          stroke: "hsl(var(--muted-foreground))",
          strokeWidth: 2,
        },
        markerEnd: { type: MarkerType.ArrowClosed },
        interactionWidth: 1,
      });

      // Process items in this category
      if (category.items && Array.isArray(category.items)) {
        category.items.forEach((item, itemIndex) => {
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

          edges.push({
            id: `${categoryId}-to-${itemId}`,
            source: categoryId,
            target: itemId,
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
        category.garden_refs.forEach((gardenRef, refIndex) => {
          if (!gardenRef || !gardenRef.name) return;

          const refId = generateId(
            NODE_TYPES.GARDEN_REF,
            `${categoryId}-${gardenRef.name}`
          );
          // Position garden refs to the right of the category
          const refXPosition = centerX + 250;
          const refYPosition = yPosition + (refIndex + 1) * 100;

          nodes.push({
            id: refId,
            type: NODE_TYPES.GARDEN_REF,
            data: {
              theme: currentGardenTheme,
              label: gardenRef.name,
              description: gardenRef.description || "",
              url: gardenRef.url,
              version: gardenRef.version,
              logo: gardenRef.logo || "",
              icon_color: "hsl(var(--chart-10))",
            },
            position: { x: refXPosition, y: refYPosition },
            ...getNodePositions(NODE_TYPES.GARDEN_REF),
          });

          edges.push({
            id: `${categoryId}-to-${refId}`,
            source: categoryId,
            target: refId,
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

      // Process nested categories recursively
      if (category.categories && Array.isArray(category.categories)) {
        processNestedCategories(
          category.categories,
          categoryId,
          1,
          centerX,
          currentGardenTheme,
          nodes,
          edges
        );
      }
    }
  });

  // Function to process nested categories recursively
  function processNestedCategories(
    categories: any[],
    parentId: string,
    depth: number,
    baseX: number,
    gardenTheme: Theme | null | undefined,
    nodes: Node[],
    edges: Edge[]
  ) {
    categories.forEach((subcategory, subcategoryIndex) => {
      if (!subcategory || !subcategory.name) return;

      const categoryId = generateId(
        NODE_TYPES.CATEGORY,
        `${parentId}-${subcategory.name}`
      );

      const xOffset = subcategoryIndex % 2 === 0 ? -150 : 150;
      const yPosition = 200 + depth * 200 + subcategoryIndex * 100;

      // get appropriate icon based on category name
      const lowerName = subcategory.name.toLowerCase();
      let iconName = "FolderIcon";
      if (lowerName.includes("productivity")) iconName = "ZapIcon";
      if (lowerName.includes("development") || lowerName.includes("code"))
        iconName = "CodeIcon";
      if (lowerName.includes("communication") || lowerName.includes("message"))
        iconName = "MessageSquareIcon";
      if (lowerName.includes("design") || lowerName.includes("ui"))
        iconName = "PaletteIcon";
      if (lowerName.includes("task")) iconName = "CheckSquareIcon";
      if (lowerName.includes("note")) iconName = "FileTextIcon";
      if (lowerName.includes("version")) iconName = "GitIcon";
      if (lowerName.includes("video")) iconName = "VideoIcon";
      if (lowerName.includes("graphics") || lowerName.includes("image"))
        iconName = "ImageIcon";

      nodes.push({
        id: categoryId,
        type: NODE_TYPES.CATEGORY,
        data: {
          label: subcategory.name,
          description: subcategory.description,
          icon_color: subcategory.icon_color,
          icon: iconName,
          theme: gardenTheme,
        },
        position: { x: baseX + xOffset, y: yPosition },
        ...getNodePositions(NODE_TYPES.CATEGORY),
      });

      // Create edge from parent to this category
      edges.push({
        id: `${parentId}-to-${categoryId}`,
        source: parentId,
        target: categoryId,
        type: "smoothstep",
        animated: true,
        style: {
          stroke: "hsl(var(--muted-foreground))",
          strokeWidth: 1.5,
        },
        markerEnd: { type: MarkerType.ArrowClosed },
        interactionWidth: 1,
      });

      // Process items in this subcategory
      if (subcategory.items && Array.isArray(subcategory.items)) {
        subcategory.items.forEach((item: any, itemIndex: number) => {
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
              theme: gardenTheme,
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
              x: baseX + xOffset,
              y: itemYPosition,
            },
            ...getNodePositions(NODE_TYPES.ITEM),
          });

          edges.push({
            id: `${categoryId}-to-${itemId}`,
            source: categoryId,
            target: itemId,
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

      // Process garden references in this subcategory
      if (subcategory.garden_refs && Array.isArray(subcategory.garden_refs)) {
        subcategory.garden_refs.forEach((gardenRef: any, refIndex: number) => {
          if (!gardenRef || !gardenRef.name) return;

          const refId = generateId(
            NODE_TYPES.GARDEN_REF,
            `${categoryId}-${gardenRef.name}`
          );
          // Position garden refs to the right of the category
          const refXPosition = baseX + xOffset + 250;
          const refYPosition = yPosition + (refIndex + 1) * 100;

          nodes.push({
            id: refId,
            type: NODE_TYPES.GARDEN_REF,
            data: {
              theme: gardenTheme,
              label: gardenRef.name,
              description: gardenRef.description || "",
              url: gardenRef.url,
              version: gardenRef.version,
              logo: gardenRef.logo || "",
              icon_color: "hsl(var(--chart-10))",
            },
            position: { x: refXPosition, y: refYPosition },
            ...getNodePositions(NODE_TYPES.GARDEN_REF),
          });

          edges.push({
            id: `${categoryId}-to-${refId}`,
            source: categoryId,
            target: refId,
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
      if (subcategory.categories && Array.isArray(subcategory.categories)) {
        processNestedCategories(
          subcategory.categories,
          categoryId,
          depth + 1,
          baseX + xOffset,
          gardenTheme,
          nodes,
          edges
        );
      }
    });
  }

  // track connections for each node to control handle visibility
  const nodeConnections = new Map();

  // initialize connection tracking for each node
  nodes.forEach((node) => {
    nodeConnections.set(node.id, {
      sources: new Set(),
      targets: new Set(),
    });
  });

  // track which nodes have connections
  edges.forEach((edge) => {
    const sourceConnections = nodeConnections.get(edge.source);
    const targetConnections = nodeConnections.get(edge.target);

    if (sourceConnections) {
      sourceConnections.sources.add(edge.target);
    }

    if (targetConnections) {
      targetConnections.targets.add(edge.source);
    }
  });

  // update node data with connection information
  nodes.forEach((node) => {
    const connections = nodeConnections.get(node.id);
    if (connections) {
      node.data = {
        ...node.data,
        sourceConnections: Array.from(connections.sources),
        targetConnections: Array.from(connections.targets),
      };
    }
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
        transition: "stroke 0.3s, stroke-width 0.3s",
      },
    }));

    return { nodes: nextNodes, edges: nextEdges };
  } catch (error) {
    console.error("Error during layout:", error);
    return { nodes, edges };
  }
};
