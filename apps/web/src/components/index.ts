// Export main components

export * from "./core";
export { default as Garden } from "./Garden";
export * from "./layout";
// Export node components directly
export {
  DefaultNode,
  GardenNode,
  ItemNode,
  type NodeData,
  NodeTypes,
  nodeTypes,
  SubgardenNode,
  SupergardenNode,
} from "./NodeTypes";
// Re-export other components as needed
// This allows for a cleaner import experience
export * from "./visualizer";

// Re-export garden types
export type {
  GardenItem,
  GardenReference,
  GardenTypes,
  Maintainer,
  Theme,
} from "../generated/garden.types";
export type { GardenProps } from "./Garden";
