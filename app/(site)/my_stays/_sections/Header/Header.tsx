"use client";

import s from "./style.module.scss";
import {
    Title,
    Pagination
} from "./_components";
import { useContext } from "react";
import { StayContext } from "../../context/stay.context";

export const Header = ()=> {
    const { reserves } = useContext(StayContext);

    const tabs = [
        { 
            href: "/my_stays?category=approaching",
            label: "Approaching",
            qnnty: reserves?.filter(r=> r.status == "approaching").length ?? 0
        },
        { 
            href: "/my_stays?category=in process", 
            label: "In process",
            qnnty: reserves?.filter(r=> r.status == "in process").length ?? 0
        },
        { 
            href: "/my_stays?category=finished", 
            label: "Finished",
            qnnty: reserves?.filter(r=> r.status == "finished").length ?? 0
        },
    ];

    return (
        <header className={s.header}>
            <Title />
            <Pagination
                tabs={tabs}
            />
        </header>
    )
}