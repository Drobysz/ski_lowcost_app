"use client";

import { CardSampleProps, ColorType, IconName } from "./CardSample.props"
import s from "./style.module.scss";

import Currency from "@/assets/currency.svg";
import Family from "@/assets/family.svg";
import Pass from "@/assets/pass.svg";
import cn from "classnames";

export const CardSample = ({
    icon,
    title,
    text
}: CardSampleProps)=> {
    const icons: Record<IconName, React.ElementType> = {
        currency: Currency,
        family: Family,
        pass: Pass,
    };

    const colors: Record<IconName, ColorType> = {
        currency: { t_col: "text-[#2563EB]", b_col: "bg-[#EFF6FF]" },
        family: { t_col: "text-[#1B1C1C]", b_col: "bg-[#FFF7ED]" },
        pass: { t_col: "text-[#16A34A]", b_col: "bg-[#F0FDF4]" },
    };

    const Icon = icons[icon];

    return (
        <article className={s.card_bounds}>
            <div className={cn(
                "rounded-full p-2 w-fit",
                colors[icon].t_col, colors[icon].b_col
            )}>
                <Icon/>
            </div>
            <h4>
                {title}
            </h4>
            <p>
                {text}
            </p>
        </article>
    )
}