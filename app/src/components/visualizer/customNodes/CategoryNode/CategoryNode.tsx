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

import type { Theme } from "generated/garden.types";
import type { NodeData } from "components/visualizer/customNodes";

export interface Props {
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

  // Use theme colors from garden data if available
  const secondaryColor = data.theme?.secondary_color || "hsl(var(--accent)/60)";

  // Ensure text is readable in both light and dark themes
  const isDarkTheme =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const textColor = "hsl(var(--foreground))";
  const iconColor =
    data.icon_color || data.theme?.primary_color || "hsl(var(--foreground))";
  const textShadow = isDarkTheme ? "0px 1px 1px rgba(0,0,0,0.3)" : "none";

  return (
    <Card
      className="w-[200px] border-2 shadow-lg"
      style={{ borderColor: secondaryColor }}
    >
      {hasTopTargets && <Handle type="target" position={Position.Top} />}
      {hasBottomSources && <Handle type="source" position={Position.Bottom} />}

      <div className="p-4" style={{ color: textColor }}>
        <div className="flex items-center gap-3" style={{ color: iconColor }}>
          <IconComponent
            className="h-5 w-5"
            style={{
              filter: isDarkTheme
                ? "drop-shadow(0px 1px 1px rgba(0,0,0,0.3))"
                : "none",
            }}
          />

          <h3 className="font-medium" style={{ textShadow }}>
            {data.label}
          </h3>
        </div>

        {data.description && (
          <p className="mt-1 text-sm" style={{ color: textColor, textShadow }}>
            {data.description}
          </p>
        )}
      </div>
    </Card>
  );
};

export default CategoryNode;
