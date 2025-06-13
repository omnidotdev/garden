"use client";

import { useReactFlow, useStore } from "@xyflow/react";
import {
  GripVerticalIcon,
  Layers2Icon,
  LayersIcon,
  Maximize2Icon,
  MaximizeIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { shallow } from "zustand/shallow";

import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useGardenStore } from "@/lib/hooks/store";

import type { ReactFlowState } from "@xyflow/react";

// NB: https://github.com/xyflow/xyflow/blob/3e6bcf51e33b14d85d996145f5273a42f79628bd/packages/react/src/additional-components/Controls/Controls.tsx#L31
const selector = (s: ReactFlowState) => ({
  isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
  minZoomReached: s.transform[2] <= s.minZoom,
  maxZoomReached: s.transform[2] >= s.maxZoom,
});

interface Props {
  expandSubgardens: boolean;
  setExpandSubgardens: (expand: boolean) => void;
  fitViewPadding?: number;
}

const ControlsPanel = ({
  expandSubgardens,
  setExpandSubgardens,
  fitViewPadding,
}: Props) => {
  const { activeGarden } = useGardenStore();

  // TODO local storage
  const [minimized, setMinimized] = useState(false);
  const [moving, setMoving] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const panelRef = useRef<HTMLDivElement>(null);
  const startMouse = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  const { minZoomReached, maxZoomReached } = useStore(selector, shallow);
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  // drag logic
  useEffect(() => {
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      if (!moving) return;

      const dx = e.clientX - startMouse.current.x;
      const dy = e.clientY - startMouse.current.y;

      animationFrameId = requestAnimationFrame(() => {
        setPosition({
          x: startPos.current.x + dx,
          y: startPos.current.y + dy,
        });
      });
    };

    const onMouseUp = () => {
      cancelAnimationFrame(animationFrameId);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [moving]);

  const controls = [
    {
      id: "expand-subgardens",
      label: expandSubgardens ? "Condense subgardens" : "Expand subgardens",
      className: !activeGarden?.subgardens?.length && "hidden",
      onClick: () => {
        setExpandSubgardens(!expandSubgardens);
      },
      icon: expandSubgardens ? (
        <LayersIcon size={14} />
      ) : (
        <Layers2Icon size={14} />
      ),
    },
    {
      id: "zoom-in",
      label: "Zoom in",
      onClick: () => zoomIn(),
      icon: <PlusIcon size={14} />,
      disabled: maxZoomReached,
    },
    {
      id: "zoom-out",
      label: "Zoom out",
      onClick: () => zoomOut(),
      icon: <MinusIcon size={14} />,
      disabled: minZoomReached,
    },
    {
      id: "fit-view",
      label: "Fit view",
      onClick: () => fitView({ padding: fitViewPadding }),
      icon: <MaximizeIcon size={14} />,
    },
  ];

  return (
    <div
      ref={panelRef}
      className={cn(
        "absolute top-0 left-0 z-50 m-4 flex w-48 flex-col rounded-lg border border-border bg-card shadow-xl",
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div
        className={cn(
          "group z-50 flex items-center justify-between border-b p-2",
          moving ? "cursor-move" : "cursor-grab",
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          setMoving(true);
          startMouse.current = { x: e.clientX, y: e.clientY };
          startPos.current = { ...position };
        }}
        onMouseUp={() => setMoving(false)}
      >
        <GripVerticalIcon
          size={18}
          className="text-muted-foreground group-hover:text-secondary-foreground"
        />

        <p className="text-sm">Controls</p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setMinimized(!minimized);
            }}
            className="h-8 w-8"
          >
            {minimized ? <Maximize2Icon size={14} /> : <MinusIcon size={14} />}
          </Button>
        </div>
      </div>

      {!minimized && (
        <div className="grid gap-2 p-4">
          {controls.map((control) => (
            <div
              key={control.id}
              className={cn("flex items-center gap-3", control.className)}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={control.onClick}
                disabled={control.disabled}
                className="h-8 w-8"
              >
                {control.icon}
              </Button>

              <p className="text-xs">{control.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ControlsPanel;
