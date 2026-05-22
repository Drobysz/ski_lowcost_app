import { ReactNode } from "react";
import s from "./style.module.scss";
import cn from "classnames";

export const SectContainer = ({
    children,
    className
}: {
    children: ReactNode,
    className?: string
})=> {
    return (
        <section className={s.centralize}>
            <div/>
            <div className={cn(
                className,
                "min-w-0 w-full"
            )}>
                {children}
            </div>
            <div/>
        </section>
    )
}