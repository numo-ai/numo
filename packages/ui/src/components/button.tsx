import { Button as ButtonPrimitive } from "@base-ui/react"
import { cn, tv, type VariantProps } from "tailwind-variants"

import { Loader } from "./loader"

const buttonVariants = tv({
  base: "group/button w-full cursor-pointer gap-[calc(--spacing(1.5)-1px)] inline-flex shrink-0 items-center justify-center rounded-md bg-clip-padding transition ease-in-out outline-none select-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/80 font-normal",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover font-normal",
      tertiary: "bg-tertiary text-tertiary-foreground hover:bg-tertiary-hover font-normal",
      ghost: "bg-transparent text-foreground/75 hover:bg-foreground/5 font-normal",
      outline:
        "bg-background text-foreground hover:bg-background/80 font-normal border border-border",
    },
    size: {
      sm: "text-xs h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-4",
      md: "text-sm h-9 gap-2.5 px-3.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4.5",
      lg: "text-base h-10 gap-1.5 px-4.5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-4",
      "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-4",
      "icon-md": "size-9 [&_svg:not([class*='size-'])]:size-4.5",
      "icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})

type ButtonVariants = VariantProps<typeof buttonVariants>

interface ButtonProps extends ButtonVariants, ButtonPrimitive.Props {
  isLoading?: boolean
}

function Button({ children, className, variant, size, isLoading = false, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      children={isLoading ? <Loader /> : children}
      {...props}
    />
  )
}

export { Button, type ButtonVariants }
