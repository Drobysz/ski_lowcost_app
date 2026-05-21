"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import {
	GlobalContextInterface
} from "./global.interface";
import { AuthStatus } from "@/interface/Auth.interface";

export const GlobalContext = createContext<GlobalContextInterface>({
	isLoggedIn: "none",

	setIsLoggedIn: () => {}
})

export const GlobalContextProvider = ({
	children
}: {
	children: ReactNode
})=> {
	const [isLoggedIn, setIsLoggedIn] = useState<AuthStatus>("none");

	useEffect(() => {
		async function checkStatus() {
			try {
				const res = await fetch("/api/auth/status");
				const { isLoggedIn } = await res.json();
				setIsLoggedIn(isLoggedIn);
			} catch {
				setIsLoggedIn("no_auth");
			}
		}
		
		checkStatus();
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				isLoggedIn,

				setIsLoggedIn
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}
