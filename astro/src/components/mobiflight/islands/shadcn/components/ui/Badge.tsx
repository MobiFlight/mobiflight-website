import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  cn(
    "starwind-badge inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "transition-all outline-none focus-visible:ring-3",
    "aria-invalid:border-error aria-invalid:focus-visible:ring-error/40",
  ),
  {
    variants: {
      variant: {
        default: "bg-foreground text-background focus-visible:ring-outline/50",
        primary:
          "bg-primary text-primary-foreground focus-visible:ring-primary/50",
        secondary:
          "bg-secondary text-secondary-foreground focus-visible:ring-secondary/50",
        outline:
          "border-border focus-visible:border-outline focus-visible:ring-outline/50 border",
        ghost: "bg-foreground/10 text-foreground focus-visible:ring-outline/50",
        info: "bg-info text-info-foreground focus-visible:ring-info/50",
        success:
          "bg-success text-success-foreground focus-visible:ring-success/50",
        warning:
          "bg-warning text-warning-foreground focus-visible:ring-warning/50",
        error: "bg-error text-error-foreground focus-visible:ring-error/50",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        md: "px-3 py-0.5 text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "px-4 py-1 text-base [&_svg:not([class*='size-'])]:size-4.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Badge({
  className,
  variant = "default",
  size = "md",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
