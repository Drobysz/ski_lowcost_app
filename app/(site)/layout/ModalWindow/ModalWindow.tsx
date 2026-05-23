"use client";

import { useContext } from "react";
import s from "./style.module.scss";
import cn from "classnames";
import { X } from "lucide-react";
import { GlobalContext } from "@/app/context/global.context";

export const ModalWindow = ({
    className
}: {
    className?: string
})=> {
    const { 
        modalWindow,
        CurrModalWin, 
        setModalWindow 
    } = useContext(GlobalContext);

    return (
        <article
            className={cn(
                className,
                modalWindow === "none" && "hidden",
                s.modal_window
            )}
        >
            <div 
                className={s.cross}
                onClick={()=> setModalWindow("none")}
            >
                <X />
            </div>
            {CurrModalWin && <CurrModalWin />}
        </article>
    )
}