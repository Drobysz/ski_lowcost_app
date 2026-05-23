"use client";

import { GlobalContext } from "@/app/context/global.context";
import cn from "classnames";
import s from "./style.module.scss";
import { useContext } from "react";
import { jakarta_bold } from "@/fonts/fonts";

export const Title = ()=> {
    const { user } = useContext(GlobalContext);

    return (
        <>
            {user && (
                <h2 className={s.title}>
                    <span className={s.welcome}>
                        Welcome,
                    </span>
                    <span className={cn(
                        s.name,
                        jakarta_bold.className
                    )}>
                        {user.first_name} {user.last_name}
                    </span>
                </h2>
            )}
        </>
    )
}