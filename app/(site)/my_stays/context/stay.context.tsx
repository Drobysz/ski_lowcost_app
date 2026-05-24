"use client";

import { GlobalContext } from "@/app/context/global.context";
import { Reservation } from "@/interface/Reservation";
import { fetchReserves } from "@/queries/reservesQueries";
import { createContext, ReactNode, useContext, useEffect } from "react";
import useSWR from "swr";

interface StayContextInterface {
    reserves?: Reservation[];
    reserveError?: Error;
    isReserveLoading: boolean;
}

export const StayContext = createContext<StayContextInterface>({
    reserves: [],
    isReserveLoading: false,
});

export const StayContextProvider = ({
    children
}: {
    children: ReactNode
})=> {
    const {
        data: reserves,
        isLoading: isReserveLoading,
        error: reserveError
    } = useSWR(
        'reserves',
        fetchReserves,
        {
            refreshInterval: 10 * 60 * 1000,
			dedupingInterval: 10 * 60 * 1000,
            shouldRetryOnError: (error) => error?.status !== 401,
        }
    );

    const {setNotification} = useContext(GlobalContext);

    useEffect(()=> {
        if (reserveError === undefined) return;

        setNotification({
            status: "error",
            text: "Failed to load user reservations"
        });
     }, [reserveError, setNotification]);

    return (
        <StayContext.Provider
            value={{
                reserves: reserves,
                isReserveLoading: isReserveLoading,
                reserveError: reserveError
            }}
        >
            {children}
        </StayContext.Provider>
    )
}