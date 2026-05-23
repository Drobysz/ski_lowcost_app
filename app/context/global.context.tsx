"use client";

import { createContext, ComponentType, ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import {
	AppNotification,
	GlobalContextInterface,
	ModalWindow
} from "./global.interface";
import { AuthStatus } from "@/interface/Auth.interface";
import { fetchRooms, getAuthStatus } from "@/queries";
import { useCurrentUser } from "@/hooks";
import Windows from "../windows/Windows";

export const GlobalContext = createContext<GlobalContextInterface>({
	isLoggedIn: "none",
	modalWindow: "none",
	blur: false,
	isUserLoading: false,
	isRoomsLoading: false,
	notification: { status: "none", text: "" },
	CurrModalWin: null,
	mutateUser: async () => undefined,
	mutateRooms: async () => undefined,

	setIsLoggedIn: () => {},
	setModalWindow: () => {},
	setNotification: () => {}
})

export const GlobalContextProvider = ({
	children
}: {
	children: ReactNode
})=> {
	const pathname = usePathname();
	const [isLoggedIn, setIsLoggedIn] = useState<AuthStatus>("none");
	const [modalWindow, setModalWindow] = useState<ModalWindow>("none");
	const [notification, setNotification] = useState<AppNotification>({ status: "none", text: "" });

	const CurrModalWin: ComponentType | null = Windows[modalWindow];

	const blur = modalWindow !== "none";
	const shouldFetchUser = isLoggedIn === "auth";
	const {
		data: user,
		error: userError,
		isLoading: isUserLoading,
		mutate: mutateUser
	} = useCurrentUser(shouldFetchUser);
	const {
		data: rooms,
		error: roomsError,
		isLoading: isRoomsLoading,
		mutate: mutateRooms
	} = useSWR(
		"global-rooms",
		fetchRooms,
		{
			refreshInterval: 10 * 60 * 1000,
			dedupingInterval: 10 * 60 * 1000,
            shouldRetryOnError: (error) => error?.status !== 401,
		}
	);

	useEffect(() => {
		let ignore = false;

		getAuthStatus().then((status) => {
			if (!ignore) {
				setIsLoggedIn(status);
			}
		});

		return () => {
			ignore = true;
		};
	}, [pathname]);

	return (
		<GlobalContext.Provider
			value={{
				isLoggedIn,
				modalWindow,
				blur,
				user,
				isUserLoading,
				userError,
				rooms,
				isRoomsLoading,
				roomsError,
				notification,
				CurrModalWin,
				mutateUser,
				mutateRooms,

				setIsLoggedIn,
				setModalWindow,
				setNotification
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}
