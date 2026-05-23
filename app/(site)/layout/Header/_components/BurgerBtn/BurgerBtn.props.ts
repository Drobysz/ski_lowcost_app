import { Dispatch, SetStateAction } from "react";

export interface BurgerBtnProps {
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}