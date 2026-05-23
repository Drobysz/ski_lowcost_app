"use client";

import { DetailedHTMLProps, HTMLAttributes, ReactNode, useContext } from "react";
import cn from "classnames";
import { GlobalContext } from "@/app/context/global.context";

interface BBInterface extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    children: ReactNode
}

export const BlurBackground = ({
    className,
    children,
    ...props
}: BBInterface)=> {
    const { blur } = useContext(GlobalContext);

    return (
        <div 
            {...props}
            className={cn(className, { 
                ['pointer-events-none blur-sm']: blur
            })}
        >
            {children}
        </div>
    )
}
