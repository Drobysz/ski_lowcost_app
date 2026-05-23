"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import {
	GlobalContextInterface,
	ModalWindow
} from "./global.interface";
import { AuthStatus } from "@/interface/Auth.interface";
import { fetchRooms, getAuthStatus } from "@/queries";
import { useCurrentUser } from "@/hooks";

export const GlobalContext = createContext<GlobalContextInterface>({
	isLoggedIn: "none",
	modalWindow: "none",
	blur: false,
	isUserLoading: false,
	isRoomsLoading: false,
	mutateUser: async () => undefined,
	mutateRooms: async () => undefined,

	setIsLoggedIn: () => {},
	setModalWindow: () => {}
})

export const GlobalContextProvider = ({
	children
}: {
	children: ReactNode
})=> {
	const pathname = usePathname();
	const [isLoggedIn, setIsLoggedIn] = useState<AuthStatus>("none");
	const [modalWindow, setModalWindow] = useState<ModalWindow>("none");

	const blur = modalWindow !== "none";
	const shouldFetchUser = isLoggedIn !== "no_auth";
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
			revalidateOnMount: true,
			revalidateIfStale: true,
			revalidateOnFocus: true,
			revalidateOnReconnect: true,
			dedupingInterval: 5_000,
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
				mutateUser,
				mutateRooms,

				setIsLoggedIn,
				setModalWindow
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}
