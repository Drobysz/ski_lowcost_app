import { Reservation } from "@/interface/Reservation";
import {
    ImageSwitcher,
    PriceTag,
    Title,
    Tags
,} from "./_components"
import s from "./style.module.scss";
import { jakarta_bold } from "@/fonts/fonts";
import cn from "classnames";
import { 
    Calendar
} from "lucide-react";
import { getPeriodString } from "@/helper/time";
import { ro } from "zod/v4/locales";

export const ReserveCard = ({
    reserve
}: {
    reserve: Reservation
})=> {
    const images = reserve.accommodations[0].room?.images;
    const accommodations = reserve.accommodations;

    const room_nb = [...new Set(accommodations.map(a=>a.room?.num))].length;
    const rooms = [...new Set(accommodations.map(a=>a.room?.num))].join(', №').slice(0,100);
    const beds_nb = accommodations.reduce((a, c)=> a + c.room!.nb_lits, 0);
    const guests_nb = accommodations.length;

    const period = getPeriodString(reserve.check_in, reserve.check_out);

    return (
        <article className={s.stay_card}>
            <div className="flex justify-center items-center">
                <ImageSwitcher
                    images={images ?? []}  
                />
            </div>
            <div className={s.content}>
                <div className="flex justify-between">
                    <Title
                        room_nb={room_nb}
                        rooms={rooms}
                        period={period}
                    />
                    <PriceTag 
                        price={reserve.total_price} 
                    />
                </div>
                <Tags
                    beds_nb={beds_nb}
                    guests_num={guests_nb}
                    status={reserve.status}
                />
            </div>
        </article>
    )
}