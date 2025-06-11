import { Handle, Position } from "@xyflow/react";
import {
  FolderIcon,
  CodeIcon,
  ZapIcon,
  MessageSquareIcon,
  PaletteIcon,
  CheckSquareIcon,
  FileTextIcon,
  GitBranchIcon,
  VideoIcon,
  ImageIcon,
} from "lucide-react";

import { Card } from "components/ui";

import type { NodeData } from "components/visualizer/customNodes";

interface Props {
  data: NodeData;
}

const CategoryNode = ({ data }: Props) => {
  // Map icon name to imported icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Folder":
        return FolderIcon;
      case "Code":
        return CodeIcon;
      case "Zap":
        return ZapIcon;
      case "MessageSquare":
        return MessageSquareIcon;
      case "Palette":
        return PaletteIcon;
      case "CheckSquare":
        return CheckSquareIcon;
      case "FileText":
        return FileTextIcon;
      case "Git":
        return GitBranchIcon;
      case "Video":
        return VideoIcon;
      case "Image":
        return ImageIcon;
      default:
        return FolderIcon;
    }
  };

  const IconComponent = getIconComponent(data.icon);

  // check if there are any connections
  const hasTopTargets =
    data.targetConnections && data.targetConnections.length > 0;
  const hasBottomSources =
    data.sourceConnections && data.sourceConnections.length > 0;

  return (
    <Card className="w-[200px] border-2 border-accent/60 shadow-lg">
      {hasTopTargets && <Handle type="target" position={Position.Top} />}
      {hasBottomSources && <Handle type="source" position={Position.Bottom} />}

      <div className="p-4">
        <div
          className="flex items-center gap-3"
          style={{ color: data.icon_color || "hsl(var(--foreground))" }}
        >
          <IconComponent className="h-5 w-5" />

          <h3 className="font-medium">{data.label}</h3>
        </div>

        {data.description && (
          <p className="mt-1 text-foreground/70 text-sm">{data.description}</p>
        )}
      </div>
    </Card>
  );
};

export default CategoryNode;
