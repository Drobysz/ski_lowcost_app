"use client";

import Link from "next/link";
import { MobileMenuProps } from "./MobileMenu.props";
import s from "./style.module.scss";
import cn from "classnames";
import { usePathname } from "next/navigation";

export const MobileMenu = ({
    isMenuOpen,
    setIsMenuOpen,
    tabs
}: MobileMenuProps)=> {
    const pn = usePathname();

    return (
        <nav
            id="mobile-menu"
            className={cn(s.mobile_menu, {
                [s.mobile_menu_open]: isMenuOpen
            })}
        >
            <ul className={s.mobile_nav_list}>
                {tabs.map((tab) => (
                    <li key={tab.href}>
                        <Link
                            href={tab.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={cn(
                                pn == tab.href && s.active,
                                s.tab
                            )}
                        >
                            {tab.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}