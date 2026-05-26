"use client";

import { GlobalContext } from "@/app/context/global.context";
import { Btn } from "@/components"
import { useRouter } from "next/navigation";
import { useContext } from "react";

export const LogOutBtn = ()=> {
    const router = useRouter();
    
    const {
        setIsLoggedIn,
        setModalWindow,
        setNotification
    } = useContext(GlobalContext);


    const handleClick = async () => {
        const res = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                credentials: "include",
            },
        });

        if (!res.ok) {
            setNotification({
                status: "error",
                text: "Failed to log out"
            });
            return;
        }

        setNotification({
            status: "success",
            text: "Successfully logged out"
        });

        setIsLoggedIn("no_auth");
        setModalWindow("none");

        router.push("/auth/login");
    };

    return (
        <Btn
            colorSet="red"
            form="rect"
            onClick={handleClick}
        >
            Log out
        </Btn>
    )
}