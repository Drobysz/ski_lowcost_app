'use client';

import s from "./style.module.scss";
import cn from "classnames";
import { jakarta_extrabold } from "@/fonts/fonts";
import { Pagination } from "@/components";
import { useCurrentUser } from "@/hooks";
import { useContext } from "react";
import { GlobalContext } from "@/app/context/global.context";
import { Profile } from "./_components";

export const Header = ({
    className
}: {
    className: string
}) => {
    const { isLoggedIn } = useContext(GlobalContext);
    const { data: user, isLoading, error } = useCurrentUser(isLoggedIn);

    const tabs = [
        { href: '/', label: "Main Page" },
        { href: "/booking", label: "Booking" },
        { href: "/my_stays", label: "My stays" }
    ]

    // console.log(user)

    return (
        <header className={cn(
            s.header,
            className
        )}>
            <p className={cn(
                s.h_title,
                jakarta_extrabold.className
            )}>
                Zarza-Ski
            </p>
            {!error && user &&
                <Pagination
                    tabs={tabs}
                    isLoading={isLoading}
                />
            }
            <Profile
                user={user}
                isLoading={isLoading}
                error={error}
            />
        </header>
    )
}