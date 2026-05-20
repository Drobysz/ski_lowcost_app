import cn from "classnames";
import s from "./style.module.scss";
import { jakarta_bold } from "@/fonts/fonts";

export const Aside = ({
    className
}: {
    className?: string
}) => {
    return(
        <aside className={cn(
            className,
            s.aside,
            s.aside_bg
        )}>
            <h2 className={cn(
                "text-3xl",
                jakarta_bold.className
            )}>
                Elevated Alpine Hospitality
            </h2>
            <p>
                Join our exclusive community of winter 
                enthusiasts and experience the mountains 
                like never before.
            </p>
        </aside>
    )
}