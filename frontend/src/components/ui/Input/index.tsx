import { tv, type VariantProps } from "tailwind-variants"

const input = tv({
    base: "w-full rounded-sm duration-500",
    variants: {
        theme: {
            default: "text-base lg:text-2xl border-2 border-border placeholder:text-gray focus:outline-primary"
        },
        variant: {
            default: "h-10 px-4 lg:h-[60px]"
        }
    },
    defaultVariants: {
        theme: "default",
        variant: "default"
    }
});

interface InputProps extends 
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {}

export default function Input({ children, theme, variant, className, ...props }: InputProps) {
    return (
        <input className={input({ theme, variant, class: className })} {...props} />
    )
}