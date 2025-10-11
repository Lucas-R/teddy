import { tv, type VariantProps } from 'tailwind-variants'

const container = tv({
    base: "mx-auto w-full",
    variants: {
        size: {
            full: "max-w-full",
            default: "max-w-full md:max-w-3xl xl:max-w-[1232px]"
        },
        py: {
            none: "py-0",
            default: "py-6 md:py-8",
        },
        px: {
            none: "px-0",
            default: "px-4",
        }
    },
    defaultVariants: {
        size: "default",
        py: "default",
        px: "default"
    }
});

interface ContainerProps extends 
    React.HTMLAttributes<HTMLDivElement>, 
    VariantProps<typeof container> {}

export default function Container({ children, size, py, px, className,...props }: ContainerProps) {
    return (
        <div className={container({ size, py, px, class: className })} {...props}>
            {children}
        </div>
    )
}