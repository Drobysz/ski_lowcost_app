"use client";

import { jakarta_extrabold } from "@/fonts/fonts";
import cn from "classnames";
import { useContext, useEffect, useState } from "react";
import { 
    ArrowUpNarrowWide,
    ArrowDownNarrowWide
} from "lucide-react";
import s from "./style.module.scss";
import { BookingContext } from "../../context/booking.context";

export const Header = ()=> {
    const {
        setAvailable,
        setChoosedRooms
    } = useContext(BookingContext);
    const [sort, setSort] = useState(false);

    useEffect(()=>{
        setChoosedRooms([]);
        setAvailable(p=>({
            ...p,
            sort: {
                beds: sort ? "down" : "up"
            }
        }));
    }, [sort, setAvailable, setChoosedRooms]);

    return (
        <div className={s.title_spacing}>
            <h1 className={cn(
                jakarta_extrabold.className,
                s.title_h1
            )}>
                Available Alpine Retreats
            </h1>

            <div className={s.subtitle_spacing}>
                <div className="flex flex-col">
                    <p className={s.subtitle}>
                        Find the perfect balance of comfort and slope access.
                    </p>
                    <p className={s.alert}>
                        Note: Empty bed costs 150€ per week
                    </p>
                </div>
                <button 
                    className={s.sort_btn}
                    onClick={()=> setSort(p=>!p)}
                >
                    <span>
                        {sort
                            ? <ArrowDownNarrowWide width={15} height={15} />
                            : <ArrowUpNarrowWide width={15} height={15} />
                        }
                    </span>
                    <span className="text-gray-700">
                        Sort by: Beds number
                    </span>
                </button>
            </div>
        </div>
    )
}