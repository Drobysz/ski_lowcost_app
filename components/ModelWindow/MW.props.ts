import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface MVprops extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	className?: string;
	children: ReactNode;
	tag?: "span" | "div" | "section" | "article" | "aside" | "header" | "footer";
}