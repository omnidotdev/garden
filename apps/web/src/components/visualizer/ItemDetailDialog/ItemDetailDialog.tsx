"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "components/ui";
import { Button } from "components/ui";
import { ExternalLinkIcon, GitBranchIcon } from "lucide-react";

import type { NodeData } from "components/visualizer/customNodes";

interface ItemDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: NodeData | null;
}

/**
 * Item Detail Dialog component.
 * Displays details about a garden item when clicked.
 */
const ItemDetailDialog = ({ isOpen, onClose, item }: ItemDetailDialogProps) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{item.label}</DialogTitle>
          {item.description && (
            <DialogDescription className="text-base">
              {item.description}
            </DialogDescription>
          )}
        </DialogHeader>

        {item.image && (
          <div className="mt-2 aspect-video w-full overflow-hidden rounded-md">
            <img
              src={item.image}
              alt={item.label}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {item.version && (
          <div className="mt-2 text-sm text-muted-foreground">
            Version: {item.version}
          </div>
        )}

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0">
          <div className="flex gap-2">
            {item.cta?.primary && (
              <Button
                variant="default"
                onClick={() => window.open(item.cta?.primary.url, "_blank")}
              >
                <ExternalLinkIcon size={14} className="mr-2" />
                {item.cta.primary.label || "View"}
              </Button>
            )}

            {item.cta?.secondary && (
              <Button
                variant="outline"
                onClick={() => window.open(item.cta?.secondary?.url, "_blank")}
              >
                <GitBranchIcon className="mr-2 h-4 w-4" />
                {item.cta.secondary.label || "Source"}
              </Button>
            )}
          </div>

          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailDialog;
