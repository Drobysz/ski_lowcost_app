import { BtnProps } from "./Btn.props"
import cn from "classnames";

export const Btn = ({
    colorSet,
    form,
    fullWidth = false,
    children,
    className,
    disabled,
    ...props
}: BtnProps) => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={cn(
            "px-4 py-2 transition-all duration-300",
            form === "rect"
                ? "active:rotate-2 active:scale-95"
                : "active:scale-99",
            form === "rect" ? "rounded-lg" : "rounded-full",
            disabled ? "pointer-events-none" : "cursor-pointer",
            fullWidth ? "w-full" : "w-fit", {
                ["bg-blue-500 text-white hover:bg-blue-600"]: colorSet === "blue",
                ["bg-blue-100 text-blue-500 hover:bg-blue-200"]: colorSet === "blue_ghost",
                ["bg-orange-500 text-white hover:bg-orange-600"]: colorSet === "orange",
                ["bg-black text-white hover:bg-gray-800"]: colorSet === "black",
                ["bg-transparent text-gray-700 hover:bg-gray-100"]: colorSet === "ghost",
                ["bg-green-500 text-white hover:bg-green-600"]: colorSet === "green",
                ["bg-red-500 text-white hover:bg-red-600"]: colorSet === "red",
                ["bg-white text-blue-500 hover:bg-gray-200 border border-blue-400"]: colorSet === "white",
            },
            disabled && "opacity-70",
            className,
        )}>
            {children}
        </button>
    )
}
