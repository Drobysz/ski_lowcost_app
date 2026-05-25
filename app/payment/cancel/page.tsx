"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/app/context/global.context";

export default function PaymentCancelPage() {
    const router = useRouter();
    const { setNotification } = useContext(GlobalContext);

    useEffect(() => {
        setNotification({
            text: "Payment was cancelled",
            status: "alert",
        });
        router.replace("/booking");
    }, [router, setNotification]);

    return null;
}
