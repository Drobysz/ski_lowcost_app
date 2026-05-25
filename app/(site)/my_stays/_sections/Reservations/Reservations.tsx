"use client";

import { useContext } from "react";
import { StayContext } from "../../context/stay.context";
import { Loading } from "./_components/Loading"; 
import { useSearchParams } from "next/navigation";
import { ReserveCard } from "@/components";
import s from "./style.module.scss";

export const Reservations = ()=> {
    const {
        reserves,
        isReserveLoading,
        reserveError
    } = useContext(StayContext);

    const sp = useSearchParams()
    const category = (sp.get('category') ?? "approaching");
    const filterefReserves = reserves
        ? reserves?.filter(res=> res.status == category) 
        : [];

    return (
        <section className={s.markup}>
            {isReserveLoading && <Loading />}

            {!reserveError && filterefReserves.length > 0
                && filterefReserves.map(r=> (
                    <ReserveCard
                        key={`reserve_card_${r.id}`}
                        reserve={r}
                    />
                ))
            }
            {filterefReserves.length == 0 && <h2>No Reservations</h2>}
        </section>
    )
}