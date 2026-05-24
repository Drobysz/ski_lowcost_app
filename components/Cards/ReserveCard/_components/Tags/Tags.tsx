import { ReserveStatus } from "@/interface/Reservation";
import {
    BedDouble,
    Group,
    CircleCheck
} from "lucide-react";
import s from "./style.module.scss";

export const Tags = ({
    beds_nb,
    guests_num,
    status
}: {
    beds_nb: number;
    guests_num: number;
    status: ReserveStatus
})=> {
    const tags = [
        { 
            name: "BEDS NUMBER",
            icon: <BedDouble
                        width={15}
                        height={15}
                    />,
            value: `${beds_nb} bed${beds_nb > 1 ? 's' : ''}`
        },
        {
            name: "GUESTS",
            icon: <Group
                        width={15}
                        height={15}
                    />,
            value: `${guests_num} guest${guests_num > 1 ? 's' : ''}`
        },
        {
            name: "STATUS",
            icon: <CircleCheck
                        width={15}
                        height={15}
                    />,
            value: status
        }
    ];

    return (
        <ul className={s.tag_bar}>
            {tags.map((t)=> (
                <li
                    key={`stay_tag_${crypto.randomUUID()}`}
                    className={s.tag}
                >
                    <span className={s.title}>
                        {t.name}
                    </span>
                    <div className={s.value}>
                        {t.icon}
                        <span>
                            {t.value}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    )
}