"use client";

import cn from "classnames";
import { 
    Filters,
    Period,
    RoomTags,
    BookingGroupPanel,
    SignUpNote
} from "./_components";
import { useContext } from "react";
import { GlobalContext } from "@/app/context/global.context";

export const Aside = ({
    className
}: {
    className: string
})=> {
    const {
        user,
        userError,
        isUserLoading,
    } = useContext(GlobalContext);

    return (
        <aside className={cn(
            className,
            "relative"
        )}>
            <div className="flex flex-col gap-3">
                <RoomTags />
                <Filters />
                <Period />
                {!userError && user
                    ? <BookingGroupPanel isLoading={isUserLoading} /> 
                    : <SignUpNote />
                }
            </div>
        </aside>
    )
}
