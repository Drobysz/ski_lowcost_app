"use client";

import { RoomCard } from "@/components"
import { Room } from "@/interface/Reservation"
import { useContext, useEffect, useState } from "react";
import { BookingContext } from "../../../context/booking.context";
import cn from "classnames";
import { GlobalContext } from "@/app/context/global.context";

export const RoomCheckBox = ({
    r
}: {
    r: Room
})=> {
    const [chosen, setChosen] = useState(false);
    const { isLoggedIn } = useContext(GlobalContext);
    const {
        choosedRooms, 
        setChoosedRooms
    } = useContext(BookingContext);

    useEffect(() => {
        if (isLoggedIn == "auth") {
            setChoosedRooms((prev) => {
                const exists = prev.some((room) => room.id === r.id);

                if (chosen && !exists) {
                    return [...prev, r];
                }

                if (!chosen && exists) {
                    return prev.filter((room) => room.id !== r.id);
                }

                return prev;
            });
        }
    }, [chosen, r, setChoosedRooms, isLoggedIn]);

    useEffect(()=> {
        const isIncluded = choosedRooms && 
            choosedRooms?.filter(cr=>cr.id == r.id).length > 0;

        const updateState = async ()=> {
            setChosen(false);
        }

        if (!isIncluded) updateState();
    }, [choosedRooms, r.id]);

    return (
        <div
            className={cn(
                "w-fit rounded-2xl p-1 cursor-pointer",
                chosen && "shadow-2xl shadow-blue-700"
            )}
        >
            <RoomCard
                key={`booking_card_${r.id}`}
                num={r.num}
                nb_lits={r.nb_lits}
                images={r.images}
                balcony={r.balcony}
                building_id={r.building_id}
                view={r.view}
                surface={r.surface}
                id={r.id}
                floor={r.floor}
                setSwitch={isLoggedIn == "auth" ? setChosen : ()=> {}}
            />
        </div>
    )
}