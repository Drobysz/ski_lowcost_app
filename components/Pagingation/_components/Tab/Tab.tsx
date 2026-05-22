import { useWindowWidth } from "@/hooks";
import { Tabprops } from "./Tab.props";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { jakarta_bold } from "@/fonts/fonts";
import cn from "classnames";
import styles from "./tab.module.scss";
import { CursorPosition } from "../../Pagination.props";

export const Tab = ({
    children,
    isActive,
    href,
    isBarHovered,
    setPosition,
    setPositionClicked
}: Tabprops) => {
    const ref = useRef<HTMLLIElement>(null!);
    const [hover, setHover] = useState(false);

    const windowWidth = useWindowWidth();
    const isWindowLess1040 = windowWidth !== null && windowWidth <= 1040;

    useEffect(() => {
        if (windowWidth === null) return;

        const { offsetLeft: left, offsetWidth: width } = ref.current;
        const currPos: CursorPosition = { left, width };

        if (isActive) {
            setPositionClicked(currPos);
            setPosition(currPos);
        }
    }, [isWindowLess1040, windowWidth, isActive, setPosition, setPositionClicked]);

    const getCoords = (): CursorPosition => {
        const { width } = ref.current.getBoundingClientRect();
        const left = ref.current.offsetLeft;

        return { left, width };
    }

    const handleInteraction = (interaction: "hover" | "click") => {
        const nextPos: CursorPosition = getCoords();

        if (interaction === "click") {
            setPositionClicked(nextPos);
            return;
        }

        setPosition(nextPos);
    };

    const highlighted = isBarHovered
        ? hover
        : isActive

    return (
    <Link href={href}>
        <li
            ref={ref}
            onClick={() => handleInteraction("click")}
            onMouseEnter={() => {
                setHover(true);
                handleInteraction("hover");
            }}
            onMouseLeave={() => setHover(false)}
            className={cn(
                jakarta_bold.className,
                styles.tab, {
                    ["text-blue-700"]: highlighted,
                    ["text-gray-900"]: !highlighted
                }
            )}
        >
            {children}
        </li>
    </Link>
    );
};