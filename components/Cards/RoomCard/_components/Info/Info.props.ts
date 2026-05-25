import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface InfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    view: string;
    surface: number;
    balcony: boolean;
    floor: number;
    num: number;
}