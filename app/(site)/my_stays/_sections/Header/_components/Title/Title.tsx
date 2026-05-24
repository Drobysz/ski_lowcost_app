import { jakarta_extrabold } from "@/fonts/fonts";
import cn from "classnames";
import s from "./style.module.scss";

export const Title = ()=> {
    return (
        <div className={s.title}>
            <h1 className={cn(
                s.heading,
                jakarta_extrabold.className
            )}>
                My Stays
            </h1>
            <p className={s.subtitle}>
                Manage your alpine adventures and group itineraries.
            </p>
        </div>
    )
}