"use client";

import { useContext } from "react";
import { BookingContext } from "../../context/booking.context";
import { RoomCheckBox } from "./_components/RoomCheckBox";

export const Rooms = ()=> {
    const {
        rooms,
        page
    } = useContext(BookingContext);

    const pageRooms = rooms?.slice((page-1) * 6, page * 6);

    return (
        <>
            {pageRooms && pageRooms.map((r)=> 
                <RoomCheckBox 
                    key={`booking_card_${r.id}`}
                    r={r}
                />
            )}
        </>
    )
}