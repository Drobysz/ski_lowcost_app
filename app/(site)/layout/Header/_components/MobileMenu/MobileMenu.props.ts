import { Dispatch, SetStateAction } from "react";

interface Tab {
    href: string;
    label: string;
}

export interface MobileMenuProps {
    tabs: Tab[];
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}