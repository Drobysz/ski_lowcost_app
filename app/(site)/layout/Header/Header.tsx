'use client';

import s from "./style.module.scss";
import cn from "classnames";
import { jakarta_extrabold } from "@/fonts/fonts";
import { Pagination } from "@/components";
import { useWindowWidth } from "@/hooks";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/app/context/global.context";
import { 
    Profile,
    MobileMenu,
    BurgerBtn
} from "./_components";

export const Header = ({
    className
}: {
    className: string
}) => {
    const {
        isLoggedIn,
        user,
        isUserLoading,
        userError
    } = useContext(GlobalContext);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const winWidth = useWindowWidth();
    const isLessOrEqual820 = winWidth !== null && winWidth <= 820;

    const tabs = [
        { href: '/', label: "Main Page" },
        { href: "/booking", label: "Booking" },
        { href: "/my_stays", label: "My stays" }
    ]
    const canShowBurger = 
        isLoggedIn === "auth" 
        && user !== undefined
        && isLessOrEqual820;

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 70);
        };

        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={cn(
            s.header,
            isScrolled ? "bg-white/85" : "bg-white",
            className
        )}>
            <div className={s.brand}>
                {canShowBurger && (
                    <BurgerBtn
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                )}
                <p className={cn(
                    s.h_title,
                    jakarta_extrabold.className
                )}>
                    Zarza-Ski
                </p>
            </div>
            <div className={s.desktop_nav}>
                {!userError && user &&
                    <Pagination
                        tabs={tabs}
                        isLoading={isUserLoading}
                    />
                }
            </div>
            <Profile
                user={user}
                isLoading={isUserLoading}
                error={userError}
            />
            {canShowBurger && (
                <MobileMenu
                    tabs={tabs}
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />
            )}
        </header>
    )
}
