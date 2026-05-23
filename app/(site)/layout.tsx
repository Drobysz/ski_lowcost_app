import { ReactNode } from "react";
import s from "./GridLayout.module.scss";
import {
    Header,
    Footer,
    BlurBackground,
    ModalWindow,
    NotificationBar
} from "./layout/index"

export default function SiteLayout({
	children
}: Readonly<{
  children: ReactNode;
}>) {
    return (
        <>
            <BlurBackground className={s.wrapper}>
                <Header
                    className={s.header}
                />
                <main>
                    {children}
                </main>
                <Footer />
            </BlurBackground>
            <ModalWindow />
            <NotificationBar />
        </>
    )
}