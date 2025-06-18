import type { ControlProps, MiniMapProps } from "@xyflow/react";

/**
 * Common garden visualization props.
 */
export interface GardenVisualizationProps {
  /** Container class name. */
  className?: string;
  /**
   * Whether to expand all subgardens.
   * @default false
   */
  expandSubgardens?: boolean;
  /**
   * Whether to show controls.
   * @default true
   */
  showControls?: boolean;
  /**
   * Whether to show minimap.
   * @default true
   */
  showMinimap?: boolean;
  /**
   * View padding.
   * @default 0.2
   */
  fitViewPadding?: number;
  /** Edge type (cosmetic). */
  edgeType?: "default" | "straight" | "step" | "smoothstep" | "simplebezier";
  /**
   * Whether to enable edge animations.
   * @default true
   */
  animateEdges?: boolean;
  /** Minimap options. */
  miniMapOptions?: MiniMapProps;
  /** Controls options. */
  controlOptions?: ControlProps;
}
