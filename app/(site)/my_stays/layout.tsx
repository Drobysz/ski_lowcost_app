import { ReactNode } from "react";
import { StayContextProvider } from "./context/stay.context";
import s from "./GridLayout.module.scss";

export default function StayLayout({
    children
}: Readonly<{
  children: ReactNode;
}>) {
    return (
        <StayContextProvider>
            <div className={s.wrapper}>
                <div />
                    {children}
                <div />
            </div>
        </StayContextProvider>
    )
}