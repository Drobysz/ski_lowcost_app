import { UserSession } from "@/interface";
import { Available } from "@/interface/Filter";
import { Room } from "@/interface/Reservation";
import { Dispatch, SetStateAction } from "react";

export interface BookingInterface {
    available: Available,
    rooms?: Room[],
    error?: Error,
    pending: boolean
    page: number,
    page_nb: number,
    debounceAvailable: Available,
    choosedRooms?: Room[],
    users?: UserSession[]
    checkoutPending: boolean,

    setAvailable: Dispatch<SetStateAction<Available>>,
    setDebounceAvailable: Dispatch<SetStateAction<Available>>,
    setPage: Dispatch<SetStateAction<number>>,
    setChoosedRooms: Dispatch<SetStateAction<Room[]>>,
    setUsers: Dispatch<SetStateAction<UserSession[]>>,
    setCheckoutPending: Dispatch<SetStateAction<boolean>>,
}
