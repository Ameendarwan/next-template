import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Loader from "../Loader";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:!cursor-not-allowed disabled:!pointer-events-auto  disabled:opacity-100  [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "text-white bg-primary shadow disabled:bg-white disabled:text-primary",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 disabled:!bg-muted ",
        outline:
          "border border-primary text-primary bg-white hover:bg-primary hover:text-white shadow",
        secondary: "bg-white text-primary",
        ghost:
          "text-primary bg-white hover:bg-primary disabled:!bg-white disabled:!text-primary hover:text-white shadow",
        link: "text-primary underline-offset-4 hover:underline",
        muted: "text-primary bg-muted hover:bg-muted hover:text-primary shadow",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      disabled,
      loading,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        type="button"
        ref={ref}
        {...props}
        disabled={loading || disabled}
      >
        {loading ? <Loader size={9} color="#161525" type="pulse" /> : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
