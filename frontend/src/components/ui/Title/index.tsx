import { tv, type VariantProps } from "tailwind-variants"

const title = tv({
    base: "",
    variants: {
        heading: {
            h1: "text-2xl lg:text-4xl",
            h6: "text-base font-bold",
            default: "text-base"
        }
    },
    defaultVariants: {
        heading: "default"
    }
});

interface TitleProps extends 
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof title> {
        as: "h1" | "h6",
    } 

export default function Title({ 
    as: Element, 
    heading, 
    children, 
    className, 
    ...props 
}: TitleProps) {
    return (
        <Element className={title({ heading, class: className })} {...props}>
            {children}
        </Element>
    )
}