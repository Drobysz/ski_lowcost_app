"use client";

import { BookingContext } from "@/app/(site)/booking/context/booking.context";
import { X } from "lucide-react";
import { useContext } from "react";
import s from "./style.module.scss";

export const RoomTags = ()=> {
    const {
        choosedRooms,
        setChoosedRooms
    } = useContext(BookingContext);

    return (
        <div className="flex flex-wrap gap-1">
            {choosedRooms && choosedRooms.map(r=> (
                <div 
                    key={`room_tag_${r.id}`}
                    className={s.room_tag}
                >
                    <span>
                        №{r.num}
                    </span>
                    <span 
                        className={s.tag_cross}
                        onClick={
                            ()=> setChoosedRooms(
                                p=>[...p.filter(cr=>cr.id !== r.id)]
                        )}
                    >
                        <X 
                            width={15}
                        />
                    </span>
                </div>
            ))}
        </div>
    )
}