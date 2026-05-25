"use client";

import { BookingContext } from "@/app/(site)/booking/context/booking.context";
import { useContext, useEffect, useState } from "react";
import s from "./style.module.scss";
import { toInputDate } from "@/helper/time";

export const Period = ()=> {
    const { 
        available,
        setAvailable,
        setChoosedRooms
    } = useContext(BookingContext);

    const [checkIn, setCheckIn]= useState(toInputDate(available.check_in));
    const [checkOut, setCheckOut]= useState(toInputDate(available.check_out));

    useEffect(()=> {
        if (!checkIn || !checkOut) return;

        setChoosedRooms([]);
        setAvailable(p=>({
            ...p,
            check_in: checkIn,
            check_out: checkOut
        }))
    }, [checkIn, checkOut, setAvailable, setChoosedRooms]);

    return (
        <form 
            aria-label="Booking dates filter"
            className={s.period_body}
        >
            <fieldset>
                <h3>Stay dates</h3>

                <div className={s.inner_content}>
                    <label>
                        <span>Check-in</span>
                        <input
                            type="date"
                            name="check_in"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </label>

                    <label>
                        <span>Check-out</span>
                        <input
                            type="date"
                            name="check_out"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </label>
                </div>
            </fieldset>
        </form>
    )
}