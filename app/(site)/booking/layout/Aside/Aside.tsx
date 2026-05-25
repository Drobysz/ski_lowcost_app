import cn from "classnames";
import { 
    Filters,
    Period,
    RoomTags,
    BookingGroupPanel
} from "./_components";

export const Aside = ({
    className
}: {
    className: string
})=> {
    return (
        <aside className={cn(
            className,
            "relative"
        )}>
            <div className="flex flex-col gap-3">
                <RoomTags />
                <Filters />
                <Period />
                <BookingGroupPanel />
            </div>
        </aside>
    )
}
