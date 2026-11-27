import { tv } from "tailwind-variants";

export const separator = tv({
  base: "bg-border shrink-0",
  variants: {
    orientation: {
      horizontal: "h-2 w-full",
      vertical: "h-full w-2",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});
