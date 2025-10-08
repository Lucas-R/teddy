import { tv, type VariantProps } from "tailwind-variants"

const button = tv({
    base: "w-auto duration-500",
    variants: {
        theme: {
            default: "text-2xl text-white font-bold rounded-sm bg-primary hover:bg-primary-hover"
        },
        size: {
            default: "h-10 px-4 lg:h-[60px]"
        }
    },
    defaultVariants: {
        theme: "default",
        size: "default"
    }
});

interface ButtonProps extends 
    React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export default function Button({ children, theme, size, className, ...props }: ButtonProps) {
    return (
        <button className={button({ theme, size, class: className })} {...props}>
            {children}
        </button>
    )
}