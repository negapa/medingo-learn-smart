import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-button hover:shadow-floating transform hover:-translate-y-0.5 active:translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground hover:shadow-blue-200",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-gradient-success text-secondary-foreground hover:shadow-green-200",
        accent: "bg-gradient-accent text-accent-foreground hover:shadow-orange-200",
        ghost: "hover:bg-accent hover:text-accent-foreground shadow-none hover:shadow-none hover:translate-y-0",
        link: "text-primary underline-offset-4 hover:underline shadow-none hover:shadow-none hover:translate-y-0",
        lesson: "bg-card border-2 border-border text-foreground hover:border-primary hover:shadow-card",
        progress: "bg-completed text-white hover:bg-completed/90",
        locked: "bg-locked text-muted-foreground cursor-not-allowed shadow-none hover:shadow-none hover:translate-y-0",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-9 rounded-lg px-3 text-sm",
        lg: "h-14 rounded-xl px-8 text-lg",
        xl: "h-16 rounded-2xl px-10 text-xl",
        icon: "h-10 w-10",
        lesson: "h-20 w-20 rounded-full text-lg font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
