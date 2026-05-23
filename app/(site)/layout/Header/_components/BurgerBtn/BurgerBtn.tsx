"use client";

import { BurgerBtnProps } from "./BurgerBtn.props";
import s from "./style.module.scss";
import {
    Menu,
    X
} from "lucide-react";


export const BurgerBtn = ({
    isMenuOpen,
    setIsMenuOpen
}: BurgerBtnProps)=> {
    return (
        <button
            type="button"
            className={s.menu_button}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
        >
            {isMenuOpen ? <X /> : <Menu />}
        </button>

    )
} 