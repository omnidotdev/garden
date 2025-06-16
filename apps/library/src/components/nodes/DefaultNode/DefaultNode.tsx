import { Handle, Position } from "@xyflow/react";

import type { NodeProps } from "..";

const DefaultNode = ({ data }: NodeProps) => {
  // check if there are any connections
  const hasTopTargets = data.targetConnections?.some(
    (id) => id.includes("top") || !id.includes("position"),
  );
  const hasBottomTargets = data.targetConnections?.some((id) =>
    id.includes("bottom"),
  );
  const hasLeftTargets = data.targetConnections?.some((id) =>
    id.includes("left"),
  );
  const hasTopSources = data.sourceConnections?.some((id) =>
    id.includes("top"),
  );
  const hasBottomSources = data.sourceConnections?.some(
    (id) => id.includes("bottom") || !id.includes("position"),
  );

  return (
    // NB: relative positioning is important for `Handle` placement because it uses `absolute` positioning internally
    <div className="relative rounded-md border border-muted bg-card p-2">
      {hasTopSources && <Handle type="source" position={Position.Top} />}
      {hasBottomSources && <Handle type="source" position={Position.Bottom} />}
      {hasTopTargets && <Handle type="target" position={Position.Top} />}
      {hasBottomTargets && <Handle type="target" position={Position.Bottom} />}
      {hasLeftTargets && <Handle type="target" position={Position.Left} />}
      <div className="p-2">{data.label}</div>
    </div>
  );
};

export default DefaultNode;
