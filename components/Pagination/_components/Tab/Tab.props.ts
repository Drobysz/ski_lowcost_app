import { ReactNode } from "react";
import { CursorPosition } from "../../Pagination.props";

export interface Tabprops {
    children: ReactNode;
    href: string;
    isActive: boolean;
    isBarHovered: boolean;
    setPosition: ( PosProps : CursorPosition )=> void;
    setPositionClicked: ( PosProps : CursorPosition )=> void;
};