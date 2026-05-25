"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { Aside } from "./index";
import s from "./GridLayout.module.scss";

export const BookingShell = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const isCheckout = pathname === "/booking/checkout";

    return (
        <div className={cn(s.wrapper, isCheckout && s.checkoutWrapper)}>
            {!isCheckout && <Aside className={s.aside} />}
            <div className={s.main}>
                {children}
            </div>
        </div>
    );
};
