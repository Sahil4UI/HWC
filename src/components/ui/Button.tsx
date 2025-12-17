import * as React from "react"
import { cn } from "@/lib/utils"
// Note: We'll assume the user might want Radix UI later, but for now implementing Slot manually or just omitting if not needed. 
// Actually, standard ui libs use classu-variance-authority (cva). I'll stick to simple props for now to avoid installing more deps unless needed.
// Or I can just check if cva is installed. It's not in the list. I'll write a simple flexible button.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost"
    size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-primary text-white hover:opacity-90 shadow-md hover:shadow-lg",
            secondary: "bg-secondary text-white hover:opacity-90 shadow-md",
            outline: "border-2 border-primary text-primary hover:bg-primary/10",
            ghost: "hover:bg-gray-100 text-foreground",
        }

        const sizes = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-14 px-8 text-lg",
        }

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"
