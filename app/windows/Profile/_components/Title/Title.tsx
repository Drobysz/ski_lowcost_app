"use client";

import { useContext } from "react";
import s from "./style.module.scss";
import { GlobalContext } from "@/app/context/global.context";
import { LogOutBtn } from "./_components/LogOutBtn";

export const Title = ()=> {
    const { user } = useContext(GlobalContext);

    return (
        <div className={s.title_bar}>
            <h2 className={s.title}>
                <span className={s.welcome}>
                    Welcome
                </span>
                <span className={s.name}>
                    {user ? `${user?.first_name} ${user?.last_name}` : "Dear client"}
                </span>
            </h2>
            <LogOutBtn />
        </div>
    )
}
