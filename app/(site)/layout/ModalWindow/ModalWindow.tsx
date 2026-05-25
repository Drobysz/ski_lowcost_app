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

    if (modalWindow === "none") {
        return null;
    }

    return (
        <article
            className={cn(
                className,
                s.modal_window
            )}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    setModalWindow("none");
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                className={s.dialog}
            >
                <button
                    type="button"
                    aria-label="Close modal"
                    className={s.cross}
                    onClick={()=> setModalWindow("none")}
                >
                    <X size={28} strokeWidth={1.9} />
                </button>
                {CurrModalWin && <CurrModalWin />}
            </div>
        </article>
    )
}
