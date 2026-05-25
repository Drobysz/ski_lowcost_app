"use client";

import { useContext } from "react";
import { BookingContext } from "./context/booking.context";
import {
    Loading,
    Rooms,
    PagesPagination,
    Header
} from "./_sections";
import cn from "classnames";
import { jakarta_bold } from "@/fonts/fonts";
import s from "./page.module.scss";

export default function BookingPage() {
    const {
        rooms,
        pending
    } = useContext(BookingContext);

    return (
        <div className="flex flex-col gap-8">
            <Header />
            <div className={s.room_list}>
                {pending
                    ? <Loading />
                    : rooms
                        ? <Rooms />
                        : <p className={cn(
                                "absolute top-1/2 left-1/2 -translate-1/2",
                                jakarta_bold.className
                            )}>
                            Not found
                        </p>
                }
            </div>
            <PagesPagination />
        </div>
    )
}