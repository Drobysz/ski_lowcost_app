'use client'

import { Suspense, useState } from "react";
import { capitalize } from "@/helper/string";
import {
    Cursor,
    Tab,
} from "./_components";

import styles from "./pagination.module.scss";
import { CursorPosition, PaginationProps } from "./Pagination.props";
import { usePathname, useSearchParams } from "next/navigation";

export const Pagination = ({
    tabs,
}: PaginationProps) => {
    return (
        <Suspense fallback={null}>
            <PaginationContent tabs={tabs} />
        </Suspense>
    );
};

const PaginationContent = ({
    tabs,
}: PaginationProps) => {
    const pn = usePathname();
    const sp = useSearchParams();

    const spTab = (sp.get('category') ?? "approaching");

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
                { tabs.map((tab) => (
                        <Tab
                            key={tab.href}
                            href={tab.href}
                            isActive={[pn, capitalize(spTab)].includes(tab.label)}
                            isBarHovered={hover}
                            qnnty={tab.qnnty}
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
  
