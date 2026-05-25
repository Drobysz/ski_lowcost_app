"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { BookingInterface } from "./booking.interface";
import { Available } from "@/interface/Filter";
import { fetchAvailable } from "@/queries/fetchAvailable";
import { Room } from "@/interface/Reservation";
import { UserSession } from "@/interface";

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 20);

const defAvailable = {
    check_in: today.toDateString(),
    check_out: tomorrow.toDateString(),
}

export const BookingContext = createContext<BookingInterface>({
    available: defAvailable,
    debounceAvailable: defAvailable,
    pending: false,
    rooms: [],
    page: 1,
    page_nb: 0,
    users: [],
    choosedRooms: [],
    checkoutPending: false,

    setAvailable: ()=> {},
    setDebounceAvailable: ()=> {},
    setPage: ()=> {},
    setChoosedRooms: ()=> {},
    setUsers: ()=> {},
    setCheckoutPending: ()=> {}
});

export const BookingContextProvider = ({
    children
}: {
    children: ReactNode
})=> {
    const [available, setAvailable] = useState<Available>(defAvailable);
    const [debounceAvailable, setDebounceAvailable] = useState<Available>(defAvailable);
    const [pending, setPending] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([]); 
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState<UserSession[]>([]);
    const [choosedRooms, setChoosedRooms] = useState<Room[]>([]);
    const [checkoutPending, setCheckoutPending] = useState(false);

    const page_nb = Math.floor(rooms.length / 6);

    useEffect(()=> {
        const timer = setTimeout(
            ()=> setDebounceAvailable(available),
        400);

        return ()=> clearTimeout(timer);
    }, [available])    

    useEffect(()=> {
        if (!debounceAvailable.check_in || !debounceAvailable.check_out) return;
        let ignore = false;

        const getAvailableRooms = async ()=> {
            setPage(1);
            setPending(true);
            try {
                const fetchedRooms = await fetchAvailable(debounceAvailable);

                if (!ignore) {
                    setRooms(fetchedRooms);
                }
            } catch (error) {
                if (!ignore) {
                    console.error(error);
                    setRooms([]);
                }
            } finally {
                if (!ignore) {
                    setPending(false);
                }
            }
        }

        getAvailableRooms();

        return ()=> { ignore = true }
    }, [debounceAvailable])

    useEffect(()=> console.log(rooms), [rooms])

    return (
        <BookingContext.Provider
            value={{
                available,
                debounceAvailable,
                pending,
                rooms,
                page,
                page_nb,
                users,
                choosedRooms,
                checkoutPending,


                setAvailable,
                setDebounceAvailable,
                setPage,
                setChoosedRooms,
                setUsers,
                setCheckoutPending
            }}
        >
            {children}
        </BookingContext.Provider>
    )
}
