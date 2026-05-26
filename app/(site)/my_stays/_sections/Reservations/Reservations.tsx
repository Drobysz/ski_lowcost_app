"use client";

import { Suspense, useContext } from "react";
import { StayContext } from "../../context/stay.context";
import { Loading } from "./_components/Loading"; 
import { useSearchParams } from "next/navigation";
import { ReserveCard } from "@/components";
import s from "./style.module.scss";
import { getTimeStatus } from "@/helper";

export const Reservations = ()=> {
    return (
        <Suspense fallback={null}>
            <ReservationsContent />
        </Suspense>
    );
}

const ReservationsContent = ()=> {
    const {
        reserves,
        isReserveLoading,
        reserveError
    } = useContext(StayContext);

    const sp = useSearchParams()
    const category = (sp.get('category') ?? "upcoming");
    const today = new Date().toDateString();
    const filterefReserves = reserves
        ? reserves?.filter(res=> getTimeStatus(res.check_in, res.check_out, today) == category) 
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
