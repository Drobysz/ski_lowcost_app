import { ReactNode } from "react";
import { BookingContextProvider } from "./context/booking.context";
import { BookingShell } from "./layout/BookingShell";

export default function SiteLayout({
    children
}: Readonly<{
  children: ReactNode;
}>) {
    return (
        <BookingContextProvider>
            <BookingShell>{children}</BookingShell>
        </BookingContextProvider>
    )  
}
