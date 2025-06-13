// Export main components
export { default as Garden } from "./Garden";
export type { GardenProps } from "./Garden";

// Re-export garden types
export type {
  GardenTypes,
  GardenItem,
  GardenReference,
  Maintainer,
  Theme,
} from "../generated/garden.types";

// Export node components directly
export {
  NodeTypes,
  nodeTypes,
  GardenNode,
  ItemNode,
  SubgardenNode,
  SupergardenNode,
  DefaultNode,
  type NodeData,
} from "./NodeTypes";

// Re-export other components as needed
// This allows for a cleaner import experience
export * from "./visualizer";
export * from "./core";
export * from "./layout";
export * from "./ui";
