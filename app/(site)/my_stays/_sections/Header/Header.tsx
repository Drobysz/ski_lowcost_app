"use client";

import s from "./style.module.scss";
import {
    Title,
    Pagination
} from "./_components";
import { useContext } from "react";
import { StayContext } from "../../context/stay.context";
import { getTimeStatus } from "@/helper";

export const Header = ()=> {
    const { reserves } = useContext(StayContext);
    const today = new Date().toDateString();

    const tabs = [
        { 
            href: "/my_stays?category=upcoming",
            label: "Upcoming",
            qnnty: reserves?.filter(
                r=> getTimeStatus(r.check_in, r.check_out, today) == "upcoming"
            ).length ?? 0
        },
        { 
            href: "/my_stays?category=current", 
            label: "Current",
            qnnty: reserves?.filter(
                r=> getTimeStatus(r.check_in, r.check_out, today) == "current"
            ).length ?? 0
        },
        { 
            href: "/my_stays?category=past", 
            label: "Past",
            qnnty: reserves?.filter(
                r=> getTimeStatus(r.check_in, r.check_out, today) == "past"
            ).length ?? 0
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