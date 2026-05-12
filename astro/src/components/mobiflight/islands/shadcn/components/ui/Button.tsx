import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "transition-all outline-none focus-visible:ring-3",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-error aria-invalid:focus-visible:ring-error/40",
  ),
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-outline/50",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-secondary/50",
        outline:
          "dark:border-input focus-visible:ring-outline/50 bg-none dark:bg-input/30 focus-visible:border-outline hover:bg-muted dark:hover:bg-input/50 hover:text-foreground border shadow-xs",
        ghost:
          "hover:bg-muted hover:text-foreground focus-visible:ring-outline/50",
        info: "bg-info text-info-foreground hover:bg-info/90 focus-visible:ring-info/50",
        success:
          "bg-success text-success-foreground hover:bg-success/90 focus-visible:ring-success/50",
        warning:
          "bg-warning text-warning-foreground hover:bg-warning/90 focus-visible:ring-warning/50",
        error:
          "bg-error text-error-foreground hover:bg-error/90 focus-visible:ring-error/50",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 px-4 text-sm has-[>svg]:px-3 [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-11 px-5 text-base has-[>svg]:px-4 [&_svg:not([class*='size-'])]:size-4.5",
        lg: "h-12 px-8 text-lg has-[>svg]:px-6 [&_svg:not([class*='size-'])]:size-5",
        "icon-sm": "size-9 [&_svg:not([class*='size-'])]:size-3.5",
        icon: "size-11 [&_svg:not([class*='size-'])]:size-4.5",
        "icon-lg": "size-12 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
