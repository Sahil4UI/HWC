import * as React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, hoverEffect = true, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "glass-card rounded-2xl p-6 transition-all duration-300",
                    hoverEffect && "hover:-translate-y-1 hover:shadow-xl",
                    className
                )}
                {...props}
            />
        )
    }
)
Card.displayName = "Card"
