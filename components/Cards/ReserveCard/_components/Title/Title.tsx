import { jakarta_bold } from "@/fonts/fonts";
import { 
    Calendar
} from "lucide-react";
import s from "./style.module.scss";
import cn from "classnames";

export const Title = ({ 
    room_nb,
    period,
    rooms
}: { 
    room_nb: number, 
    period: string,
    rooms: string
})=> {
    return (
        <div className="flex flex-col">
            <h2 className={cn(
                jakarta_bold.className,
                s.title
            )}>
                {`room${room_nb > 1 ? 's': ''}`} №{rooms}
            </h2>
            <div className={s.calendar}>
                <Calendar
                    height={15}
                    width={15}
                />
                <p>
                    {period} 
                </p>
            </div>
        </div>
    )
}