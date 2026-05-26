"use client";

import { BookingContext } from "@/app/(site)/booking/context/booking.context";
import { useContext, useEffect, useState } from "react";
import s from "./style.module.scss";
import { addDaysToInputDate, toInputDate } from "@/helper/time";
import { GlobalContext } from "@/app/context/global.context";

export const Period = ()=> {
    const { 
        available,
        setAvailable,
        setChoosedRooms
    } = useContext(BookingContext);

    const { setNotification } = useContext(GlobalContext);

    const [checkIn, setCheckIn]= useState(toInputDate(available.check_in));
    const [checkOut, setCheckOut]= useState(toInputDate(available.check_out));
    const minCheckOut = checkIn ? addDaysToInputDate(checkIn, 1) : undefined;
    const today = toInputDate(new Date());

    const changeCheckIn = (value: string) => {
        if (value && value >= today) {
            setCheckIn(value);
        } else {
            setNotification({
                status: "alert",
                text: "You can't choose a past date"
            });
        }

        if (value && (!checkOut || checkOut <= value)) {
            setCheckOut(addDaysToInputDate(value, 1));
        }
    };

    const changeCheckOut = (value: string) => {
        if (checkIn && value && value <= checkIn) {
            setCheckOut(addDaysToInputDate(checkIn, 1));
            return;
        }

        setCheckOut(value);
    };

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
                            onChange={(e) => changeCheckIn(e.target.value)}
                        />
                    </label>

                    <label>
                        <span>Check-out</span>
                        <input
                            type="date"
                            name="check_out"
                            value={checkOut}
                            min={minCheckOut}
                            onChange={(e) => changeCheckOut(e.target.value)}
                        />
                    </label>
                </div>
            </fieldset>
        </form>
    )
}
