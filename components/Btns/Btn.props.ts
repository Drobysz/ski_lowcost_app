import { ButtonHTMLAttributes, ReactNode } from "react";

export interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    colorSet?: "blue" | "blue_ghost" | "orange" | "black" | "ghost" | "white";
    children: ReactNode;
    form: "rect" | "round";
    fullWidth?: boolean;
}