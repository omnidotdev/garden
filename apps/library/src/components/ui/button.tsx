import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

const buttonVariants = cva(
  "garden:cursor-pointer garden:disabled:cursor-not-allowed garden:inline-flex garden:items-center garden:justify-center garden:gap-2 garden:whitespace-nowrap garden:rounded-md garden:text-sm garden:font-medium garden:transition-all garden:disabled:pointer-events-none garden:disabled:opacity-50 garden:[&_svg]:pointer-events-none garden:[&_svg:not([class*=size-])]:size-4 garden:shrink-0 garden:[&_svg]:shrink-0 garden:outline-none garden:focus-visible:border-ring garden:focus-visible:ring-ring/50 garden:focus-visible:ring-[3px] garden:aria-invalid:ring-destructive/20 garden:dark:aria-invalid:ring-destructive/40 garden:aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "garden:bg-primary garden:text-primary-foreground garden:shadow-xs garden:hover:bg-primary/90",
        destructive:
          "garden:bg-destructive garden:text-white garden:shadow-xs garden:hover:bg-destructive/90 garden:focus-visible:ring-destructive/20 garden:dark:focus-visible:ring-destructive/40 garden:dark:bg-destructive/60",
        outline:
          "garden:border garden:bg-background garden:shadow-xs garden:hover:bg-accent garden:hover:text-accent-foreground garden:dark:bg-input/30 garden:dark:border-input garden:dark:hover:bg-input/50",
        secondary:
          "garden:bg-secondary garden:text-secondary-foreground garden:shadow-xs garden:hover:bg-secondary/80",
        ghost:
          "garden:hover:bg-accent garden:hover:text-accent-foreground garden:dark:hover:bg-accent/50",
        link: "garden:text-primary garden:underline-offset-4 garden:hover:underline",
      },
      size: {
        default: "garden:h-9 garden:px-4 garden:py-2 garden:has-[>svg]:px-3",
        sm: "garden:h-8 garden:rounded-md garden:gap-1.5 garden:px-3 garden:has-[>svg]:px-2.5",
        lg: "garden:h-10 garden:rounded-md garden:px-6 garden:has-[>svg]:px-4",
        icon: "garden:size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export {
  Button,
  /** @knipignore */
  buttonVariants,
};
