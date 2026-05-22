import { jakarta_bold, jakarta_regular } from "@/fonts/fonts"
import cn from "classnames";

export const Title = ()=> {
    return (
        <div className="flex flex-col gap-1">
            <h2 className={cn(
                jakarta_bold.className,
                "text-gray-900"
            )}>
                Our Rooms
            </h2>
            <p className={cn(
                jakarta_regular.className,
                "text-gray-700"
            )}>
                Find the perfect space for your alpine escape.
            </p>
        </div>
    )
}