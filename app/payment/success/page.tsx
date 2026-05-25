"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/app/context/global.context";

export default function PaymentSuccessPage() {
    const router = useRouter();
    const { setNotification } = useContext(GlobalContext);

    useEffect(() => {
        setNotification({
            text: "Reservation was created successfully",
            status: "success",
        });
        router.replace("/my_stays");
    }, [router, setNotification]);

    return null;
}
