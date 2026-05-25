'use client';

import s from "./style.module.scss";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { jakarta_extrabold } from "@/fonts/fonts";
import { Redirect } from "./_components";
import Link from "next/link";

export const Header = () => {
    const pathname = usePathname();
    const page = pathname.split("/").slice(-1)[0];

    return (
        <header className={s.header}>
            <Link href="/">
                <p className={cn(
                    s.h_title,
                    jakarta_extrabold.className
                )}>
                    Zarza-Ski
                </p>
            </Link>
            <Redirect
                page={page as "login" | "register"}
            />
        </header>
    )
}