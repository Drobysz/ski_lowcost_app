'use client'

import { useState } from "react";
import {
    Cursor,
    Tab,
    LoadingBars
} from "./_components";

import styles from "./pagination.module.scss";
import { CursorPosition, PaginationProps } from "./Pagination.props";
import { usePathname, useSearchParams } from "next/navigation";

export const Pagination = ({
    tabs,
    isLoading
}: PaginationProps) => {
    const pn = usePathname();
    const sp = useSearchParams();

    const spTab = (sp.get('tab') ?? "upcoming");

    const defaultCoord = { left: 0, width: 0 };

    const [position, setPosition] = useState<CursorPosition>(defaultCoord);
    const [positionClicked, setPositionClicked] = useState<CursorPosition>(defaultCoord);
    const [hover, setHover] = useState(false);

    return (
        <nav>
            <ul
                onMouseEnter={()=> setHover(true)}
                onMouseLeave={() => {
                    setPosition(positionClicked);
                    setHover(false);
                }}
                className={styles.navbar_body}
            >
                {isLoading && <LoadingBars />}
                {!isLoading && tabs.map((tab) => (
                        <Tab
                            key={tab.href}
                            href={tab.href}
                            isActive={[pn, spTab].includes(tab.href)}
                            isBarHovered={hover}
                            setPosition={setPosition}
                            setPositionClicked={setPositionClicked}
                        >
                            {tab.label}
                        </Tab>
                ))}

                <Cursor position={position} />
            </ul>
        </nav>
    );
};
  