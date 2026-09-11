import { Input as InputPrimitive } from "@base-ui/react/input"
import { type ComponentProps } from "react"
import { cn, tv, type VariantProps } from "tailwind-variants"

const inputVariants = tv({
  base: "min-w-0 py-1 transition rounded-md border border-input-border ease-in-out outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      primary:
        "bg-input text-input-foreground placeholder:text-muted-foreground focus-visible:border-input-focus",
    },
    size: {
      sm: "text-xs h-8 gap-1.5 px-2.5",
      md: "text-sm h-9 gap-2.5 px-3.5",
      lg: "text-base h-10 gap-1.5 px-4.5",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})

type InputVariants = VariantProps<typeof inputVariants>

interface InputProps extends InputVariants, Omit<ComponentProps<"input">, "size"> {}

function Input({ type, variant, size, className, ...props }: InputProps) {
  return (
    <InputPrimitive
      data-slot="input"
      type={type}
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Input, type InputVariants, inputVariants }
