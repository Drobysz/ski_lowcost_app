import { jakarta_bold } from "@/fonts/fonts";
import cn from "classnames";
import s from "./style.module.scss";

export const PriceTag = ({ price }: { price?: string | null })=> {
    return (
        <h2 className={cn(
            s.price_tag,
            jakarta_bold.className
        )}>
            <span
                className={s.price_curr}
            >
                €
            </span>
            <span className={s.price_num}>
                {price ?? "unknown"}
            </span>
        </h2>
    )
}