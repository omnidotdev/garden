import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "../../lib/utils";

import type * as React from "react";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "garden:data-[state=closed]:fade-out-0 garden:data-[state=open]:fade-in-0 garden:fixed garden:inset-0 garden:z-50 garden:bg-black/50 garden:data-[state=closed]:animate-out garden:data-[state=open]:animate-in",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "garden:data-[state=closed]:fade-out-0 garden:data-[state=open]:fade-in-0 garden:data-[state=closed]:zoom-out-95 garden:data-[state=open]:zoom-in-95 garden:fixed garden:top-[50%] garden:left-[50%] garden:z-50 garden:grid garden:w-full garden:max-w-[calc(100%-2rem)] garden:translate-x-[-50%] garden:translate-y-[-50%] garden:gap-4 garden:rounded-lg garden:border garden:border-border garden:bg-background garden:p-6 garden:shadow-lg garden:duration-200 garden:data-[state=closed]:animate-out garden:data-[state=open]:animate-in garden:sm:max-w-lg",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="garden:absolute garden:top-4 garden:right-4 garden:rounded-xs garden:opacity-70 garden:ring-offset-background garden:transition-opacity garden:hover:opacity-100 garden:focus:outline-hidden garden:focus:ring-2 garden:focus:ring-ring garden:focus:ring-offset-2 garden:disabled:pointer-events-none garden:data-[state=open]:bg-accent garden:data-[state=open]:text-muted-foreground garden:[&_svg:not([class*=size-])]:size-4 garden:[&_svg]:pointer-events-none garden:[&_svg]:shrink-0"
          >
            <XIcon />
            <span className="garden:sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "garden:flex garden:flex-col garden:gap-2 garden:text-center garden:sm:text-left",
        className,
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "garden:flex garden:flex-col-reverse garden:gap-2 garden:sm:flex-row garden:sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "garden:font-semibold garden:text-lg garden:leading-none",
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("garden:text-muted-foreground garden:text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
