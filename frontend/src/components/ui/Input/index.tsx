import { tv, type VariantProps } from "tailwind-variants"

const input = tv({
    base: "w-full border-2 border-border placeholder:text-gray focus:outline-primary rounded-sm duration-500",
    variants: {
        variant: {
            md: "h-10 px-4",
            default: "text-base h-10 px-4 lg:h-[60px] lg:text-2xl"
        },
    },
    defaultVariants: {
        variant: "default"
    }
});

interface InputProps extends 
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {}

export default function Input({ children, variant, className, ...props }: InputProps) {
    return (
        <input className={input({ variant, class: className })} {...props} />
    )
}