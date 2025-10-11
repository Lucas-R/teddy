import { tv, type VariantProps } from "tailwind-variants"

const button = tv({
    base: "w-auto duration-500",
    variants: {
        theme: {
            outline: "max-h-10! text-sm text-primary font-bold rounded-sm border-2 border-primary hover:bg-primary hover:text-white",
            default: "text-white font-bold rounded-sm bg-primary hover:bg-primary-hover"
        },
        size: {
            md: "text-sm h-10 px-4",
            default: "text-2xl h-10 px-4 lg:h-[60px]"
        }
    },
    defaultVariants: {
        theme: "default",
        size: "default"
    }
});

interface ButtonProps extends 
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export default function Button({ children, theme, size, className, ...props }: ButtonProps) {
    return (
        <button className={button({ theme, size, class: className })} {...props}>
            {children}
        </button>
    )
}